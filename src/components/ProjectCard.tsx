import React from 'react';
import { ExternalLink, Activity } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { GithubIcon } from './Icons';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gradient-to-br from-[#0e1713] via-[#09120e] to-[#050a08] rounded-lg p-5 sm:p-6 flex flex-col justify-between group transition-all duration-300 border border-emerald-500/25 hover:border-emerald-400/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.22)] relative overflow-hidden">
      {/* Background subtle scanline glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-emerald-500 to-transparent transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header: Container Port & Action Links */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center space-x-2">
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              RUNNING
            </span>
            {project.containerPort && (
              <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-600/40 font-semibold">
                {project.containerPort}
              </span>
            )}
          </div>

          {/* Action Links: GitHub & Live Portal */}
          <div className="flex items-center space-x-1.5">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View ${project.title} on GitHub`}
                title="View Source on GitHub"
                className="p-1.5 rounded bg-black/50 text-emerald-400 hover:text-white hover:bg-emerald-600/30 border border-emerald-500/25 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open live deployment for ${project.title}`}
                title="Open Live Deployment"
                className="p-1.5 rounded bg-black/50 text-emerald-400 hover:text-white hover:bg-emerald-600/30 border border-emerald-500/25 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {!project.githubUrl && !project.liveUrl && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                aria-label={`External link to ${project.title}`}
                title="Open Project"
                className="p-1.5 rounded bg-black/50 text-emerald-400 hover:text-white hover:bg-emerald-600/30 border border-emerald-500/25 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Project Subtitle & Title */}
        <div className="space-y-1 mb-3">
          <div className="font-mono text-xs text-emerald-400/80 uppercase tracking-wider font-semibold">
            {project.subtitle}
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-emerald-300 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-slate-300 leading-relaxed text-sm sm:text-[14px] font-sans mb-4">
          {project.description}
        </p>

        {/* System Metric / Health Output */}
        {project.systemMetrics && (
          <div className="bg-[#050e0a] p-2.5 rounded border border-emerald-500/20 text-xs font-mono text-emerald-400/90 flex items-center space-x-2 mb-4">
            <Activity className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="truncate">{project.systemMetrics}</span>
          </div>
        )}
      </div>

      {/* Tech Stack Chips (Dark Green Theme) */}
      <div className="flex flex-wrap gap-1.5 relative z-10 mt-auto pt-4 border-t border-emerald-500/15">
        {project.tech.map((tag, i) => (
          <span
            key={i}
            className="text-xs font-mono px-2.5 py-1 rounded bg-[#0a1a13] border border-emerald-500/30 text-emerald-300 hover:text-white hover:border-emerald-400/60 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
