// Command api is Bobine's server: the JSON API under /api and, when a client
// build is present, the SvelteKit app on every other path.
package main

import (
	"context"
	"database/sql"
	"log/slog"
	"os"
	"os/signal"
	"syscall"

	"github.com/FacileStudio/tronc/healthcheck"
	"github.com/FacileStudio/tronc/logger"
	"github.com/FacileStudio/tronc/migrate"

	"github.com/G1anC/Bobine/apps/api/internal/database"
	"github.com/G1anC/Bobine/apps/api/internal/env"
	"github.com/G1anC/Bobine/apps/api/migrations"
	"github.com/G1anC/Bobine/apps/api/modules/auth"
)

func main() {
	if healthcheck.Handle(os.Args) {
		return
	}
	os.Exit(run())
}

// run returns the process exit code, so a failed migration or an unreachable
// database is a non-zero exit and not a clean shutdown.
func run() int {
	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	appEnv, err := env.Load()
	if err != nil {
		logger.New(logger.Config{}).Error("failed to load config", slog.Any("error", err))
		return 1
	}
	appLogger := logger.New(logger.Config{Level: appEnv.LogLevel})

	db, err := database.Open(appEnv.DatabaseURL)
	if err != nil {
		appLogger.Error("failed to open database", slog.Any("error", err))
		return 1
	}
	sqlDB, err := db.DB()
	if err != nil {
		appLogger.Error("failed to access database handle", slog.Any("error", err))
		return 1
	}
	defer closeDB(sqlDB, appLogger)

	if done, code := migrateSchema(ctx, sqlDB, appLogger); done {
		return code
	}
	return start(ctx, sqlDB, appEnv, appLogger)
}

// migrateSchema applies the embedded migrations. `api migrate <command>` is
// served here too, because the image is distroless and has no shell to run
// anything else through; done is true when the process should exit with code.
func migrateSchema(ctx context.Context, sqlDB *sql.DB, appLogger *slog.Logger) (done bool, code int) {
	cfg := migrate.Config{DB: sqlDB, FS: migrations.FS, Logger: appLogger}
	if handled, err := migrate.Command(ctx, os.Args, cfg); handled {
		if err != nil {
			appLogger.Error("migrate", slog.Any("error", err))
			return true, 1
		}
		return true, 0
	}
	if err := migrate.Run(ctx, cfg); err != nil {
		appLogger.Error("failed to run migrations", slog.Any("error", err))
		return true, 1
	}
	return false, 0
}

// start wires sign-in and the router, then serves until ctx ends.
func start(ctx context.Context, sqlDB *sql.DB, appEnv env.Config, appLogger *slog.Logger) int {
	kits, err := auth.New(ctx, sqlDB, appEnv, appLogger)
	if err != nil {
		appLogger.Error("failed to set up sign-in", slog.Any("error", err))
		return 1
	}
	go kits.Sweep(ctx)

	if err := serve(ctx, buildRouter(sqlDB, kits, appEnv, appLogger), appEnv.Port, appLogger); err != nil {
		appLogger.Error("server stopped", slog.Any("error", err))
		return 1
	}
	return 0
}

func closeDB(sqlDB *sql.DB, appLogger *slog.Logger) {
	if err := sqlDB.Close(); err != nil {
		appLogger.Error("failed to close database", slog.Any("error", err))
	}
}
