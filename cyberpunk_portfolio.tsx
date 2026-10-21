import React, { useState, useEffect } from 'react';
import { 
  Terminal, Github, Linkedin, Mail, Cpu, ExternalLink, 
  Database, Network, Shield, Code, ChevronRight, Zap, 
  Server, MonitorPlay, Activity 
} from 'lucide-react';

// --- CUSTOM CSS FOR CYBERPUNK EFFECTS ---
const customStyles = `
  .microdot-bg {
    background-color: #050505;
    background-image: radial-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px);
    background-size: 24px 24px;
  }
  
  .glass-panel {
    background: rgba(10, 15, 25, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(34, 211, 238, 0.2);
  }

  .neon-text-cyan {
    text-shadow: 0 0 5px rgba(34, 211, 238, 0.5), 0 0 20px rgba(34, 211, 238, 0.3);
  }

  .neon-text-magenta {
    text-shadow: 0 0 5px rgba(217, 70, 239, 0.5), 0 0 20px rgba(217, 70, 239, 0.3);
  }

  .neon-border-cyan:hover {
    box-shadow: 0 0 15px rgba(34, 211, 238, 0.4), inset 0 0 10px rgba(34, 211, 238, 0.2);
    border-color: rgba(34, 211, 238, 0.8);
  }
  
  .neon-border-lime:hover {
    box-shadow: 0 0 15px rgba(163, 230, 53, 0.4), inset 0 0 10px rgba(163, 230, 53, 0.2);
    border-color: rgba(163, 230, 53, 0.8);
  }

  .scanline {
    width: 100%;
    height: 100px;
    z-index: 50;
    position: absolute;
    pointer-events: none;
    background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(34, 211, 238, 0.1) 50%, rgba(255,255,255,0));
    opacity: 0.1;
    animation: scan 8s linear infinite;
  }

  @keyframes scan {
    0% { top: -100px; }
    100% { top: 100%; }
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #050505; }
  ::-webkit-scrollbar-thumb { background: rgba(34, 211, 238, 0.3); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(34, 211, 238, 0.6); }
`;

// --- DATA STRUCTURES ---
const journeyData = [
  {
    phase: "Phase 4: Agentic AI & Community Impact",
    date: "Present",
    color: "cyan",
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    details: [
      "Completed Hire-Human Agentic Engineer cohort, mastering multi-agent orchestration, MCP servers, and eval-gated CI/CD pipelines.",
      "Founded KC Optimal Computing LLC, deploying open-source AI to eliminate SaaS costs for local nonprofits."
    ]
  },
  {
    phase: "Phase 3: Enterprise Architecture & LaunchCode",
    date: "2026",
    color: "magenta",
    icon: <Server className="w-5 h-5 text-fuchsia-400" />,
    details: [
      "Graduated LaunchCode FlexPath Full-Stack Software Development cohort (Java, Spring Boot, MySQL, Agile).",
      "Earned Foundational C# with Microsoft Developer Certification (Object-oriented .NET console apps).",
      "Expanded capabilities via Google Data Analytics & Business Intelligence Professional Certificates."
    ]
  },
  {
    phase: "Phase 2: The Self-Directed Engineering Curriculum",
    date: "2024 - 2025",
    color: "lime",
    icon: <Code className="w-5 h-5 text-lime-400" />,
    details: [
      "Mastered algorithms/data structures via freeCodeCamp's Python & JavaScript certifications.",
      "Solidified systems admin, Linux CLI, and networking via Google IT Support Professional Certificate.",
      "Developed prompt engineering frameworks through Vanderbilt University's specialization."
    ]
  },
  {
    phase: "Phase 1: Hardware Roots & Systems Diagnostics",
    date: "2005 - 2020",
    color: "cyan",
    icon: <MonitorPlay className="w-5 h-5 text-cyan-400" />,
    details: [
      "Served as IT Supervisor at Elevate Missouri, conducting root-cause analysis on multi-site hardware incidents.",
      "Designed offline-capable timekeeping APIs, saving 2.5 hours of weekly administrative overhead.",
      "Graduated early with focus on business administration, PC hardware assembly, and digital gaming environments."
    ]
  }
];

