---
title: portfolio-bot
emoji: 🤖
colorFrom: cyan
colorTo: green
sdk: docker
app_port: 7860
pinned: false
---

# portfolio-bot

Ollama backend serving the `portfolio-bot` model for the Nicholas Beighley portfolio chat widget.

Exposed endpoints:
- `GET /health` — reachability probe used by the frontend.
- `POST /api/chat` — streaming chat (Ollama NDJSON).

Model: `gemma4:e2b` + Nicholas's portfolio system prompt.
