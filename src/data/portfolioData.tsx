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
  brandTitle: "NB_ENGINEER",
  terminalUser: "nicholas-beighley",
  terminalHost: "workstation",
  gitWorktreeCommand: "git worktree add -b feature/add-say-hello ../feature-say-hello",
  gitCdCommand: "cd ../feature-say-hello",
  dockerCommand: "docker run -it --name candidate-profile portfolio",
  containerUser: "root@candidate-profile",
  containerMount: "/portfolio",
  introBio: "Full-stack software engineer with an IT root-cause analysis background, experienced in engineering full-stack applications across Java, Spring Boot, SQL, and React. Bridges development and quality engineering by automating REST API test suites, benchmarking system throughput and latency, as well as leveraging AI tools to generate edge-case test coverage. LaunchCode Full-Stack graduate committed to delivering robust code and continuous system stability.",
  links: {
    github: "https://github.com/Nick040791",
    linkedin: "https://www.linkedin.com/in/nicholas-beighley-00a45a322",
    email: "mailto:Nick040791@gmail.com",
    freecodecamp: "https://www.freecodecamp.org/mrnicholasb",
    launchcode: "https://www.launchcode.org/",
    mdhewd: "https://dhewd.mo.gov/"
  }
};

export const navLinks = [
  { label: "/CAREER_PATH", href: "#journey" },
  { label: "/PROJECTS", href: "#projects" },
  { label: "/CREDENTIALS", href: "#credentials" }
];

export const journeyData: JourneyItem[] = [
  {
    phase: "Phase 4: Agentic AI & Community Impact",
    date: "Present",
    color: "cyan",
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
    telemetryTag: "AGENTIC_AI // MULTI_AGENT_ORCHESTRATION",
    commitHash: "a4f8e91",
    branch: "main",
    tag: "v4.0.0-agentic",
    scope: "Agentic AI & Non-Profit Infrastructure",
    isCurrent: true,
    tech: ["Multi-Agent Orchestration", "MCP Servers", "Eval-Gated CI/CD", "Local AI Inference", "Python"],
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
    telemetryTag: "ENTERPRISE // FULL_STACK_JAVA_SPRING",
    commitHash: "7c28d15",
    branch: "release/v3.0",
    tag: "v3.0.0-launchcode",
    scope: "Full-Stack Software Development",
    tech: ["Java", "Spring Boot", "MySQL", "C# .NET", "Agile", "Business Intelligence"],
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
    telemetryTag: "CORE_CS // ALGORITHMS_SYSTEMS",
    commitHash: "e9102ab",
    branch: "feature/curriculum",
    tag: "v2.0.0-foundation",
    scope: "Computer Science & Systems Fundamentals",
    tech: ["Python", "JavaScript", "Linux CLI", "Networking", "Data Structures", "Algorithms"],
    details: [
      "Mastered algorithms/data structures via freeCodeCamp's Python & JavaScript certifications.",
      "Solidified Linux CLI, networking protocols, and systems infrastructure via Google IT Support Professional Certificate.",
      "Developed prompt engineering frameworks through Vanderbilt University's specialization."
    ]
  },
  {
    phase: "Phase 1: Hardware Roots & Systems Diagnostics",
    date: "2005 - 2020",
    color: "cyan",
    icon: <MonitorPlay className="w-5 h-5 text-cyan-400" />,
    telemetryTag: "HARDWARE_ROOTS // ROOT_CAUSE_DIAGNOSTICS",
    commitHash: "0128cf3",
    branch: "init/hardware-bedrock",
    tag: "v1.0.0-init",
    scope: "Systems Diagnostics & Infrastructure",
    tech: ["PC Hardware Assembly", "System Diagnostics", "Root-Cause Analysis", "Offline APIs", "Linux Admin"],
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
    subtitle: "LaunchCode Capstone // QA Automated Pipeline",
    description: "Engineered automated unit/integration test suites validating service-layer business logic and JPA relational persistence. Executed JMeter load tests benchmarking throughput and latency under concurrent traffic, enforced with automated GitHub Actions CI/CD pipelines.",
    tech: ["Java", "Spring Boot", "React", "MySQL", "JUnit", "JMeter", "GitHub Actions", "Maven"],
    link: "https://github.com/Nick040791/Builders-Box",
    githubUrl: "https://github.com/Nick040791/Builders-Box",
    containerPort: ":8080/tcp",
    statusBadge: "HEALTHY // CI_CD_PASSING",
    systemMetrics: "mvn test: 100% passing | JMeter p95 latency: 18ms",
    accent: "lime"
  },
  {
    title: "Client-Facing Portal",
    subtitle: "KC Optimal Computing LLC // Production Systems",
    description: "Architected and deployed production web applications supporting mission-driven local non-profits. Integrated open-source AI models eliminating SaaS subscription costs, schema validation, and automated API contract checks.",
    tech: ["Next.js", "TypeScript", "React", "Node.js", "Python", "Cloudflare", "Docker"],
    link: "https://kcoptimalcomputing.com",
    liveUrl: "https://kcoptimalcomputing.com",
    containerPort: ":443/https",
    statusBadge: "DEPLOYED // 0_SAAS_OVERHEAD",
    systemMetrics: "Edge Cached (Cloudflare) | SSL A+ | 100% Uptime",
    accent: "lime"
  },
  {
    title: "BootyByBeighley",
    subtitle: "Collaborative Full-Stack App // Responsive UI",
    description: "Full-stack web application developed collaboratively with high emphasis on robust backend architecture, component reusability, and responsive user interfaces.",
    tech: ["JavaScript", "Full-Stack", "CSS3", "Git Collaboration", "UI/UX"],
    link: "https://github.com/adam035827/BootyByBeighley",
    githubUrl: "https://github.com/adam035827/BootyByBeighley",
    containerPort: ":3000/tcp",
    statusBadge: "ACTIVE // COLLAB_MERGED",
    systemMetrics: "Branch PRs: Reviewed & Merged | Component Architecture",
    accent: "lime"
  },
  {
    title: "Dictator & Alex",
    subtitle: "Systems & Hardware-Adjacent Logic Tools",
    description: "Custom built toolchains and automation scripts exploring low-level hardware diagnostics, system automation utilities, and foundational algorithmic problem-solving.",
    tech: ["System Scripts", "Algorithms", "Bash CLI", "Hardware Logic"],
    link: "https://github.com/Nick040791/Dictator",
    githubUrl: "https://github.com/Nick040791/Dictator",
    containerPort: ":sh/cron",
    statusBadge: "COMPILED // ROOT_CAUSE_TOOLS",
    systemMetrics: "POSIX compliant | Low-overhead shell & logic routines",
    accent: "lime"
  }
];