const projectsData = [
  {
    title: "Builder's Box",
    subtitle: "LaunchCode Capstone",
    description: "Implemented automated unit/integration test suites validating service-layer business logic and JPA rules. Executed load tests to measure throughput and configured CI/CD workflows.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "JUnit", "JMeter", "GitHub Actions"],
    link: "https://github.com/Nick040791/Builders-Box",
    accent: "cyan"
  },
  {
    title: "Client-Facing Portal",
    subtitle: "KC Optimal Computing",
    description: "Designed and deployed end-to-end web applications supporting active mission-driven organizations. Integrated schema validation and automated API contract checks.",
    tech: ["Next.js", "TypeScript", "React", "Node.js", "Python", "Cloudflare", "Docker"],
    link: "https://kcoptimalcomputing.com",
    accent: "lime"
  },
  {
    title: "BootyByBeighley",
    subtitle: "Collaborative Full-Stack App",
    description: "Collaborative engineering effort focusing on robust backend architecture and responsive user interfaces.",
    tech: ["Full-Stack", "JavaScript", "UI/UX"],
    link: "https://github.com/adam035827/BootyByBeighley",
    accent: "magenta"
  },
  {
    title: "Dictator & Alex",
    subtitle: "Systems & Logic Tools",
    description: "Custom built repositories exploring hardware-adjacent logic, system administration scripts, and foundational problem-solving applications.",
    tech: ["System Scripts", "Algorithms", "Logic"],
    link: "https://github.com/Nick040791/Dictator",
    accent: "cyan"
  }
];

const credentialsData = {
  software: {
    title: "Software Engineering & Architecture",
    icon: <Code className="w-6 h-6" />,
    color: "cyan",
    certs: [
      { name: "Full-Stack Software Development", issuer: "Launch Code", date: "10/2026" },
      { name: "Foundational C# with Microsoft", issuer: "freeCodeCamp", date: "10/2026" },
      { name: "JavaScript Algorithms & Data Structures", issuer: "freeCodeCamp", date: "02/2025" },
      { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "01/2025" },
      { name: "Scientific Computing with Python", issuer: "freeCodeCamp", date: "08/2024" }
    ]
  },
  ai: {
    title: "Agentic AI & Prompt Engineering",
    icon: <Cpu className="w-6 h-6" />,
    color: "magenta",
    certs: [
      { name: "Agentic Engineer Certificate", issuer: "Hire-Human / Launch Code", date: "10/2026" },
      { name: "Google AI Professional", issuer: "MDHEWD Coursera", date: "10/2026" },
      { name: "Prompt Engineering Specialization", issuer: "Vanderbilt University", date: "08/2025" }
    ]
  },
  data: {
    title: "Data Analytics & IT Infrastructure",
    icon: <Database className="w-6 h-6" />,
    color: "lime",
    certs: [
      { name: "Google Business Intelligence", issuer: "MDHEWD Coursera", date: "10/2026" },
      { name: "Google Data Analytics", issuer: "MDHEWD Coursera", date: "10/2026" },
      { name: "Google IT Support Professional", issuer: "MDHEWD Coursera", date: "09/2025" }
    ]
  }
};

// --- COMPONENTS ---

const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let index = 0;
    setDisplayedText(""); // Reset
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20); // Typing speed
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="font-mono text-slate-300 leading-relaxed text-sm md:text-base">
      <span className="text-lime-400 mr-2">root@local:~#</span>
      {displayedText}
      <span className="animate-pulse inline-block w-2 h-5 bg-cyan-400 ml-1 align-middle"></span>
    </span>
  );
};

