// Package auth is Bobine's sign-in, delegated entirely to porte.
//
// Accounts live in porte's own tables. Without OIDC_ISSUER people sign in with
// an email and a password; with one, porte closes the password routes and
// sign-in goes through the issuer. Either way the session is the same: a
// cookie in a browser, a bearer token in the desktop, mobile and TV apps.
package auth

import (
	"context"
	"database/sql"
	"log/slog"
	"time"

	"github.com/FacileStudio/porte/local"
	"github.com/FacileStudio/porte/oidc"
	portepg "github.com/FacileStudio/porte/pg"
	"github.com/FacileStudio/porte/session"

	"github.com/G1anC/Bobine/apps/api/internal/env"
)

const sweepInterval = time.Hour

// Kits is porte, assembled: one session manager over porte's tables, and the
// two kits that issue through it.
type Kits struct {
	DB        *sql.DB
	Sessions  *session.Manager
	OIDC      *oidc.Kit
	Passwords *local.Kit
	Logger    *slog.Logger

	// AllowRegistration mirrors ALLOW_REGISTRATION, for the sign-in screen.
	AllowRegistration bool
}

// New builds the session manager and both kits from one porte.Config. It runs
// OIDC discovery when an issuer is set and fails rather than booting half-wired.
func New(ctx context.Context, sqlDB *sql.DB, appEnv env.Config, logger *slog.Logger) (*Kits, error) {
	store := portepg.New(sqlDB)
	sessions, err := session.New(appEnv.Porte, session.Deps{Sessions: store.Sessions(), Logger: logger})
	if err != nil {
		return nil, err
	}
	kits := &Kits{DB: sqlDB, Sessions: sessions, Logger: logger, AllowRegistration: appEnv.AllowRegistration}
	kits.OIDC, err = oidc.New(ctx, appEnv.Porte, oidc.Deps{
		Users:      store.Users(),
		Identities: store.Identities(),
		Sessions:   sessions,
		Codes:      store.LoginCodes(),
		Logger:     logger,
	})
	if err != nil {
		return nil, err
	}
	kits.Passwords, err = local.New(local.Config{AllowRegistration: appEnv.AllowRegistration}, local.Deps{
		Users:      store.Users(),
		Identities: store.Identities(),
		Sessions:   sessions,
		Count:      countUsers(sqlDB),
		Logger:     logger,
	})
	if err != nil {
		return nil, err
	}
	return kits, nil
}

// countUsers reports how many accounts exist, which is how porte decides
// whether a closed instance may still create its first one.
func countUsers(sqlDB *sql.DB) func(context.Context) (int64, error) {
	return func(ctx context.Context) (int64, error) {
		var count int64
		err := sqlDB.QueryRowContext(ctx, `SELECT count(*) FROM porte_users`).Scan(&count)
		return count, err
	}
}

// Sweep deletes expired sessions every hour until ctx ends.
func (k *Kits) Sweep(ctx context.Context) {
	ticker := time.NewTicker(sweepInterval)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if _, err := k.Sessions.Sweep(ctx); err != nil && ctx.Err() == nil {
				k.Logger.Warn("session sweep failed", slog.Any("error", err))
			}
		}
	}
}
