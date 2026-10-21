import React, { useState } from 'react';
import { Network, ChevronRight, Activity, Sparkles } from 'lucide-react';
import { journeyData } from '../data/portfolioData';
import { getColorScheme } from '../utils/theme';

export const Journey: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(0);

  return (
    <section id="journey" className="relative z-10">
      {/* Section Header with Live Telemetry Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
        <div className="flex items-center space-x-4">
          <Network className="w-8 h-8 text-fuchsia-500 animate-pulse" />
          <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">
            System_Trace<span className="text-fuchsia-500">::Journey</span>
          </h2>
        </div>

        {/* Telemetry Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1.5 glass-panel rounded-full border border-cyan-500/30 text-xs font-mono self-start sm:self-auto">
          <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-slate-400">EPOCH_TRACE:</span>
          <span className="text-cyan-400 font-semibold">2005 ➔ PRESENT</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping ml-1" />
        </div>
      </div>

      {/* Timeline Circuit Container */}
      <div className="relative border-l-2 border-dashed border-slate-700/80 ml-4 md:ml-8 space-y-12 pb-8">
        {/* Traveling Fiber-Optic Circuit Pulse (continuous ambient signal beam) */}
        <div
          className="absolute -left-[3px] w-[5px] h-28 rounded-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent blur-[1px] shadow-[0_0_14px_#22d3ee] pointer-events-none animate-circuit-pulse"
          aria-hidden="true"
        />

        {journeyData.map((item, index) => {
          const scheme = getColorScheme(item.color);
          const isSelected = selectedPhase === index;

          return (
            <div
              key={index}
              onClick={() => setSelectedPhase(index)}
              className="relative pl-10 md:pl-16 group cursor-pointer transition-all duration-300"
            >
              {/* Glowing Circuit Node */}
              <div
                className={`absolute -left-[21px] top-1 p-2 rounded-full bg-[#050505] border-2 ${
                  scheme.nodeBorder
                } transition-all duration-300 ${
                  isSelected ? 'scale-110 shadow-[0_0_22px_currentColor]' : 'group-hover:scale-110'
                }`}
              >
                {/* Active Thread Radar Pulse on Current Phase */}
                {item.isCurrent && (
                  <span
                    className="absolute -inset-1 rounded-full border border-cyan-400/60 animate-ping pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                {item.icon}
              </div>

              {/* Milestone Narrative Card */}
              <div
                className={`glass-panel p-6 rounded-lg border-l-4 ${scheme.border} transition-all duration-300 ${
                  isSelected
                    ? `bg-white/10 ${scheme.glowShadow} translate-x-1 border-l-[6px]`
                    : 'hover:bg-white/5 hover:translate-x-1'
                }`}
              >
                {/* Card Header & Status Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center space-x-2">
                    <h3
                      className={`text-xl font-bold text-white transition-colors ${
                        isSelected ? scheme.text : scheme.hoverText
                      }`}
                    >
                      {item.phase}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    {/* Active Thread Beacon for Current Phase */}
                    {item.isCurrent && (
                      <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        THREAD_ACTIVE
                      </span>
                    )}

                    {/* Milestone Date Badge */}
                    <span
                      className={`font-mono text-sm ${scheme.text} px-3 py-1 rounded-full ${scheme.bgSubtle} border ${scheme.borderSubtle}`}
                    >
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Telemetry Domain Tag */}
                {item.telemetryTag && (
                  <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-500 mb-4 uppercase tracking-wider">
                    <Sparkles className={`w-3.5 h-3.5 ${scheme.text} flex-shrink-0`} />
                    <span>{item.telemetryTag}</span>
                  </div>
                )}

                {/* Milestone Detail Bullet Points */}
                <ul className="space-y-3">
                  {item.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start space-x-3 text-slate-300 group-hover:text-slate-200 transition-colors"
                    >
                      <ChevronRight
                        className={`w-5 h-5 mt-0.5 ${scheme.text} flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1`}
                      />
                      <span className="leading-relaxed text-sm md:text-base">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
