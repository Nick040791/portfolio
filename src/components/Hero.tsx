import React from 'react';
import { Mail, GraduationCap } from 'lucide-react';
import { UbuntuTerminal } from './UbuntuTerminal';
import { GithubIcon, LinkedinIcon } from './Icons';
import { LaunchCodeLogo, FreeCodeCampLogo } from './Logos';
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

      {/* Balanced 3x2 Action / External Link Badges */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
        {/* 1. GitHub Access */}
        <a
          href={personalInfo.links.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 px-4 py-3 glass-panel rounded-md text-cyan-400 font-mono text-sm uppercase tracking-wider neon-border-cyan transition-all duration-300 hover:scale-[1.02]"
        >
          <GithubIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">GitHub_Access</span>
        </a>

        {/* 2. LinkedIn Node */}
        <a
          href={personalInfo.links.linkedin}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 px-4 py-3 glass-panel rounded-md text-fuchsia-400 font-mono text-sm uppercase tracking-wider hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300 hover:scale-[1.02]"
        >
          <LinkedinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">LinkedIn_Node</span>
        </a>

        {/* 3. Ping Comm (Email) */}
        <a
          href={personalInfo.links.email}
          className="flex items-center justify-center space-x-2 px-4 py-3 glass-panel rounded-md text-lime-400 font-mono text-sm uppercase tracking-wider neon-border-lime transition-all duration-300 hover:scale-[1.02]"
        >
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">Ping_Comm</span>
        </a>

        {/* 4. freeCodeCamp Verified Profile */}
        <a
          href={personalInfo.links.freecodecamp}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 px-4 py-3 glass-panel rounded-md text-cyan-400 font-mono text-sm uppercase tracking-wider neon-border-cyan transition-all duration-300 hover:scale-[1.02]"
        >
          <FreeCodeCampLogo className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">FreeCodeCamp_ID</span>
        </a>

        {/* 5. LaunchCode Hub */}
        <a
          href={personalInfo.links.launchcode}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 px-4 py-3 glass-panel rounded-md text-fuchsia-400 font-mono text-sm uppercase tracking-wider hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300 hover:scale-[1.02]"
        >
          <LaunchCodeLogo className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">LaunchCode_Hub</span>
        </a>

        {/* 6. MDHEWD Portal */}
        <a
          href={personalInfo.links.mdhewd}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center space-x-2 px-4 py-3 glass-panel rounded-md text-lime-400 font-mono text-sm uppercase tracking-wider neon-border-lime transition-all duration-300 hover:scale-[1.02]"
        >
          <GraduationCap className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">MDHEWD_Portal</span>
        </a>
      </div>
    </section>
  );
};