export const credentialsData: CredentialsData = {
  software: {
    title: "Software Engineering & Architecture",
    icon: <Code className="w-6 h-6" />,
    color: "cyan",
    certs: [
      {
        name: "Full-Stack Software Development",
        issuer: "LaunchCode",
        date: "10/2026",
        logoId: "launchcode",
        credentialId: "LC-2026-FSD-098",
        skills: ["Java", "Spring Boot", "MySQL", "Agile", "REST APIs"],
        verifyUrl: "/certificates/LaunchCode_Certificate_Nicholas_Beighley.pdf"
      },
      {
        name: "Foundational C# with Microsoft",
        issuer: "freeCodeCamp / Microsoft",
        date: "10/2026",
        logoId: "microsoft",
        credentialId: "FCC-MSFT-C814",
        skills: ["C#", ".NET", "OOP", "Console Apps"],
        verifyUrl: "https://www.freecodecamp.org/certification/mrnicholasb/foundational-c-sharp-with-microsoft"
      },
      {
        name: "JavaScript Algorithms & Data Structures",
        issuer: "freeCodeCamp",
        date: "02/2025",
        logoId: "freecodecamp",
        credentialId: "FCC-JS-9023",
        skills: ["ES6+", "Data Structures", "Algorithms", "Debugging"],
        verifyUrl: "https://www.freecodecamp.org/certification/mrnicholasb/javascript-algorithms-and-data-structures-v8"
      },
      {
        name: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "01/2025",
        logoId: "freecodecamp",
        credentialId: "FCC-RWD-4190",
        skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Accessibility"],
        verifyUrl: "https://www.freecodecamp.org/certification/mrnicholasb/responsive-web-design"
      },
      {
        name: "Scientific Computing with Python",
        issuer: "freeCodeCamp",
        date: "08/2024",
        logoId: "python",
        credentialId: "FCC-PY-7712",
        skills: ["Python", "Algorithms", "Data Processing", "Complexity"],
        verifyUrl: "https://www.freecodecamp.org/certification/mrnicholasb/scientific-computing-with-python-v7"
      }
    ]
  },
  ai: {
    title: "Agentic AI & Prompt Engineering",
    icon: <Cpu className="w-6 h-6" />,
    color: "magenta",
    certs: [
      {
        name: "Agentic Engineer Certificate",
        issuer: "Hire-Human / LaunchCode",
        date: "10/2026",
        logoId: "hirehuman",
        credentialId: "HH-AIE-2026-04",
        skills: ["Multi-Agent Orchestration", "MCP Protocols", "Eval-Gated CI/CD"]
      },
      {
        name: "Google AI Professional",
        issuer: "Google / MDHEWD Coursera",
        date: "10/2026",
        logoId: "google",
        credentialId: "GOOG-AI-9914",
        skills: ["Generative AI", "LLM Integration", "Prompt Engineering"],
        verifyUrl: "https://coursera.org/share/b4ed3ddaca3a81a71d858c3f00c57851"
      },
      {
        name: "Prompt Engineering Specialization",
        issuer: "Vanderbilt University",
        date: "08/2025",
        logoId: "vanderbilt",
        credentialId: "VAND-PE-5501",
        skills: ["Few-Shot Prompting", "Chain-of-Thought", "Task Decomposition"],
        verifyUrl: "https://coursera.org/share/dad0317dd1c1b26ffc44b1fcb8972ca6"
      }
    ]
  },
  data: {
    title: "Data Analytics & IT Infrastructure",
    icon: <Database className="w-6 h-6" />,
    color: "lime",
    certs: [
      {
        name: "Google Business Intelligence",
        issuer: "Google / MDHEWD Coursera",
        date: "10/2026",
        logoId: "google",
        credentialId: "GOOG-BI-3381",
        skills: ["BigQuery", "Tableau", "SQL Pipelines", "BI Dashboards"],
        verifyUrl: "https://coursera.org/share/1125e50bd079c5368fd1d2254395b06d"
      },
      {
        name: "Google Data Analytics",
        issuer: "Google / MDHEWD Coursera",
        date: "10/2026",
        logoId: "google",
        credentialId: "GOOG-DA-1102",
        skills: ["R Programming", "SQL", "Data Cleaning", "Data Visualization"],
        verifyUrl: "https://coursera.org/share/0319f37daccf9569190fb9fd8fa3ecdd"
      },
      {
        name: "Google IT Support Professional",
        issuer: "Google / MDHEWD Coursera",
        date: "09/2025",
        logoId: "google",
        credentialId: "GOOG-IT-8840",
        skills: ["Linux CLI", "Networking Protocols", "Security", "Hardware Diagnostics"],
        verifyUrl: "https://coursera.org/share/50295152e349a72b9942aac69f38cbb8"
      }
    ]
  }
};
