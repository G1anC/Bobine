#!/usr/bin/env sh
#
# The quality gate. Reports, never rewrites (except --format).
#
#   sh scripts/check.sh             gofmt, vet and test the API, then check and test the client, then filet
#   sh scripts/check.sh --go-only   the API only
#   sh scripts/check.sh --format    rewrite the Go sources in place
#
# The database tests run when TEST_DATABASE_URL is set and say loudly when they are skipped.

set -eu

mode="all"
case "${1:-}" in
--go-only) mode="go" ;;
--format) mode="format" ;;
"") ;;
*)
  echo "usage: $0 [--go-only|--format]" >&2
  exit 2
  ;;
esac

cd "$(git rev-parse --show-toplevel)"

if [ "$mode" = "format" ]; then
  (cd apps/api && go fmt ./...)
  exit 0
fi

status=0

echo "==> apps/api"
(
  cd apps/api
  s=0
  unformatted="$(gofmt -l .)"
  if [ -n "$unformatted" ]; then
    echo "gofmt: not formatted (run 'sh scripts/check.sh --format'):"
    echo "$unformatted"
    s=1
  fi
  go vet ./... || s=1
  go test ./... || s=1
  if grep -rln 'AutoMigrate' --include='*.go' . | grep -v '_test\.go$'; then
    echo "AutoMigrate in non-test code: schema changes belong in migrations/"
    s=1
  fi
  exit "$s"
) || status=1

if [ "$mode" = "all" ]; then
  echo "==> apps/client"
  (
    cd apps/client
    [ -d node_modules ] || bun install --frozen-lockfile >/dev/null
    bun run check && bun run test
  ) || status=1

  echo "==> filet"
  if command -v filet >/dev/null 2>&1; then
    filet check . || status=1
  else
    echo "check: no 'filet' on PATH, skipping the style gate" >&2
  fi
fi

[ "$status" -eq 0 ] || echo "check failed"
exit "$status"
