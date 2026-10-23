#!/usr/bin/env bash
# Oracle Cloud (Ubuntu 22.04/24.04) bootstrap for portfolio-bot backend.
# Run as root (or with sudo) on a fresh ARM instance:
#   sudo bash setup.sh
set -euo pipefail

VM_IP="${VM_IP:-}"          # set e.g. VM_IP=203.0.113.10 before running
ALLOWED_ORIGIN="${ALLOWED_ORIGIN:-https://nick040791.github.io}"
MODEL="${MODEL:-portfolio-bot}"

if [ -z "$VM_IP" ]; then
  echo "Set VM_IP=<your public IP> before running, e.g.:"
  echo "  sudo VM_IP=203.0.113.10 bash setup.sh"
  exit 1
fi

echo "==> System packages"
apt-get update -y
apt-get install -y curl git ufw

echo "==> Install Ollama"
if ! command -v ollama >/dev/null 2>&1; then
  curl -fsSL https://ollama.com/install.sh | sh
fi

echo "==> Pull base model & create ${MODEL}"
ollama pull gemma4:e2b
# Place Modelfile next to this script's sibling path.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ollama create "${MODEL}" -f "${SCRIPT_DIR}/Modelfile"

echo "==> Install Node.js 20"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> Install proxy dependencies"
cd "${SCRIPT_DIR}/proxy"
npm install --omit=dev

echo "==> Install Caddy"
if ! command -v caddy >/dev/null 2>&1; then
  apt-get install -y debian-keyring debian-archive-keyring apt-transport-https
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
  apt-get update -y
  apt-get install -y caddy
fi

echo "==> Configure proxy env"
cat >/etc/portfolio-bot-proxy.env <<EOF
PORT=3000
OLLAMA_URL=http://127.0.0.1:11434
ALLOWED_ORIGIN=${ALLOWED_ORIGIN}
MODEL=${MODEL}
EOF

echo "==> systemd: proxy"
cat >/etc/systemd/system/portfolio-bot-proxy.service <<EOF
[Unit]
Description=portfolio-bot Ollama proxy
After=network.target ollama.service
Wants=ollama.service

[Service]
Type=simple
EnvironmentFile=/etc/portfolio-bot-proxy.env
WorkingDirectory=${SCRIPT_DIR}/proxy
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3
User=www-data

[Install]
WantedBy=multi-user.target
EOF

echo "==> systemd: caddy"
# Rewrite Caddyfile with the real IP.
sed "s/203\\.0\\.113\\.10/${VM_IP}/g" "${SCRIPT_DIR}/Caddyfile" > /etc/caddy/Caddyfile
systemctl reload-or-restart caddy 2>/dev/null || true

echo "==> Fix permissions for www-data on proxy dir"
chown -R www-data:www-data "${SCRIPT_DIR}/proxy" 2>/dev/null || true

echo "==> Enable & start services"
systemctl daemon-reload
systemctl enable --now ollama
systemctl enable --now portfolio-bot-proxy
systemctl enable --now caddy

echo "==> Firewall (ufw)"
ufw allow 22/tcp || true
ufw allow 80/tcp || true
ufw allow 443/tcp || true
# ufw --force enable

echo "==> Done."
echo "Backend URL: https://${VM_IP}.nip.io"
echo "Health check: curl https://${VM_IP}.nip.io/health"
echo "Set VITE_OLLAMA_URL=https://${VM_IP}.nip.io in your frontend build."
