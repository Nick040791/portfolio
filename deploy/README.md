# portfolio-bot backend

Two hosting options are documented. **Option A (Hugging Face Spaces)** needs no credit card and is recommended given your constraints.

## Option A — Hugging Face Spaces (free, no card) [RECOMMENDED]

HF Spaces free CPU tier (2 vCPU / 16GB RAM) can run Ollama + the portfolio-bot model. Spaces sleep after prolonged inactivity and wake on the next request (cold start ~1-3 min).

### Create the Space
1. Create a new Space at https://huggingface.co/new-space
   - SDK: **Docker**
   - Hardware: **CPU basic (free)**
   - Visibility: Public (so the frontend can reach it) or Private (then you must use a token — not supported by this frontend; keep Public).
2. Clone the Space repo locally.
3. Copy the **contents of this `deploy/` folder** into the Space repo root (so `Dockerfile`, `Modelfile`, `entrypoint.sh`, `proxy/`, etc. sit at the repo root).
4. Copy `deploy/hf-space-README.md` to the Space repo root as `README.md` (it carries the Spaces metadata front matter).
5. Commit & push. HF builds the image (pulls `gemma4:e2b` and bakes the model) — first build takes a while.

### URL
Your Space runtime URL will be:
```
https://<your-hf-username>-<space-name>.hf.space
```

### Point the frontend at it
Set the repo secret / build env:
```
VITE_OLLAMA_URL=https://<your-hf-username>-<space-name>.hf.space
```
Then rebuild/redeploy (push to main or run the workflow).

### Verify
```bash
curl https://<your-hf-username>-<space-name>.hf.space/health
# => {"ok":true,"model":"portfolio-bot","available":true}
```

### Caveats
- Free CPU inference is slow (a few tokens/sec). Streaming keeps the UX acceptable.
- Cold starts after sleep: the container restarts and loads the model (~1-3 min). The frontend hides the avatar until `/health` succeeds, then re-probes every 30s.
- Free Spaces have a monthly compute quota; very heavy traffic may be throttled. Fine for a portfolio.
- The endpoint is public and unauthenticated (rate-limited to 30 req/min per IP by the proxy).

## Option B — Oracle Cloud Always Free (requires a credit card on file)

See `deploy/setup.sh` and the previous Oracle instructions. Requires a card on file (not charged within free tier). Use this if you later get a card and want an always-on VM instead of HF's sleep behavior.

## Local dev
Run Ollama locally (`ollama serve`) with the model created from `deploy/Modelfile`, then:
```bash
npm run dev
```
The frontend defaults to `http://localhost:11434`, so the widget appears when local Ollama is running.
