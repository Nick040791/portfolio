import React from 'react';
import { Network, ChevronRight } from 'lucide-react';
import { journeyData } from '../data/portfolioData';
import { getColorScheme } from '../utils/theme';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="relative z-10">
      <div className="flex items-center space-x-4 mb-12">
        <Network className="w-8 h-8 text-fuchsia-500" />
        <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">
          System_Trace<span className="text-fuchsia-500">::Journey</span>
        </h2>
      </div>

      <div className="relative border-l-2 border-dashed border-slate-700 ml-4 md:ml-8 space-y-12 pb-8">
        {journeyData.map((item, index) => {
          const scheme = getColorScheme(item.color);

          return (
            <div key={index} className="relative pl-10 md:pl-16 group">
              {/* Glowing Node */}
              <div
                className={`absolute -left-[21px] top-1 p-2 rounded-full bg-[#050505] border-2 ${scheme.nodeBorder} transition-all duration-300 group-hover:scale-110`}
              >
                {item.icon}
              </div>

              <div
                className={`glass-panel p-6 rounded-lg border-l-4 ${scheme.border} transition-all duration-300 hover:bg-white/10`}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className={`text-xl font-bold text-white ${scheme.hoverText} transition-colors`}>
                    {item.phase}
                  </h3>
                  <span
                    className={`font-mono text-sm ${scheme.text} px-3 py-1 rounded-full ${scheme.bgSubtle}`}
                  >
                    {item.date}
                  </span>
                </div>
                <ul className="space-y-3">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start space-x-3 text-slate-400">
                      <ChevronRight className={`w-5 h-5 mt-0.5 ${scheme.textMuted} flex-shrink-0`} />
                      <span className="leading-relaxed">{detail}</span>
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
