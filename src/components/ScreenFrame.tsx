import React from 'react';

/**
 * ScreenFrame component creates an authentic computer monitor bezel around the page,
 * complete with outer casing, inner bezel highlight, webcam sensor, power LED,
 * and subtle CRT/IPS screen curvature vignette.
 */
export const ScreenFrame: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden hidden md:block transform-gpu"
      aria-hidden="true"
    >
      {/* Physical Monitor Bezel (Outer Frame on all 4 edges) */}
      <div className="absolute inset-0 border-[6px] sm:border-[12px] md:border-[16px] lg:border-[22px] border-[#13141a] shadow-[inset_0_0_30px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.95)]">
        {/* Inner bezel highlight ring (Bevel edge) */}
        <div className="absolute inset-0 ring-1 ring-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_6px_rgba(0,0,0,0.9)]" />

        {/* Screen Glass Vignette & Curvature Shadow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(1,8,4,0.7)_100%)]" />

        {/* Diagonal Screen Glass Reflection (Gloss Sheen in corner) */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-bl from-white/[0.025] via-transparent to-transparent" />

        {/* Top Bezel Center: Hardware Webcam Lens & Ambient Sensor */}
        <div className="absolute -top-[5px] sm:-top-[9px] md:-top-[13px] lg:-top-[17px] left-1/2 -translate-x-1/2 flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-[#0d0e13] border border-white/10 shadow-inner">
          {/* Webcam lens */}
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#050608] border border-slate-700/80 flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-cyan-500/40" />
          </div>
          {/* Status sensor indicator */}
          <div className="w-1 h-1 rounded-full bg-emerald-500/60" />
        </div>

        {/* Bottom Bezel Center: Subtle Recessed Display Branding */}
        <div className="absolute -bottom-[5px] sm:-bottom-[10px] md:-bottom-[14px] lg:-bottom-[18px] left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded bg-[#0e0f14] border border-white/5 text-[8px] sm:text-[9px] font-mono text-slate-600 uppercase tracking-widest hidden sm:block select-none">
          UBUNTU_WORKSTATION // UHD_IPS
        </div>

        {/* Bottom Bezel Right: Hardware Power LED Indicator */}
        <div className="absolute -bottom-[5px] sm:-bottom-[10px] md:-bottom-[14px] lg:-bottom-[18px] right-4 sm:right-8 flex items-center space-x-1.5 select-none">
          <span className="text-[8px] font-mono text-slate-600 hidden md:inline tracking-wider">
            PWR
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          </span>
        </div>
      </div>
    </div>
  );
};
