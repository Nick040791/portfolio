export type TypewriterAction =
  | { type: 'type'; char: string; delay?: number }
  | { type: 'backspace'; delay?: number }
  | { type: 'pause'; duration: number };

export interface TypoConfig {
  /** The substring trigger after which the typo is introduced */
  triggerPrefix: string;
  /** What is erroneously typed */
  typoChars: string;
  /** Pause duration in ms before realizing and correcting the typo */
  hesitationMs?: number;
  /** Pause duration in ms after finishing correction before continuing */
  recoveryMs?: number;
}

/**
 * Pre-computes a natural typing action script including realistic typos,
 * hesitation pauses, backspaces, and punctuation cadences.
 */
export function generateTypingScript(
  text: string,
  baseSpeed = 35,
  typos: TypoConfig[] = []
): TypewriterAction[] {
  const actions: TypewriterAction[] = [];
  let index = 0;
  const pendingTypos = [...typos];

  while (index < text.length) {
    const currentPrefix = text.slice(0, index);

    // Check if any configured typo should trigger at this point
    const matchingTypoIndex = pendingTypos.findIndex(
      (t) => currentPrefix.endsWith(t.triggerPrefix)
    );

    if (matchingTypoIndex !== -1) {
      const typo = pendingTypos[matchingTypoIndex];
      pendingTypos.splice(matchingTypoIndex, 1);

      // 1. Type erroneous characters
      for (const char of typo.typoChars) {
        actions.push({
          type: 'type',
          char,
          delay: baseSpeed + Math.floor(Math.random() * 15),
        });
      }

      // 2. Hesitate (realization of typo)
      actions.push({
        type: 'pause',
        duration: typo.hesitationMs ?? 240,
      });

      // 3. Backspace the mistake
      for (let b = 0; b < typo.typoChars.length; b++) {
        actions.push({
          type: 'backspace',
          delay: 65,
        });
      }

      // 4. Brief pause before typing correct character
      actions.push({
        type: 'pause',
        duration: typo.recoveryMs ?? 100,
      });
    }

    // Normal typing for current character
    const char = text[index];
    let delay = baseSpeed + (index % 3 === 0 ? 8 : -4);

    // Natural pauses on punctuation
    if (char === '.' || char === '!' || char === '?') {
      delay = 260;
    } else if (char === ',' || char === ';' || char === ':') {
      delay = 160;
    } else if (char === ' ') {
      delay = baseSpeed + 12;
    }

    actions.push({
      type: 'type',
      char,
      delay: Math.max(15, delay),
    });

    index++;
  }

  return actions;
}
