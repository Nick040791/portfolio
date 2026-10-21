import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  Minus,
  Square,
  X,
  Menu,
  Clock,
  User,
  Tag,
  CheckCircle2,
  FolderTree,
  Terminal,
} from 'lucide-react';
import { journeyData } from '../data/portfolioData';
import { getColorScheme } from '../utils/theme';

export const Journey: React.FC = () => {
  const [activeCommitIndex, setActiveCommitIndex] = useState(0);
  const activePhase = journeyData[activeCommitIndex];
  const activeScheme = getColorScheme(activePhase.color);
  const phaseParts = activePhase.phase.includes(':')
    ? {
        prefix: activePhase.phase.split(':')[0].trim(),
        title: activePhase.phase.split(':').slice(1).join(':').trim(),
      }
    : {
        prefix: 'Phase',
        title: activePhase.phase,
      };

  return (
    <section id="journey" className="relative z-10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <GitBranch className="w-7 h-7 text-fuchsia-400" />
          <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider uppercase text-white">
            System_Trace<span className="text-fuchsia-400">::Git_Graph</span>
          </h2>
        </div>

        {/* Telemetry Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-md border border-cyan-500/20 text-xs font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">TREE:</span>
          <span className="text-cyan-400 font-semibold">main (4 commits logged)</span>
        </div>
      </div>

      {/* Ubuntu Linux Git Graph / System Trace Window */}
      <div className="glass-panel rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
        {/* Ubuntu GNOME Window Titlebar */}
        <div className="bg-[#1e1e22] border-b border-[#2d2f36] px-3 py-2 flex items-center justify-between select-none">
          {/* Left Title / Breadcrumbs */}
          <div className="flex items-center space-x-2">
            <span className="px-1.5 py-0.5 rounded bg-[#2a2b30] text-fuchsia-400 font-mono text-xs flex items-center gap-1 font-semibold">
              <GitBranch className="w-3 h-3" />
              git-graph
            </span>
            <span className="font-mono text-xs text-slate-300 font-medium hidden sm:inline">
              nicholas-beighley/career-trace.git — [branch: main]
            </span>
          </div>

          {/* Right Window Controls (Ubuntu GNOME) */}
          <div className="flex items-center space-x-2.5 text-slate-400">
            <button
              type="button"
              className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
              title="Menu"
              aria-label="Menu"
            >
              <Menu className="w-3.5 h-3.5" />
            </button>
            <span className="h-3.5 w-[1px] bg-slate-700/60" aria-hidden="true" />
            <button
              type="button"
              className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
              title="Minimize"
              aria-label="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
              title="Maximize"
              aria-label="Maximize"
            >
              <Square className="w-3 h-3" />
            </button>
            <button
              type="button"
              className="p-1 text-slate-400 hover:text-white hover:bg-red-600/90 rounded-full transition-colors"
              title="Close"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Command Toolbar / Subheader */}
        <div className="bg-[#141519] border-b border-[#25272e] px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center space-x-3 text-slate-400">
            <span className="text-lime-400 font-semibold">$</span>
            <span className="text-slate-300">git log --graph --decorate --all --date=relative</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500">
            <span>HEAD: <span className="text-cyan-400 font-semibold">a4f8e91</span></span>
            <span>•</span>
            <span className="text-emerald-400">Verified GPG Commits</span>
          </div>
        </div>

        {/* Split Workbench Content: Left Graph Tree + Right Commit Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px] bg-[#0c0d12]/95">
          {/* Left Column: Git Commit Graph & List */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#25272e] p-3 sm:p-4 space-y-2 font-mono">
            <div className="px-2 py-1 text-[11px] uppercase tracking-wider text-slate-500 flex items-center justify-between border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5">
                <FolderTree className="w-3 h-3 text-slate-400" />
                Commit History & Merges
              </span>
              <span>4 Commits</span>
            </div>

            <div className="space-y-1.5 pt-1">
              {journeyData.map((phase, idx) => {
                const isSelected = activeCommitIndex === idx;
                const scheme = getColorScheme(phase.color);

                return (
                  <div
                    key={idx}
                    onClick={() => setActiveCommitIndex(idx)}
                    className={`relative p-3 rounded-md cursor-pointer transition-all duration-200 border text-left ${
                      isSelected
                        ? `bg-[#181d24] ${scheme.borderSubtle} shadow-[0_0_15px_rgba(0,0,0,0.5)]`
                        : 'border-transparent hover:bg-white/5 hover:border-white/5'
                    }`}
                  >
                    {/* Active Commit Indicator Line */}
                    {isSelected && (
                      <div
                        className={`absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r bg-cyan-400 shadow-[0_0_8px_#22d3ee]`}
                      />
                    )}

                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center space-x-1.5">
                        <GitCommit
                          className={`w-3.5 h-3.5 ${
                            isSelected ? scheme.text : 'text-slate-500'
                          }`}
                        />
                        <span className="font-bold text-slate-300">
                          {phase.commitHash}
                        </span>
                        {phase.tag && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                            {phase.tag}
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] ${scheme.text} font-semibold`}>
                        {phase.date}
                      </span>
                    </div>

                    <div
                      className={`text-sm font-sans font-semibold line-clamp-1 ${
                        isSelected ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {phase.phase}
                    </div>

                    <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-1 font-mono">
                      <span>branch: <span className="text-slate-400">{phase.branch}</span></span>
                      {phase.isCurrent && (
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          ● HEAD
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Commit Inspector & Changelog Detail */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between font-mono">
            <div className="space-y-5">
              {/* Commit Header & Subject */}
              <div className="bg-[#12141a] p-4 rounded-lg border border-white/5 space-y-3 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                  <div className="text-slate-400 font-mono">
                    commit <span className="text-cyan-400 font-bold">{activePhase.commitHash}</span>{' '}
                    <span className="text-slate-500">
                      ({activePhase.isCurrent ? 'HEAD -> ' : ''}
                      {activePhase.branch}, tag: {activePhase.tag})
                    </span>
                  </div>
                  {activePhase.isCurrent ? (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ACTIVE_EXECUTION
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      VERIFIED_MILESTONE
                    </span>
                  )}
                </div>

                {/* Commit Subject / Phase Title */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded ${activeScheme.bgSubtle} ${activeScheme.text} border ${activeScheme.borderSubtle}`}
                  >
                    {phaseParts.prefix}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                    {phaseParts.title}
                  </h3>
                </div>

                {/* Commit Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-400 text-xs pt-1 border-t border-white/5">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Author: <span className="text-slate-200">Nicholas Beighley</span></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Date: <span className="text-slate-200">{activePhase.date}</span></span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    <span>Scope: <span className={activeScheme.text}>{activePhase.scope}</span></span>
                  </div>
                </div>
              </div>

              {/* Commit Message (The Heart of the Information) */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider uppercase ${activeScheme.bgSoft} ${activeScheme.text} border ${activeScheme.border} flex items-center gap-1.5 shadow-sm`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      COMMIT MESSAGE
                    </span>
                    <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                      /// {activePhase.details.length} verified additions
                    </span>
                  </div>

                  {activePhase.telemetryTag && (
                    <span className="text-[10px] sm:text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-500/40 flex items-center gap-1.5 font-semibold">
                      <span className={`w-1.5 h-1.5 rounded-full ${activePhase.isCurrent ? 'bg-emerald-400 animate-pulse' : 'bg-cyan-400'}`} />
                      {activePhase.telemetryTag}
                    </span>
                  )}
                </div>

                {/* Prominent Commit Message Body Container */}
                <div
                  className={`p-4 sm:p-5 rounded-lg border-2 ${activeScheme.border} bg-gradient-to-br from-[#161824] via-[#10121a] to-[#0a0b10] shadow-[0_0_30px_rgba(0,0,0,0.8)] ${activeScheme.glowShadow} space-y-3 transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Subtle Hash Watermark */}
                  <div className="absolute right-3 -bottom-2 text-white/[0.03] select-none pointer-events-none font-mono text-7xl font-black">
                    {activePhase.commitHash}
                  </div>

                  {activePhase.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="relative z-10 flex items-start space-x-3.5 p-3.5 sm:p-4 rounded-md bg-[#181b26]/85 border border-white/10 hover:border-emerald-500/40 transition-all duration-200 shadow-sm"
                    >
                      <span className="text-emerald-400 font-mono font-bold text-base sm:text-lg select-none pt-0.5 leading-none">
                        +
                      </span>
                      <p className="text-sm sm:text-base text-slate-100 font-sans leading-relaxed tracking-normal">
                        {detail}
                      </p>
                    </div>
                  ))}

                  {/* Terminal Footnote inside Commit Message */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400">
                    <div className="flex items-center space-x-2">
                      <span className="text-lime-400 font-bold">$</span>
                      <span className="text-slate-300">git show --stat</span>
                      <span className="text-slate-600">|</span>
                      <span className="text-emerald-400 font-medium">+{activePhase.details.length} verified impact changes</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Tech Stack Chips */}
              {activePhase.tech && (
                <div className="space-y-2">
                  <div className="text-xs uppercase text-slate-500 font-semibold tracking-wider">
                    /// Built & Deployed Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activePhase.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-xs px-2.5 py-1 rounded bg-[#16181f] border ${activeScheme.borderSubtle} ${activeScheme.text}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ubuntu Application Status Bar */}
        <div className="bg-[#111215] border-t border-[#222328] px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2 select-none">
          <div className="flex items-center space-x-3">
            <span className="text-emerald-400 font-semibold">● 100% HEALTH</span>
            <span>|</span>
            <span>Commit {activeCommitIndex + 1} of {journeyData.length}</span>
            <span>|</span>
            <span>UTF-8</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>git:main</span>
            <span>|</span>
            <span>Ubuntu 24.04 LTS (x86_64)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
