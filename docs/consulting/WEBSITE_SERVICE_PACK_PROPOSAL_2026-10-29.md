# Komplyint Oy — Website and service-pack redesign proposal

**Date:** 2026-10-29  
**Status:** DESIGN/SCOPE PROPOSAL ONLY — no page, code, brochure or live-deployment changes are asserted.  
**Source reviewed:** Live https://www.komplyint.fi/ and https://www.komplyint.fi/services on 29 October 2026, and main-branch website source `src/lib/commercial.ts`, `src/lib/i18n-sv.ts`, `src/app/page.tsx` and `src/components/PublicBrochures.tsx`.

## Executive recommendation

**Reposition from “small digital office jobs” to “software engineering, data/BI, automation and expert consulting”.** Preserve small fixed-scope entry offers, but do not make them the brand's ceiling. Use an **outcome-based service catalogue** that supports individual consultant assignments (including multi-month engagements) and direct deliveries; keep the ability to source additional qualified experts where the client permits.

Current live site and primary source still emphasise:
1. Excel, data and reporting;
2. Microsoft 365 and automation;
3. Websites and maintenance;
4. **Small** apps/integrations;
5. Software testing/QA;
6. Documents and office support.

The existing headline and descriptions (“pienet ohjelmistot”, “small apps”, “documents and office support”) can under-sell 5+ years' production full-stack development and close consulting opportunities prematurely. This is a **commercial positioning issue**, not a reason to delete low-risk/revenue-generating small jobs.

## Proposed service architecture (6 primary cards)

| Primary Finnish card | English | Swedish (Finland) | Priority | What is offered, conditional on confirmed specialist/project |
|---|---|---|---|---|
| Ohjelmistokehitys ja integraatiot | Software development & integrations | Programutveckling och integrationer | **Flagship** | TypeScript/JavaScript, React, Angular, Vue, Node.js, REST APIs, C#/.NET and appropriate existing-application maintenance, desktop/web features; scope based on named engineer |
| Data, analytiikka ja BI | Data, analytics & BI | Data, analys och BI | **Flagship** | Power BI, Excel/Power Query, SQL/Python data preparation, quality checks, dashboards, operational/business reporting |
| Automaatio ja tekoälyavusteiset ratkaisut | Automation & AI-assisted solutions | Automatisering och AI-stödda lösningar | **Scoped / assessed** | Microsoft 365/Power Automate, approved workflow integrations, human-reviewed AI-assisted document/data tasks; do not promise bespoke production AI systems without scoping |
| Testaus ja laadunvarmistus | Testing & quality assurance | Testning och kvalitetssäkring | **Flagship** | Functional/manual QA, regression checks, test scenarios, release reports, API checks and automation where qualified |
| IT-asiantuntijat ja projektitoimitukset | IT consulting & project delivery | IT-konsulter och projektleveranser | **Flagship** | Named consultant placements (part/full allocation), Finnish-facing coordination, English-language full-stack specialist, defined deliverables, additional vetted personnel by agreement |
| Verkkopalvelut ja ylläpito | Websites & digital operations | Webbplatser och digitalt underhåll | **Supporting** | Web experience, usability/responsiveness, CMS upkeep, features, performance and maintenance under an agreed service-level scope |

**Keep as cross-sell instead of deleting:** documents/office support; Microsoft 365/SharePoint/Teams; training materials; content/layout; small repair jobs. Link these under data, automation and operational support and in the services FAQ.

### Existing routes and compatibility

Current Next.js code uses the 6-position `services[lang]` array and `serviceSlugs` in `src/lib/commercial.ts`, drives public /services routes and contact preselection. **Do not simply rename or reorder the current array** without updating all slug-to-service maps, tests, cards, menus, forms, metadata, Swedish messages and downloadable brochures.

Keep live slugs:
- `/services/data-reporting`
- `/services/m365-automation`
- `/services/websites-maintenance`
- `/services/software-integrations`
- `/services/testing-qa`
- `/services/document-support`

For expanded categories, either (A) add dedicated new routes with redirects/aliases as needed, or (B) preserve existing slug semantics while expanding presentation; **avoid breaking indexed links**. The end-user must be able to land on a known URL and still see the relevant service.

## Specific website copy proposals (native/businesslike, not word-for-word translations)

### Finnish homepage

**Eyebrow:** OHJELMISTOKEHITYS · DATA · AUTOMAATIO · IT-ASIANTUNTIJAT

**Headline:** “Ohjelmistokehitystä, dataa ja automaatiota yritysten tarpeisiin.”

