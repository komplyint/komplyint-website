#!/usr/bin/env python3
"""Generate Komplyint's sustainability discovery and market-entry playbook PDF.

The playbook is based on a practitioner discovery interview and follow-up public-source
research current to 2026-09-01. Contact details are professional/public listings only.
Always verify details before outreach.
"""

from __future__ import annotations

from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, ListFlowable, ListItem
)

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "strategy" / "Komplyint_Sustainability_Discovery_Market_Entry_Playbook_2026.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

# ---------- visual system ----------
NAVY = colors.HexColor("#0B1F33")
TEAL = colors.HexColor("#0D9488")
GREEN = colors.HexColor("#16835C")
BLUE = colors.HexColor("#2563EB")
AMBER = colors.HexColor("#D97706")
PURPLE = colors.HexColor("#7C3AED")
RED = colors.HexColor("#C2413B")
INK = colors.HexColor("#15202B")
MUTED = colors.HexColor("#586674")
LINE = colors.HexColor("#D9E2EA")
PALE = colors.HexColor("#F4F7FA")
WHITE = colors.white

FONT = "Helvetica"
FONT_BOLD = "Helvetica-Bold"
for p in [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
]:
    if Path(p).exists():
        pdfmetrics.registerFont(TTFont("KomplyintSans", p))
        FONT = "KomplyintSans"
        break
for p in [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
]:
    if Path(p).exists():
        pdfmetrics.registerFont(TTFont("KomplyintSansBold", p))
        FONT_BOLD = "KomplyintSansBold"
        break

styles = getSampleStyleSheet()
H1 = ParagraphStyle("H1", fontName=FONT_BOLD, fontSize=22, leading=27, textColor=NAVY, spaceAfter=10)
H2 = ParagraphStyle("H2", fontName=FONT_BOLD, fontSize=15, leading=19, textColor=NAVY, spaceBefore=8, spaceAfter=7)
H3 = ParagraphStyle("H3", fontName=FONT_BOLD, fontSize=11.3, leading=14.5, textColor=INK, spaceBefore=5, spaceAfter=4)
BODY = ParagraphStyle("Body", fontName=FONT, fontSize=9.15, leading=13.2, textColor=INK, spaceAfter=5)
SMALL = ParagraphStyle("Small", fontName=FONT, fontSize=7.5, leading=10.2, textColor=MUTED)
TINY = ParagraphStyle("Tiny", fontName=FONT, fontSize=6.6, leading=8.5, textColor=MUTED)
WHITE_BIG = ParagraphStyle("WhiteBig", fontName=FONT_BOLD, fontSize=25, leading=31, textColor=WHITE, alignment=TA_LEFT)
WHITE_SUB = ParagraphStyle("WhiteSub", fontName=FONT, fontSize=11, leading=16, textColor=colors.HexColor("#D6E3EC"))
CENTER = ParagraphStyle("Center", fontName=FONT, fontSize=9, leading=12, alignment=TA_CENTER, textColor=INK)
METRIC = ParagraphStyle("Metric", fontName=FONT_BOLD, fontSize=18, leading=20, alignment=TA_CENTER, textColor=NAVY)
METRIC_L = ParagraphStyle("MetricL", fontName=FONT, fontSize=7.5, leading=9.5, alignment=TA_CENTER, textColor=MUTED)


def P(text, style=BODY):
    return Paragraph(text, style)


def bullets(items, level=0):
    return ListFlowable(
        [ListItem(P(x, BODY), leftIndent=6 * mm) for x in items],
        bulletType="bullet", start="circle", leftIndent=(4 + level * 3) * mm,
        bulletFontName=FONT, bulletFontSize=5.5, bulletColor=TEAL, spaceAfter=5,
    )


def badge(label, color):
    return Table([[Paragraph(label, ParagraphStyle("badge", fontName=FONT_BOLD, fontSize=7.2, textColor=WHITE, alignment=TA_CENTER))]],
                 colWidths=[34 * mm], rowHeights=[6.5 * mm],
                 style=TableStyle([("BACKGROUND", (0,0), (-1,-1), color), ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
                                   ("LEFTPADDING", (0,0), (-1,-1), 4), ("RIGHTPADDING", (0,0), (-1,-1), 4)]))


def callout(title, text, color=TEAL):
    t = Table([[P(title, ParagraphStyle("ct", fontName=FONT_BOLD, fontSize=9.3, textColor=color)), P(text, SMALL)]],
              colWidths=[42*mm, 130*mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,-1), colors.HexColor("#F7FAFC")),
        ("BOX", (0,0), (-1,-1), 0.6, color),
        ("LINEBEFORE", (0,0), (0,-1), 4, color),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (-1,-1), 7),
        ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7),
    ]))
    return t


def section_title(kicker, title, sub=None):
    elems = [P(kicker.upper(), ParagraphStyle("kick", fontName=FONT_BOLD, fontSize=7.3, leading=9, textColor=TEAL, spaceAfter=4)), P(title, H1)]
    if sub:
        elems.append(P(sub, ParagraphStyle("sub", fontName=FONT, fontSize=10, leading=14, textColor=MUTED, spaceAfter=10)))
    elems.append(HRFlowable(width="100%", thickness=0.8, color=LINE, spaceBefore=1, spaceAfter=9))
    return elems


def card(title, status, status_color, objective, deliverables, proof, next_ask):
    rows = [
        [badge(status, status_color), P(title, ParagraphStyle("cardtitle", fontName=FONT_BOLD, fontSize=12.5, leading=16, textColor=NAVY))],
        [P("Objective", H3), P(objective, BODY)],
        [P("Deliverables", H3), P("<br/>".join([f"• {x}" for x in deliverables]), BODY)],
        [P("Evidence created", H3), P(proof, BODY)],
        [P("Next ask", H3), P(next_ask, BODY)],
    ]
    t = Table(rows, colWidths=[38*mm, 134*mm], repeatRows=0)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.HexColor("#F2F6F8")),
        ("BOX", (0,0), (-1,-1), 0.7, LINE), ("INNERGRID", (0,1), (-1,-1), 0.25, LINE),
        ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("LEFTPADDING", (0,0), (-1,-1), 7), ("RIGHTPADDING", (0,0), (-1,-1), 7),
        ("TOPPADDING", (0,0), (-1,-1), 6), ("BOTTOMPADDING", (0,0), (-1,-1), 6),
    ]))
    return KeepTogether([t, Spacer(1, 6)])


