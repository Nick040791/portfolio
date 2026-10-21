import React, { useState, useEffect } from 'react';
import {
  Minus,
  Square,
  X,
  Menu,
  LayoutGrid,
  ChevronDown,
  Terminal,
  RotateCcw,
  Box,
} from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { personalInfo } from '../data/portfolioData';

interface UbuntuTerminalProps {
  className?: string;
}

type Stage = 'TYPE_COMMAND' | 'COMMAND_ENTER' | 'DOCKER_OUTPUT' | 'CONTAINER_READY' | 'TYPE_SUMMARY';

const DOCKER_LOGS = [
  { text: "Unable to find image 'candidate-profile:latest' locally", color: "text-slate-400" },
  { text: "latest: Pulling from docker.io/library/candidate-profile", color: "text-slate-400" },
  { text: "✔ a3ed95caeb02: Pull complete [0.2s]", color: "text-emerald-400/90" },
  { text: "Digest: sha256:7b49a562ef834c892f392bb1c5837", color: "text-slate-500" },
  { text: "Status: Downloaded newer image for candidate-profile:latest", color: "text-cyan-400/90" },
  { text: "[✓] Dev container initialized. Workspace mounted at /portfolio", color: "text-lime-400" },
];

export const UbuntuTerminal: React.FC<UbuntuTerminalProps> = ({ className = '' }) => {
  const [stage, setStage] = useState<Stage>('TYPE_COMMAND');
  const [typedCommand, setTypedCommand] = useState('');
  const [visibleLogsCount, setVisibleLogsCount] = useState(0);
  const [sessionKey, setSessionKey] = useState(0);

  const commandText = personalInfo.dockerCommand;

  // Restart simulation helper
  const handleRestart = () => {
    setStage('TYPE_COMMAND');
    setTypedCommand('');
    setVisibleLogsCount(0);
    setSessionKey((prev) => prev + 1);
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number | undefined;

    // Stage 1: Type the docker run command
    if (stage === 'TYPE_COMMAND') {
      let index = 0;
      setTypedCommand('');

      const typeNextChar = () => {
        if (!isMounted) return;

        if (index < commandText.length) {
          index++;
          setTypedCommand(commandText.slice(0, index));
          timeoutId = window.setTimeout(typeNextChar, 24);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('COMMAND_ENTER');
          }, 240);
        }
      };

      timeoutId = window.setTimeout(typeNextChar, 250);
    }

    // Stage 2: Command executed (Enter pressed)
    else if (stage === 'COMMAND_ENTER') {
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('DOCKER_OUTPUT');
      }, 150);
    }

    // Stage 3: Stream Docker container output logs
    else if (stage === 'DOCKER_OUTPUT') {
      let currentLog = 0;

      const streamNextLog = () => {
        if (!isMounted) return;

        if (currentLog < DOCKER_LOGS.length) {
          currentLog++;
          setVisibleLogsCount(currentLog);
          timeoutId = window.setTimeout(streamNextLog, 120);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('CONTAINER_READY');
          }, 180);
        }
      };

      timeoutId = window.setTimeout(streamNextLog, 100);
    }

    // Stage 4: Dev container attached & ready
    else if (stage === 'CONTAINER_READY') {
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('TYPE_SUMMARY');
      }, 150);
    }

    return () => {
      isMounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [stage, commandText, sessionKey]);

  // Host prompt: nicholas-beighley@workstation:~$
  const hostPrompt = (
    <span className="inline-block whitespace-nowrap">
      <span className="text-[#38e54d] font-bold">{personalInfo.terminalUser}@{personalInfo.terminalHost}</span>
      <span className="text-slate-400">:</span>
      <span className="text-[#38bdf8] font-bold">~</span>
      <span className="text-slate-300 mr-2">$</span>
    </span>
  );

  // Container prompt: root@candidate-profile:/portfolio#
  const containerPrompt = (
    <span className="inline-block whitespace-nowrap">
      <span className="text-[#38e54d] font-bold">{personalInfo.containerUser}</span>
      <span className="text-slate-400">:</span>
      <span className="text-[#38bdf8] font-bold">{personalInfo.containerMount}</span>
      <span className="text-slate-300 mr-2">#</span>
    </span>
  );

  const isInContainer = stage === 'CONTAINER_READY' || stage === 'TYPE_SUMMARY';

  return (
    <div
      className={`glass-panel rounded-lg overflow-hidden border border-cyan-500/30 shadow-[0_0_35px_rgba(34,211,238,0.14)] relative ${className}`}
    >
      {/* Ubuntu GNOME Header & Tabs Bar */}
      <div className="bg-[#1e1e22] border-b border-[#2e3038] px-3 py-1.5 flex items-center justify-between select-none">
        {/* Left: New Tab Button & Tab List */}
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-hidden">
          {/* New tab button [+] ⌵ */}
          <button
            type="button"
            className="flex items-center space-x-0.5 px-1.5 py-1 rounded bg-[#2a2b30] hover:bg-[#35373e] text-slate-300 text-xs transition-colors flex-shrink-0"
            title="Open new tab"
            aria-label="Open new tab"
          >
            <span className="font-mono text-xs font-semibold text-slate-300">[+]</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {/* Active Tab (Switches dynamically when dev container starts) */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded bg-[#101114] border border-[#33353e] text-slate-200 text-xs font-mono shadow-sm">
            {isInContainer ? (
              <Box className="w-3.5 h-3.5 text-cyan-400 animate-pulse flex-shrink-0" />
            ) : (
              <Terminal className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}
            <span className="truncate max-w-[170px] sm:max-w-[280px]">
              {isInContainer
                ? `[Dev Container] candidate-profile: /portfolio`
                : `${personalInfo.terminalUser}@${personalInfo.terminalHost}: ~`}
            </span>
            <button
              type="button"
              className="text-slate-500 hover:text-white rounded p-0.5 transition-colors"
              title="Close Tab"
              aria-label="Close Tab"
            >
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Inactive Tab (Tablet/Desktop) */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded text-slate-500 hover:text-slate-300 hover:bg-[#28292e] text-xs font-mono cursor-pointer transition-colors">
            <Terminal className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
            <span className="truncate max-w-[160px]">{personalInfo.terminalUser}@{personalInfo.terminalHost}: ~/projects</span>
          </div>
        </div>

        {/* Right: Ubuntu GNOME Window Controls & Menu */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-slate-400 pl-2">
          {/* Replay Session Button */}
          <button
            type="button"
            onClick={handleRestart}
            className="p-1 hover:text-cyan-400 hover:bg-[#2b2c32] rounded transition-colors flex items-center gap-1 text-xs font-mono"
            title="Restart terminal simulation"
            aria-label="Restart terminal simulation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[10px] uppercase">Rerun</span>
          </button>

          {/* App grid icon */}
          <button
            type="button"
            className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
            title="Terminal Options"
            aria-label="Terminal Options"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger Menu */}
          <button
            type="button"
            className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
            title="Menu"
            aria-label="Menu"
          >
            <Menu className="w-3.5 h-3.5" />
          </button>

          <span className="h-4 w-[1px] bg-slate-700/60 mx-0.5" aria-hidden="true" />

          {/* Minimize Button */}
          <button
            type="button"
            className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
            title="Minimize"
            aria-label="Minimize"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          {/* Maximize Button */}
          <button
            type="button"
            className="p-1 hover:text-slate-200 hover:bg-[#2b2c32] rounded transition-colors"
            title="Maximize"
            aria-label="Maximize"
          >
            <Square className="w-3 h-3" />
          </button>

          {/* Close Button */}
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

      {/* Terminal Screen Body with Zero-Layout-Shift Grid Overlay */}
      <div className="p-5 md:p-6 bg-[#0c0d12]/95 relative grid grid-cols-1">
        {/* Phantom Layer: Establishes exact responsive height for the completed session across all screen sizes */}
        <div
          className="col-start-1 row-start-1 font-mono text-sm md:text-base leading-relaxed invisible select-none pointer-events-none break-words space-y-2"
          aria-hidden="true"
        >
          <div>
            <span className="mr-2">{hostPrompt}</span>
            <span>{commandText}</span>
          </div>
          <div className="space-y-0.5 text-xs sm:text-sm pl-2 border-l border-cyan-500/20 my-1">
            {DOCKER_LOGS.map((log, i) => (
              <div key={i}>{log.text}</div>
            ))}
          </div>
          <div className="pt-1">
            <span className="mr-2">{containerPrompt}</span>
            <span>{personalInfo.introBio}</span>
          </div>
        </div>

        {/* Active Animated Layer */}
        <div
          key={sessionKey}
          className="col-start-1 row-start-1 font-mono text-sm md:text-base leading-relaxed space-y-2"
        >
          {/* Step 1: Workstation Host Prompt & Command */}
          <div>
            <span className="inline-block whitespace-nowrap mr-2 select-none">
              {hostPrompt}
            </span>
            <span className="text-slate-200">{typedCommand}</span>
            {stage === 'TYPE_COMMAND' && (
              <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
            )}
          </div>

          {/* Step 2: Docker Pull & Container Boot Output Logs */}
          {visibleLogsCount > 0 && (
            <div className="space-y-0.5 text-xs sm:text-sm pl-2 border-l border-cyan-500/30 my-1 bg-black/30 py-1.5 rounded-r">
              {DOCKER_LOGS.slice(0, visibleLogsCount).map((log, idx) => (
                <div key={idx} className={`${log.color} font-mono tracking-wide`}>
                  {log.text}
                </div>
              ))}
            </div>
          )}

          {/* Step 3 & 4: Dev Container Interactive Shell & Professional Summary Typewriter */}
          {isInContainer && (
            <div className="pt-1">
              <TypewriterText
                text={personalInfo.introBio}
                prompt={containerPrompt}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
