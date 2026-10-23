// Lightweight client for an Ollama-compatible chat endpoint.
// The endpoint is provided via VITE_OLLAMA_URL (e.g. https://1-2-3-4.nip.io).
// In dev it defaults to the local Ollama instance.

export type ChatRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export const OLLAMA_URL: string =
  (import.meta.env.VITE_OLLAMA_URL as string | undefined)?.replace(/\/$/, '') ||
  'http://localhost:11434';

export const OLLAMA_MODEL = 'portfolio-bot';

export const MAX_CONTEXT_MESSAGES = 20;

export interface HealthResult {
  ok: boolean;
  checkedAt: number;
}

export async function checkHealth(signal?: AbortSignal): Promise<HealthResult> {
  const checkedAt = Date.now();
  try {
    const res = await fetch(`${OLLAMA_URL}/health`, {
      method: 'GET',
      signal,
      cache: 'no-store',
    });
    if (!res.ok) return { ok: false, checkedAt };
    return { ok: true, checkedAt };
  } catch {
    // Fall back: try the Ollama native tags endpoint (useful for direct dev access).
    try {
      const res = await fetch(`${OLLAMA_URL}/api/tags`, {
        method: 'GET',
        signal,
        cache: 'no-store',
      });
      return { ok: res.ok, checkedAt };
    } catch {
      return { ok: false, checkedAt };
    }
  }
}

export interface StreamChatOptions {
  messages: ChatMessage[];
  signal?: AbortSignal;
  onToken: (token: string) => void;
  onDone?: () => void;
  onError?: (err: Error) => void;
}

// Streams an assistant reply from Ollama's /api/chat endpoint (NDJSON).
export async function streamChat({
  messages,
  signal,
  onToken,
  onDone,
  onError,
}: StreamChatOptions): Promise<void> {
  const trimmed = messages.slice(-MAX_CONTEXT_MESSAGES);
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: trimmed,
        stream: true,
      }),
      signal,
    });

    if (!res.ok || !res.body) {
      throw new Error(`Request failed (${res.status})`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;
        try {
          const json = JSON.parse(trimmedLine) as {
            message?: { content?: string };
            done?: boolean;
            error?: string;
          };
          if (json.error) throw new Error(json.error);
          if (json.message?.content) onToken(json.message.content);
          if (json.done) {
            onDone?.();
            return;
          }
        } catch (parseErr) {
          // Skip malformed chunks; continue streaming.
          if (parseErr instanceof SyntaxError) continue;
          throw parseErr;
        }
      }
    }
    onDone?.();
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') return;
    onError?.(err instanceof Error ? err : new Error(String(err)));
  }
}