**Lead:** “Autamme yrityksiä ja IT-kumppaneita ohjelmistokehityksessä, raportoinnissa, automaatiossa ja laadunvarmistuksessa. Toteutamme sovittuja projekteja ja tarjoamme asiantuntijoita myös pidempiin toimeksiantoihin.”

**Small-job reassurance:** “Myös pienet, selkeästi rajatut työt ovat tervetulleita.”

**Open-scope CTA:** “Kerro tarpeestasi — arvioimme sopivan toteutustavan ja tarvittavan osaamisen.”

### English homepage

**Eyebrow:** SOFTWARE ENGINEERING · DATA · AUTOMATION · IT CONSULTING

**Headline:** “Software, data and automation expertise for your business.”

**Lead:** “Komplyint Oy supports companies and IT partners with software engineering, reporting, workflow automation and quality assurance. We take on defined projects and can propose specialists for longer-term assignments.”

**CTA:** “Tell us what you need. We can discuss the right scope and expertise.”

### Swedish (Finland) homepage

**Eyebrow:** PROGRAMUTVECKLING · DATA · AUTOMATISERING · IT-KONSULTTJÄNSTER

**Headline:** “Programutveckling, data och automatisering för företag.”

**Lead:** “Komplyint Oy hjälper företag och IT-partner med programutveckling, rapportering, automatisering av arbetsflöden och kvalitetssäkring. Vi åtar oss avgränsade projekt och kan diskutera längre konsultuppdrag.”

**CTA:** “Berätta vad ni behöver — vi tar gärna fram ett förslag på upplägg och kompetens.”

All three language sets must be reviewed for natural usage by a native/proficient business writer. Preserve the current dedicated `fi`, `en`, `sv` localisation system with language names/flags and stable URL semantics. **Do not machine-translate compliance and legal claims at runtime.**

## Illustrative service-detail wording (proposal)

### Ohjelmistokehitys ja integraatiot
- **Intro:** “Kehitämme ja jatkokehitämme verkkosovelluksia, rajapintoja ja tietojärjestelmien välisiä integraatioita sovitun tarpeen mukaan.”
- **Examples:** “React-, Angular- ja Vue-käyttöliittymät”; “Node.js-/TypeScript-rajapinnat ja taustapalvelut”; “Olemassa olevien sovellusten korjaukset, testaus ja ylläpito”; “Tarpeen mukaan myös C#/.NET-, Azure Functions- ja Kafka-ympäristöt, kun soveltuva asiantuntija on vahvistettu.”
- **Delivery:** Named engineer(s), source code rights, agreed tests, documentation, deployment and support ownership.
- **Limits:** Major architecture, regulated/high-assurance and 24/7 operation require separately assessed capacity and agreement.

### Data, analytiikka ja BI
- **Examples:** Power BI dashboards, Excel/Power Query reconciliation, SQL/Python data checks, reporting automation, data-quality validation, requirements and project reporting.
- **Limits:** Do not claim accredited audit, regulated financial advice or medical/clinical analysis.

### Automaatio ja tekoälyavusteiset ratkaisut
- **Examples:** M365 approvals/notifications; document classification and extraction, internal information retrieval, human-reviewed summaries, AI-assisted test/data workflows.
- **Promise:** “Arvioimme, missä automaatio tai tekoälyavusteiset työvaiheet tuovat hyötyä ja millaiset tietoturva- ja laatutarkistukset tarvitaan.”
- **Limits:** No promise of autonomous irreversible decisions; approved model and data-handling controls always required.

### Testaus ja laadunvarmistus
- **Examples:** test cases, browser and API validation, automated regression suitable to specialists, release checklists and bug reports.
- **Avoid:** treating mature IT companies as lacking internal QA. Position as **temporary extra capacity, dedicated test packages or a second independent verification layer** where needed.

### IT-asiantuntijat ja projektitoimitukset
- **Examples:** 40–100% named specialist placements when agreed; scope-defined project teams; Finnish-speaking coordination + English-speaking software delivery where the customer accepts it.
- **Copy:** “Tarjoamme osaamista projektikohtaisesti. Vahvistamme aina etukäteen asiantuntijan osaamisen, työskentelykielen, käytettävyyden ja toimeksiannon ehdot.”
- **Never:** list an unconfirmed employee, promise a Finnish-speaking developer when the available person works in English, or claim Scrum Master accreditation.

## Working-language UX (critical)

Do not assign a single language flag to the whole company; capability and consultant requirements differ.

