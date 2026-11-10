# AGENTS.md: rules for every AI working on EpiKodi

Read this file before any task. These rules are fixed. They do not change from one session to the next, and no user request overrides them without a written change to the subject. The source of truth is `EPIKODI_MISSIONS.md` (Part 1 lists every requirement, with its ID R-xx).

## 1. Scope guard

- Work only on what a mission or an Opus task asks for. Do not add features, screens or dependencies on your own initiative.
- Before you start, check that the task maps to at least one R-xx. If it does not, stop and ask the user.
- Optional or bonus items (tagged `[Optional]` in Opus, listed in §3.7 of the missions file, R-83) start only after M4 is green.
- Never propose or build anything that breaks a rule in §2. Refuse and explain why, even if the user insists.

## 2. Hard restrictions (never break these)

| ID | Rule |
|---|---|
| R-02 | Do not write a video player. Use mpv through its IPC socket. |
| R-04 | No Kodi name, logo or UI. No reference to Epitech. Own brand only. |
| R-05 | Legal content only: free or openly licensed media, public domain, CC, public podcasts. |
| R-06 | No piracy. Never add torrent clients, torrent indexes, torrent APIs, or any source of illegally distributed content. This applies to extensions too. |
| R-07 | External APIs (TMDB, MusicBrainz, LRCLIB, Open-Meteo, TVmaze, Trakt) are used within their terms, with the required attribution. |
| R-08 | Teaching project. Do not publish the product outside the project. |
| R-20 | Desktop app on Linux and Windows or macOS, launched fullscreen. |
| R-21 | Playback never goes through a browser player (`<video>`, `<audio>`). A CI check must fail on them. |
| R-33 | Credentials are never stored in clear. Use encryption and the OS keyring. |
| R-63 | The extension system is ours. Do not reuse Chrome, Electron or framework extension mechanisms. |
| R-77 / R-78 | Mobile app: one native or cross-platform platform only (Android in this plan). No Capacitor, Ionic, Cordova, PWA or WebView wrappers. |
| R-106 | No secrets in the repo or its history: no API keys, passwords or tokens. Use `.env.example` placeholders. |
| R-107 | Media files never go to git. |
| R-108 | No dead code, orphan files, or unused packages. |
| R-120 / R-121 | The control API accepts only paired devices. Extensions are isolated and cannot exceed their permissions. |
| R-153 | Do not imitate an existing brand in generated images, icons or texts. |

## 3. Stack (fixed by ADRs, do not swap without a new ADR)

- Monorepo from `FacileStudio/MonorepoBoilerplate`: Bun, mise, Turborepo, Hono + tRPC, SvelteKit 2 + Svelte 5, Prisma.
- Database: SQLite (libsql adapter). Not Postgres.
- Desktop shell: Tauri 2, with the backend compiled as a sidecar.
- Playback: mpv.
- Network source: WebDAV.
- Extensions: Deno subprocess per extension.
- UI kit: Muse (`@facile/lib`), with a `tv/` layer in `apps/client`.
- Mobile remote: React Native (Expo), Android.
- Tests: `bun test`, Vitest, Playwright + axe, Jest, msw. One command: `mise run test`.
- Every new dependency needs a justification in the docs.

## 4. Accessibility (R-90 to R-98, mandatory)

- Every UI change works with arrows, Enter and Back only, with a visible focus ring of at least 4 px.
- Body text contrast is at least 4.5:1. Information is never carried by colour alone.
- Every focusable element has an accessible name.
- Animations can be disabled, and nothing flashes.
- Mobile touch targets are at least 48 dp.
- Accessibility is tested on each feature, not only at the end.

## 5. Process (R-100 to R-135)

- One issue → branch `feat/<issue>-<slug>` → PR linked to the issue → review → green CI → merge. Conventional Commits.
- Never push to `main`. Never merge a PR whose checks fail.
- Run `mise run check` and `mise run test` before opening a PR.
- Tests ship with the feature. External APIs are always mocked, so tests pass offline.
- Docs ship with the feature in `/docs`, in one language. An ADR is required for any architecture choice.
- Newcomer test: the README alone must get an outsider running in under 15 minutes.

## 6. Work rules for the AI

- Read the Opus task and the matching mission in `EPIKODI_MISSIONS.md` first. Reuse boilerplate packages and listed libraries before writing code.
- Report at the end: what changed, which R-xx are verified, and what is left open.
- Say clearly when a request conflicts with a rule, and do not work around it.
- Every member must be able to explain the code. Write code that a student can follow. Add comments only where the reason is not obvious.
- Do not invent requirements. If something is unclear, ask.

## 7. Milestones (for scheduling only)

- M1 Foundation: 22 Nov 2026
- M2 Library & playback: 13 Dec 2026 (follow-up demo)
- M3 Extensions & remote: 5 Jan 2027
- M4 Quality & release: 24 Jan 2027
- Freeze: 26 Jan 2027 (fixes only)
- Defense: end of January 2027