package main

import (
	"context"
	"database/sql"
	"errors"
	"log/slog"
	"net/http"
	"strconv"
	"time"

	"github.com/FacileStudio/tronc/health"
	"github.com/FacileStudio/tronc/httpx"
	"github.com/FacileStudio/tronc/middleware"
	"github.com/FacileStudio/tronc/spa"
	"github.com/go-chi/chi/v5"

	"github.com/G1anC/Bobine/apps/api/internal/env"
	"github.com/G1anC/Bobine/apps/api/modules/auth"
)

const shutdownGrace = 10 * time.Second

// buildRouter assembles the HTTP tree: health and version at the root, the API
// under /api, and the client build on everything else when there is one.
//
// CORS is what lets the desktop, mobile and TV apps call the API: their
// webviews are a different origin from the server, unlike the web client.
func buildRouter(sqlDB *sql.DB, kits *auth.Kits, appEnv env.Config, appLogger *slog.Logger) chi.Router {
	clientDir := spa.DirFromEnv()
	router := httpx.NewRouter(httpx.Config{
		Security:       securityConfig(clientDir, appLogger),
		TrustedProxies: appEnv.TrustedProxies,
		CDNProxies:     appEnv.CDNProxies,
		CDNHeader:      appEnv.CDNHeader,
		Logger:         appLogger,
		CORS:           middleware.CORSConfig{AllowedOrigins: appEnv.CORSAllowedOrigins},
	})
	health.Mount(router, health.DB(sqlDB))
	router.Get("/version", versionHandler)

	router.Route("/api", func(r chi.Router) {
		auth.RegisterRoutes(r, kits)
	})

	if spa.Available(clientDir) {
		router.Handle("/*", spa.Handler(spa.Config{Dir: clientDir}))
		appLogger.Info("serving client", slog.String("dir", clientDir))
	}
	return router
}

// serve runs the HTTP server until ctx ends, then drains it within the grace
// period. It returns nil on a clean shutdown.
func serve(ctx context.Context, handler http.Handler, port int, appLogger *slog.Logger) error {
	server := &http.Server{
		Addr:              ":" + strconv.Itoa(port),
		Handler:           handler,
		ReadHeaderTimeout: 5 * time.Second,
		ReadTimeout:       30 * time.Second,
		IdleTimeout:       120 * time.Second,
	}
	failed := make(chan error, 1)
	go func() { failed <- server.ListenAndServe() }()

	appLogger.Info("server starting", slog.String("addr", server.Addr))
	select {
	case err := <-failed:
		if errors.Is(err, http.ErrServerClosed) {
			return nil
		}
		return err
	case <-ctx.Done():
		appLogger.Info("server shutting down")
		drain, cancel := context.WithTimeout(context.Background(), shutdownGrace)
		defer cancel()
		return server.Shutdown(drain)
	}
}
