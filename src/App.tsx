import {
  Navbar,
  Hero,
  Journey,
  Projects,
  Credentials,
  Footer,
  Scanline,
  ScreenFrame,
} from './components';

export default function App() {
  return (
    <div className="min-h-screen text-slate-200 microdot-bg relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      <ScreenFrame />
      <Scanline />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 pt-36 pb-28 space-y-32 relative z-10">
        <Hero />
        <Journey />
        <Projects />
        <Credentials />
      </main>

      <Footer />
    </div>
  );
}
