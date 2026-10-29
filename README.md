# Komplyint Oy — Public digital services website

The production source is the root Next.js 14 / React application. The Finnish and English commercial offer covers Excel, data, Power BI, Microsoft 365 automation, websites, scoped software, QA, and document support. Compliance consulting is not offered at this stage.

## Reused code and protected original media

- Reuse the existing application and shared bilingual catalogue in src/lib/commercial.ts. Do not create another standalone website as a substitute.
- Keep public/logo.svg, public/media/hero.mp4, and public/media/hero.webp unchanged. Hero-mobile and hero-optimized are smaller delivery versions of the same video.
- The legacy static frontend and Express mail backend remain for compatibility; the root Next.js app is the intended Vercel production target.

## Public journeys

- Home: / and /en
- Services: /services and /en/services, with six /services/{slug} detail routes in each language.
- Work, About, Software, Contact, Privacy and Accessibility have bilingual pages.
- Documents: /downloads/Komplyint_Palveluesite_FI.pdf, /downloads/Komplyint_Service_Portfolio_EN.pdf and /downloads/Komplyint_Service_Documents.zip.
- Release attestation: /api/release with site name, handbook contract and available commit.
- Public contact: /api/contact, where SMTP must be configured to route enquiries to info@komplyint.fi.

Company: Komplyint Oy · Business ID 3588595-3 · D-U-N-S 369283279.

## Komplyint business email accounts

The Zoho Mail Free admin screenshot dated 28 October 2026 shows one mailbox (`komplyint@komplyint.fi`) and 15 aliases. The complete record, channel ownership and still-pending delivery checks are in [docs/EMAIL_ADDRESSES_2026-10-28.md](docs/EMAIL_ADDRESSES_2026-10-28.md). The canonical application register is [src/lib/contact-addresses.ts](src/lib/contact-addresses.ts), and the contact page reuses the existing FI/EN/SV site and form to list relevant department addresses. Creation of an alias is **not** proof of live delivery.


## Consulting services and project-based specialists — 29 October 2026

For future AI agents and sales/website implementers, the owner's latest, **dated** company-positioning decisions are recorded in:

- [Consulting capabilities and specialist evidence](docs/consulting/CONSULTING_CAPABILITIES_AND_SPECIALISTS_2026-10-29.md) — sanitized developer CV record, owner's BI/QA scope, **Finnish/English vs English-only delivery**, Valentine's agreement to collaborate on suitable projects, potential additional staffing and AI-delivery safeguards.
- [Service-pack redesign proposal (FI/EN/SV)](docs/consulting/WEBSITE_SERVICE_PACK_PROPOSAL_2026-10-29.md) — proposed broader software development, data, automation/AI-assisted work and expert consulting services; old route compatibility, brochures, translations and deployment acceptance.
- [Outreach and delivery playbook](docs/consulting/OUTREACH_AND_DELIVERY_PLAYBOOK_2026-10-29.md) — partner/direct-client approaches, project matching, language requirements, B2B follow-up, staffing and AI permissions.
- [29 Oct live project-lead snapshot](docs/consulting/PROJECT_LEADS_SNAPSHOT_2026-10-29.md) — dated, source-linked English-speaking full-stack opportunities and fit/gap assessment; **not an applications-sent report**.

These are **strategy and implementation instructions, not proof of updated public website copy or deployed services**. Do not commit the unredacted Valentine CV or personal reference contacts to this public repository. For user-authored outreach emails, end at the closing greeting only (such as “Ystävällisin terveisin,”), as the mail client supplies the signature.

## Validation

Run npm ci && npm run build. The build runs public-access and release-contract unit tests. The site-preview-check GitHub workflow runs browser, accessibility, motion and document checks. Lighthouse and visual brochure review are separate workflows.

For the live host, run node scripts/verify-public-release.mjs. Environment variables PUBLIC_SITE_URL and RELEASE_VERIFY_ATTEMPTS can override the domain and retry count. This verifier tests the release endpoint, content of nine routes, all three downloadable files and their real file signatures, and writes release-evidence.json.

Only independent live-site evidence proves production deployment, not a merged branch or successful Next.js build. A successful HTTP response from the contact API also does not prove inbox receipt; separately verify the mailbox.

## Production deployment: existing Vercel project only

Use the Komplyint Oy Vercel project named komplyint-website with www.komplyint.fi. The preferred connection is the GitHub repository komplyint/komplyint-website with Production tracking main. The fallback GitHub Actions workflow deploy-vercel-production.yml requires three GitHub secrets: VERCEL_TOKEN, VERCEL_ORG_ID and VERCEL_PROJECT_ID referring to that same project.

The live-release-verify.yml workflow executes on each main push and can be run manually. It must fail while the live site serves the old design or lacks new service/download routes. See docs/VERCEL_PRODUCTION_HANDOFF.md for exact steps.

**As of 25 October 2026, the source redesign was merged but public-domain verification still showed the previous site.** This is a hosting-connection blocker, not evidence that the engineering design is absent.

## Scope and privacy

All marketing and contact pages remain public and login-free; protected product/admin applications use independent auth. Ask customers not to send sensitive data in initial contact. We do not claim regulatory certification, enterprise-scale support or 24/7 service without a separate agreement.

The competition-oriented review process is documented in AWARD_READINESS_Q16_Q21.md. Independent human review, owner acceptance and competition submission are separate from automated test results.
