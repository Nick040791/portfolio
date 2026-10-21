import React from 'react';
import { Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-cyan-500/20 bg-black/80 py-8 relative z-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span className="font-mono text-slate-500 text-sm uppercase">
            {personalInfo.name} {personalInfo.lastName} // 2026 // End_Of_File
          </span>
        </div>
        <div className="flex space-x-6 text-slate-500">
          <a
            href={personalInfo.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="hover:text-cyan-400 transition-colors"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.links.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="hover:text-cyan-400 transition-colors"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
