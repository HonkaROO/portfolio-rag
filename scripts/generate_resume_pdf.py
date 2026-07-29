"""
Regenerates frontend/public/resume.pdf from the resume content.
Keep this in sync with frontend/src/data/resume.ts by hand when you update
your resume — this script duplicates that content in plain Python so it has
no dependency on the frontend build.

Run:
    pip install reportlab --break-system-packages
    python scripts/generate_resume_pdf.py
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem,
    HRFlowable,
)

OUTPUT = "frontend/public/resume.pdf"

ACCENT = colors.HexColor("#0D9488")
MUTED = colors.HexColor("#5B6B7A")

styles = getSampleStyleSheet()
styles.add(ParagraphStyle("NameStyle", fontSize=20, leading=24, fontName="Helvetica-Bold"))
styles.add(ParagraphStyle("RoleStyle", fontSize=12, textColor=MUTED, spaceAfter=10))
styles.add(ParagraphStyle("SectionHeader", fontSize=13, fontName="Helvetica-Bold", textColor=ACCENT, spaceBefore=14, spaceAfter=6))
styles.add(ParagraphStyle("JobHeader", fontSize=11, fontName="Helvetica-Bold", spaceBefore=8))
styles.add(ParagraphStyle("JobMeta", fontSize=9, textColor=MUTED, spaceAfter=4))
styles.add(ParagraphStyle("Body", fontSize=9.5, leading=13))

story = []

story.append(Paragraph("Christian Paul Gumanit", styles["NameStyle"]))
story.append(Paragraph(
    "Software Engineer &middot; Lapu-lapu City, Cebu &middot; christiangumanit@gmail.com "
    "&middot; linkedin.com/in/christian-gumanit",
    styles["RoleStyle"],
))
story.append(HRFlowable(width="100%", color=colors.HexColor("#D3DAE0"), thickness=0.75))

story.append(Paragraph("Summary", styles["SectionHeader"]))
story.append(Paragraph(
    "Strategic and results-oriented Software Engineer and Certified Microsoft Azure AI "
    "Engineer Associate with a specialized focus on AI development and web application "
    "architecture. Proven expertise architecting production-ready systems with ASP.NET "
    "Core, Laravel, and FastAPI. Google Certified Project Manager with a track record of "
    "leading Agile teams through the full project lifecycle.",
    styles["Body"],
))

story.append(Paragraph("Experience", styles["SectionHeader"]))
jobs = [
    ("Software Engineer", "N-PAX Cebu Corporation, Inc.", "August 2025 – Present", [
        "Architected a full-stack Onboarding System featuring a RAG-powered AI chatbot to automate information retrieval and streamline orientation for new employees.",
        "Orchestrated end-to-end development of a corporate RAG chatbot as a Certified Azure AI Engineer Associate for high-level partner presentations.",
        "Managed an Azure-focused technical team's growth and certification roadmap toward Microsoft Solutions Partner status.",
        "Served as Project Manager for a cross-functional team building a file management platform.",
    ]),
    ("Backend Developer", "Xpertis Solutions, Inc.", "February 2025 – May 2025", [
        "Developed backend user integration for parent and admin portals.",
        "Handled user authentication for the enrollment portal system, covering use cases, API usage, and testing.",
    ]),
    ("Project Manager", "Alliance Software Inc.", "September 2024 – December 2024", [
        "Led web development of the SCSHelpDesk application, coordinating task distribution and schedules.",
        "Created technical documentation and helped develop core application functionality.",
    ]),
]
for role, company, period, bullets in jobs:
    story.append(Paragraph(f"{role} — {company}", styles["JobHeader"]))
    story.append(Paragraph(period, styles["JobMeta"]))
    story.append(ListFlowable(
        [ListItem(Paragraph(b, styles["Body"])) for b in bullets],
        bulletType="bullet", start="•", leftIndent=14,
    ))

story.append(Paragraph("Projects", styles["SectionHeader"]))
projects = [
    ("N-PAX Onboarding eXpert (NOX) — Technical Lead", "ASP.NET Core, React, FastAPI, SQL Server"),
    ("N-PAX File Management (Trackquire) — Project Manager", "ASP.NET Core, React, SQL Server"),
    ("EnrollME (Internship) — Backend Developer", "Laravel, SQL Server"),
    ("SCSHelpDesk (Jumpstart Program) — Project Manager", "C#, JavaScript, SQL Server"),
]
story.append(ListFlowable(
    [ListItem(Paragraph(f"<b>{name}</b> — {stack}", styles["Body"])) for name, stack in projects],
    bulletType="bullet", start="•", leftIndent=14,
))

story.append(Paragraph("Skills", styles["SectionHeader"]))
story.append(Paragraph(
    "<b>Software Engineering:</b> Microsoft Azure, Microsoft Foundry, AI Development<br/>"
    "<b>Web Development:</b> React, JavaScript, Tailwind, Figma<br/>"
    "<b>Backend Frameworks:</b> ASP.NET Core, Laravel, FastAPI, Supabase<br/>"
    "<b>Database:</b> SQL Server, MySQL, PostgreSQL<br/>"
    "<b>Project Management:</b> Project Planning, Stakeholder Management, Risk Management, "
    "Agile Methodologies",
    styles["Body"],
))

story.append(Paragraph("Certifications", styles["SectionHeader"]))
story.append(Paragraph(
    "Microsoft Certified: Azure AI Engineer Associate (March 2026)<br/>"
    "Google Project Management Professional (December 2025)<br/>"
    "AWS Academy Graduate, Cloud Architecting (May 2025)",
    styles["Body"],
))

story.append(Paragraph("Education", styles["SectionHeader"]))
story.append(Paragraph(
    "Bachelor of Science in Computer Science — University of San Jose-Recoletos "
    "(June 2021 – May 2025)",
    styles["Body"],
))

doc = SimpleDocTemplate(
    OUTPUT, pagesize=letter,
    topMargin=0.6 * inch, bottomMargin=0.6 * inch,
    leftMargin=0.7 * inch, rightMargin=0.7 * inch,
)
doc.build(story)
print(f"Wrote {OUTPUT}")
