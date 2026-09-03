#!/usr/bin/env bash
# Rebuild "Curriculum Vita.pdf" from cv.html/cv.css using headless Chromium.
#
# Usage:
#   ./scripts/build-cv.sh
#
# Requires a Chromium/Chrome binary available as one of:
#   chromium, chromium-browser, google-chrome
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_HTML="${REPO_ROOT}/cv.html"
OUTPUT_PDF="${REPO_ROOT}/Curriculum Vita.pdf"

CHROME_BIN=""
for candidate in chromium chromium-browser google-chrome google-chrome-stable; do
  if command -v "${candidate}" >/dev/null 2>&1; then
    CHROME_BIN="$(command -v "${candidate}")"
    break
  fi
done

if [[ -z "${CHROME_BIN}" ]]; then
  echo "error: no Chromium/Chrome binary found (looked for chromium, chromium-browser, google-chrome)" >&2
  exit 1
fi

"${CHROME_BIN}" \
  --headless=new \
  --disable-gpu \
  --no-sandbox \
  --print-to-pdf="${OUTPUT_PDF}" \
  --print-to-pdf-no-header \
  --no-pdf-header-footer \
  "file://${SOURCE_HTML}"

echo "Built: ${OUTPUT_PDF}"
