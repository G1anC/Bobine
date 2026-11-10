// Package env reads Bobine's configuration from the process environment.
package env

import (
	"fmt"

	"github.com/FacileStudio/porte"
	troncenv "github.com/FacileStudio/tronc/env"
)

// Config is the process configuration: the tronc core, the registration
// switch, and the optional single sign-on client.
type Config struct {
	troncenv.Core

	// AllowRegistration opens POST /auth/register to everyone. Closed, only
	// the first account can be created.
	AllowRegistration bool

	// Porte is the sign-in configuration. Its Issuer is empty unless
	// OIDC_ISSUER is set, and password sign-in is what runs then.
	Porte porte.Config
}

// Load reads the environment and validates it.
func Load() (Config, error) {
	core, err := troncenv.LoadCore()
	if err != nil {
		return Config{}, err
	}
	if core.Port < 1 || core.Port > 65535 {
		return Config{}, fmt.Errorf("PORT must be a valid TCP port")
	}
	allow, err := troncenv.Bool("ALLOW_REGISTRATION", false)
	if err != nil {
		return Config{}, err
	}
	cfg := Config{Core: core, AllowRegistration: allow, Porte: loadPorte()}
	if err := cfg.Porte.Validate(); err != nil {
		return Config{}, err
	}
	return cfg, nil
}

// loadPorte maps the suite's OIDC_* variables onto porte's configuration.
// PUBLIC_URL tells porte the app is served over https when no issuer is set,
// which is what makes the session cookie Secure.
func loadPorte() porte.Config {
	return porte.Config{
		Issuer:         troncenv.String("OIDC_ISSUER", ""),
		ClientID:       troncenv.String("OIDC_CLIENT_ID", ""),
		ClientSecret:   troncenv.String("OIDC_CLIENT_SECRET", ""),
		RedirectURL:    troncenv.String("OIDC_REDIRECT_URL", ""),
		SuccessURL:     troncenv.String("OIDC_SUCCESS_URL", troncenv.String("PUBLIC_URL", "")),
		MobileRedirect: troncenv.String("OIDC_MOBILE_REDIRECT", ""),
		AppName:        "Bobine",
	}
}
