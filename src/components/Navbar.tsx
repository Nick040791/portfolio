import React from 'react';
import { Activity } from 'lucide-react';
import { navLinks } from '../data/portfolioData';

interface NavbarProps {
  sysTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ sysTitle = 'NB_SYS_ADMIN' }) => {
  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-t-0 border-l-0 border-r-0 border-b-cyan-500/20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 group">
          <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
          <span className="font-mono font-bold text-lg tracking-widest neon-text-cyan group-hover:opacity-90 transition-opacity">
            {sysTitle}
          </span>
        </a>
        <div className="hidden md:flex space-x-6 font-mono text-sm text-cyan-500/70">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