def contact_table(rows, widths=(33, 40, 47, 50)):
    data = [[P("Organisation", ParagraphStyle("th", fontName=FONT_BOLD, fontSize=7.2, textColor=WHITE)),
             P("Contact / role", ParagraphStyle("th2", fontName=FONT_BOLD, fontSize=7.2, textColor=WHITE)),
             P("Email / phone", ParagraphStyle("th3", fontName=FONT_BOLD, fontSize=7.2, textColor=WHITE)),
             P("Address / first ask", ParagraphStyle("th4", fontName=FONT_BOLD, fontSize=7.2, textColor=WHITE))]]
    for org, who, emailphone, ask in rows:
        data.append([P(org, SMALL), P(who, SMALL), P(emailphone, TINY), P(ask, TINY)])
    t = Table(data, colWidths=[w*mm for w in widths], repeatRows=1)
    t.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), NAVY), ("VALIGN", (0,0), (-1,-1), "TOP"),
        ("GRID", (0,0), (-1,-1), 0.35, LINE),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [WHITE, colors.HexColor("#F8FAFC")]),
        ("LEFTPADDING", (0,0), (-1,-1), 4), ("RIGHTPADDING", (0,0), (-1,-1), 4),
        ("TOPPADDING", (0,0), (-1,-1), 4), ("BOTTOMPADDING", (0,0), (-1,-1), 4),
    ]))
    return t


def header_footer(canvas, doc):
    canvas.saveState()
    w, h = A4
    canvas.setFillColor(NAVY)
    canvas.rect(0, h-11*mm, w, 11*mm, stroke=0, fill=1)
    canvas.setFont(FONT_BOLD, 7.2)
    canvas.setFillColor(WHITE)
    canvas.drawString(17*mm, h-7.1*mm, "KOMPLYINT | Sustainability Discovery & Market Entry Playbook")
    canvas.setStrokeColor(LINE)
    canvas.line(17*mm, 12*mm, w-17*mm, 12*mm)
    canvas.setFont(FONT, 7)
    canvas.setFillColor(MUTED)
    canvas.drawString(17*mm, 7.5*mm, "Research current to 1 September 2026 | Verify public contact details before outreach")
    canvas.drawRightString(w-17*mm, 7.5*mm, f"Page {doc.page}")
    canvas.restoreState()


class PlaybookDoc(BaseDocTemplate):
    pass


DOC = PlaybookDoc(str(OUT), pagesize=A4, rightMargin=17*mm, leftMargin=17*mm, topMargin=18*mm, bottomMargin=17*mm,
                  title="Komplyint Sustainability Discovery & Market Entry Playbook",
                  author="Komplyint Oy")
frame = Frame(DOC.leftMargin, DOC.bottomMargin, DOC.width, DOC.height, id="normal")
DOC.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=header_footer)])

story = []

# ---------- cover ----------
story += [Spacer(1, 19*mm)]
cover = Table([[P("KOMPLYINT", ParagraphStyle("brand", fontName=FONT_BOLD, fontSize=12, textColor=TEAL)), ""],
               [P("Sustainability Discovery &<br/>Market Entry Playbook", WHITE_BIG), ""],
               [P("From the George interview to projects, interviews, partnerships, supervised experience and first revenue", WHITE_SUB), ""]],
              colWidths=[150*mm, 22*mm], rowHeights=[12*mm, 49*mm, 28*mm])
cover.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,-1), NAVY), ("SPAN", (0,0), (1,0)), ("SPAN", (0,1), (1,1)), ("SPAN", (0,2), (1,2)),
                                ("LEFTPADDING", (0,0), (-1,-1), 13), ("RIGHTPADDING", (0,0), (-1,-1), 13),
                                ("TOPPADDING", (0,0), (-1,-1), 9), ("BOTTOMPADDING", (0,0), (-1,-1), 9)]))
story += [cover, Spacer(1, 12*mm)]
metrics = Table([
    [P("40", METRIC), P("100", METRIC), P("3", METRIC), P("1+", METRIC)],
    [P("completed interviews", METRIC_L), P("targeted outreaches", METRIC_L), P("portfolio cases", METRIC_L), P("supervised / paid pilot", METRIC_L)],
], colWidths=[43*mm]*4)
metrics.setStyle(TableStyle([("BOX", (0,0), (-1,-1), 0.6, LINE), ("INNERGRID", (0,0), (-1,-1), 0.35, LINE),
                             ("BACKGROUND", (0,0), (-1,-1), PALE), ("TOPPADDING", (0,0), (-1,-1), 8), ("BOTTOMPADDING", (0,0), (-1,-1), 8)]))
story += [metrics, Spacer(1, 9*mm), P("Research current to 1 September 2026", CENTER),
          P("Built from a practitioner interview plus public-source research. Public professional contact details are included for outreach planning and must be re-verified before use.", CENTER), PageBreak()]

# ---------- legend / operating rules ----------
story += section_title("How to use this document", "The operating system", "Treat this as a 90-day field manual: build evidence, run structured discovery, earn supervised proof, and only then expand the offer.")
legend = [[badge("DO NOW", GREEN), P("Build immediately; no client permission is needed.", SMALL)],
          [badge("INTERVIEW / LEARN", BLUE), P("Use for discovery and pattern validation, not selling.", SMALL)],
          [badge("SUPERVISED / VALIDATE", AMBER), P("Do only with practitioner/client supervision or explicit review.", SMALL)],
          [badge("BUILD NEXT", PURPLE), P("Technology/process layer after the manual workflow is understood.", SMALL)],
          [badge("DO NOT SELL YET", RED), P("Regulated/high-trust work that needs specialist credentials, assurance independence or deeper evidence.", SMALL)]]
lt = Table(legend, colWidths=[40*mm, 132*mm])
lt.setStyle(TableStyle([("GRID", (0,0), (-1,-1), 0.35, LINE), ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
                        ("LEFTPADDING", (0,0), (-1,-1), 5), ("RIGHTPADDING", (0,0), (-1,-1), 5),
                        ("TOPPADDING", (0,0), (-1,-1), 5), ("BOTTOMPADDING", (0,0), (-1,-1), 5)]))
story += [lt, Spacer(1, 7), callout("Core service hypothesis", "Komplyint helps sustainability teams turn manually managed ESG KPIs into documented, controlled, evidence-ready reporting processes - and later helps automate validated data flows.", TEAL), Spacer(1, 8)]
story += [P("Operating rules", H2), bullets([
    "Interview before prescribing. Ask one clean question at a time and code the pain consistently.",
    "Build proof before broad selling: simulated packs -> supervised project -> paid pilot -> repeatable service.",
    "Lead with implementation support, not 'we do all CSRD'. Keep statutory assurance and legal opinions outside the initial offer.",
    "Use public professional contact details responsibly; personalize the ask and never mass-spam.",
    "Re-check regulatory and certification claims before relying on them in client-facing work."
]), PageBreak()]

