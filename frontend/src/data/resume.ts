export const profile = {
  name: "Christian Paul Gumanit",
  title: "Software Engineer",
  location: "Lapu-lapu City, Cebu",
  email: "christiangumanit@gmail.com",
  linkedin: "https://www.linkedin.com/in/christian-gumanit/",
  github: "https://github.com/HonkaROO",
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
    name: "N-PAX Onboarding eXpert (NOX)",
    role: "Technical Lead",
    stack: ["ASP.NET Core", "React", "FastAPI", "SQL Server"],
    bullets: [
      "Designed a full-stack onboarding platform with an integrated RAG-powered AI chatbot for new hires.",
      "Streamlined HR workflows with automated conversational assistance and personalized onboarding.",
    ],
    images: ["/projects/nox/nox_login.png", "/projects/nox/nox_dashboard.png", "/projects/nox/nox_docs.png", "/projects/nox/nox_reports.png", "/projects/nox/nox_supad.png"],
  },
  {
    name: "N-PAX File Management (Trackquire)",
    role: "Project Manager",
    stack: ["ASP.NET Core", "React", "SQL Server"],
    bullets: [
      "Spearheaded a secure file management platform for company document archiving and retrieval.",
      "Directed database schema design and Entity Framework Core implementation while managing task assignments.",
    ],
    images: ["/projects/trackquire/trackquire_login.png", "/projects/trackquire/trackquire_landing.png", "/projects/trackquire/trackquire_form.png", "/projects/trackquire/trackquire_reports.png", "/projects/trackquire/trackquire_logs.png"],
  },
  {
    name: "EnrollME (Internship)",
    role: "Backend Developer",
    stack: ["Laravel", "SQL Server"],
    bullets: [
      "Architected the backend for an education enrollment system with secure parent and admin portals.",
      "Implemented authentication/authorization flows, optimized performance with DevOps and containerization.",
    ],
    images: ["/projects/enrollme/enrollme_login.png", "/projects/enrollme/enrollme_dashboard.png", "/projects/enrollme/enrollme_students.png", "/projects/enrollme/enrollme_report.png", "/projects/enrollme/enrollme_info.png"],
  },
  {
    name: "SCSHelpDesk (Jumpstart Program)",
    role: "Project Manager",
    stack: ["C#", "JavaScript", "SQL Server"],
    bullets: [
      "Led a team building a web-based ticketing system across the full sprint lifecycle.",
      "Managed task distribution and authored documentation for the core knowledge-base functionality.",
    ],
    images: ["/projects/scs/scs_landing.png", "/projects/scs/scs_login.png", "/projects/scs/scs_settings.png", "/projects/scs/scs_tickets.png", "/projects/scs/scs_user.png"],
  },
];

export const coreTech = {
  Frontend: [
    "React",
    "TypeScript",
    "Tailwind",
    "Angular",
  ],

  Backend: [
    "FastAPI",
    "Django",
    "ASP.NET Core",
    "Laravel",
  ],

  AI: [
    "Microsoft Foundry",
    "Lovable",
    "ChatGPT",
    "Claude AI",
    "Copilot",
    "Gemini",
  ],

  Cloud: [
    "Azure",
    "Render",
    "Docker",
  ],

  Database: [
    "Supabase",
    "PostgreSQL",
    "SQL Server",
    "MongoDB",
    "MySQL",
  ],

  Design: [
    "Figma",
    "Canva",
    "Miro",
  ],

  Management: [
    "Azure DevOps",
    "Asana",
    "Google Workspace",
  ],

  Others: [
    "Resend",
    "WordPress",
    "n8n",
  ],
};

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
  {
    name: "Agentic AI Business Solutions Architect",
    issuer: "Microsoft",
    date: "August 2026",
    credentialId: "6A1BB37DF2261762",
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/CHRISTIANPAULOGUMANIT-7864/6A1BB37DF2261762?sharingId=74B88E7AA45A176D",
    image: "certifications/microsoft_sa.png",
  },
  {
    name: "Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "March 2026",
    credentialId: "89BC2F0E1448A386",
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/CHRISTIANPAULOGUMANIT-7864/89BC2F0E1448A386?sharingId=74B88E7AA45A176D",
    image: "certifications/microsoft_ai.jpg",
  },
  {
    name: "Project Management Professional",
    issuer: "Google",
    date: "December 2025",
    credentialId: "2GUEFB8XWW19",
    credentialUrl: "https://coursera.org/share/65168434cb47fe72be5605bbbe2cc6da",
    image: "certifications/google_pm.png",
  },
  {
    name: "AWS Academy — Cloud Architecting",
    issuer: "AWS Academy",
    date: "May 2025",
    credentialId: "386721c7-e722-497e-b3a1-b5e461fd52ba",
    credentialUrl: "https://www.credly.com/badges/386721c7-e722-497e-b3a1-b5e461fd52ba/public_url",
    image: "certifications/aws_cloud.jpg",
  },
  {
    name: "AWS Academy — Cloud Foundations",
    issuer: "AWS Academy",
    date: "April 2025",
    credentialId: "36b57fd1-2b4c-42c0-a624-fca0b2d5a8c6",
    credentialUrl: "https://www.credly.com/badges/36b57fd1-2b4c-42c0-a624-fca0b2d5a8c6/public_url",
    image: "certifications/aws_fcloud.jpg",
  },
  {
    name: "React - The Complete Guide 2024",
    issuer: "Udemy",
    date: "Jan 2025",
    credentialId: "UC-6030338a-f9ac-4355-9975-72d30b63a430",
    credentialUrl: "https://www.udemy.com/certificate/UC-6030338a-f9ac-4355-9975-72d30b63a430/",
    image: "certifications/udemy_react.jpg",
  },
];

export const socialLinks = [
  { key: "email", label: "Email", href: "mailto:christiangumanit@gmail.com" },
  { key: "github", label: "GitHub", href: "https://github.com/HonkaROO" },
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/christian-gumanit/" },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  school: "University of San Jose-Recoletos",
  period: "June 2021 – May 2025",
};

// What's actually running this portfolio - shown in the AI Stack section
// and reused as the "current architecture" strip under the chatbot.
export const aiStack = [
  "Azure AI Foundry",
  "Groq",
  "Gemini",
  "FastAPI",
  "React",
  "Supabase",
  "ASP.NET Core",
  "RAG",
];