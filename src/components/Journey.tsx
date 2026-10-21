import React, { useEffect, useRef, useState } from 'react';
import {
  Route,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { journeyData } from '../data/portfolioData';
import { getColorScheme } from '../utils/theme';

export const Journey: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    journeyData.map(() => false)
  );

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number(entry.target.getAttribute('data-index'));
          if (Number.isNaN(idx)) return;
          setRevealed((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          setActiveIndex(idx);
        });
      },
      { threshold: 0.4, rootMargin: '-10% 0px -35% 0px' }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setRevealed((prev) => {
      if (prev[0]) return prev;
      const next = [...prev];
      next[0] = true;
      return next;
    });
  }, []);

  const progress =
    journeyData.length > 1
      ? (activeIndex / (journeyData.length - 1)) * 100
      : 100;

  const scrollToIndex = (idx: number) => {
    cardRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="journey" className="relative z-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Route className="w-7 h-7 text-fuchsia-400" />
          <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider uppercase text-white">
            Career_Path<span className="text-fuchsia-400">::Timeline</span>
          </h2>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-md border border-cyan-500/20 text-xs font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">PATH:</span>
          <span className="text-cyan-400 font-semibold">
            {journeyData.length} milestones logged
          </span>
        </div>
      </div>

      <div className="glass-panel rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(34,211,238,0.12)] p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4">
            <div className="relative pl-6 lg:sticky lg:top-24">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 w-full bg-gradient-to-b from-cyan-400 via-fuchsia-400 to-lime-400 transition-all duration-700 ease-out rounded-full"
                  style={{ height: `${progress}%` }}
                />
              </div>

              <ol className="space-y-6">
                {journeyData.map((phase, idx) => {
                  const scheme = getColorScheme(phase.color);
                  const isActive = idx === activeIndex;
                  const isPast = idx < activeIndex;
                  const phaseParts = phase.phase.includes(':')
                    ? {
                        prefix: phase.phase.split(':')[0].trim(),
                        title: phase.phase.split(':').slice(1).join(':').trim(),
                      }
                    : { prefix: 'Phase', title: phase.phase };

                  return (
                    <li key={idx} className="relative">
                      <button
                        type="button"
                        onClick={() => scrollToIndex(idx)}
                        className="flex items-start gap-3 text-left group w-full"
                        aria-label={`Go to milestone ${idx + 1}: ${phase.phase}`}
                      >
                        <span
                          className={`absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                            isActive
                              ? `${scheme.nodeBorder} scale-110`
                              : isPast
                              ? 'border-cyan-500/60 bg-cyan-500/20'
                              : 'border-white/20 bg-black/40 group-hover:border-white/40'
                          }`}
                        />
                        <div
                          className={`space-y-0.5 transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-60 group-hover:opacity-90'
                          }`}
                        >
                          <div
                            className={`text-[11px] font-mono uppercase tracking-wider ${
                              isActive ? scheme.text : 'text-slate-500'
                            }`}
                          >
                            Step {String(idx + 1).padStart(2, '0')} · {phaseParts.prefix}
                          </div>
                          <div
                            className={`text-sm font-sans font-semibold leading-snug ${
                              isActive ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {phaseParts.title}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">
                            {phase.date}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6">
            {journeyData.map((phase, idx) => {
              const scheme = getColorScheme(phase.color);
              const isActive = idx === activeIndex;
              const isRevealed = revealed[idx];
              const phaseParts = phase.phase.includes(':')
                ? {
                    prefix: phase.phase.split(':')[0].trim(),
                    title: phase.phase.split(':').slice(1).join(':').trim(),
                  }
                : { prefix: 'Phase', title: phase.phase };

              return (
                <div
                  key={idx}
                  data-index={idx}
                  ref={(el) => (cardRefs.current[idx] = el)}
                  className={`transition-all duration-700 ease-out ${
                    isRevealed
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-6'
                  }`}
                >
                  <article
                    className={`rounded-lg border p-5 sm:p-6 bg-gradient-to-br from-[#161824] via-[#10121a] to-[#0a0b10] transition-all duration-300 ${
                      isActive
                        ? `${scheme.border} ${scheme.glowShadow}`
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded ${scheme.bgSubtle} ${scheme.text} border ${scheme.borderSubtle}`}
                        >
                          {phaseParts.prefix}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                          {phaseParts.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {phase.telemetryTag && (
                          <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/40 flex items-center gap-1.5 font-semibold">
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                phase.isCurrent
                                  ? 'bg-emerald-400 animate-pulse'
                                  : 'bg-cyan-400'
                              }`}
                            />
                            {phase.telemetryTag}
                          </span>
                        )}
                        {phase.isCurrent && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            CURRENT
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-400 mb-4 border-t border-white/5 pt-3">
                      <span>
                        Date: <span className="text-slate-200">{phase.date}</span>
                      </span>
                      {phase.scope && (
                        <span>
                          Scope: <span className={scheme.text}>{phase.scope}</span>
                        </span>
                      )}
                      {phase.commitHash && (
                        <span>
                          ID: <span className="text-slate-400">{phase.commitHash}</span>
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2.5 mb-4">
                      {phase.details.map((detail, dIdx) => (
                        <li
                          key={dIdx}
                          className="flex items-start space-x-2.5 p-3 rounded-md bg-[#181b26]/70 border border-white/5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-slate-100 font-sans leading-relaxed">
                            {detail}
                          </p>
                        </li>
                      ))}
                    </ul>

                    {phase.tech && (
                      <div className="space-y-2">
                        <div className="text-xs uppercase text-slate-500 font-semibold tracking-wider">
                          /// Built & Deployed Technologies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {phase.tech.map((t, tIdx) => (
                            <span
                              key={tIdx}
                              className={`text-xs px-2.5 py-1 rounded bg-[#16181f] border ${scheme.borderSubtle} ${scheme.text}`}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-lime-400" />
                        <span className="text-slate-300">
                          {phase.details.length} verified impact changes
                        </span>
                      </span>
                      {isActive && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          ACTIVE_STEP
                        </span>
                      )}
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};