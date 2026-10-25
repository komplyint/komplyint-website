# Komplyint Oy — website redesign review (25 October 2026)

## Status
Review branch only. Production has not been modified by these commits. The preview blocks outgoing form submissions.

## Business direction
Current positioning: Finnish Data, Automation & Software Solutions provider.
- Excel, data and reporting, including Power BI / Power Query.
- Microsoft 365 processes: Forms, SharePoint, Lists, Teams, Outlook, Power Automate and similar scoped work.
- Websites, small improvements and agreed maintenance.
- Small internal software and bounded integrations.
- Software testing and functional QA.
- Digital office support: Word, PowerPoint, documentation and templates.

Compliance consulting is not currently offered. Product development is separate from client work. Other microservices (remote assistant tasks, customer service workflows and scheduling) must pass capability and data-handling checks before promotion.

## Media preserved
Original logo.svg, media/hero.mp4 and media/hero.webp assets were not modified. The redesign displays the original video on desktop and mobile, with the original poster shown instead when reduced motion is preferred. The white SVG logo uses a dark background to preserve visibility, without changing SVG contents.

## Public routes
Next.js FI: /, /services, /software, /contact, /privacy.
Next.js EN: /en, /en/services, /en/software, /en/contact, /en/privacy.
Legacy static version: bilingual sections within one page.
Contact form: same-origin /api/contact. Live delivery depends on working configured SMTP.
No public login flow.

## Customer-facing standards
No invented testimonials, success metrics or unverified qualifications. Example scenarios are marked illustrative. Each project has agreed scope, acceptance criteria, delivery, verification, handover and limits. Do not imply 24/7 support, unrestricted changes or compliance certifications.

## Mandatory production gates
- [ ] Run npm run build, the public access test, and Node syntax checks.
- [ ] Inspect desktop and mobile rendering, language switching and six service tabs.
- [ ] Verify real hero-video playback and the reduced-motion fallback.
- [ ] Verify contact-form delivery with configured SMTP and synthetic test details.
- [ ] Confirm company details, privacy wording, data collection and realistic service descriptions.
- [ ] Get approval of the design and copy.
- [ ] Deploy only through the authorised delivery pipeline with rollback available.

## Review links
Source branch: https://github.com/komplyint/komplyint-website/tree/feature/digital-services-redesign-20261025
Review preview: https://raw.githack.com/komplyint/komplyint-website/feature/digital-services-redesign-20261025/preview/komplyint-review.html

## Next commercial stage (after visual approval)
Customer prospecting letters, tailored outreach emails, service-specific synthetic examples, statements of work, quotations, invoicing templates and follow-up processes.