export default function App() {
  const [activeCore, setActiveCore] = useState('software');

  return (
    <div className="min-h-screen text-slate-200 microdot-bg relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 font-sans">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="scanline" />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 glass-panel border-b-0 border-t-0 border-l-0 border-r-0 border-b-cyan-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
            <span className="font-mono font-bold text-lg tracking-widest neon-text-cyan">NB_SYS_ADMIN</span>
          </div>
          <div className="hidden md:flex space-x-6 font-mono text-sm text-cyan-500/70">
            <a href="#journey" className="hover:text-cyan-400 transition-colors cursor-pointer">/JOURNEY</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors cursor-pointer">/PROJECTS</a>
            <a href="#credentials" className="hover:text-cyan-400 transition-colors cursor-pointer">/DATA_CORE</a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32">
        
        {/* --- HERO SECTION --- */}
        <section className="relative z-10 flex flex-col md:flex-row items-center gap-12 min-h-[70vh]">
          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <p className="font-mono text-cyan-500 tracking-widest text-sm uppercase">/// Sys_Ready : Location(Kansas_City_MO)</p>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
                Nicholas <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Beighley</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-slate-400 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">
                Full-Stack Software & <span className="text-lime-400">Agentic Engineer</span>
              </h2>
            </div>

            {/* Terminal Window */}
            <div className="glass-panel rounded-lg overflow-hidden border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.1)] relative">
              <div className="bg-black/60 px-4 py-2 border-b border-cyan-500/20 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="font-mono text-xs text-slate-500 ml-4">bash - _init_profile.sh</span>
              </div>
              <div className="p-6">
                <TypewriterText text="Full-stack software engineer with an IT root-cause analysis background, experienced in engineering full-stack applications across Java, Spring Boot, SQL, and React. Bridges development and quality engineering by automating REST API test suites, benchmarking system throughput and latency, as well as leveraging AI tools to generate edge-case test coverage. LaunchCode Full-Stack graduate committed to delivering robust code and continuous system stability." />
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://github.com/Nick040791" target="_blank" rel="noreferrer" 
                 className="flex items-center space-x-2 px-6 py-3 glass-panel rounded-md text-cyan-400 font-mono text-sm uppercase tracking-wider neon-border-cyan transition-all duration-300">
                <Github className="w-4 h-4" />
                <span>GitHub_Access</span>
              </a>
              <a href="https://www.linkedin.com/in/nicholas-beighley-00a45a322" target="_blank" rel="noreferrer" 
                 className="flex items-center space-x-2 px-6 py-3 glass-panel rounded-md text-fuchsia-400 font-mono text-sm uppercase tracking-wider hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] transition-all duration-300">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn_Node</span>
              </a>
              <a href="mailto:Nick040791@gmail.com" 
                 className="flex items-center space-x-2 px-6 py-3 glass-panel rounded-md text-lime-400 font-mono text-sm uppercase tracking-wider neon-border-lime transition-all duration-300">
                <Mail className="w-4 h-4" />
                <span>Ping_Comm</span>
              </a>
            </div>
          </div>
          
          {/* Abstract Hero Graphic */}
          <div className="hidden md:flex flex-1 justify-center relative">
            <div className="w-72 h-72 rounded-full border border-dashed border-cyan-500/30 animate-[spin_60s_linear_infinite] absolute"></div>
            <div className="w-56 h-56 rounded-full border border-fuchsia-500/30 animate-[spin_40s_linear_infinite_reverse] absolute"></div>
            <div className="w-40 h-40 glass-panel rounded-full flex items-center justify-center relative z-10 shadow-[0_0_40px_rgba(34,211,238,0.2)]">
              <Shield className="w-16 h-16 text-cyan-400" />
            </div>
          </div>
        </section>

        {/* --- DEVELOPER JOURNEY TIMELINE --- */}
        <section id="journey" className="relative z-10">
          <div className="flex items-center space-x-4 mb-12">
            <Network className="w-8 h-8 text-fuchsia-500" />
            <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">System_Trace<span className="text-fuchsia-500">::Journey</span></h2>
          </div>

          <div className="relative border-l-2 border-dashed border-slate-700 ml-4 md:ml-8 space-y-12 pb-8">
            {journeyData.map((item, index) => (
              <div key={index} className="relative pl-10 md:pl-16 group">
                {/* Glowing Node */}
                <div className={`absolute -left-[21px] top-1 p-2 rounded-full bg-[#050505] border-2 border-${item.color}-500 shadow-[0_0_10px_currentColor] text-${item.color}-500 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_currentColor]`}>
                  {item.icon}
                </div>
                
                <div className={`glass-panel p-6 rounded-lg border-l-4 border-${item.color}-500 transition-all duration-300 hover:bg-white/10`}>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-bold text-white group-hover:text-${item.color}-400 transition-colors`}>{item.phase}</h3>
                    <span className={`font-mono text-sm text-${item.color}-400/80 px-3 py-1 rounded-full bg-${item.color}-500/10`}>{item.date}</span>
                  </div>
                  <ul className="space-y-3">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-slate-400">
                        <ChevronRight className={`w-5 h-5 mt-0.5 text-${item.color}-500/50 flex-shrink-0`} />
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- FEATURED PROJECTS GRID --- */}
        <section id="projects" className="relative z-10">
          <div className="flex items-center space-x-4 mb-12">
            <Code className="w-8 h-8 text-lime-400" />
            <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">Active_Modules<span className="text-lime-400">::Projects</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, idx) => (
              <div key={idx} className={`glass-panel rounded-xl p-8 flex flex-col justify-between group transition-all duration-500 border-t-2 border-t-${project.accent}-500/30 hover:-translate-y-2 relative overflow-hidden`}>
                
                {/* Background glow effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-${project.accent}-500 to-transparent transition-opacity duration-500`}></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <p className={`font-mono text-sm text-${project.accent}-400 uppercase tracking-wider`}>{project.subtitle}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:neon-text-cyan transition-all">{project.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 relative z-10 mt-auto pt-6 border-t border-white/5">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`text-xs font-mono px-2 py-1 rounded bg-black/50 border border-${project.accent}-500/20 text-${project.accent}-400`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- VERIFIED CREDENTIALS DATA CORE --- */}
        <section id="credentials" className="relative z-10 pb-20">
          <div className="flex items-center space-x-4 mb-12">
            <Database className="w-8 h-8 text-cyan-400" />
            <h2 className="text-3xl font-bold font-mono tracking-widest uppercase">Data_Core<span className="text-cyan-400">::Credentials</span></h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Core Terminals (Tabs) */}
            <div className="flex flex-col gap-4 lg:w-1/3">
              {Object.keys(credentialsData).map((key) => {
                const data = credentialsData[key];
                const isActive = activeCore === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCore(key)}
                    className={`flex items-center space-x-4 p-4 rounded-lg border text-left transition-all duration-300 ${
                      isActive 
                        ? `bg-${data.color}-500/10 border-${data.color}-400 shadow-[0_0_20px_rgba(var(--tw-colors-${data.color}-500),0.2)]` 
                        : 'glass-panel border-white/10 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    <div className={`p-3 rounded-md ${isActive ? `bg-${data.color}-500/20 text-${data.color}-400` : 'bg-black/50 text-slate-500'}`}>
                      {data.icon}
                    </div>
                    <div>
                      <div className="font-mono text-xs text-slate-500 uppercase tracking-widest mb-1">Sector_{key}</div>
                      <div className={`font-bold ${isActive ? 'text-white' : 'text-slate-400'}`}>{data.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Core Output (Certificate Grid) */}
            <div className="lg:w-2/3 glass-panel rounded-xl border border-white/10 p-1 relative overflow-hidden min-h-[400px] flex flex-col">
              
              {/* Terminal Header */}
              <div className="bg-black/80 px-6 py-3 border-b border-white/5 flex justify-between items-center z-10 relative">
                <span className="font-mono text-sm text-slate-400">SELECT * FROM certs WHERE sector='{activeCore}'</span>
                <span className="flex space-x-1">
                  <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-75"></span>
                  <span className="w-2 h-2 rounded-full bg-slate-700 animate-pulse delay-150"></span>
                </span>
              </div>

              {/* Data Chips Grid */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 z-10 relative flex-1">
                {credentialsData[activeCore].certs.map((cert, idx) => (
                  <div key={idx} className={`glass-panel p-5 rounded border border-${credentialsData[activeCore].color}-500/20 hover:border-${credentialsData[activeCore].color}-400 hover:shadow-[0_0_15px_rgba(var(--tw-colors-${credentialsData[activeCore].color}-500),0.3)] transition-all duration-300 group`}>
                    <div className="flex justify-between items-start mb-3">
                      <Zap className={`w-5 h-5 text-${credentialsData[activeCore].color}-500/50 group-hover:text-${credentialsData[activeCore].color}-400 transition-colors`} />
                      <span className={`font-mono text-xs px-2 py-1 bg-black/60 text-${credentialsData[activeCore].color}-400 rounded`}>{cert.date}</span>
                    </div>
                    <h4 className="font-bold text-slate-200 mb-1 leading-tight group-hover:text-white transition-colors">{cert.name}</h4>
                    <p className="text-sm font-mono text-slate-500 uppercase">{cert.issuer}</p>
                  </div>
                ))}
              </div>
              
              {/* Background ambient glow based on active core */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-${credentialsData[activeCore].color}-500/5 blur-[100px] pointer-events-none transition-colors duration-1000`}></div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 bg-black/80 py-8 relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span className="font-mono text-slate-500 text-sm uppercase">Nicholas Beighley // 2026 // End_Of_File</span>
          </div>
          <div className="flex space-x-6 text-slate-500">
            <a href="https://github.com/Nick040791" className="hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/nicholas-beighley-00a45a322" className="hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}