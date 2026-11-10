package auth

import (
	"github.com/FacileStudio/tronc/middleware"
	"github.com/go-chi/chi/v5"
)

const (
	credentialsPerSecond = 0.2
	credentialsBurst     = 10
	credentialsMaxKeys   = 10000
)

// RegisterRoutes mounts porte's routes and Bobine's own account routes.
//
// The password routes answer {token, user} from handlers here, calling
// porte's Register and Login, so a client holds the account after one request.
// They sit behind a per-address rate limit: each attempt costs an argon2id
// hash, so an unbounded caller is a memory problem before it is a guessing
// problem. With an issuer configured porte refuses both and they answer 404.
func RegisterRoutes(router chi.Router, kits *Kits) {
	kits.Sessions.Mount(router)
	kits.OIDC.Mount(router)

	router.Get("/auth/registration", kits.handleRegistration)
	router.Group(func(r chi.Router) {
		r.Use(middleware.Ratelimit(middleware.RatelimitConfig{
			Limit:   credentialsPerSecond,
			Burst:   credentialsBurst,
			MaxKeys: credentialsMaxKeys,
		}))
		r.Post("/auth/register", kits.handleRegister)
		r.Post("/auth/login", kits.handleLogin)
	})
	router.With(kits.Sessions.RequireAuth).Get("/auth/me", kits.handleMe)
}
