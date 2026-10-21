import React, { useState, useEffect, useMemo } from 'react';
import { generateTypingScript, TypoConfig } from '../utils/typewriter';

interface TypewriterTextProps {
  text: string;
  baseSpeed?: number;
  className?: string;
  enableRealisticTyping?: boolean;
  typos?: TypoConfig[];
  prompt?: React.ReactNode;
}

interface WordToken {
  word: string;
  startIndex: number;
  endIndex: number;
}

const DEFAULT_TYPOS: TypoConfig[] = [
  {
    triggerPrefix: 'Full-stack software eng',
    typoChars: 'ie',
    hesitationMs: 220,
    recoveryMs: 100,
  },
  {
    triggerPrefix: 'benchmarking system thr',
    typoChars: 'u',
    hesitationMs: 240,
    recoveryMs: 90,
  },
];

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  baseSpeed = 24,
  className = '',
  enableRealisticTyping = true,
  typos = DEFAULT_TYPOS,
  prompt,
}) => {
  const [displayedText, setDisplayedText] = useState('');

  // Break text into word tokens with cumulative index ranges
  const tokens: WordToken[] = useMemo(() => {
    const words = text.split(' ');
    const list: WordToken[] = [];
    let charOffset = 0;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      list.push({
        word,
        startIndex: charOffset,
        endIndex: charOffset + word.length,
      });
      charOffset += word.length + 1; // +1 for the delimiter space
    }

    return list;
  }, [text]);

  // Pre-calculate natural typing script
  const script = useMemo(() => {
    return generateTypingScript(
      text,
      baseSpeed,
      enableRealisticTyping ? typos : []
    );
  }, [text, baseSpeed, enableRealisticTyping, typos]);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number | undefined;
    let step = 0;
    let currentBuffer = '';

    setDisplayedText('');

    const executeNextAction = () => {
      if (!isMounted) return;

      if (step >= script.length) {
        setDisplayedText(text);
        return;
      }

      const action = script[step];
      step++;

      let nextDelay = baseSpeed;

      if (action.type === 'type') {
        currentBuffer += action.char;
        setDisplayedText(currentBuffer);
        nextDelay = action.delay ?? baseSpeed;
      } else if (action.type === 'backspace') {
        currentBuffer = currentBuffer.slice(0, -1);
        setDisplayedText(currentBuffer);
        nextDelay = action.delay ?? 65;
      } else if (action.type === 'pause') {
        nextDelay = action.duration;
      }

      timeoutId = window.setTimeout(executeNextAction, nextDelay);
    };

    // Initial slight pause before typing starts
    timeoutId = window.setTimeout(executeNextAction, 180);

    return () => {
      isMounted = false;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [script, text, baseSpeed]);

  const currentLength = displayedText.length;
  const isFinished = currentLength >= text.length;

  return (
    <div className={`font-mono text-sm md:text-base leading-relaxed ${className}`}>
      {/* Terminal Prompt */}
      {prompt && (
        <span className="inline-block whitespace-nowrap mr-2 select-none">
          {prompt}
        </span>
      )}

      {/* Word-by-word tokenized text stream */}
      {tokens.map((token, idx) => {
        const isPast = currentLength >= token.endIndex;
        const isFuture = currentLength < token.startIndex;

        // 1. Fully typed word
        if (isPast) {
          return (
            <React.Fragment key={idx}>
              <span className="inline-block whitespace-nowrap text-slate-300">
                {token.word}
              </span>
              {idx < tokens.length - 1 && <span> </span>}
            </React.Fragment>
          );
        }

        // 2. Future word: rendered with invisible text to pre-establish line wrap layout
        if (isFuture) {
          return (
            <React.Fragment key={idx}>
              <span className="inline-block whitespace-nowrap">
                <span className="invisible select-none pointer-events-none">
                  {token.word}
                </span>
              </span>
              {idx < tokens.length - 1 && <span className="invisible select-none"> </span>}
            </React.Fragment>
          );
        }

        // 3. Active word currently being typed:
        // Positioned on its true line in advance so characters never disappear or jump
        const typedPart = displayedText.slice(token.startIndex);
        const untypedPart = token.word.slice(Math.min(token.word.length, typedPart.length));

        return (
          <React.Fragment key={idx}>
            <span className="inline-block whitespace-nowrap">
              <span className="text-slate-300">{typedPart}</span>
              <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
              <span className="invisible select-none pointer-events-none">
                {untypedPart}
              </span>
            </span>
            {idx < tokens.length - 1 && <span className="invisible select-none"> </span>}
          </React.Fragment>
        );
      })}

      {/* Blinking cursor when animation completes */}
      {isFinished && (
        <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-1 align-middle" />
      )}
    </div>
  );
};
