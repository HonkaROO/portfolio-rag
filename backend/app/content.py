# Each string becomes one embedded chunk in Supabase. Keep chunks focused
# (one role, one project, one skill group) so retrieval pulls precise context.
# When you update your resume, update this list and re-run ingest.py.

CHUNKS: list[str] = [
    "Christian Paul Gumanit is a Software Engineer based in Lapu-lapu City, Cebu, "
    "and a Certified Microsoft Azure AI Engineer Associate and Google Certified Project Manager.",

    "As Software Engineer at N-PAX Cebu Corporation (Aug 2025 - Present), Christian architected a "
    "full-stack Onboarding System featuring a RAG-powered AI chatbot to automate information "
    "retrieval and streamline orientation for new employees.",

    "At N-PAX, Christian orchestrated end-to-end development of a corporate RAG chatbot as a "
    "Certified Azure AI Engineer Associate, enabling automated retrieval of company data for "
    "high-level partner presentations, and managed an Azure-focused technical team's growth "
    "and certification roadmap toward Microsoft Solutions Partner status.",

    "At N-PAX, Christian also served as Project Manager for a cross-functional team building a "
    "file management platform, organizing schedules and workflows with Agile methodologies.",

    "As Backend Developer at Xpertis Solutions (Feb - May 2025), Christian developed backend "
    "user integration for parent and admin portals and handled user authentication for an "
    "enrollment portal system, covering use cases, API usage, and testing.",

    "As Project Manager at Alliance Software Inc. (Sep - Dec 2024), Christian led web development "
    "of the SCSHelpDesk application, facilitating task distribution and coordinating schedules "
    "for the team.",

    "Christian's project 'N-PAX Onboarding eXpert (NOX)' is a full-stack onboarding platform "
    "with an integrated RAG-powered AI chatbot, built with ASP.NET Core, React, FastAPI, and "
    "SQL Server, where he served as Technical Lead.",

    "Christian's project 'N-PAX File Management (Trackquire)' is a secure file management "
    "platform built with ASP.NET Core, React, and SQL Server, where he directed database "
    "schema design and Entity Framework Core implementation as Project Manager.",

    "Christian's internship project 'EnrollME' involved architecting the backend for an "
    "education enrollment system with Laravel and SQL Server, implementing secure "
    "authentication/authorization and optimizing performance with DevOps and containerization.",

    "Christian's project 'SCSHelpDesk' from the Jumpstart Program is a web-based ticketing "
    "system built with C#, JavaScript, and SQL Server, where he led the team as Project Manager.",

    "Christian's technical skills include Microsoft Azure, Microsoft Foundry, and AI "
    "Development; React, JavaScript, Tailwind, and Figma for web development; ASP.NET Core, "
    "Laravel, FastAPI, and Supabase for backend frameworks; and SQL Server, MySQL, and "
    "PostgreSQL for databases.",

    "Christian's project management skills include project planning, stakeholder management, "
    "risk management, implementation oversight, Agile methodologies, and project delivery.",

    "Christian holds these certifications: Microsoft Certified Azure AI Engineer Associate "
    "(March 2026), Google Project Management Professional (December 2025), and AWS Academy "
    "Graduate in Cloud Architecting (May 2025).",

    "Christian holds a Bachelor of Science in Computer Science from the University of "
    "San Jose-Recoletos (June 2021 - May 2025).",
]
