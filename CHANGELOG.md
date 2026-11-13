# Changelog

All notable changes to Bobine. The format follows Keep a Changelog, versions follow semver.

## [Unreleased]

### Security

- build(api): porte v0.17.0 to v0.19.0 and tronc v0.21.0 to v0.22.2 (migrate v0.1.1, testdb v0.1.2). This selects go-jose v4.1.9 (CVE-2026-116585, CVE-2026-116586, CVE-2026-116587) and x/crypto v0.58.0 (CVE-2026-56855, CVE-2026-78662)

## [0.1.0] - 2026-11-10

### Added

- Go API on tronc with porte email and password sign-in, Postgres migrations at boot
- SvelteKit client on muse: sign-in and sign-up, Home, Movies and Shows shells
- TV layer: arrow, OK and Back navigation, larger type on 1080p and 4K screens, 4px focus ring
- Tauri desktop shell and a Capacitor Android project listed on Android TV
- One-container deploy at https://bobine.facile.studio
- AGENTS.md rewritten for the chosen stack
