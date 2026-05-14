#!/usr/bin/env bash
# Vytvoří veterancup-standalone.tar.gz z Next.js standalone výstupu (včetně static + public).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "→ next build …"
npm run build

STANDALONE="$ROOT/.next/standalone"
if [[ ! -f "$STANDALONE/server.js" ]]; then
  echo "Chybí $STANDALONE/server.js — zkontroluj next.config (output: standalone)." >&2
  exit 1
fi

echo "→ kopírování .next/static a public do standalone …"
mkdir -p "$STANDALONE/.next"
rm -rf "$STANDALONE/.next/static"
cp -R "$ROOT/.next/static" "$STANDALONE/.next/static"
rm -rf "$STANDALONE/public"
cp -R "$ROOT/public" "$STANDALONE/public"

cp "$ROOT/scripts/install-sharp-on-linux.sh" "$STANDALONE/install-sharp-on-linux.sh"
chmod +x "$STANDALONE/install-sharp-on-linux.sh"

OUT="$ROOT/veterancup-standalone.tar.gz"
rm -f "$OUT"
echo "→ tar $OUT …"
tar -czf "$OUT" -C "$STANDALONE" .

echo "Hotovo: $OUT"
ls -lh "$OUT"
echo ""
echo "Na Linux VPS po rsyncu (jako gitdeploy v /var/www/veterancup) spusť:"
echo "  ./install-sharp-on-linux.sh && pm2 restart veterancup"
echo "(v archivu je stejný skript – bez toho hlásí sharp „linux-x64 runtime“.)"
