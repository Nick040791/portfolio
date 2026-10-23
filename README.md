# Nicholas Beighley Portfolio

A responsive, high-performance developer portfolio built with React 18, TypeScript, Tailwind CSS, and Vite, featuring a futuristic cyberpunk aesthetic with CRT scanlines, neon glows, interactive terminal views, and animated system telemetry.

## Project Structure

```
portfolio/
├── index.html                   # HTML template & page metadata
├── package.json                 # Project dependencies and npm scripts
├── tsconfig.json                # TypeScript root configuration
├── tsconfig.node.json           # TypeScript configuration for Vite/Node
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind configuration (custom colors & safelist)
├── postcss.config.js            # PostCSS configuration
├── src/
│   ├── main.tsx                 # Application entry point
│   ├── App.tsx                  # Root layout component
│   ├── index.css                # Global styles, glass-panels, scanline & scrollbars
│   ├── types/
│   │   └── portfolio.ts         # TypeScript models and interfaces
│   ├── data/
│   │   └── portfolioData.tsx    # Content data (bio, timeline, projects, credentials)
│   ├── utils/
│   │   ├── cn.ts                # Class name concatenation utility
│   │   ├── theme.ts             # Cyberpunk color scheme mapping & glow helpers
│   │   ├── formatters.ts        # SQL string formatter, terminal prompt builder
│   │   └── index.ts             # Utilities barrel export
│   └── components/
│       ├── Navbar.tsx           # Fixed glassmorphic navigation header
│       ├── Hero.tsx             # Hero section with interactive terminal & badge links
│       ├── TypewriterText.tsx   # Simulated terminal typewriter effect
│       ├── Journey.tsx          # Scroll-driven career path with revealed milestone cards
│       ├── Projects.tsx         # Featured project module container
│       ├── ProjectCard.tsx      # Cyberpunk project card with tech stack tags
│       ├── Credentials.tsx      # Interactive Data Core certificate sector browser
│       ├── Footer.tsx           # Terminal-styled footer
│       ├── Scanline.tsx         # Subtle CRT scanline animation overlay
│       ├── Icons.tsx            # Custom SVG icons (GitHub, LinkedIn)
│       └── index.ts             # Components barrel export
```

## Available Scripts

- **`npm run dev`**: Starts the local Vite development server with Hot Module Replacement (HMR) at `http://localhost:3000`.
- **`npm run build`**: Runs TypeScript type-checking and builds production-ready optimized assets into `/dist`.
- **`npm run preview`**: Locally serves the production build from `/dist`.

## Chatbot (portfolio-bot)

The floating chat widget talks to an Ollama-compatible backend serving the `portfolio-bot` model.

- Frontend config: set `VITE_OLLAMA_URL` (see `.env.example`). Defaults to `http://localhost:11434` for local dev.
- The widget only renders when the backend's `/health` endpoint is reachable; it re-probes every 30s.
- Backend setup (free, no card): Cloudflare Worker — see `deploy/README.md` and `deploy/worker/`.
