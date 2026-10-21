import React from 'react';
import {
  Boxes,
  Minus,
  Square,
  X,
  Menu,
  FolderGit2,
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative z-10 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <Boxes className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider uppercase text-white">
            System_Deployments<span className="text-cyan-400">::Active_Services</span>
          </h2>
        </div>

        {/* Telemetry Status Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-md border border-cyan-500/20 text-xs font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">CLUSTER:</span>
          <span className="text-emerald-400 font-semibold">4/4 Containers Healthy</span>
        </div>
      </div>

      {/* Ubuntu Linux Services & Projects Window */}
      <div className="glass-panel rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
        {/* Ubuntu GNOME Window Titlebar */}
        <div className="bg-[#1e1e22] border-b border-[#2d2f36] px-3 py-2 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <span className="px-1.5 py-0.5 rounded bg-[#2a2b30] text-cyan-400 font-mono text-xs flex items-center gap-1 font-semibold">
              <FolderGit2 className="w-3 h-3" />
              docker-compose / system-services
            </span>
            <span className="font-mono text-xs text-slate-300 font-medium hidden sm:inline">
              workstation-deployments://nicholas-beighley/projects — [cluster: local-live]
            </span>
          </div>

          {/* Ubuntu GNOME Window Controls */}
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
            <span className="text-slate-300">
              docker compose ps --all --format "table {'{{.Names}}\\t{{.Status}}\\t{{.Ports}}'}"
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500">
            <span>Remote: <span className="text-cyan-400 font-semibold">github.com/Nick040791</span></span>
            <span>•</span>
            <span className="text-emerald-400">Bridge Net: 172.20.0.0/16</span>
          </div>
        </div>

        {/* Main Workbench Grid */}
        <div className="p-4 sm:p-6 lg:p-8 bg-[#0c0d12]/95">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        </div>

        {/* Ubuntu Application Status Bar */}
        <div className="bg-[#111215] border-t border-[#222328] px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2 select-none">
          <div className="flex items-center space-x-3">
            <span className="text-emerald-400 font-semibold">● 4 CONTAINERS RUNNING</span>
            <span>|</span>
            <span>Docker Engine v27.3.1</span>
            <span>|</span>
            <span>Compose Spec v2</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>Health: Passing</span>
            <span>|</span>
            <span>Ubuntu 24.04 LTS (x86_64)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
