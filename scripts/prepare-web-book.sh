#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DOCS="$ROOT/.book-docs"
rm -rf "$DOCS"
mkdir -p "$DOCS"

cp "$ROOT/README.md" "$DOCS/index.md"
cp "$ROOT/ROADMAP.md" "$DOCS/ROADMAP.md"
cp "$ROOT/INTERACTIVE-ASSETS.md" "$DOCS/INTERACTIVE-ASSETS.md"
for f in "$ROOT"/0[1-9]-*.md "$ROOT"/1[0-9]-*.md "$ROOT"/2[0-1]-*.md "$ROOT"/APPENDIX-*.md; do
    [ -f "$f" ] || continue
    cp "$f" "$DOCS/"
done

# Teaching illustrations, animations, and interactive assets are part of the web edition.
if [ -d "$ROOT/assets" ]; then
    cp -R "$ROOT/assets" "$DOCS/"
fi

# Keep repository-level files out of the generated documentation tree.
rm -f "$DOCS/README.md"
