# portfolio-bot backend (Oracle Cloud free tier)

Hosts the `portfolio-bot` Ollama model behind a rate-limited proxy with auto-HTTPS via nip.io.

## Prerequisites
- An Oracle Cloud Always Free ARM instance (Ubuntu 22.04/24.04), public IP assigned.
- Security list / firewall allowing 22, 80, 443.
- A credit card on file (free tier, not charged if you stay within limits).

## Deploy
```bash
# on the VM
git clone https://github.com/Nick040791/portfolio.git
cd portfolio/deploy
sudo VM_IP=203.0.113.10 ALLOWED_ORIGIN=https://nick040791.github.io bash setup.sh
```

## Verify
```bash
curl https://203.0.113.10.nip.io/health
# => {"ok":true,"model":"portfolio-bot","available":true}
```

## Point the frontend at it
Set the GitHub Actions secret / build env:
```
VITE_OLLAMA_URL=https://203.0.113.10.nip.io
```
The deploy workflow passes `GITHUB_PAGES=true`; add `VITE_OLLAMA_URL` to the `Build site` step env as well, then rebuild.

## Notes
- Ollama binds to 127.0.0.1:11434; only the proxy is public.
- Rate limit: 30 req/min per IP (tune in `proxy/server.js`).
- First request after idle may be slow while the model loads into memory.
- To update the model: edit `Modelfile`, then `ollama create portfolio-bot -f Modelfile` and restart nothing (Ollama picks it up).