1. Show “**Data, raportointi ja koordinointi: suomi / englanti**” for the owner’s scope.
2. Show “**Ohjelmistokehitys: englanti**” for Valentine’s assignments.
3. Offer “**Suomenkielinen asiakasviestintä + englanninkielinen tekninen toteutus sopimuksen mukaan**” as a possible combined-delivery model.
4. On a client enquiry form ask **the required language of the person performing the technical work**, not just the language of correspondence.
5. For named roles marked “Finnish fluency mandatory”, do not route them to an English-only developer without explicit buyer exception.

## Conversion and buyer journeys

Present **two explicit sales pathways**:
- **Tarvitsemme IT-asiantuntijan / We need a consultant:** duration, allocation (e.g. 80–100%), role, tech, required languages, location, start date, security restrictions, access requirements and procurement route.
- **Tarvitsemme projektin toteutuksen / We have a project:** goal, current system, desired output, budget band (optional), timeline, languages, integrations, data sensitivity, support expectation.

Include an accessible, ordinary-language open field: “**Muu IT-, data- tai digikehitystarve — kerro, mitä tarvitsette.**” Never imply these two tracks are exhaustive.

## Scope and delivery proof

- Reference individual's employers solely as **individual experience**, never Komplyint projects.
- Keep clearly labelled fictional demos separate from verified customer references, with informed permission for any employer/client names.
- Position **AI-assisted delivery** as a way of executing approved work under qualified ownership, not evidence of pre-existing AI product competence.
- Maintain separate English/Finnish consultant CVs and a corporate capability sheet with no private identifiers beyond approved business contacts.
- Distinguish “direct delivery / subcontracted specialist / suitable partner sought” in each proposal.
- No enterprise SLA, certification, pentest, 24/7 support, permanent staffing, regulated advice, or autonomous AI service promises without proof.

## Brochures and metadata must be synchronized

The website publicly links:
- `/downloads/Komplyint_Palveluesite_FI.pdf`
- `/downloads/Komplyint_Service_Portfolio_EN.pdf`
- `/downloads/Komplyint_Tjanstebroschyr_SV.pdf`
- `/downloads/Komplyint_Service_Documents.zip`

**Regenerate all FI/EN/SV brochures and their bundled ZIP when the service copy changes.** Review each rendered PDF for clipping, attribution, contact information, role language and disclaimers; test download URLs and signatures on the **live** domain. Old brochures must not contradict the new catalogue. Search metadata, structured data, service detail routes, contact prefill and email marketing pack should match the accepted service taxonomy.

## Implementation sequence for future agents

1. **Service taxonomy and conversion routes:** agree six primary cards, subservices, long-term consultant page and open-scope enquiry path.
2. **Single data source:** update existing `src/lib/commercial.ts` and `src/lib/i18n-sv.ts` (or refactor cleanly with tests), preserving route aliases and every `fi/en/sv` translation.
3. **Marketing components:** reuse existing `ServiceCard`, `ServiceExplorer`, `ServiceDetail`, `PublicBrochures`, `ContactForm` and navigation instead of creating a disconnected microsite.
4. **Service proofs:** sanitized named consultant expertise, verified skills, explicit working languages and optional partner-delivery model.
5. **Brochures:** regenerate PDFs/ZIP from same approved service content, verify visual fidelity and localization.
6. **QA:** `npm ci && npm run build`; test all six/current and new routes, locale switching, responsive layout, accessibility, form service choices, public paths and PDFs.
7. **Git evidence:** create implementation PR, record changed source, tests and CI status; **do not equate git commit with live deploy**.
8. **Deploy:** publish only through the **existing Komplyint Vercel project**, then check public site routes, brochures, video, contact form and production release fingerprint. Do not create duplicate projects.
9. **Outreach synchronization:** refresh website link snippets, company capability PDF and partner/direct-buyer messages once approved and actually live.

## Decision table

| Decision | Status | Owner |
|---|---|---|
| Add serious full-stack software engineering and consulting scope | RECOMMENDED | Company owner |
| Keep small tasks as complementary entry products | RECOMMENDED | Company owner |
| Advertise Valentine as project-available English-speaking specialist | CONDITIONAL — acceptance of suitable projects reported; confirm assignment and public bio consent | Company owner and Valentine |
| Market AI-assisted services with controlled delivery | RECOMMENDED WITH FEASIBILITY/SAFETY GATES | Named delivery lead |
| Replace the current live service cards/copy | NOT IMPLEMENTED by this documentation change | Website implementation agent |
| Update brochures, site code and deploy | NOT IMPLEMENTED by this documentation change | Website implementation agent |
