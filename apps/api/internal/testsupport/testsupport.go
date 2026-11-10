// Package testsupport gives a test package a migrated PostgreSQL database.
package testsupport

import (
	"context"
	"database/sql"
	"hash/fnv"
	"io"
	"log/slog"
	"sync"
	"testing"

	"github.com/FacileStudio/tronc/migrate"
	"github.com/FacileStudio/tronc/testdb"
	"gorm.io/gorm"

	"github.com/G1anC/Bobine/apps/api/migrations"
)

const (
	prefix    = "bobine_test"
	bootstrap = "mise run db-up   # or any PostgreSQL 16"
)

var settings = testdb.Config{Prefix: prefix, Migrate: runMigrations}

var openShared = sync.OnceValues(func() (*gorm.DB, error) {
	url, _ := testdb.URL()
	return testdb.Open(url, settings)
})

// DB returns this package's database, migrated once and emptied per test. It
// skips the test when TEST_DATABASE_URL is unset.
func DB(t *testing.T) *sql.DB {
	t.Helper()

	if _, configured := testdb.URL(); !configured {
		testdb.Announce(bootstrap)
		t.Skip(testdb.SkipReason(bootstrap))
	}
	shared, openErr := openShared()
	if openErr != nil {
		t.Fatalf("test database: %v", openErr)
	}
	if err := testdb.Truncate(shared, settings); err != nil {
		t.Fatalf("reset test database: %v", err)
	}
	sqlDB, err := shared.DB()
	if err != nil {
		t.Fatalf("test database handle: %v", err)
	}
	return sqlDB
}

// runMigrations applies the shipped migrations to this package's private
// schema, under a lock id derived from the schema name so test packages
// sharing one database do not queue on the same lock.
func runMigrations(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return migrate.Run(context.Background(), migrate.Config{
		DB:     sqlDB,
		FS:     migrations.FS,
		Logger: slog.New(slog.NewTextHandler(io.Discard, nil)),
		LockID: lockID(),
	})
}

func lockID() int64 {
	digest := fnv.New64a()
	digest.Write([]byte(testdb.SchemaName(prefix)))
	return int64(digest.Sum64() >> 1)
}