# ---------- extraction ----------
story += section_title("1. Interview extraction", "What the George interview should change", "Convert every practitioner statement into a service hypothesis, project, interview question or credibility requirement.")
story += [P("A. Reporting workflow to model", H2), bullets([
    "Organisation-wide CSRD orientation and data-owner onboarding.",
    "Double materiality assessment to identify material impacts, risks and opportunities.",
    "ESRS definition alignment with auditors before data is treated as audit-ready.",
    "KPI documentation: definition, extraction/calculation, controls, risks, figures, targets and people involved.",
    "Process walkthrough with auditors, evidence requests, questions and rework.",
    "Year-end risk assessment and continuous improvement."
]), P("B. Where pain is most likely", H2), bullets([
    "Excel-heavy KPIs, fragmented ownership and multi-team handoffs.",
    "Ambiguous definitions and interpretation-heavy datapoints.",
    "Manual evidence collection and auditor-request coordination.",
    "Different maturity levels across environmental, HR and business-conduct topics.",
    "Manual extraction between systems and reporting folders; future demand for API-connected non-financial reporting databases."
]), P("C. Product/service implications", H2), bullets([
    "Start with KPI evidence, control and process documentation support.",
    "Add reporting-operations support: evidence rooms, trackers, ratings/CDP update packs and PMO-style coordination.",
    "Only after manual workflows are understood, build sustainability data lineage, API integration and AI-assisted evidence tooling.",
    "Environmental KPIs, Scope 1/2/3 and EU Taxonomy are promising specialization paths; validate them with buyers and boutiques."
]), callout("Important commercial conclusion", "Large, highly mature organisations with Watershed/Workday/Jira and established auditors may be poor first clients. Prioritize teams where important KPIs still rely on Excel, several owners and manual evidence handling.", AMBER), PageBreak()]

# ---------- service ladder ----------
story += section_title("2. Positioning", "A staged Komplyint service ladder", "Each rung should be earned by evidence from the rung below.")
ladder = [
    ("1", "KPI Evidence & Controls Support", "Definitions, data-owner maps, extraction/calculation documentation, control/risk matrices, evidence indexes, walkthrough packs."),
    ("2", "Reporting Operations Support", "Evidence rooms, auditor-request trackers, reporting calendars, ESG ratings/CDP update coordination, version and handoff discipline."),
    ("3", "Sustainability Data Architecture", "Data lineage, system mapping, API requirements, quality rules, non-financial reporting database design."),
    ("4", "Specialist Partner Work", "EU Taxonomy, GHG methodology, DMA facilitation, ESRS interpretation - delivered with qualified domain partners until Komplyint has direct proof."),
    ("5", "Refer / Independent Assurance", "Do not blur implementation and independent statutory assurance. Refer assurance work to qualified independent providers."),
]
for num, title, desc in ladder:
    story.append(callout(f"Rung {num}: {title}", desc, [GREEN, BLUE, PURPLE, AMBER, RED][int(num)-1]))
    story.append(Spacer(1, 5))
story += [P("Best initial buyer profile", H2), bullets([
    "Sustainability/reporting lead with several manually managed KPIs.",
    "Boutique consultancy with client deadlines and overflow implementation work.",
    "SME/portfolio company that needs disciplined evidence without hiring a full ESG team.",
    "University/RDI sustainability project that can provide supervised real-world experience."
]), PageBreak()]

# ---------- project backlog ----------
projects = [
    ("Scope 2 Electricity KPI Audit-Readiness Pack", "DO NOW", GREEN,
     "Demonstrate the full KPI chain from source evidence to reportable number.",
     ["KPI definition and boundary", "data lineage and owner map", "calculation workbook design", "risk/control matrix", "evidence index", "mock auditor walkthrough"],
     "A complete portfolio case showing data, controls, evidence and audit communication.",
     "Ask an assurance or sustainability practitioner for a 10-minute structure review."),
    ("Scope 3 Supplier Data Process & Control Map", "DO NOW", GREEN,
     "Show how supplier/activity data becomes a controlled emissions input.",
     ["supplier data map", "quality rules", "missing-data treatment", "approval workflow", "control matrix", "evidence checklist"],
     "Evidence of environmental + data-process thinking.",
     "Interview carbon specialists about the most common supplier-data failures."),
    ("Multi-owner Excel KPI Remediation", "DO NOW", GREEN,
     "Model the exact low-maturity condition George said creates rework.",
     ["before-state workbook/process", "RACI", "version-control rules", "review/approval controls", "exception log", "after-state SOP"],
     "A practical controls/process-improvement case for boutiques and SMEs.",
     "Ask boutiques whether this resembles their client clean-up work."),
    ("ESG Evidence Data Room + Auditor Request Tracker", "DO NOW", GREEN,
     "Create a disciplined evidence-delivery system around Google Drive/SharePoint-style folders.",
     ["evidence taxonomy", "request tracker", "owner/status fields", "version rules", "review checklist", "closure dashboard"],
     "A tangible operations asset that can be demonstrated without confidential data.",
     "Offer it as a supervised pilot to a boutique or university sustainability team."),
    ("ESG Ratings Annual Update Pack", "VALIDATE", AMBER,
     "Translate recurring S&P/Sustainalytics/ISS/FTSE/MSCI updates into an operations package.",
     ["rating calendar", "question owner matrix", "evidence tracker", "change log", "response review workflow"],
     "Proof of recurring disclosure operations capability.",
     "Validate with responsible-investment teams and consultants before selling."),
    ("CDP Disclosure Operations Pack", "VALIDATE", AMBER,
     "Build a deadline-driven process for disclosure evidence and ownership.",
     ["timeline", "ownership map", "evidence log", "QA checklist", "submission readiness dashboard"],
     "A focused disclosure-operations portfolio case.",
     "Ask climate reporting practitioners what creates the most CDP rework."),
    ("EU Taxonomy Evidence File", "SUPERVISED", AMBER,
     "Learn how eligibility/alignment claims are supported and reviewed.",
     ["activity mapping", "evidence list", "assumption register", "review checklist", "open-issue log"],
     "Supervised evidence of EU Taxonomy implementation support.",
     "Seek a boutique/university project; do not market expert interpretation yet."),
    ("VSME SME Sustainability Mini-Report", "SUPERVISED", AMBER,
     "Use a lighter SME reporting context to build end-to-end reporting experience.",
     ["scoping", "data request", "KPI pack", "evidence file", "draft report", "lessons learned"],
     "Realistic SME-facing supervised experience.",
     "Approach SME/RDI programmes and boutiques for a small supervised engagement."),
    ("Sustainability Data Lineage & API Architecture Map", "BUILD NEXT", PURPLE,
     "Translate George's future non-financial database/API direction into a data-engineering design.",
     ["source-system inventory", "canonical KPI schema", "API/dataflow map", "quality checks", "ownership", "audit trail design"],
     "Portfolio evidence bridging sustainability and data engineering.",
     "Validate architecture with reporting leads and data/platform engineers."),
    ("AI Evidence Classification Prototype", "BUILD NEXT", PURPLE,
     "Use AI only where it reduces operational burden without making unsupported compliance decisions.",
     ["evidence classification", "metadata extraction", "human review queue", "traceability log", "false-positive test"],
     "A bounded AI + sustainability prototype with governance controls.",
     "Ask practitioners which repetitive evidence task is safe and valuable to automate."),
    ("Double Materiality Evidence Support Pack", "SUPERVISED", AMBER,
     "Learn DMA documentation and evidence mechanics without pretending to lead materiality judgments unsupervised.",
     ["stakeholder log", "source register", "decision trail", "IRO evidence matrix", "review notes"],
     "Process-support proof around a high-trust reporting activity.",
     "Partner with an experienced sustainability boutique."),
    ("Mock Process Walkthrough & Assurance Readiness Exercise", "DO NOW", GREEN,
     "Practice explaining one KPI exactly as an auditor would test it.",
     ["walkthrough script", "control evidence", "sample questions", "exceptions", "remediation memo"],
     "Interview-ready and client-demo-ready assurance-readiness practice.",
     "Ask an auditor/assurance contact to critique the walkthrough, not certify it."),
]

