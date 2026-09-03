#!/usr/bin/env sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
chromium --headless --no-sandbox --disable-gpu \
  --print-to-pdf="$ROOT/Curriculum Vita.pdf" \
  --no-pdf-header-footer \
  "file://$ROOT/cv.html"
