#!/usr/bin/env bash
# Spusť na Linux VPS v kořeni nasazené aplikace (tam kde je server.js), po rsyncu z Macu/Windows.
# Doinstaluje nativní sharp pro linux-x64 – bez toho Next.js hlásí „Could not load the sharp module“.
set -euo pipefail
cd "$(dirname "$0")"
echo "→ npm install sharp (platform linux / cpu x64) …"
npm install --os=linux --cpu=x64 sharp
echo "Hotovo. Pak: pm2 restart veterancup"
