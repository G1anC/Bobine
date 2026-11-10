# Bobine

A media center in the spirit of Kodi: one library of films and shows, watched from a browser,
a desktop app, a phone or a TV with a remote.

This is the base. Sign-in works end to end; the library, scanning and playback are next.

## Stack

| Layer | Tech |
|---|---|
| API | Go 1.26, Chi, PostgreSQL 16, [tronc](https://github.com/FacileStudio/tronc) (HTTP chassis), [porte](https://github.com/FacileStudio/porte) (auth) |
| Client | SvelteKit 2 (`adapter-static`), Svelte 5, Tailwind CSS 4, [muse](https://github.com/FacileStudio/muse) (UI kit) |
| Desktop | Tauri 2 around the static client build, in `apps/desktop` |
| Mobile and TV | Capacitor 8 Android project in `apps/client/android`, with the Android TV launcher |
| Deploy | One distroless image behind Traefik, on Dokploy, at https://bobine.facile.studio |

## Quick start

```sh
mise trust && mise install
mise run bootstrap
mise run db-up      # Postgres on 127.0.0.1:5433
mise run dev        # API on :4000, client on :5173 (proxies /api)
```

Open http://localhost:5173 and create the first account.

```sh
mise run check                         # gofmt, vet, Go tests, svelte-check, vitest, filet
cd apps/desktop && mise run dev        # desktop app against the dev server
cd apps/client && mise run android     # build and sync into the Android project
```

## How it fits together

```
apps/
  api/       Go: main.go, server.go, modules/auth (porte), migrations/ (goose, applied at boot)
  client/    SvelteKit: src/lib/tv (remote control), src/routes/(app) (signed-in shell), android/
  desktop/   Tauri shell; loads apps/client/build
```

The Go binary serves `/api/*` and the built client on every other path, so the web app is
same-origin and signs in with an `HttpOnly` cookie. The desktop and Android apps are a different
origin: they call `https://bobine.facile.studio/api` with a bearer token, which is why
`CORS_ALLOWED_ORIGINS` must list their webview origins.

## Auth

porte handles accounts, argon2id passwords and sessions. Endpoints under `/api`:

| Route | What it does |
|---|---|
| `POST /auth/register` | `{email, name, password}` -> `{token, user}`. Password of 12 characters minimum |
| `POST /auth/login` | `{email, password}` -> `{token, user}` |
| `POST /auth/logout` | Ends the session. A cookie caller sends `X-Facile-CSRF: 1` |
| `GET /auth/me` | The signed-in account |
| `GET /auth/registration` | `{open}`: whether the sign-in screen offers account creation |
| `GET /auth/config` | `{sso_only, oidc_enabled}` |

Registration is closed by default: the first account can always be created, later ones only
with `ALLOW_REGISTRATION=true`. Setting `OIDC_ISSUER` and its siblings switches sign-in to
single sign-on instead.

## TV and remote

`src/lib/tv/remote.ts` makes every screen drivable with arrows, OK and Back. The arrows move
focus to the nearest focusable element on screen (row first, then column), Enter clicks it, and
Back or Escape goes to the previous page. On Android TV the hardware Back button is wired through
Capacitor. The root font size steps up at 1600px and 2400px wide so a 1080p or 4K TV reads from
the couch. New UI works with the remote as long as it uses real `<button>` and `<a>` elements.

## Configuration

| Variable | Default | What it does |
|---|---|---|
| `DATABASE_URL` | required | Postgres connection string |
| `PORT` | `4000` | Listen port |
| `PUBLIC_URL` | empty | Public origin. `https://` makes the session cookie `Secure` |
| `ALLOW_REGISTRATION` | `false` | Opens sign-up beyond the first account |
| `CORS_ALLOWED_ORIGINS` | empty | Origins of the desktop and Android webviews |
| `TRUSTED_PROXIES` | private ranges | Whose `X-Forwarded-For` to believe; `private,cloudflare` in production |
| `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET`, `OIDC_REDIRECT_URL`, `OIDC_SUCCESS_URL` | empty | Optional single sign-on |

## License

MIT
