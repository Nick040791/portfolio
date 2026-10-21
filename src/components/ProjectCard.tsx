import React from 'react';
import { ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { getColorScheme } from '../utils/theme';

interface ProjectCardProps {
  project: ProjectItem;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const scheme = getColorScheme(project.accent);

  return (
    <div
      className={`glass-panel rounded-xl p-8 flex flex-col justify-between group transition-all duration-500 border-t-2 ${scheme.borderSubtle} hover:-translate-y-2 relative overflow-hidden`}
    >
      {/* Background glow effect on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${scheme.gradientFrom} to-transparent transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <p className={`font-mono text-sm ${scheme.text} uppercase tracking-wider`}>
            {project.subtitle}
          </p>
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`External link to ${project.title}`}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:neon-text-cyan transition-all">
          {project.title}
        </h3>
        <p className="text-slate-400 leading-relaxed text-sm mb-6">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 relative z-10 mt-auto pt-6 border-t border-white/5">
        {project.tech.map((tag, i) => (
          <span
            key={i}
            className={`text-xs font-mono px-2 py-1 rounded bg-black/50 border ${scheme.borderSubtle} ${scheme.text}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
