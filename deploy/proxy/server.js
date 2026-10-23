// Small reverse proxy in front of Ollama.
// - CORS locked to the portfolio origin
// - Per-IP rate limiting
// - Streams Ollama responses (NDJSON) through unchanged
// - Exposes GET /health for the frontend reachability probe

import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const PORT = process.env.PORT || 3000;
const OLLAMA_URL = (process.env.OLLAMA_URL || 'http://127.0.0.1:11434').replace(/\/$/, '');
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://nick040791.github.io';
const MODEL = process.env.MODEL || 'portfolio-bot';

const app = express();
app.set('trust proxy', 1); // behind Caddy / cloudflared

app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin / no-origin (curl) and the configured portfolio origin.
    if (!origin || origin === ALLOWED_ORIGIN || /^http:\/\/localhost(:\d+)?$/.test(origin)) {
      return cb(null, true);
    }
    return cb(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json({ limit: '64kb' }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});
app.use(limiter);

app.get('/health', async (_req, res) => {
  try {
    const r = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(5000) });
    if (!r.ok) throw new Error('ollama not ready');
    const data = await r.json().catch(() => ({}));
    const models = Array.isArray(data.models) ? data.models.map((m) => m.name) : [];
    res.json({ ok: true, model: MODEL, available: models.includes(MODEL) });
  } catch (err) {
    res.status(503).json({ ok: false, error: String(err?.message || err) });
  }
});

app.post('/api/chat', async (req, res) => {
  const { messages, model, stream } = req.body || {};
  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages must be an array' });
  }
  // Force the configured model; ignore client-supplied model to avoid abuse.
  const payload = {
    model: MODEL,
    messages,
    stream: stream !== false,
  };

  let upstream;
  try {
    upstream = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    return res.status(502).json({ error: 'upstream unreachable', detail: String(err?.message || err) });
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => '');
    return res.status(upstream.status || 502).json({ error: 'upstream error', detail: text });
  }

  res.status(upstream.status);
  res.setHeader('Content-Type', upstream.headers.get('content-type') || 'application/x-ndjson');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');

  const reader = upstream.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } catch (err) {
    console.error('stream error:', err);
    try { res.end(); } catch {}
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`portfolio-bot proxy listening on :${PORT} -> ${OLLAMA_URL} (model=${MODEL}, origin=${ALLOWED_ORIGIN})`);
});