for i in range(0, len(projects), 3):
    story += section_title("3. Project backlog", f"Portfolio & supervised projects {i+1}-{min(i+3, len(projects))}", "Build these as evidence-producing work products, not theoretical study notes.")
    for pr in projects[i:i+3]: story.append(card(*pr))
    story.append(PageBreak())

# ---------- KPI pack ----------
story += section_title("4. Delivery methodology", "The KPI Evidence & Controls Pack", "This is the core artifact to standardize first because it mirrors the practitioner workflow described in the interview.")
fields = [
    ("1. KPI identity", "Name, ESRS/disclosure link, reporting period, unit, boundary."),
    ("2. Definition", "Precise inclusion/exclusion rules and interpretation notes."),
    ("3. Source systems", "System/file/source evidence, extraction owner and timing."),
    ("4. Data lineage", "Source -> transformation -> calculation -> review -> reported number."),
    ("5. Calculation", "Formula, factors, conversions, estimates and version."),
    ("6. Ownership / RACI", "Preparer, reviewer, approver, subject-matter owner."),
    ("7. Risks", "Completeness, accuracy, cut-off, duplication, classification, manual override."),
    ("8. Controls", "Preventive/detective controls, frequency, evidence and owner."),
    ("9. Evidence index", "Files, exports, approvals, methodology, screenshots/logs where appropriate."),
    ("10. Targets & comparatives", "Target source, baseline, prior-year comparability and changes."),
    ("11. Exceptions", "Open issues, missing data, estimates and remediation status."),
    ("12. Walkthrough", "Step-by-step auditor explanation plus likely questions and evidence responses."),
]
ft = Table([[P(a, H3), P(b, SMALL)] for a,b in fields], colWidths=[43*mm,129*mm])
ft.setStyle(TableStyle([("GRID",(0,0),(-1,-1),0.35,LINE), ("ROWBACKGROUNDS",(0,0),(-1,-1),[WHITE,PALE]),
                        ("VALIGN",(0,0),(-1,-1),"TOP"),("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),
                        ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [ft, Spacer(1, 7), P("Control design questions", H2), bullets([
    "What could make this KPI materially wrong or unauditable?",
    "Which step is manual, judgment-heavy or dependent on another team?",
    "Who reviews the extraction/calculation, and what evidence proves that review happened?",
    "How are changes to definitions, formulas, factors or source systems approved and logged?",
    "Can an independent reviewer reproduce the reported figure from the indexed evidence?"
]), PageBreak()]

# ---------- interview program ----------
story += section_title("5. Market discovery", "40 completed interviews, not 40 invitations", "Plan approximately 100 targeted outreaches to achieve 40 completed conversations. Track conversion by persona and channel.")
quotas = [
    ("Sustainability / non-financial reporting leaders", 12, "Pain, ownership, controls, audit friction, manual work, budget."),
    ("ESG / sustainability boutiques", 7, "Overflow tasks, subcontracting, client pain, proof needed from a small partner."),
    ("Assurance / controls professionals", 5, "Evidence quality, walkthrough failures, control maturity, independence boundaries."),
    ("Environmental / carbon specialists", 5, "Scope 1/2/3 data problems, supplier data, methodology and tool gaps."),
    ("Responsible investment / asset owners", 4, "Portfolio-company data needs, ratings, ESG evidence and recurring reporting."),
    ("Universities / RDI sustainability teams", 4, "Supervised projects, applied research, SME pilots and student/company collaboration."),
    ("Sustainability software / data platforms", 3, "Integration gaps, implementation burden, partner ecosystem and API/data architecture."),
]
qt = Table([[P("Persona",H3),P("#",H3),P("What to learn",H3)]] + [[P(a,SMALL),P(str(b),CENTER),P(c,SMALL)] for a,b,c in quotas], colWidths=[61*mm,13*mm,98*mm])
qt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),("GRID",(0,0),(-1,-1),0.35,LINE),
                        ("VALIGN",(0,0),(-1,-1),"TOP"),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),
                        ("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [qt, Spacer(1, 7), P("Pain codes to use after every interview", H2), bullets([
    "P1 definition/interpretation", "P2 data availability/quality", "P3 ownership/handoffs", "P4 manual Excel/process", "P5 controls/evidence",
    "P6 auditor/assurance interaction", "P7 systems/integration", "P8 capacity/outsourcing"
]), callout("Decision gates", "After 12 interviews: choose the two strongest pain hypotheses. After 20: build/refine two artifacts. After 30: test a narrow paid/supervised offer. After 40: choose one primary wedge and one secondary partner service.", BLUE), PageBreak()]

# ---------- interview scripts ----------
story += section_title("6. Interview scripts", "Ask short questions; drill down after the answer", "State confidentiality once at the beginning. Do not stack multiple questions into a single sentence.")
script_groups = [
    ("Sustainability / reporting leader", [
        "Walk me through one material KPI from requirement to final evidence.",
        "Which parts create the most rework?",
        "Where is Excel or manual handling still necessary?",
        "Which handoff is hardest to manage?",
        "What do auditors ask for repeatedly?",
        "If you could remove one reporting burden this year, what would it be?",
        "What work would you realistically outsource to a small implementation partner?",
        "What proof would that partner need before you trusted them?"
    ]),
    ("Boutique consultancy", [
        "Which client tasks consume senior time but do not require senior judgment?",
        "What implementation work do clients routinely underestimate?",
        "Where do KPI/evidence projects get stuck?",
        "Do you use subcontractors or delivery partners? For what work?",
        "What would make a two-person support team credible enough for a pilot?",
        "Would a fixed-scope evidence/control package be useful, or is another deliverable more valuable?"
    ]),
    ("Assurance / controls professional", [
        "What makes a sustainability KPI easy versus painful to assure?",
        "Which evidence weaknesses appear repeatedly?",
        "What does a good process walkthrough contain?",
        "Where do definitions, controls or ownership most often fail?",
        "What implementation work can a non-assurance support team safely do without compromising independence?"
    ]),
]
for title, qs in script_groups:
    story += [P(title, H2), bullets(qs)]
