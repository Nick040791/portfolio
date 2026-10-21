import {
  Navbar,
  Hero,
  Journey,
  Projects,
  Credentials,
  Footer,
  Scanline,
} from './components';

export default function App() {
  return (
    <div className="min-h-screen text-slate-200 microdot-bg relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      <Scanline />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        <Hero />
        <Journey />
        <Projects />
        <Credentials />
      </main>

      <Footer />
    </div>
  );
}
