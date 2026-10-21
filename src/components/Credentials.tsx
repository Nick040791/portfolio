import React, { useState } from 'react';
import { Database, Zap } from 'lucide-react';
import { credentialsData } from '../data/portfolioData';
import { CredentialSector } from '../types/portfolio';
import { getColorScheme, getAmbientGlowStyle } from '../utils/theme';
import { buildSqlQuery } from '../utils/formatters';

export const Credentials: React.FC = () => {
  const [activeCore, setActiveCore] = useState<CredentialSector>('software');
  const activeData = credentialsData[activeCore];
  const activeScheme = getColorScheme(activeData.color);

  const sectorKeys: CredentialSector[] = ['software', 'ai', 'data'];

  return (
    <section id="credentials" className="relative z-10 pb-20">
      <div className="flex items-center space-x-4 mb-12">
        <Database className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">
          Data_Core<span className="text-cyan-400">::Credentials</span>
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Core Terminals (Tabs) */}
        <div className="flex flex-col gap-4 lg:w-1/3">
          {sectorKeys.map((key) => {
            const data = credentialsData[key];
            const isActive = activeCore === key;
            const scheme = getColorScheme(data.color);

            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCore(key)}
                className={`flex items-center space-x-4 p-4 rounded-lg border text-left transition-all duration-300 ${
                  isActive
                    ? scheme.activeTabStyle
                    : 'glass-panel border-white/10 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                <div
                  className={`p-3 rounded-md transition-colors ${
                    isActive
                      ? `${scheme.bgSoft} ${scheme.text}`
                      : 'bg-black/50 text-slate-500'
                  }`}
                >
                  {data.icon}
                </div>
                <div>
                  <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1">
                    Sector_{key}
                  </div>
                  <div className={`font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {data.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Core Output (Certificate Grid) */}
        <div className="lg:w-2/3 glass-panel rounded-xl border border-white/10 p-1 relative overflow-hidden min-h-[400px] flex flex-col">
          {/* Terminal Header */}
          <div className="bg-black/80 px-6 py-3 border-b border-white/5 flex justify-between items-center z-10 relative">
            <span className="font-mono text-sm text-slate-400">
              {buildSqlQuery('certs', 'sector', activeCore)}
            </span>
            <span className="flex space-x-1" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-75" />
              <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-150" />
            </span>
          </div>

          {/* Data Chips Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 z-10 relative flex-1">
            {activeData.certs.map((cert, idx) => (
              <div
                key={idx}
                className={`glass-panel p-5 rounded border ${activeScheme.borderSubtle} hover:${activeScheme.borderLight} transition-all duration-300 group`}
              >
                <div className="flex justify-between items-start mb-3">
                  <Zap
                    className={`w-5 h-5 ${activeScheme.textMuted} group-hover:${activeScheme.text} transition-colors`}
                  />
                  <span
                    className={`font-mono text-xs px-2 py-1 bg-black/60 ${activeScheme.text} rounded`}
                  >
                    {cert.date}
                  </span>
                </div>
                <h4 className="font-bold text-slate-200 mb-1 leading-tight group-hover:text-white transition-colors">
                  {cert.name}
                </h4>
                <p className="text-sm font-mono text-slate-500 uppercase">{cert.issuer}</p>
              </div>
            ))}
          </div>

          {/* Background ambient glow based on active core */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[100px] pointer-events-none transition-colors duration-1000"
            style={getAmbientGlowStyle(activeData.color)}
          />
        </div>
      </div>
    </section>
  );
};
