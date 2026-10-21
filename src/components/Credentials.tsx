import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Minus,
  Square,
  X,
  Menu,
  Terminal,
  FolderLock,
  ExternalLink,
} from 'lucide-react';
import { credentialsData } from '../data/portfolioData';
import { CredentialSector } from '../types/portfolio';
import { getColorScheme, getAmbientGlowStyle } from '../utils/theme';
import { getCredentialLogo } from './Logos';

export const Credentials: React.FC = () => {
  const [activeCore, setActiveCore] = useState<CredentialSector>('software');
  const activeData = credentialsData[activeCore];
  const activeScheme = getColorScheme(activeData.color);

  const sectorKeys: CredentialSector[] = ['software', 'ai', 'data'];
  const allCerts = sectorKeys.flatMap((k) => credentialsData[k].certs);
  const inProgressTotal = allCerts.filter((c) => c.status === 'in_progress').length;
  const verifiedTotal = allCerts.length - inProgressTotal;

  return (
    <section id="credentials" className="relative z-10 pb-16 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-7 h-7 text-cyan-400" />
          <h2 className="text-2xl sm:text-3xl font-bold font-mono tracking-wider uppercase text-white">
            Certificates
          </h2>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2 px-3 py-1 glass-panel rounded-md border border-cyan-500/20 text-xs font-mono self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-400">PKI STATUS:</span>
          <span className="text-emerald-400 font-semibold">{verifiedTotal} Verified</span>
          {inProgressTotal > 0 && (
            <>
              <span className="text-slate-600">/</span>
              <span className="text-amber-400 font-semibold">{inProgressTotal} In Progress</span>
            </>
          )}
        </div>
      </div>

      {/* Ubuntu Certificate Manager Window */}
      <div className="glass-panel rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
        {/* Ubuntu GNOME Window Titlebar */}
        <div className="bg-[#1e1e22] border-b border-[#2d2f36] px-3 py-2 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <span className="px-1.5 py-0.5 rounded bg-[#2a2b30] text-cyan-400 font-mono text-xs flex items-center gap-1 font-semibold">
              <FolderLock className="w-3 h-3" />
              seahorse / ca-certificates
            </span>
            <span className="font-mono text-xs text-slate-300 font-medium hidden sm:inline">
              system-keystore://nicholas-beighley/credentials.p12 — [status: trusted]
            </span>
          </div>

          {/* Ubuntu Window Controls */}
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
              dpkg-query -W --showformat='${'{Package} ${Version} ${Status}\\n'}' "cert-*"
            </span>
          </div>
          <div className="flex items-center space-x-3 text-slate-500">
            <span>Root CA: <span className="text-emerald-400 font-semibold">Active & Trusted</span></span>
            <span>•</span>
            <span className="text-cyan-400">SHA-256 Signatures</span>
          </div>
        </div>

        {/* Main Certificate Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[720px] bg-[#0c0d12]/95">
          {/* Left Column: Sector Category Navigator */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#25272e] p-3 sm:p-4 space-y-2 font-mono">
            <div className="px-2 py-1 text-[11px] uppercase tracking-wider text-slate-500 flex items-center justify-between border-b border-white/5 pb-2">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-slate-400" />
                Certificate Vaults
              </span>
              <span>3 Sectors</span>
            </div>

            <div className="space-y-2 pt-1">
              {sectorKeys.map((key) => {
                const data = credentialsData[key];
                const isSelected = activeCore === key;
                const scheme = getColorScheme(data.color);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveCore(key)}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all duration-200 relative group ${
                      isSelected
                        ? `bg-[#181d26] ${scheme.border} ${scheme.glowShadow}`
                        : 'border-white/5 bg-[#12141a]/60 hover:bg-white/5 hover:border-white/10'
                    }`}
                  >
                    {/* Active accent bar */}
                    {isSelected && (
                      <div
                        className={`absolute left-0 top-2 bottom-2 w-1 rounded-r bg-cyan-400 shadow-[0_0_8px_#22d3ee]`}
                      />
                    )}

                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`p-1.5 rounded transition-colors ${
                            isSelected
                              ? `${scheme.bgSoft} ${scheme.text}`
                              : 'bg-black/50 text-slate-400 group-hover:text-slate-200'
                          }`}
                        >
                          {data.icon}
                        </div>
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          Sector_{key}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold ${
                          isSelected
                            ? `${scheme.bgSubtle} ${scheme.text} border ${scheme.borderSubtle}`
                            : 'bg-black/40 text-slate-500 border border-white/5'
                        }`}
                      >
                        {data.certs.length} Certs
                      </span>
                    </div>

                    <div
                      className={`text-sm font-sans font-bold leading-snug ${
                        isSelected ? 'text-white' : 'text-slate-300'
                      }`}
                    >
                      {data.title}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Verified Certificate Cards Grid */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col relative overflow-hidden h-[520px] sm:h-[620px] lg:h-[720px]">
            <div className="flex flex-col h-full min-h-0">
              {/* Category Subheader */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-3 mb-4 shrink-0">
                <div className="space-y-0.5">
                  <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Target Keystore
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-sans flex items-center gap-2">
                    <span>{activeData.title}</span>
                  </h3>
                </div>
                <div className="text-xs font-mono px-2.5 py-1 rounded bg-[#151822] text-slate-400 border border-white/10">
                  <span className={activeScheme.text}>{activeData.certs.length}</span> Records Logged
                </div>
              </div>

              {/* Scrollable grid of Authentic Certificate Cards */}
              <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pr-1 cert-scroll">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 content-start pb-2">
                {activeData.certs.map((cert, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br from-[#151722] via-[#11131a] to-[#0a0b10] p-4 sm:p-5 rounded-lg border border-white/10 hover:${activeScheme.border} hover:${activeScheme.glowShadow} transition-all duration-300 flex flex-col justify-between group shadow-sm`}
                  >
                    <div>
                      {/* Top Bar: Actual Brand Logo + Verification Pill */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="p-1 rounded-lg bg-black/60 border border-white/10 shadow-sm flex items-center justify-center flex-shrink-0 group-hover:border-cyan-500/40 transition-colors">
                          {getCredentialLogo(cert.logoId, 'w-8 h-8')}
                        </div>

                        <div className="flex items-center space-x-2">
                          {cert.status === 'in_progress' ? (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/40">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                              IN_PROGRESS
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              VERIFIED
                            </span>
                          )}
                          <span className="font-mono text-[11px] text-slate-400 bg-black/40 px-2 py-0.5 rounded border border-white/5">
                            {cert.date}
                          </span>
                        </div>
                      </div>

                      {/* Certificate Name & Issuer */}
                      <div className="space-y-1 mb-3">
                        {cert.verifyUrl ? (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 group/title"
                            title={`Verify ${cert.name} on official portal`}
                          >
                            <h4 className="text-sm sm:text-base font-bold text-white font-sans leading-snug group-hover/title:text-cyan-300 transition-colors">
                              {cert.name}
                            </h4>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover/title:text-cyan-300 transition-colors flex-shrink-0" />
                          </a>
                        ) : (
                          <h4 className="text-sm sm:text-base font-bold text-white font-sans leading-snug">
                            {cert.name}
                          </h4>
                        )}
                        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span className="truncate">{cert.issuer}</span>
                        </div>
                      </div>

                      {/* Verified Skills / Competencies */}
                      {cert.skills && (
                        <div className="flex flex-wrap gap-1.5 pt-1 mb-3">
                          {cert.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-slate-300 border border-white/5"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Metadata: Credential ID / Verification Link */}
                    {cert.credentialId && (
                      <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>ID: <span className="text-slate-400">{cert.credentialId}</span></span>
                        {cert.verifyUrl ? (
                          <a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 transition-colors group/verify cursor-pointer hover:underline"
                            title="Open verified certificate link"
                          >
                            <span>Verify_PKI</span>
                            <ExternalLink className="w-2.5 h-2.5 group-hover/verify:translate-x-0.5 group-hover/verify:-translate-y-0.5 transition-transform" />
                          </a>
                        ) : (
                          <span className="text-emerald-500 flex items-center gap-1">
                            x509_OK
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>

            {/* Ambient Background Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[110px] pointer-events-none transition-colors duration-1000 opacity-20"
              style={getAmbientGlowStyle(activeData.color)}
            />
          </div>
        </div>

        {/* Ubuntu Application Status Bar */}
        <div className="bg-[#111215] border-t border-[#222328] px-4 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 gap-2 select-none">
          <div className="flex items-center space-x-3">
            <span className="text-emerald-400 font-semibold">● KEYRING ACTIVE</span>
            <span>|</span>
            <span>Vault: {activeCore.toUpperCase()}</span>
            <span>|</span>
            <span>x509 ASN.1 DER</span>
          </div>
          <div className="flex items-center space-x-3">
            <span>TLS 1.3 / GPG</span>
            <span>|</span>
            <span>Ubuntu 24.04 LTS (x86_64)</span>
          </div>
        </div>
      </div>
    </section>
  );
};
