#!/usr/bin/env bash

set -euo pipefail

seed="$(cat << EOF
CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  uuid UUID NOT NULL UNIQUE,
  title TEXT NOT NULL,
  meta TEXT,
  extra_files JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_songs_uuid ON songs(uuid);
EOF
)"

url="${1:-http://127.0.0.1:8080}"

echo "Seeding database at $url"
echo "Seed:"
echo "$seed"

turso db shell $url "$seed"

echo "Done."

