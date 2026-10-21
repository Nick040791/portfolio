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
  GitBranch,
} from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { personalInfo } from '../data/portfolioData';

interface UbuntuTerminalProps {
  className?: string;
}

type Stage =
  | 'TYPE_WORKTREE'
  | 'WORKTREE_OUTPUT'
  | 'TYPE_CD'
  | 'CD_ENTER'
  | 'TYPE_DOCKER'
  | 'DOCKER_OUTPUT'
  | 'CONTAINER_READY'
  | 'TYPE_CLEAR'
  | 'CLEAR_ENTER'
  | 'CLEARED'
  | 'TYPE_SUMMARY';

const WORKTREE_LOGS = [
  "Preparing worktree (new branch 'feature/add-say-hello')",
  "HEAD is now at aeff934 feat: organize portfolio into modular react project",
];

const DOCKER_LOGS = [
  { text: "Unable to find image 'candidate-profile:latest' locally", color: "text-slate-400" },
  { text: "latest: Pulling from docker.io/library/candidate-profile", color: "text-slate-400" },
  { text: "✔ a3ed95caeb02: Pull complete [0.2s]", color: "text-emerald-400/90" },
  { text: "Digest: sha256:7b49a562ef834c892f392bb1c5837", color: "text-slate-500" },
  { text: "Status: Downloaded newer image for candidate-profile:latest", color: "text-cyan-400/90" },
  { text: "[✓] Dev container initialized. Workspace mounted at /portfolio", color: "text-lime-400" },
];

