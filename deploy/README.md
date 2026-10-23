# portfolio-bot backend (Cloudflare Worker, free, no card)

The chat widget now talks to a Cloudflare Worker that proxies Google Gemini (free tier) and injects Nicholas's portfolio system prompt. No Docker, no VM, no credit card.

## Prerequisites
- A free Cloudflare account (no card required).
- A free Google AI Studio API key (no card): https://aistudio.google.com/apikey

## Deploy the Worker
```bash
cd deploy/worker
npm install
npx wrangler login          # opens browser, free account
npx wrangler secret put GEMINI_API_KEY   # paste your Google AI Studio key
npx wrangler deploy
```
The deploy prints your Worker URL, e.g. `https://portfolio-bot-worker.<your-subdomain>.workers.dev`.

## Point the frontend at it
Set the repo secret / build env:
```
VITE_OLLAMA_URL=https://portfolio-bot-worker.<your-subdomain>.workers.dev
```
Then rebuild/redeploy (push to main or run the workflow).

## Verify
```bash
curl https://portfolio-bot-worker.<your-subdomain>.workers.dev/health
# => {"ok":true,"model":"gemini-2.0-flash"}
```

## Local dev
Run a local Worker:
```bash
cd deploy/worker
echo "GEMINI_API_KEY=your-key" > .dev.vars
npx wrangler dev
```
Then set `VITE_OLLAMA_URL=http://localhost:8787` and `npm run dev`.

Alternatively, to use local Ollama instead, create the model from `deploy/Modelfile` (`ollama create portfolio-bot -f deploy/Modelfile`) and leave `VITE_OLLAMA_URL` unset.

## Limits
- Free Workers: 100k requests/day.
- Gemini free tier: rate-limited by Google (per-minute/per-day quotas).
- In-memory rate limit: 30 req/min per IP (best-effort, per isolate).
- The frontend still expects Ollama-style NDJSON; the Worker translates Gemini's SSE into that format, so no frontend changes are needed.
