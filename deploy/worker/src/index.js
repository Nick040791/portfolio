// Cloudflare Worker proxy for the portfolio chatbot.
// - Holds GEMINI_API_KEY as a secret (set via `wrangler secret put`).
// - Injects Nicholas's portfolio system prompt.
// - Streams Gemini responses back as Ollama-style NDJSON so the frontend is unchanged.
// - Rate-limits per IP and locks CORS to the portfolio origin.

const SYSTEM_PROMPT = `You are the portfolio chatbot for Nicholas Beighley. You know only these facts:
1. I am a full-stack software engineer with a background in IT root-cause analysis.
2. I build production applications in Java, Spring Boot, React, JavaScript, TypeScript, Node.js, Python, and SQL.
3. I am a Launch Code Full-Stack alumnus and certified Agentic Engineer through Hire-Human.
4. I hold Google certifications in AI, Data Analytics, and Business Intelligence.
5. My goal is to write robust, maintainable code that solves operational problems.
6. I design reliable systems by automating REST API testing and CI/CD pipelines. I apply multi-agent orchestration, the Model Context Protocol, and prompt engineering to increase edge-case coverage and accelerate development.
7. I currently volunteer at Launch Code as an interviewer, grading mock interviews and giving feedback.
8. I've volunteered as web developer for a non-profit called Project Happiness.
9. I reside in Independence, Missouri and am authorized to work in the US without a visa.
10. Job experience:
    - Volunteer Teaching Assistant | Launch Code -- 08/2026 to present
    - Freelance Software Engineer | KC Optimal Computing LLC -- 08/2025 to present
    - IT Supervisor | Opes Companies -- 03/2020 to 10/2026
    - Operations Manager | Tailored Brands -- 09/2010 to 03/2020
11. Technologies and Tools: Java, Spring Boot, JavaScript, TypeScript, Python, SQL, React | Tools: Git, Docker, Jmeter, MySQL, PostgreSQL, GitHub Copilot, Claude.
12. Experience level: 2 years.
13. Certifications:
    - LaunchCode: Full-Stack Software Development (2026), Agentic Engineering (2026)
    - MDHEWD Coursera: Google AI (2026), Google Data Analytics (2026), Google Business Intelligence (2026)
    - freeCodeCamp: Web Design (2024), Python (2024), JavaScript (2025), C# with Microsoft (2026)
14. I am open to various types of roles to build upon my limited professional experience, including in-office, hybrid, or remote software engineering, freelance, or contract work in the surrounding Kansas City, MO metro area.
15. Key Strengths:
    - Strong analytical and problem-solving skills from IT experience.
    - Quick learner with a proven ability to pick up new technologies.
    - Dedicated and reliable with a strong work ethic.
    - Passionate about software engineering and committed to continuous improvement.
16. Actively networking for opportunities in software engineering, freelance, or contract work in the surrounding Kansas City, MO metro area.
17. What I'm doing to keep building:
    - Working on a fitness app with a senior software engineer.
    - Shipping open source projects.
    - Freelance contract work through KC Optimal Computing LLC.
    - Volunteering as a Teaching Assistant at Launch Code.
    - Constantly pursuing more certificates
    - Planning to attend a University in the Fall of 2027.
18. How you can reach me:
    - Email: Nick040791@gmail.com
    - Linkedin:  https://www.linkedin.com/in/nicholas-beighley-00a45a322
Rules:
- Do not answer off topic question or act as an assistant AI. If you are asked a question that is not related to the facts provided, say: "I'm not sure. I'll have to check with Nicholas."
- Speak in the first person as Nicholas.
- Do not make up facts.
- If you do not know the answer or if the question asks for information not in these facts, say: "I'm not sure. I'll have to check with Nicholas."`;

const RATE_LIMIT = 30; // requests per minute per IP
const rateBuckets = new Map();

function rateLimitOk(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.reset) {
    rateBuckets.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count++;
  return true;
}

function corsHeaders(origin, allowed) {
  const headers = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
  if (origin && (origin === allowed || /^http:\/\/localhost(:\d+)?$/.test(origin))) {
    headers['Access-Control-Allow-Origin'] = origin;
  }
  return headers;
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin');
    const allowed = env.ALLOWED_ORIGIN || '*';
    const cors = corsHeaders(origin, allowed);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (url.pathname === '/models' && request.method === 'GET') {
      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'missing key' }), {
          status: 500, headers: { 'Content-Type': 'application/json', ...cors },
        });
      }
      try {
        const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(apiKey)}`);
        const data = await r.json();
        return new Response(JSON.stringify(data), {
          status: r.status, headers: { 'Content-Type': 'application/json', ...cors },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err?.message || err) }), {
          status: 502, headers: { 'Content-Type': 'application/json', ...cors },
        });
      }
    }

    if (url.pathname === '/health' && request.method === 'GET') {
      return new Response(JSON.stringify({ ok: true, model: env.MODEL || 'gemini' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...cors },
      });
    }

    if (url.pathname === '/api/chat' && request.method === 'POST') {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      if (!rateLimitOk(ip)) {
        return new Response(JSON.stringify({ error: 'Too many requests, please slow down.' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', ...cors },
        });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...cors },
        });
      }

      const messages = Array.isArray(body?.messages) ? body.messages : [];
      const apiKey = env.GEMINI_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Server misconfigured: missing API key' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...cors },
        });
      }

      const model = env.MODEL || 'gemini-3.5-flash-lite';
      const geminiContents = messages
        .filter((m) => m && m.role !== 'system')
        .map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.content ?? '') }],
        }));

      const geminiBody = {
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: geminiContents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 256,
        },
      };

      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

      let upstream;
      try {
        upstream = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(geminiBody),
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: 'Upstream unreachable', detail: String(err?.message || err) }), {
          status: 502,
          headers: { 'Content-Type': 'application/json', ...cors },
        });
      }

      if (!upstream.ok || !upstream.body) {
        const text = await upstream.text().catch(() => '');
        return new Response(JSON.stringify({ error: 'Upstream error', detail: text }), {
          status: upstream.status || 502,
          headers: { 'Content-Type': 'application/json', ...cors },
        });
      }

      const { readable, writable } = new TransformStream();
      const writer = writable.getWriter();
      const encoder = new TextEncoder();

      (async () => {
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() ?? '';
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith('data:')) continue;
              const data = trimmed.slice(5).trim();
              if (!data || data === '[DONE]') continue;
              try {
                const json = JSON.parse(data);
                const parts = json?.candidates?.[0]?.content?.parts;
                if (Array.isArray(parts)) {
                  for (const p of parts) {
                    if (p?.text) {
                      await writer.write(encoder.encode(JSON.stringify({ message: { content: p.text }, done: false }) + '\n'));
                    }
                  }
                }
              } catch {
                // ignore malformed chunks
              }
            }
          }
          await writer.write(encoder.encode(JSON.stringify({ done: true }) + '\n'));
        } catch (err) {
          await writer.write(encoder.encode(JSON.stringify({ error: String(err?.message || err), done: true }) + '\n'));
        } finally {
          try { await writer.close(); } catch {}
        }
      })();

      return new Response(readable, {
        status: 200,
        headers: {
          'Content-Type': 'application/x-ndjson',
          'Cache-Control': 'no-cache',
          'X-Accel-Buffering': 'no',
          ...cors,
        },
      });
    }

    return new Response('Not found', { status: 404, headers: cors });
  },
};
