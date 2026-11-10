# AGENTS.md: rules for every AI working on Bobine

Read this file before any task. To change a rule, open a PR that edits this file; a chat
message alone does not change it.

## 1. Scope

- Work on what the task asks for. Do not add features, screens or dependencies on your own.
- If the task is unclear or conflicts with a rule below, say so and ask before writing code.
- Report at the end: what changed, how it was checked, and what is left open.

## 2. Hard restrictions

| Rule | What it means |
|---|---|
| Own brand | No Kodi name, logo or UI copy. No reference to Epitech. Bobine's own brand only, and no imitation of another brand in images, icons or texts |
| Legal content | Free or openly licensed media only: public domain, Creative Commons, public podcasts, or files the user owns |
| No piracy | Never add torrent clients, torrent indexes, torrent APIs or any source of illegally distributed content, extensions included |
| External APIs | TMDB, MusicBrainz, LRCLIB, TVmaze, Trakt and the like are used within their terms, with the attribution they require |
| No secrets in git | No API keys, passwords or tokens in the repo or its history. Use `.env.example` placeholders; production values live in Dokploy |
| No media in git | Media files never go into the repository |
| No dead code | No dead code, orphan files or unused packages |
| Paired devices | A control API for remotes accepts only paired devices. Extensions are isolated and cannot exceed their permissions |

## 3. Stack

The stack is set. Swapping a layer needs a PR that updates this section and the README.

| Layer | Tech |
|---|---|
| API | Go 1.26 in `apps/api`, on [tronc](https://github.com/FacileStudio/tronc) (HTTP chassis) |
| Auth | [porte](https://github.com/FacileStudio/porte): email and password, cookie session in the browser, bearer token in the apps |
| Database | PostgreSQL 16. Schema changes are new files in `apps/api/migrations/` (goose), never `AutoMigrate` |
| Client | SvelteKit 2 + Svelte 5 in `apps/client`, `adapter-static`, UI from [muse](https://github.com/FacileStudio/muse) |
| TV layer | `apps/client/src/lib/tv`: arrow, OK and Back navigation |
| Desktop | Tauri 2 in `apps/desktop`, wrapping the client build |
| Mobile and TV | Capacitor 8 Android project in `apps/client/android`, also listed on Android TV |
| Deploy | One Docker image behind Traefik on Dokploy, at https://bobine.facile.studio |
| Tooling | mise, bun, filet. One command for the gate: `mise run check` |

Every new dependency is justified in the PR that adds it.

## 4. Accessibility

- Every screen works with arrows, Enter and Back only, with a visible focus ring of at least 4px.
- Use real `<button>` and `<a>` elements so the TV layer can reach them.
- Body text contrast is at least 4.5:1. Information is never carried by colour alone.
- Every focusable element has an accessible name.
- Animations respect `prefers-reduced-motion`, and nothing flashes.
- Touch targets are at least 44px.

## 5. Process

- One issue, one branch (`feat/<issue>-<slug>`), one PR. Conventional Commits.
- Never push to `main`. Merge only with green CI.
- Run `mise run check` before opening a PR. Tests ship with the feature, and external APIs are
  mocked so tests pass offline.
- The README alone must get a newcomer running in under 15 minutes.
- Every member must be able to explain the code. Write code a student can follow.

## 6. Milestones

| Milestone | Date |
|---|---|
| M1 Foundation | 22 Nov 2026 |
| M2 Library and playback | 13 Dec 2026 (follow-up demo) |
| M3 Extensions and remote | 5 Jan 2027 |
| M4 Quality and release | 24 Jan 2027 |
| Freeze, fixes only | 26 Jan 2027 |
| Defense | End of January 2027 |
