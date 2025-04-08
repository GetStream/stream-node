#!/bin/bash
set -euo pipefail

# Iterate through all *.d.ts files in the dist directory
find dist -type f -name "*.d.ts" | while read -r file; do
  # Log file name and line number for matches
  grep -n "^import .* from '@stream-io/openai-realtime-api';" "$file" | while IFS=: read -r linenum _; do
    echo "Adding ts-ignore to declaration: $file:$linenum"
  done || true

  # Use sed to prepend the comment to matching import statements
  sed -i '' '/^import .* from '\''@stream-io\/openai-realtime-api'\'';/i\
// @ts-ignore Optional dependency
' "$file" || true
done

