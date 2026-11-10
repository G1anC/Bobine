// Package migrations embeds the ordered SQL that owns Bobine's schema.
//
// It is a package so the tests run the same migrations the binary does.
package migrations

import "embed"

// FS holds the migration files at its root, the layout tronc/migrate expects.
//
//go:embed *.sql
var FS embed.FS
