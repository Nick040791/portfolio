import { Cpu, Server, Code, MonitorPlay, Database } from 'lucide-react';
import { JourneyItem, ProjectItem, CredentialsData } from '../types/portfolio';

export const personalInfo = {
  name: "Nicholas",
  lastName: "Beighley",
  rolePrefix: "Full-Stack Software &",
  roleHighlight: "Agentic Engineer",
  systemLocation: "Location(Kansas_City_MO)",
  systemStatus: "Sys_Ready",
  systemPrompt: "bash - _init_profile.sh",
  terminalUser: "nicholas-beighley",
  terminalHost: "workstation",
  gitWorktreeCommand: "git worktree add -b feature/add-say-hello ../feature-say-hello",
  gitCdCommand: "cd ../feature-say-hello",
  dockerCommand: "docker run -it --name candidate-profile portfolio",
  containerUser: "root@candidate-profile",
  containerMount: "/portfolio",
  introBio: "Systems-minded engineer combining hands-on hardware integration with full-stack software development to build local AI infrastructure and community-focused tech solutions. Experienced in architecting custom workstation builds for on-premise AI inference, engineering reliable open-source platforms for non-profit partners, and volunteering technical support to eliminate infrastructure overhead.",
  links: {
    github: "https://github.com/Nick040791",
    linkedin: "https://www.linkedin.com/in/nicholas-beighley-00a45a322",
    email: "mailto:Nick040791@gmail.com"
  }
};

export const navLinks = [
  { label: "/JOURNEY", href: "#journey" },
  { label: "/PROJECTS", href: "#projects" },
  { label: "/DATA_CORE", href: "#credentials" }
];

export const journeyData: JourneyItem[] = [
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

export const projectsData: ProjectItem[] = [
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

export const credentialsData: CredentialsData = {
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
