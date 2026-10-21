import React from 'react';
import { Mail } from 'lucide-react';
import { UbuntuTerminal } from './UbuntuTerminal';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Hero: React.FC = () => {
  return (
    <section className="relative z-10 flex flex-col items-center max-w-4xl lg:max-w-5xl mx-auto w-full space-y-8 pt-4">
      {/* Intro Telemetry & Headlines */}
      <div className="w-full space-y-3">
        <p className="font-mono text-cyan-400 tracking-widest text-xs sm:text-sm uppercase flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          /// {personalInfo.systemStatus} : {personalInfo.systemLocation}
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
          {personalInfo.name}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-300">
            {personalInfo.lastName}
          </span>
        </h1>
        <h2 className="text-xl md:text-2xl font-light text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
          {personalInfo.rolePrefix}{' '}
          <span className="text-lime-400 font-normal">{personalInfo.roleHighlight}</span>
        </h2>
      </div>

      {/* Primary Section Focus: Ubuntu Terminal */}
      <div className="w-full">
        <UbuntuTerminal />
      </div>

      {/* Action / Social Link Badges */}
      <div className="w-full flex flex-wrap gap-4 pt-2">
        <a
          href={personalInfo.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 px-6 py-3 glass-panel rounded-md text-cyan-400 font-mono text-sm uppercase tracking-wider neon-border-cyan transition-all duration-300 hover:scale-[1.02]"
        >
          <GithubIcon className="w-4 h-4" />
          <span>GitHub_Access</span>
        </a>
        <a
          href={personalInfo.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-2 px-6 py-3 glass-panel rounded-md text-fuchsia-400 font-mono text-sm uppercase tracking-wider hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300 hover:scale-[1.02]"
        >
          <LinkedinIcon className="w-4 h-4" />
          <span>LinkedIn_Node</span>
        </a>
        <a
          href={personalInfo.links.email}
          className="flex items-center space-x-2 px-6 py-3 glass-panel rounded-md text-lime-400 font-mono text-sm uppercase tracking-wider neon-border-lime transition-all duration-300 hover:scale-[1.02]"
        >
          <Mail className="w-4 h-4" />
          <span>Ping_Comm</span>
        </a>
      </div>
    </section>
  );
};
