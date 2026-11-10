package main

import (
	"log/slog"

	"github.com/FacileStudio/tronc/middleware"
	"github.com/FacileStudio/tronc/spa"
)

// securityConfig extends tronc's default policy with the hashes of the inline
// scripts adapter-static writes into the client build the binary serves.
func securityConfig(clientDir string, logger *slog.Logger) middleware.SecurityConfig {
	if !spa.Available(clientDir) {
		return middleware.SecurityConfig{}
	}
	hashes, err := spa.InlineScriptHashes(clientDir)
	if err != nil {
		logger.Error("failed to hash the client's inline scripts", slog.Any("error", err))
	}
	return middleware.SecurityConfig{CSPSources: map[string][]string{"script-src": hashes}}
}
