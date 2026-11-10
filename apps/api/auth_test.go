package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/G1anC/Bobine/apps/api/internal/env"
	"github.com/G1anC/Bobine/apps/api/internal/testsupport"
	"github.com/G1anC/Bobine/apps/api/modules/auth"
)

const (
	testEmail    = "ada@example.com"
	testPassword = "correct horse battery"
)

type session struct {
	Token string `json:"token"`
}

func newTestServer(t *testing.T, allowRegistration bool) *httptest.Server {
	t.Helper()
	sqlDB := testsupport.DB(t)
	logger := slog.New(slog.NewTextHandler(io.Discard, nil))
	appEnv := env.Config{AllowRegistration: allowRegistration}
	kits, err := auth.New(context.Background(), sqlDB, appEnv, logger)
	if err != nil {
		t.Fatalf("auth.New: %v", err)
	}
	server := httptest.NewServer(buildRouter(sqlDB, kits, appEnv, logger))
	t.Cleanup(server.Close)
	return server
}

type apiRequest struct {
	method, path, token string
	body                any
}

func send(t *testing.T, server *httptest.Server, req apiRequest) (int, []byte) {
	t.Helper()
	method, path, token := req.method, req.path, req.token
	payload, err := json.Marshal(req.body)
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	request, err := http.NewRequest(method, server.URL+path, bytes.NewReader(payload))
	if err != nil {
		t.Fatalf("request: %v", err)
	}
	request.Header.Set("Content-Type", "application/json")
	if token != "" {
		request.Header.Set("Authorization", "Bearer "+token)
	}
	response, err := http.DefaultClient.Do(request)
	if err != nil {
		t.Fatalf("%s %s: %v", method, path, err)
	}
	defer response.Body.Close()
	raw, _ := io.ReadAll(response.Body)
	return response.StatusCode, raw
}

func signIn(t *testing.T, server *httptest.Server, path string, want int) string {
	t.Helper()
	credentials := map[string]string{"email": testEmail, "name": "Ada", "password": testPassword}
	status, raw := send(t, server, apiRequest{http.MethodPost, path, "", credentials})
	if status != want {
		t.Fatalf("POST %s = %d, want %d: %s", path, status, want, raw)
	}
	var got session
	if err := json.Unmarshal(raw, &got); err != nil {
		t.Fatalf("decode %s: %v", path, err)
	}
	return got.Token
}

func TestRegisterThenSessionRoundTrip(t *testing.T) {
	server := newTestServer(t, true)

	token := signIn(t, server, "/api/auth/register", http.StatusCreated)
	if token == "" {
		t.Fatal("register returned no token")
	}

	status, raw := send(t, server, apiRequest{http.MethodGet, "/api/auth/me", token, nil})
	var me struct {
		User auth.User `json:"user"`
	}
	if err := json.Unmarshal(raw, &me); err != nil {
		t.Fatalf("decode /auth/me: %v", err)
	}
	if status != http.StatusOK || me.User.Email != testEmail || me.User.Name != "Ada" {
		t.Fatalf("GET /auth/me = %d %s", status, raw)
	}

	if status, raw := send(t, server, apiRequest{http.MethodPost, "/api/auth/logout", token, nil}); status >= 300 {
		t.Fatalf("logout = %d %s", status, raw)
	}
	if status, _ := send(t, server, apiRequest{http.MethodGet, "/api/auth/me", token, nil}); status != http.StatusUnauthorized {
		t.Fatalf("GET /auth/me after logout = %d, want 401", status)
	}

	if signIn(t, server, "/api/auth/login", http.StatusOK) == "" {
		t.Fatal("login returned no token")
	}
}

func TestLoginRefusesAWrongPassword(t *testing.T) {
	server := newTestServer(t, true)
	signIn(t, server, "/api/auth/register", http.StatusCreated)

	wrong := map[string]string{"email": testEmail, "password": "not the password"}
	if status, raw := send(t, server, apiRequest{http.MethodPost, "/api/auth/login", "", wrong}); status != http.StatusUnauthorized {
		t.Fatalf("login with a wrong password = %d, want 401: %s", status, raw)
	}
}

func TestClosedRegistrationKeepsTheFirstAccountOnly(t *testing.T) {
	server := newTestServer(t, false)
	signIn(t, server, "/api/auth/register", http.StatusCreated)

	second := map[string]string{"email": "bob@example.com", "name": "Bob", "password": testPassword}
	if status, raw := send(t, server, apiRequest{http.MethodPost, "/api/auth/register", "", second}); status != http.StatusForbidden {
		t.Fatalf("second registration on a closed instance = %d, want 403: %s", status, raw)
	}
}

func TestMeRequiresASession(t *testing.T) {
	server := newTestServer(t, true)
	if status, _ := send(t, server, apiRequest{http.MethodGet, "/api/auth/me", "", nil}); status != http.StatusUnauthorized {
		t.Fatalf("GET /auth/me without a session = %d, want 401", status)
	}
}

func TestRegistrationIsOfferedUntilAClosedInstanceHasAnAccount(t *testing.T) {
	server := newTestServer(t, false)
	if _, raw := send(t, server, apiRequest{http.MethodGet, "/api/auth/registration", "", nil}); string(bytes.TrimSpace(raw)) != `{"open":true}` {
		t.Fatalf("registration on an empty closed instance = %s, want open", raw)
	}
	signIn(t, server, "/api/auth/register", http.StatusCreated)
	if _, raw := send(t, server, apiRequest{http.MethodGet, "/api/auth/registration", "", nil}); string(bytes.TrimSpace(raw)) != `{"open":false}` {
		t.Fatalf("registration once an account exists = %s, want closed", raw)
	}
}
