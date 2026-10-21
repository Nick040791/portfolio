/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        magenta: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
      },
      animation: {
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '-100px' },
          '100%': { top: '100%' },
        },
      },
    },
  },
  safelist: [
    // Borders
    'border-cyan-500', 'border-magenta-500', 'border-lime-500',
    'border-cyan-400', 'border-magenta-400', 'border-lime-400',
    'border-cyan-500/20', 'border-magenta-500/20', 'border-lime-500/20',
    'border-cyan-500/30', 'border-magenta-500/30', 'border-lime-500/30',
    'border-t-cyan-500/30', 'border-t-magenta-500/30', 'border-t-lime-500/30',
    'hover:border-cyan-400', 'hover:border-magenta-400', 'hover:border-lime-400',
    // Text
    'text-cyan-400', 'text-magenta-400', 'text-lime-400',
    'text-cyan-500', 'text-magenta-500', 'text-lime-500',
    'text-cyan-400/80', 'text-magenta-400/80', 'text-lime-400/80',
    'text-cyan-500/50', 'text-magenta-500/50', 'text-lime-500/50',
    'group-hover:text-cyan-400', 'group-hover:text-magenta-400', 'group-hover:text-lime-400',
    // Backgrounds
    'bg-cyan-500/10', 'bg-magenta-500/10', 'bg-lime-500/10',
    'bg-cyan-500/20', 'bg-magenta-500/20', 'bg-lime-500/20',
    'bg-cyan-500/5', 'bg-magenta-500/5', 'bg-lime-500/5',
    'from-cyan-500', 'from-magenta-500', 'from-lime-500',
  ],
  plugins: [],
};