export const UbuntuTerminal: React.FC<UbuntuTerminalProps> = ({ className = '' }) => {
  const [stage, setStage] = useState<Stage>('TYPE_WORKTREE');
  const [typedWorktree, setTypedWorktree] = useState('');
  const [showWorktreeOutput, setShowWorktreeOutput] = useState(false);
  const [typedCd, setTypedCd] = useState('');
  const [typedDocker, setTypedDocker] = useState('');
  const [visibleDockerLogsCount, setVisibleDockerLogsCount] = useState(0);
  const [typedClear, setTypedClear] = useState('');
  const [sessionKey, setSessionKey] = useState(0);

  const worktreeCommand = personalInfo.gitWorktreeCommand;
  const cdCommand = personalInfo.gitCdCommand;
  const dockerCommand = personalInfo.dockerCommand;
  const clearCommand = personalInfo.clearCommand ?? 'clear';

  // Restart entire simulation sequence
  const handleRestart = () => {
    setStage('TYPE_WORKTREE');
    setTypedWorktree('');
    setShowWorktreeOutput(false);
    setTypedCd('');
    setTypedDocker('');
    setVisibleDockerLogsCount(0);
    setTypedClear('');
    setSessionKey((prev) => prev + 1);
  };

  useEffect(() => {
    let isMounted = true;
    let timeoutId: number | undefined;

    // Sequence 1: Type git worktree command
    if (stage === 'TYPE_WORKTREE') {
      let index = 0;
      setTypedWorktree('');
      setShowWorktreeOutput(false);

      const typeWorktree = () => {
        if (!isMounted) return;

        if (index < worktreeCommand.length) {
          index++;
          setTypedWorktree(worktreeCommand.slice(0, index));
          timeoutId = window.setTimeout(typeWorktree, 18);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('WORKTREE_OUTPUT');
          }, 200);
        }
      };

      timeoutId = window.setTimeout(typeWorktree, 250);
    }

    // Sequence 2: Worktree output prints
    else if (stage === 'WORKTREE_OUTPUT') {
      setShowWorktreeOutput(true);
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('TYPE_CD');
      }, 350);
    }

    // Sequence 3: Type cd command into working tree
    else if (stage === 'TYPE_CD') {
      let index = 0;
      setTypedCd('');

      const typeCd = () => {
        if (!isMounted) return;

        if (index < cdCommand.length) {
          index++;
          setTypedCd(cdCommand.slice(0, index));
          timeoutId = window.setTimeout(typeCd, 22);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('CD_ENTER');
          }, 180);
        }
      };

      timeoutId = window.setTimeout(typeCd, 150);
    }

    // Sequence 4: cd executed, in new working tree
    else if (stage === 'CD_ENTER') {
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('TYPE_DOCKER');
      }, 200);
    }

    // Sequence 5: Type docker run command in the working tree
    else if (stage === 'TYPE_DOCKER') {
      let index = 0;
      setTypedDocker('');

      const typeDocker = () => {
        if (!isMounted) return;

        if (index < dockerCommand.length) {
          index++;
          setTypedDocker(dockerCommand.slice(0, index));
          timeoutId = window.setTimeout(typeDocker, 20);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('DOCKER_OUTPUT');
          }, 220);
        }
      };

      timeoutId = window.setTimeout(typeDocker, 200);
    }

    // Sequence 6: Rapid Docker output stream
    else if (stage === 'DOCKER_OUTPUT') {
      let currentLog = 0;

      const streamNextLog = () => {
        if (!isMounted) return;

        if (currentLog < DOCKER_LOGS.length) {
          currentLog++;
          setVisibleDockerLogsCount(currentLog);
          timeoutId = window.setTimeout(streamNextLog, 100);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('CONTAINER_READY');
          }, 220);
        }
      };

      timeoutId = window.setTimeout(streamNextLog, 100);
    }

    // Sequence 7: Dev container ready, prompt appears
    else if (stage === 'CONTAINER_READY') {
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('TYPE_CLEAR');
      }, 350);
    }

    // Sequence 8: Type clear command inside dev container
    else if (stage === 'TYPE_CLEAR') {
      let index = 0;
      setTypedClear('');

      const typeClear = () => {
        if (!isMounted) return;

        if (index < clearCommand.length) {
          index++;
          setTypedClear(clearCommand.slice(0, index));
          timeoutId = window.setTimeout(typeClear, 45);
        } else {
          timeoutId = window.setTimeout(() => {
            if (isMounted) setStage('CLEAR_ENTER');
          }, 220);
        }
      };

      timeoutId = window.setTimeout(typeClear, 150);
    }

    // Sequence 9: Clear command executed (Enter key simulation)
    else if (stage === 'CLEAR_ENTER') {
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('CLEARED');
      }, 200);
    }

    // Sequence 10: Screen is cleared, pause briefly before summary typewriter
    else if (stage === 'CLEARED') {
      timeoutId = window.setTimeout(() => {
        if (isMounted) setStage('TYPE_SUMMARY');
      }, 250);
    }

    return () => {
      isMounted = false;
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [stage, worktreeCommand, cdCommand, dockerCommand, clearCommand, sessionKey]);

  // Initial prompt in portfolio root
  const initialPrompt = (
    <span className="inline-block whitespace-nowrap">
      <span className="text-[#38e54d] font-bold">{personalInfo.terminalUser}@{personalInfo.terminalHost}</span>
      <span className="text-slate-400">:</span>
      <span className="text-[#38bdf8] font-bold">~/portfolio</span>
      <span className="text-slate-300 mr-2">$</span>
    </span>
  );

  // Prompt inside git working tree
  const worktreePrompt = (
    <span className="inline-block whitespace-nowrap">
      <span className="text-[#38e54d] font-bold">{personalInfo.terminalUser}@{personalInfo.terminalHost}</span>
      <span className="text-slate-400">:</span>
      <span className="text-[#38bdf8] font-bold">~/feature-say-hello</span>
      <span className="text-fuchsia-400 text-xs font-mono mx-1 flex-inline items-center">
        (feature/add-say-hello)
      </span>
      <span className="text-slate-300 mr-2">$</span>
    </span>
  );

  // Container prompt inside dev container
  const containerPrompt = (
    <span className="inline-block whitespace-nowrap">
      <span className="text-[#38e54d] font-bold">{personalInfo.containerUser}</span>
      <span className="text-slate-400">:</span>
      <span className="text-[#38bdf8] font-bold">{personalInfo.containerMount}</span>
      <span className="text-slate-300 mr-2">#</span>
    </span>
  );

  const isPastCd = stage !== 'TYPE_WORKTREE' && stage !== 'WORKTREE_OUTPUT' && stage !== 'TYPE_CD';
  const isInContainer =
    stage === 'CONTAINER_READY' ||
    stage === 'TYPE_CLEAR' ||
    stage === 'CLEAR_ENTER' ||
    stage === 'CLEARED' ||
    stage === 'TYPE_SUMMARY';
  const isCleared = stage === 'CLEARED' || stage === 'TYPE_SUMMARY';

  // Dynamic tab label
  let activeTabTitle = `${personalInfo.terminalUser}@${personalInfo.terminalHost}: ~/portfolio`;
  if (isInContainer) {
    activeTabTitle = `[Dev Container] candidate-profile: /portfolio`;
  } else if (isPastCd) {
    activeTabTitle = `${personalInfo.terminalUser}@${personalInfo.terminalHost}: ~/feature-say-hello`;
  }

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

          {/* Active Tab */}
          <div className="flex items-center space-x-2 px-3 py-1 rounded bg-[#101114] border border-[#33353e] text-slate-200 text-xs font-mono shadow-sm">
            {isInContainer ? (
              <Box className="w-3.5 h-3.5 text-cyan-400 animate-pulse flex-shrink-0" />
            ) : isPastCd ? (
              <GitBranch className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0" />
            ) : (
              <Terminal className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            )}
            <span className="truncate max-w-[170px] sm:max-w-[280px]">
              {activeTabTitle}
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
        {/* Phantom Layer 1: Establishes exact responsive height for pre-clear startup sequence */}
        <div
          className="col-start-1 row-start-1 font-mono text-sm md:text-base leading-relaxed invisible select-none pointer-events-none break-words space-y-2"
          aria-hidden="true"
        >
          <div>
            <span className="inline-block whitespace-nowrap mr-2">{initialPrompt}</span>
            <span>{worktreeCommand}</span>
          </div>
          <div className="space-y-0.5 text-xs sm:text-sm text-slate-400 pl-2 border-l border-slate-700/60 my-0.5">
            {WORKTREE_LOGS.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div>
            <span className="inline-block whitespace-nowrap mr-2">{initialPrompt}</span>
            <span>{cdCommand}</span>
          </div>
          <div>
            <span className="inline-block whitespace-nowrap mr-2">{worktreePrompt}</span>
            <span>{dockerCommand}</span>
          </div>
          <div className="space-y-0.5 text-xs sm:text-sm pl-2 border-l border-cyan-500/30 my-1 py-1.5">
            {DOCKER_LOGS.map((log, i) => (
              <div key={i}>{log.text}</div>
            ))}
          </div>
          <div>
            <span className="inline-block whitespace-nowrap mr-2">{containerPrompt}</span>
            <span>{clearCommand}</span>
          </div>
          <div className="h-6 sm:h-8" aria-hidden="true" />
        </div>

        {/* Phantom Layer 2: Establishes exact responsive height for post-clear summary sequence */}
        <div
          className="col-start-1 row-start-1 font-mono text-sm md:text-base leading-relaxed invisible select-none pointer-events-none break-words space-y-2"
          aria-hidden="true"
        >
          <div className="pt-1">
            <span className="inline-block whitespace-nowrap mr-2">{containerPrompt}</span>
            {personalInfo.introBio.split(' ').map((word, idx) => (
              <React.Fragment key={idx}>
                <span className="inline-block whitespace-nowrap">{word}</span>
                <span> </span>
              </React.Fragment>
            ))}
            <span className="inline-block w-2 h-4 ml-1 align-middle" />
          </div>
          <div className="h-6 sm:h-8" aria-hidden="true" />
        </div>

        {/* Active Animated Layer */}
        <div
          key={sessionKey}
          className="col-start-1 row-start-1 font-mono text-sm md:text-base leading-relaxed space-y-2"
        >
          {!isCleared ? (
            <>
              {/* Step 1: Workstation git worktree command */}
              <div>
                <span className="inline-block whitespace-nowrap mr-2 select-none">
                  {initialPrompt}
                </span>
                <span className="text-slate-200">{typedWorktree}</span>
                {stage === 'TYPE_WORKTREE' && (
                  <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
                )}
              </div>

              {/* Step 2: Git worktree output */}
              {showWorktreeOutput && (
                <div className="space-y-0.5 text-xs sm:text-sm text-slate-400 pl-2 border-l border-slate-700/60 my-0.5">
                  {WORKTREE_LOGS.map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              )}

              {/* Step 3: cd command into working tree */}
              {showWorktreeOutput && (
                <div>
                  <span className="inline-block whitespace-nowrap mr-2 select-none">
                    {initialPrompt}
                  </span>
                  <span className="text-slate-200">{typedCd}</span>
                  {stage === 'TYPE_CD' && (
                    <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
                  )}
                </div>
              )}

              {/* Step 4: Docker command in working tree */}
              {isPastCd && (
                <div>
                  <span className="inline-block whitespace-nowrap mr-2 select-none">
                    {worktreePrompt}
                  </span>
                  <span className="text-slate-200">{typedDocker}</span>
                  {stage === 'TYPE_DOCKER' && (
                    <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
                  )}
                </div>
              )}

              {/* Step 5: Docker Pull & Container Boot Output Logs */}
              {visibleDockerLogsCount > 0 && (
                <div className="space-y-0.5 text-xs sm:text-sm pl-2 border-l border-cyan-500/30 my-1 bg-black/30 py-1.5 rounded-r">
                  {DOCKER_LOGS.slice(0, visibleDockerLogsCount).map((log, idx) => (
                    <div key={idx} className={`${log.color} font-mono tracking-wide`}>
                      {log.text}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6: Dev Container Prompt & Animate User Typing 'clear' */}
              {isInContainer && (
                <div>
                  <span className="inline-block whitespace-nowrap mr-2 select-none">
                    {containerPrompt}
                  </span>
                  <span className="text-slate-200">{typedClear}</span>
                  {(stage === 'CONTAINER_READY' || stage === 'TYPE_CLEAR' || stage === 'CLEAR_ENTER') && (
                    <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
                  )}
                </div>
              )}
            </>
          ) : (
            /* Step 7: Cleared Dev Container & Professional Summary Typewriter */
            <div className="pt-1">
              {stage === 'CLEARED' ? (
                <div>
                  <span className="inline-block whitespace-nowrap mr-2 select-none">
                    {containerPrompt}
                  </span>
                  <span className="animate-pulse inline-block w-2 h-4 bg-cyan-400 ml-0.5 align-middle" />
                </div>
              ) : (
                <TypewriterText
                  text={personalInfo.introBio}
                  prompt={containerPrompt}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