story += [callout("Opening", "I am doing market discovery for a small implementation-support firm. I am not asking for confidential information or trying to sell anything in this conversation. I want to understand how the work actually happens and where teams experience friction.", TEAL), PageBreak()]

story += section_title("7. George follow-up", "Use George as an occasional reality-check, not an unpaid consultant", "His offer was to look at something specific when possible. Respect the boundary.")
story += [P("Best follow-up sequence", H2), bullets([
    "Do not immediately send a sales pitch.",
    "First finish one strong KPI Evidence & Controls Pack and obtain at least 10-12 additional interviews.",
    "Then send one focused artifact or one specific question that can be answered in 5-10 minutes.",
    "Report what you changed because of his advice; this demonstrates respect and execution.",
    "If his feedback is positive, ask whether there is one other practitioner he thinks would be useful to speak with."
]), P("Suggested message", H2), callout("Message", "Hi George, I took your advice from our conversation and built a small sample framework for documenting a sustainability KPI from source data through controls and audit evidence. If you ever have 5-10 minutes, I would really value your view on whether the structure resembles what practitioners would actually find useful. No urgency at all.", BLUE), PageBreak()]

# ---------- 12 week roadmap ----------
story += section_title("8. 12-week execution roadmap", "From interview insight to credible market evidence", "The goal is not to 'launch ESG consulting' in week one. The goal is to produce proof and discover a repeatable wedge.")
weeks = [
    ("Weeks 1-2", "Foundation", "Build Scope 2 KPI pack + Excel remediation case; create CRM; send first 20 outreach messages; book 6 interviews."),
    ("Weeks 3-4", "Pattern discovery", "Reach 12 completed interviews; code P1-P8; revise service hypothesis; attend/book one sustainability event; approach 3 university/RDI contacts."),
    ("Weeks 5-6", "Second proof", "Build evidence-room/auditor tracker; complete 20 interviews; approach 7 boutiques with a discovery-first message; ask for one supervised micro-project."),
    ("Weeks 7-8", "Supervised evidence", "Complete/secure one supervised case; gather reviewer feedback; create before/after portfolio narrative; choose environmental KPI or reporting-ops primary wedge."),
    ("Weeks 9-10", "Offer test", "Reach 30 interviews; test one fixed-scope offer with 8-12 qualified prospects/partners; build pricing assumptions from scope and effort, not guesses."),
    ("Weeks 11-12", "Decision", "Reach 40 interviews; complete 3 portfolio cases; target 1+ paid/supervised pilot; document delivery SOP and referral boundaries; decide next certification based on evidence."),
]
rt = Table([[P("Period",H3),P("Goal",H3),P("Required output",H3)]] + [[P(a,SMALL),P(b,SMALL),P(c,SMALL)] for a,b,c in weeks], colWidths=[27*mm,38*mm,107*mm])
rt.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),("GRID",(0,0),(-1,-1),0.35,LINE),
                        ("VALIGN",(0,0),(-1,-1),"TOP"),("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),
                        ("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story += [rt, Spacer(1, 8), callout("90-day finish line", "40 interviews; ~100 targeted outreaches; 3 portfolio cases; 1+ supervised or paid pilot; one documented delivery SOP; one primary market wedge; one partner/referral map.", GREEN), PageBreak()]

# ---------- contact directory ----------
universities = [
    ("University of Vaasa", "Tatiana King - Professor, ESG Reporting & Sustainability; Head, Auditing and Control in Accounting", "tatiana.king@uwasa.fi<br/>+358 29 449 8377", "Wolffintie 32, 65200 Vaasa<br/>Ask for: applied reporting/control project or practitioner interview."),
    ("LUT University", "Tanja Grönlund; Mika Horttanainen", "Tanja.Gronlund@lut.fi | +358 40 083 8859<br/>Mika.Horttanainen@lut.fi | +358 40 848 5850", "Yliopistonkatu 34, 53850 Lappeenranta<br/>Ask for: sustainability/RDI project collaboration."),
    ("University of Jyväskylä", "Tiina Onkila; Marileena Mäkelä", "tiina.onkila@jyu.fi | +358 40 576 7818<br/>marileena.t.makela@jyu.fi | +358 40 671 7632", "Mattilanniemi 2, Jyväskylä<br/>Ask for: corporate sustainability reporting / applied project route."),
    ("Tampere University", "Pasi Vakaslahti; Kai Hämäläinen; industry collaboration", "pasi.vakaslahti@tuni.fi | +358 40 511 6128<br/>kai.hamalainen@tuni.fi | +358 50 318 7697<br/>industry@tuni.fi | +358 29 452 4500", "Ask for: company collaboration, applied student/RDI sustainability data project."),
    ("Metropolia UAS", "Minna Väkevä; Oscar Smart", "Minna.Vakeva@metropolia.fi | +358 44 544 5694<br/>oscar.smart@metropolia.fi | +358 50 505 6997", "Ask for: supervised sustainability/data project and SME collaboration channel."),
    ("Aalto University", "Jussi Impiö; Saga Weissmann", "jussi.m.impio@aalto.fi | +358 50 480 2555<br/>saga.weissmann@aalto.fi", "P.O. Box 11000 (Otakaari 1B), FI-00076 AALTO<br/>Ask for: applied sustainability/data collaboration pathway."),
    ("HELSUS / University of Helsinki", "Elina Tanninen", "elina.tanninen@helsinki.fi | +358 50 348 5597<br/>Switchboard +358 29 41911", "Fabianinkatu 33, 00014 University of Helsinki<br/>Ask for: sustainability network / research collaboration contact."),
    ("Hanken", "Nikodemus Solitander; Minna Torsner; PRME", "nikodemus.solitander@hanken.fi | +358 40 352 1451<br/>minna.torsner@hanken.fi | +358 50 574 2389<br/>prme@hanken.fi", "Arkadiankatu 22, Helsinki<br/>Ask for: responsible business / reporting project or network introduction."),
    ("University of Eastern Finland", "Harri Niska; Heli Laine; Minna Hendolin", "harri.niska@uef.fi | +358 44 265 1291<br/>heli.laine@uef.fi | +358 50 533 8891<br/>minna.hendolin@uef.fi | +358 50 557 7665", "Ask for: sustainability/data/RDI project contact."),
    ("University of Turku", "Riku Santala", "riku.santala@utu.fi | +358 40 532 2135", "Rehtorinpellonkatu 3, 20500 Turku<br/>Ask for: sustainability reporting / responsible business collaboration route."),
]

boutiques = [
    ("Tyrsky Consulting", "Pirjo Jantunen; Kati Berninger", "pirjo.jantunen@tyrskyconsulting.fi | +358 44 276 7718<br/>kati.berninger@tyrskyconsulting.fi | +358 40 879 8713", "First ask: 20-min discovery; what implementation overflow could a small partner support? Their site explicitly welcomes partners/joint bids/consortia."),
    ("UseLess Company", "Maija Leino; Mervi Teerikangas", "maija.leino@useless.fi | +358 44 216 1611<br/>mervi.teerikangas@useless.fi*<br/>contact@useless.fi", "Lapinlahdenkatu 16 (Maria 01), 00180 Helsinki. *Published company email format - verify before use."),
    ("Green Carbon", "Matti Toivonen; Saija Ahonen; Kimmo Koistinen", "matti.toivonen@greencarbon.fi | +358 400 633 033<br/>saija.ahonen@greencarbon.fi | +358 40 683 4720<br/>kimmo.koistinen@greencarbon.fi | +358 40 723 2852", "First ask: environmental KPI / Scope 1-3 implementation pain and supervised/partner work."),
    ("Ecobio", "Annu Haaranen; Malena Weurlander", "annu.haaranen@ecobio.fi | +358 20 769 4365<br/>malena.weurlander@ecobio.fi | +358 20 756 9459<br/>info@ecobio.fi", "Runeberginkatu 5, 00100 Helsinki. Ask about reporting implementation and overflow delivery."),
    ("Green Advisors", "Anu Granroth", "anu.granroth@greenadvisors.fi | +358 50 486 7820", "Lyseokatu 3 a 2, Tampere. Ask for boutique-client pain interview / pilot review."),
    ("Rodinia", "Minna Rajainmäki", "minna.rajainmaki@rodinia.fi | +358 40 774 1838<br/>info@rodinia.fi", "Kansakoulukatu 3, Helsinki. Ask about evidence/reporting operations and partner-fit."),
    ("Kaskas", "Karoliina Kinnunen Mohr; Maria Ruuska; Pasi Nokelainen", "karoliina@kaskas.fi | +358 50 400 5122<br/>maria.ruuska@kaskas.fi | +358 40 727 4119<br/>pasi.nokelainen@kaskas.fi | +358 50 339 5860", "Merimiehenkatu 29, Helsinki. Ask for sustainability communication/reporting workflow perspective."),
    ("Miltton", "Eeva Taimisto; Terhi Koipijärvi", "eeva.taimisto@miltton.com | +358 40 172 3832<br/>terhi.koipijarvi@miltton.com | +358 50 598 9958", "Ask about reporting implementation, client capacity and practical delivery support."),
    ("Rantalainen", "Jasmin Järvinen; Aleksi Lintunen", "jasmin.jarvinen@rantalainen.fi | +358 40 568 9312<br/>aleksi.lintunen@rantalainen.fi | +358 44 260 9715", "Ask about SME sustainability reporting / accounting-adjacent implementation needs."),
]

assurance = [
    ("Tuokko", "Juha-Matti Heino; Topias Hirvonen", "juha-matti.heino@tuokko.fi | +358 40 684 1911<br/>topias.hirvonen@tuokko.fi | +358 50 593 3215<br/>info@tuokko.fi", "Paciuksenkatu 25, 00270 Helsinki. Ask: what makes KPI evidence assurance-ready?"),
    ("Deloitte Finland", "Anu Servo; Iida Pulliainen", "anu.servo@deloitte.fi | +358 400 675 586<br/>iida.pulliainen@deloitte.fi | +358 40 771 3015", "Itämerenkatu 25, Helsinki. Ask for practitioner interview on evidence/control maturity."),
    ("PwC Finland", "Mikael Niskala; Tomi Pajunen", "mikael.niskala@pwc.com | +358 20 787 7003<br/>tomi.pajunen@pwc.com | +358 20 787 7235<br/>FI_info@pwc.com", "Itämerentori 2, Helsinki. Ask about common assurance-readiness gaps."),
    ("KPMG Finland", "Kirsi Saaristo; Leenakaisa Winberg", "kirsi.saaristo@kpmg.fi* | +358 40 517 0051<br/>leenakaisa.winberg@kpmg.fi*<br/>contact@kpmg.fi | +358 20 760 3000", "Töölönlahdenkatu 3 A, Helsinki. *Public company email format - verify before use."),
]

networks = [
    ("FIBS", "Marja Kurkela; Mea Lakso", "marja.kurkela@fibsry.fi* | +358 40 674 3986<br/>mea.lakso@fibsry.fi* | +358 40 865 1285<br/>fibs@fibsry.fi", "Eteläranta 10, Helsinki. *Public email format - verify. Attend/reporting events and request member-network guidance."),
    ("Finsif", "Leila Räsänen", "leila.rasanen@finsif.fi | +358 44 596 6302<br/>info@finsif.fi", "P.O. Box 184, 00101 Helsinki. Ask for responsible-investment network/event introductions."),
    ("Climate Leadership Coalition", "Tuuli Kaskinen; Tapio Laakso", "tuuli.kaskinen@clc.fi | +358 50 514 9752<br/>tapio.laakso@clc.fi | +358 50 343 3024", "Ask for climate-business ecosystem events and member contacts."),
    ("Sitra / WCEF", "Kari Herlevi; WCEF contact", "kari.herlevi@sitra.fi | +358 29 461 8287<br/>contactus.wcef@sitra.fi", "Ask for circular-economy / sustainability ecosystem routes, not generic sales."),
]

investors = [
    ("Ilmarinen", "Karoliina Lindroos; Miikka Simanainen", "karoliina.lindroos@ilmarinen.fi | +358 10 284 3563<br/>miikka.simanainen@ilmarinen.fi | +358 10 284 2225", "Ask how portfolio-company sustainability data/evidence quality affects investor work."),
    ("Varma", "Hanna Kaskela", "hanna.kaskela@varma.fi | +358 40 584 5045", "Ask about responsible-investment data and portfolio-company reporting friction."),
    ("CapMan", "Disa Laine; Hanna Värttö; Anna Olsson", "disa.laine@capman.com<br/>hanna.vartto@capman.com<br/>anna.olsson@capman.com | +46 73 387 7561", "Ludviginkatu 6, Helsinki. Ask about portfolio ESG reporting/evidence needs."),
]

nordic = [
    ("Nordic Sustainability", "General team", "hello@nordicsustainability.com", "Vestergade 29, Copenhagen. Ask for boutique discovery / Nordic implementation-partner perspective."),
    ("2050 Consulting", "Markus Ekelund; Nora Wängerud", "markus.ekelund@2050.se | +46 70 577 0097<br/>nora.wangerud@2050.se | +46 76 780 7401", "Ask about Nordic sustainability reporting delivery and partner/subcontractor needs."),
    ("Position Green", "Julia Höglund; public contact Louise Alsheimer Niklasson", "louise@positiongreen.com", "Erottajankatu 2, Helsinki. Ask about implementation/integration gaps around reporting software."),
]

contact_sections = [
    ("Universities & RDI - supervised experience", universities, "Priority: ask for a defined sustainability/reporting/data project with a real supervisor and concrete deliverable."),
    ("Finnish boutiques & consultancies", boutiques, "Priority: discovery first; then test fixed-scope evidence/control support or subcontracting."),
    ("Assurance & controls", assurance, "Priority: learn what good evidence looks like and where independence boundaries sit. Do not pitch independent assurance."),
    ("Networks & events", networks, "Priority: use events for high-density interviews and referrals; follow up within 48 hours."),
    ("Responsible investment / asset owners", investors, "Priority: learn what data/evidence portfolio companies struggle to provide."),
    ("Nordic expansion / software", nordic, "Priority: validate whether the same implementation gaps exist outside Finland and around platform integrations."),
]
for title, rows, note in contact_sections:
    story += section_title("9. Researched contact directory", title, note)
    story += [contact_table(rows), Spacer(1, 6), P("Use: one personalized message, one clear 15-20 minute ask, and one follow-up. Contact data shown is from public professional sources and should be rechecked before outreach.", SMALL), PageBreak()]

# ---------- events ----------
story += section_title("10. Near-term networking", "Two high-value September 2026 opportunities", "Use events as interview accelerators, not as places to hand out generic sales pitches.")
events = [
    ("23 Sep 2026", "FIBS - Ratkaisujen aika: Raportoinnin ajankohtaispäivä 2026", "09:00-12:30 | Pörssitalo, Fabianinkatu 14, Helsinki + online", "Focus: reporting, assurance and AI. Target 5 useful conversations; ask one question per person and log P1-P8."),
    ("24 Sep 2026", "Finsif Meet & Mingle: AI x vastuullinen sijoittaminen", "08:30-11:00", "Focus: AI + responsible investment. Target investors/platform people; validate data/evidence and automation pain."),
]
et = Table([[P("Date",H3),P("Event",H3),P("Details",H3),P("Your objective",H3)]] + [[P(a,SMALL),P(b,SMALL),P(c,SMALL),P(d,SMALL)] for a,b,c,d in events], colWidths=[24*mm,55*mm,45*mm,48*mm])
et.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),("GRID",(0,0),(-1,-1),0.35,LINE),("VALIGN",(0,0),(-1,-1),"TOP"),
                        ("LEFTPADDING",(0,0),(-1,-1),4),("RIGHTPADDING",(0,0),(-1,-1),4),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [et, Spacer(1, 8), P("Event micro-script", H2), callout("30 seconds", "I am building an implementation-support practice around sustainability reporting evidence, controls and data workflows. I am interviewing practitioners before narrowing the offer. What part of reporting creates the most avoidable manual work in your organisation or clients?", BLUE), PageBreak()]

# ---------- certification ----------
story += section_title("11. Certification strategy", "Use credentials to support a proven wedge - not to substitute for experience", "George's 'SRI' reference was verified as the Sustainability Reporting Institute. Do not buy a stack of certificates before the discovery gates.")
certs = [
    ("Now / low-cost study", "EFRAG ESRS material, GHG Protocol fundamentals, VSME, public assurance/readiness material", "Build the vocabulary needed for interviews and portfolio cases."),
    ("After 12-20 interviews", "Sustainability Reporting Institute (SRI) CSRD track / relevant masterclass", "Useful if reporting operations / ESRS implementation remains a top wedge."),
    ("After first supervised case", "GRI ESRS Professional Certification", "More formal reporting credential. Public listing showed 6 courses + final exam and EUR 1,250 total, VAT may apply - recheck before purchase."),
    ("If environmental KPIs win", "GHG Protocol / carbon-accounting depth", "Prioritize methodological competence directly tied to Scope 1/2/3 projects."),
    ("If data architecture wins", "Data engineering / controls / governance training", "Strengthen API, lineage, testing, access control, audit trail and data-quality delivery."),
]
ct = Table([[P("When",H3),P("Credential / study",H3),P("Why",H3)]] + [[P(a,SMALL),P(b,SMALL),P(c,SMALL)] for a,b,c in certs], colWidths=[38*mm,72*mm,62*mm])
ct.setStyle(TableStyle([("BACKGROUND",(0,0),(-1,0),NAVY),("TEXTCOLOR",(0,0),(-1,0),WHITE),("GRID",(0,0),(-1,-1),0.35,LINE),("VALIGN",(0,0),(-1,-1),"TOP"),
                        ("ROWBACKGROUNDS",(0,1),(-1,-1),[WHITE,PALE]),("LEFTPADDING",(0,0),(-1,-1),5),("RIGHTPADDING",(0,0),(-1,-1),5),("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5)]))
story += [ct, Spacer(1, 8), P("Verified training contacts", H2), bullets([
    "Sustainability Reporting Institute: PERLXD Limited t/a Sustainability Reporting Institute, Ground Floor, 71 Lower Baggot Street, Dublin, D02 P593, Ireland. CSRD certification track and masterclasses include climate transition plans, GHG Protocol, AI in sustainability reporting and VSME.",
    "GRI Academy: griacademy@globalreporting.org. Re-check current pricing, course structure and VAT before purchase."
]), PageBreak()]

# ---------- ecosystem ----------
story += section_title("12. Ecosystem map", "Reporting does not stop at CSRD", "Use adjacent reporting and software ecosystems to create recurring operations opportunities.")
story += [P("Ratings / disclosure named in the interview", H2), bullets([
    "S&P Global / CSA", "Sustainalytics", "ISS ESG", "FTSE Russell", "MSCI ESG ratings", "CDP"
]), P("Systems named in the interview", H2), bullets([
    "Watershed - environmental/carbon management", "Workday - HR data", "Jira - cases/business conduct", "Google Drive/Docs/Sheets/Slides - audit evidence collaboration", "Excel - still present in lower-maturity KPIs"
]), P("Future architecture hypothesis", H2), bullets([
    "A canonical non-financial reporting database receives validated data from source systems via APIs or controlled imports.",
    "Every KPI retains lineage, ownership, calculation/version metadata, control evidence and audit trail.",
    "AI supports classification, extraction and triage; humans retain judgment, approval and regulatory interpretation."
]), callout("Build sequence", "Do not automate a broken reporting process. First document the KPI and controls, then standardize evidence, then automate data movement, then add AI where its error modes are measurable and reviewable.", PURPLE), PageBreak()]

# ---------- CRM ----------
story += section_title("13. Outreach CRM", "Track learning, not just replies", "Every contact should produce either a meeting, a referral, a reason for no-fit, or a useful signal.")
crm_fields = [
    "Organisation / person / role / persona", "Source and public contact channel", "Why this person specifically", "Date contacted / channel", "Response / meeting date",
    "Pain codes P1-P8", "Exact phrases / evidence", "Current tools", "Manual work mentioned", "Outsourcing openness", "Proof required", "Referral offered",
    "Follow-up date", "Next artifact to send", "Opportunity stage: research / partner / supervised / paid / no-fit"
]
story += [P("Required CRM fields", H2), bullets(crm_fields), P("Outreach conversion targets", H2), bullets([
    "100 targeted messages -> 40 completed interviews is the planning target, not a guarantee.",
    "If a persona converts below 20%, improve targeting/message before increasing volume.",
    "If 3+ people independently name the same pain, create a hypothesis card and test willingness to pay/partner.",
    "Do not count polite interest as validation; count concrete referrals, artifact reviews, supervised work, pilot scoping and paid work."
]), PageBreak()]

# ---------- boundaries ----------
story += section_title("14. Professional boundaries", "What Komplyint should and should not claim at the start", "Credibility grows faster when the scope is precise.")
rows = [
    ("Safe initial positioning", "Implementation support: KPI documentation, evidence indexing, control/process mapping, data lineage, trackers, project coordination, research and supervised reporting support."),
    ("Partner / supervise", "ESRS interpretation, double materiality facilitation, EU Taxonomy judgments, GHG methodology, transition plans and specialized environmental calculations until direct competence is demonstrated."),
    ("Do not represent as your service", "Independent statutory sustainability assurance/audit unless all legal, professional and independence requirements are met by appropriately qualified providers."),
    ("Data/privacy", "Use least-privilege access, defined retention, confidentiality, source provenance, versioning and secure client-approved storage. Avoid placing confidential evidence into unapproved AI services."),
]
bt = Table([[P(a,H3),P(b,SMALL)] for a,b in rows], colWidths=[48*mm,124*mm])
bt.setStyle(TableStyle([("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,0),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),
                        ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story += [bt, PageBreak()]

# ---------- sources ----------
story += section_title("15. Source register", "Official/public sources used for the contact and training research", "These URLs are included so every contact and current claim can be re-verified before outreach.")
sources = [
    "University of Vaasa: https://www.uwasa.fi/",
    "LUT University: https://www.lut.fi/",
    "University of Jyväskylä: https://www.jyu.fi/",
    "Tampere University company collaboration: https://www.tuni.fi/en/services-and-collaboration/companies-and-organizations",
    "Metropolia: https://www.metropolia.fi/",
    "Aalto University: https://www.aalto.fi/",
    "HELSUS / University of Helsinki: https://www.helsinki.fi/en/helsinki-institute-sustainability-science",
    "Hanken: https://www.hanken.fi/",
    "University of Eastern Finland: https://www.uef.fi/",
    "University of Turku: https://www.utu.fi/",
    "Tyrsky Consulting: https://tyrskyconsulting.fi/",
    "UseLess Company: https://useless.fi/",
    "Green Carbon: https://greencarbon.fi/",
    "Ecobio: https://ecobio.fi/",
    "Green Advisors: https://greenadvisors.fi/",
    "Rodinia: https://rodinia.fi/",
    "Kaskas: https://kaskas.fi/",
    "Miltton: https://miltton.com/",
    "Rantalainen: https://www.rantalainen.fi/",
    "Tuokko: https://tuokko.fi/",
    "Deloitte Finland: https://www.deloitte.com/fi/",
    "PwC Finland: https://www.pwc.fi/",
    "KPMG Finland: https://kpmg.com/fi/",
    "FIBS: https://fibsry.fi/",
    "Finsif: https://finsif.fi/",
    "Climate Leadership Coalition: https://clc.fi/",
    "Sitra / WCEF: https://www.sitra.fi/en/ | https://wcef2026.com/",
    "Sustainability Reporting Institute: https://www.sustainabilityreportinginstitute.com/contact | https://www.sustainabilityreportinginstitute.com/certification-tracks/csrd",
    "GRI Academy: https://www.globalreporting.org/academy/certification/ | griacademy@globalreporting.org",
    "EFRAG sustainability reporting: https://www.efrag.org/en/sustainability-reporting",
]
for s in sources:
    story.append(P("• " + s, TINY))
story += [Spacer(1, 8), callout("Regulatory freshness", "Sustainability reporting rules are moving. Before any client-facing use, re-check EFRAG/European Commission legal status, applicable ESRS text, transition rules, assurance requirements and any sector-specific obligations.", RED), PageBreak()]

# ---------- final ----------
story += section_title("16. 90-day finish line", "What success looks like", "The end state is evidence of delivery and a narrower market thesis - not simply a larger LinkedIn network.")
final_rows = [
    ("Discovery", "40 completed interviews across the planned persona mix; P1-P8 coded; 100 targeted outreaches logged."),
    ("Portfolio", "3 polished cases: Scope 2 KPI pack, Excel/multi-owner remediation, evidence-room/auditor tracker."),
    ("Real-world proof", "At least one supervised or paid pilot with named reviewer/client and concrete deliverable."),
    ("Positioning", "One primary wedge (for example KPI evidence & controls) plus one secondary partner route (for example environmental/Taxonomy)."),
    ("Delivery system", "Reusable templates, scope boundaries, data-handling rules, QA checklist and project closeout/lessons-learned process."),
    ("Next credential", "Chosen only after the evidence indicates which capability will improve trust and delivery."),
]
fr = Table([[P(a,H3),P(b,SMALL)] for a,b in final_rows], colWidths=[42*mm,130*mm])
fr.setStyle(TableStyle([("GRID",(0,0),(-1,-1),0.35,LINE),("ROWBACKGROUNDS",(0,0),(-1,-1),[WHITE,PALE]),("VALIGN",(0,0),(-1,-1),"TOP"),
                        ("LEFTPADDING",(0,0),(-1,-1),6),("RIGHTPADDING",(0,0),(-1,-1),6),("TOPPADDING",(0,0),(-1,-1),6),("BOTTOMPADDING",(0,0),(-1,-1),6)]))
story += [fr, Spacer(1, 10), callout("The first Monday action", "Build the Scope 2 KPI Evidence & Controls Pack and send five highly targeted interview invitations before doing any additional broad study. Execution creates the next questions.", GREEN)]

DOC.build(story)
print(f"Generated {OUT}")
