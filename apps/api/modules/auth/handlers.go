package auth

import (
	"context"
	"net/http"
	"strconv"

	"github.com/FacileStudio/porte"
	"github.com/FacileStudio/tronc/errors"
	"github.com/FacileStudio/tronc/httpjson"
)

// User is the signed-in account as the client sees it.
type User struct {
	ID        string `json:"id"`
	Email     string `json:"email"`
	Name      string `json:"name"`
	AvatarURL string `json:"avatar_url,omitempty"`
}

type sessionResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type meResponse struct {
	User User `json:"user"`
}

type registrationResponse struct {
	Open bool `json:"open"`
}

// user reads the account row, since a session carries the user id and nothing else.
func (k *Kits) user(ctx context.Context, userID int64) (User, error) {
	user := User{ID: strconv.FormatInt(userID, 10)}
	err := k.DB.QueryRowContext(ctx,
		`SELECT email, name, avatar_url FROM porte_users WHERE id = $1`, userID,
	).Scan(&user.Email, &user.Name, &user.AvatarURL)
	if err != nil {
		return User{}, errors.Internal("failed to load the account", err)
	}
	return user, nil
}

// writeSession answers a fresh sign-in: the bearer token, which the desktop,
// mobile and TV apps keep, and the account. A browser ignores the token and
// uses the cookie porte already set.
func (k *Kits) writeSession(w http.ResponseWriter, r *http.Request, status int, userID int64, token string) {
	user, err := k.user(r.Context(), userID)
	if err != nil {
		httpjson.WriteError(w, err)
		return
	}
	w.Header().Set("Cache-Control", "no-store")
	httpjson.WriteJSON(w, status, sessionResponse{Token: token, User: user})
}

func (k *Kits) handleRegister(w http.ResponseWriter, r *http.Request) {
	var request porte.CredentialsRequest
	if err := httpjson.DecodeJSON(w, r, &request); err != nil {
		httpjson.WriteError(w, err)
		return
	}
	userID, token, err := k.Passwords.Register(r.Context(), w, r, request.Email, request.Name, request.Password)
	if err != nil {
		httpjson.WriteError(w, err)
		return
	}
	k.writeSession(w, r, http.StatusCreated, userID, token)
}

func (k *Kits) handleLogin(w http.ResponseWriter, r *http.Request) {
	var request porte.CredentialsRequest
	if err := httpjson.DecodeJSON(w, r, &request); err != nil {
		httpjson.WriteError(w, err)
		return
	}
	userID, token, err := k.Passwords.Login(r.Context(), w, r, request.Email, request.Password)
	if err != nil {
		httpjson.WriteError(w, err)
		return
	}
	k.writeSession(w, r, http.StatusOK, userID, token)
}

// handleRegistration tells the sign-in screen whether to offer account
// creation: when registration is open, or while no account exists yet.
func (k *Kits) handleRegistration(w http.ResponseWriter, r *http.Request) {
	open, err := k.registrationOpen(r.Context())
	if err != nil {
		httpjson.WriteError(w, errors.Internal("failed to count accounts", err))
		return
	}
	httpjson.WriteJSON(w, http.StatusOK, registrationResponse{Open: open})
}

func (k *Kits) registrationOpen(ctx context.Context) (bool, error) {
	if k.Sessions.Config().Enabled() {
		return false, nil
	}
	if k.AllowRegistration {
		return true, nil
	}
	count, err := countUsers(k.DB)(ctx)
	return count == 0, err
}

func (k *Kits) handleMe(w http.ResponseWriter, r *http.Request) {
	identity, _ := porte.From(r.Context())
	user, err := k.user(r.Context(), identity.UserID)
	if err != nil {
		httpjson.WriteError(w, err)
		return
	}
	w.Header().Set("Cache-Control", "no-store")
	httpjson.WriteJSON(w, http.StatusOK, meResponse{User: user})
}
