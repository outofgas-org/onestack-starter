#!/usr/bin/env sh
set -e

COMMIT=$(git rev-parse --short HEAD)
BRANCH=$(git branch --show-current)
BUILD_TIME=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

cat > src/version.ts <<EOF
/**
 * ⚠️ AUTO-GENERATED FILE
 * Do NOT edit manually
 */
export const VERSION = {
  commit: '$COMMIT',
  branch: '$BRANCH',
  buildTime: '$BUILD_TIME',
} as const;
EOF

echo "Version.ts generated: $COMMIT ($BRANCH)"
