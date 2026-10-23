import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bot, Send, X, Loader2, WifiOff } from 'lucide-react';
import {
  ChatMessage,
  checkHealth,
  streamChat,
} from '../utils/chat';

interface ChatBotProps {
  avatarSrc?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ avatarSrc }) => {
  const [reachable, setReachable] = useState<boolean | null>(null);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const avatarButtonRef = useRef<HTMLButtonElement>(null);

  // Reachability probe.
  const probe = useCallback(async () => {
    const result = await checkHealth();
    setReachable(result.ok);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      if (cancelled) return;
      await probe();
    };
    run();
    const interval = window.setInterval(run, 30000);
    const onFocus = () => run();
    window.addEventListener('focus', onFocus);
    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener('focus', onFocus);
    };
  }, [probe]);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        avatarButtonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          avatarButtonRef.current && !avatarButtonRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  // Auto-scroll to bottom on new content.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streaming]);

  // Focus input when opened.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const userMsg: ChatMessage = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setError(null);
    setStreaming(true);

    // Placeholder assistant message we'll stream into.
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

    const controller = new AbortController();
    abortRef.current = controller;

    await streamChat({
      messages: nextMessages,
      signal: controller.signal,
      onToken: (token) => {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last.role === 'assistant') {
            copy[copy.length - 1] = { ...last, content: last.content + token };
          }
          return copy;
        });
      },
      onDone: () => {
        setStreaming(false);
        abortRef.current = null;
      },
      onError: (err) => {
        setStreaming(false);
        abortRef.current = null;
        // Remove empty placeholder if nothing was streamed.
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === 'assistant' && last.content === '') {
            return prev.slice(0, -1);
          }
          return prev;
        });
        setError(err.message || 'Something went wrong.');
        // Re-probe; maybe endpoint dropped.
        probe();
      },
    });
  }, [input, messages, streaming, probe]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const stop = () => {
    abortRef.current?.abort();
  };

  const clear = () => {
    setMessages([]);
    setError(null);
  };

  // Don't render anything until we know reachability; render nothing if unreachable.
  if (reachable === null) return null;
  if (!reachable && !open) return null;

  return (
    <>
      {/* Avatar launcher */}
      <button
        ref={avatarButtonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat' : 'Open chat with Nicholas'}
        aria-expanded={open}
        className="fixed bottom-6 right-6 z-[60] group"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0a0f1a] border border-cyan-400/40 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_28px_rgba(34,211,238,0.55)] transition-shadow overflow-hidden">
          {avatarSrc ? (
            <img src={avatarSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="flex flex-col items-center justify-center text-cyan-300 font-mono">
              <Bot className="w-6 h-6" />
              <span className="text-[9px] tracking-widest mt-0.5">NB</span>
            </span>
          )}
          {reachable && (
            <span className="absolute bottom-1 right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0a0f1a]" />
          )}
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Chat with Nicholas"
          className="fixed bottom-24 right-6 z-[60] w-[min(92vw,380px)] h-[min(70vh,520px)] flex flex-col glass-panel rounded-2xl border border-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.25)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-400/20 bg-black/30">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5 text-cyan-400" />
              <div className="leading-tight">
                <p className="font-mono text-sm text-cyan-300 neon-text-cyan">portfolio-bot</p>
                <p className="font-mono text-[10px] text-slate-400">
                  {reachable ? 'online · gemini' : 'offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={clear}
                className="text-[10px] font-mono text-slate-400 hover:text-cyan-300 px-2 py-1 rounded"
                aria-label="Clear conversation"
              >
                clear
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-400 hover:text-cyan-300 p-1 rounded"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 font-mono text-sm">
            {messages.length === 0 && (
              <div className="text-slate-400 text-xs">
                Ask me about Nicholas — skills, experience, projects, or how to reach him.
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 whitespace-pre-wrap break-words ${
                    m.role === 'user'
                      ? 'bg-cyan-500/15 border border-cyan-400/30 text-cyan-100'
                      : 'bg-white/5 border border-white/10 text-slate-200'
                  }`}
                >
                  {m.content || (streaming && i === messages.length - 1 ? (
                    <span className="inline-flex items-center text-slate-400">
                      <Loader2 className="w-3 h-3 animate-spin mr-1" /> thinking…
                    </span>
                  ) : null)}
                </div>
              </div>
            ))}
            {error && (
              <div className="flex items-start space-x-2 text-xs text-rose-300 bg-rose-500/10 border border-rose-400/30 rounded-lg px-3 py-2">
                <WifiOff className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-cyan-400/20 p-3 bg-black/30">
            {!reachable && (
              <p className="text-[10px] font-mono text-rose-300 mb-2">
                endpoint unreachable — retrying…
              </p>
            )}
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                disabled={!reachable || streaming}
                placeholder={reachable ? 'Ask about Nicholas…' : 'offline'}
                className="flex-1 bg-black/40 border border-cyan-400/20 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400/60 disabled:opacity-50"
                aria-label="Message input"
              />
              {streaming ? (
                <button
                  type="button"
                  onClick={stop}
                  className="px-3 py-2 rounded-lg border border-rose-400/30 text-rose-300 hover:bg-rose-500/10 text-xs font-mono"
                  aria-label="Stop generating"
                >
                  stop
                </button>
              ) : (
                <button
                  type="button"
                  onClick={send}
                  disabled={!reachable || !input.trim()}
                  className="px-3 py-2 rounded-lg border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="mt-1.5 text-[9px] font-mono text-slate-500">
              model: gemini · not affiliated with any AI vendor
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;