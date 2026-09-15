#!/bin/sh
# Captura local para inspeção visual durante o desenvolvimento.
# uso: sh scripts/shot.sh <url> <arquivo-de-saida> [largura] [altura] [ms]
set -e
URL="$1"
OUT="$2"
W="${3:-1512}"
H="${4:-950}"
BUDGET="${5:-9000}"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

"$CHROME" \
  --headless=new \
  --hide-scrollbars \
  --window-size="$W,$H" \
  --use-gl=angle \
  --use-angle=swiftshader \
  --enable-unsafe-swiftshader \
  --virtual-time-budget="$BUDGET" \
  --screenshot="$OUT" \
  "$URL" 2>/dev/null
echo "$OUT"
