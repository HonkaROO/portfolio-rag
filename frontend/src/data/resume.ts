export const profile = {
  name: "Christian Paul Gumanit",
  title: "Software Engineer",
  location: "Lapu-lapu City, Cebu",
  email: "christiangumanit@gmail.com",
  linkedin: "https://www.linkedin.com/in/christian-gumanit/",
  summary:
    "Strategic and results-oriented Software Engineer and Certified Microsoft Azure AI Engineer Associate with a specialized focus on AI development and web application architecture. Proven expertise architecting production-ready systems with ASP.NET Core, Laravel, and FastAPI. Google Certified Project Manager with a track record of leading Agile teams through the full project lifecycle.",
};

export const experience = [
  {
    role: "Software Engineer",
    company: "N-PAX Cebu Corporation, Inc.",
    period: "August 2025 – Present",
    bullets: [
      "Architected a full-stack Onboarding System featuring a RAG-powered AI chatbot to automate information retrieval and streamline orientation for new employees.",
      "Orchestrated end-to-end development of a corporate RAG chatbot as a Certified Azure AI Engineer Associate, enabling automated retrieval of company data for high-level partner presentations.",
      "Managed an Azure-focused technical team's growth and training, establishing a certification roadmap toward Microsoft Solutions Partner status.",
      "Served as Project Manager for a cross-functional team building a file management platform, from task assignment to technical documentation.",
      "Organized team schedules and workflows using Agile methodologies to keep every project on time.",
    ],
  },
  {
    role: "Backend Developer",
    company: "Xpertis Solutions, Inc.",
    period: "February 2025 – May 2025",
    bullets: [
      "Developed backend user integration for parent and admin portals, configuring environment variables per user profile.",
      "Handled user authentication for the enrollment portal system, covering use cases, API usage, and test functionality.",
      "Underwent weekly technical assessments during development to reinforce knowledge retention.",
    ],
  },
  {
    role: "Project Manager",
    company: "Alliance Software Inc.",
    period: "September 2024 – December 2024",
    bullets: [
      "Led web development of the SCSHelpDesk application, ensuring each member delivered assigned tasks on time.",
      "Facilitated task distribution and coordinated schedules for seamless team execution.",
      "Created technical documentation and helped develop core application functionality.",
    ],
  },
];

export const projects = [
  {
    name: "RAG-Powered Onboarding System",
    role: "Full-Stack Developer",
    bullets: [
      "Architected a full-stack AI chatbot for automated onboarding.",
      "Implemented vector search and LLM response generation.",
    ],
    stack: ["React", "FastAPI", "Supabase", "Python"],
    images: ["/projects/onboarding-1.jpg", "/projects/onboarding-2.jpg"],
    longDescription: `
### System Architecture
Built a complete RAG pipeline to automate user onboarding. The system securely handles documents and leverages vector embeddings to give context-aware answers. 

### Security & Hardening
Specifically focused on AI security from a defensive perspective. The LLM prompts are heavily hardened against prompt injection attacks, ensuring the chatbot stays strictly within its system boundaries.
    `,
  },
  {
    name: "File Sync Platform",
    role: "SaaS Founder & Engineer",
    bullets: [
      "Developed a robust file synchronization platform.",
      "Integrated global merchant of record services for tax compliance.",
    ],
    stack: ["TypeScript", "React", "Azure AI", "Whop Payments"],
    images: ["/projects/filesync-1.jpg", "/projects/filesync-2.jpg"],
    longDescription: `
### Launch & Deployment
Preparing the launch phase for mid-2026. The platform handles real-time file synchronization across distributed nodes using an Agile workflow for continuous delivery.

### Payment Stack
Integrated Whop Payments for seamless global tax compliance and merchant of record services, allowing for easy handling of international clients and subscriptions.
    `,
  },
  {
    name: "Proximity Networking Map",
    role: "Backend Engineer",
    bullets: [
      "Built a graph-based networking tool to map professional proximity.",
      "Replaced manual cold outreach with shared node targeting.",
    ],
    stack: ["Node.js", "GraphQL", "Metal.so"],
    images: ["/placeholder.jpg"], // Swap this out
    longDescription: `
### The Problem
Manual cold outreach to founders and investors is highly inefficient. 

### The Solution
Leveraged Metal.so to build a proximity mapping system that identifies shared network nodes. This allows for warm introductions and highly targeted professional outreach based on graph proximity.
    `,
  }
];

export const skills = {
  "Software Engineering": ["Microsoft Azure", "Microsoft Foundry", "AI Development"],
  "Web Development": ["React", "JavaScript", "Tailwind", "Figma"],
  "Backend Frameworks": ["ASP.NET Core", "Laravel", "FastAPI", "Supabase"],
  Database: ["SQL Server", "MySQL", "PostgreSQL"],
  "Project Management": [
    "Project Planning",
    "Stakeholder Management",
    "Risk Management",
    "Agile Methodologies",
  ],
};

export const certifications = [
  "Microsoft Certified: Azure AI Engineer Associate — March 2026",
  "Google Project Management Professional — December 2025",
  "AWS Academy Graduate, Cloud Architecting — May 2025",
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "University of San Jose-Recoletos",
  period: "June 2021 – May 2025",
};
