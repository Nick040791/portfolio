import { AccentColor } from '../types/portfolio';

export interface ColorScheme {
  text: string;
  textLight: string;
  textMuted: string;
  border: string;
  borderLight: string;
  borderSubtle: string;
  borderHover: string;
  bgSubtle: string;
  bgSoft: string;
  gradientFrom: string;
  hoverText: string;
  glowShadow: string;
  activeTabStyle: string;
  nodeBorder: string;
}

export const COLOR_SCHEMES: Record<AccentColor, ColorScheme> = {
  cyan: {
    text: 'text-cyan-400',
    textLight: 'text-cyan-300',
    textMuted: 'text-cyan-500/50',
    border: 'border-cyan-500',
    borderLight: 'border-cyan-400',
    borderSubtle: 'border-cyan-500/20',
    borderHover: 'hover:border-cyan-400',
    bgSubtle: 'bg-cyan-500/10',
    bgSoft: 'bg-cyan-500/20',
    gradientFrom: 'from-cyan-500',
    hoverText: 'group-hover:text-cyan-400',
    glowShadow: 'shadow-[0_0_15px_rgba(34,211,238,0.3)]',
    activeTabStyle: 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]',
    nodeBorder: 'border-cyan-500 shadow-[0_0_10px_#22d3ee] text-cyan-400',
  },
  magenta: {
    text: 'text-fuchsia-400',
    textLight: 'text-fuchsia-300',
    textMuted: 'text-fuchsia-500/50',
    border: 'border-fuchsia-500',
    borderLight: 'border-fuchsia-400',
    borderSubtle: 'border-fuchsia-500/20',
    borderHover: 'hover:border-fuchsia-400',
    bgSubtle: 'bg-fuchsia-500/10',
    bgSoft: 'bg-fuchsia-500/20',
    gradientFrom: 'from-fuchsia-500',
    hoverText: 'group-hover:text-fuchsia-400',
    glowShadow: 'shadow-[0_0_15px_rgba(217,70,239,0.3)]',
    activeTabStyle: 'bg-fuchsia-500/10 border-fuchsia-400 shadow-[0_0_20px_rgba(217,70,239,0.2)]',
    nodeBorder: 'border-fuchsia-500 shadow-[0_0_10px_#d946ef] text-fuchsia-400',
  },
  lime: {
    text: 'text-lime-400',
    textLight: 'text-lime-300',
    textMuted: 'text-lime-500/50',
    border: 'border-lime-500',
    borderLight: 'border-lime-400',
    borderSubtle: 'border-lime-500/20',
    borderHover: 'hover:border-lime-400',
    bgSubtle: 'bg-lime-500/10',
    bgSoft: 'bg-lime-500/20',
    gradientFrom: 'from-lime-500',
    hoverText: 'group-hover:text-lime-400',
    glowShadow: 'shadow-[0_0_15px_rgba(163,230,53,0.3)]',
    activeTabStyle: 'bg-lime-500/10 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.2)]',
    nodeBorder: 'border-lime-500 shadow-[0_0_10px_#a3e635] text-lime-400',
  },
};

/**
 * Returns class names and tokens for a given accent color.
 */
export function getColorScheme(color: AccentColor): ColorScheme {
  return COLOR_SCHEMES[color] ?? COLOR_SCHEMES.cyan;
}

/**
 * Returns custom glow style for dynamic ambient lighting
 */
export function getAmbientGlowStyle(color: AccentColor): React.CSSProperties {
  const colorMap: Record<AccentColor, string> = {
    cyan: 'rgba(34, 211, 238, 0.05)',
    magenta: 'rgba(217, 70, 239, 0.05)',
    lime: 'rgba(163, 230, 53, 0.05)',
  };

  return {
    backgroundColor: colorMap[color] || colorMap.cyan,
  };
}
