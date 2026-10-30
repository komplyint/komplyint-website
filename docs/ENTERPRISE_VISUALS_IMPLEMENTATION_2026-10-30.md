# Komplyint enterprise visuals — implementation register
Date: 30 October 2026
Baseline: main at 1cbb404047d714bd967bbb12f2176360215ab67f
Scope: customer-facing website design and evidence, FI/EN/SV; preserve existing public routes and downloads.

## Production plan subparts addressed
Pages 06–08 (homepage, identity, typography), 10–11 (graphics), 13 (people), 21–24 (QA). Owner direction: dark-first, charcoal-neutral, restrained green/crimson, meaningful software/reporting visuals.

## Reuse-first inventory
- Existing public app routing: src/app/page.tsx. Locale resolution, header, contact, service pages and deep links preserved.
- Original src/components/VideoHero.tsx and video/poster assets reused without altering reduced-motion and playback logic.
- src/components/ServiceCard.tsx, ExpertiseSpotlight.tsx, ConsultingEngagement.tsx, PublicBrochures.tsx, MarketingSections.tsx, ContactForm.tsx reused.
- Existing Charcoal Precision tokens and handbook CSS remain authoritative. Service cards reuse the original semantics and stable slug indices while the homepage visually orders software, QA and data first.
- Existing SVG assets and PDF routes remain.
- Pinned self-hosted Manrope 5.3.0, open-source OFL-1.1, newly introduced for enterprise display type. Existing Lato and EB Garamond are retained for other hierarchy roles.

## REA-FIRST decision
REA_NOT_APPLICABLE to this increment: no authorized external executable, website or proprietary user interface was supplied for replication. This is original art direction and extension of inspected first-party source. REA runtime not invoked; revision not applicable; no recovered application source or API replay. No third-party site imitation. Engineering time savings versus an independent implementation: unknown. Existing code reused first, independently implemented only the missing visuals and behavior.

## New original assets
- src/components/EnterpriseVisuals.tsx: localized HTML/SVG integration console, reporting dashboard and QA illustration. Buttons run a deterministic local simulated request including timeout retry; period selection recomputes chart, totals and mean using synthetic arrays. Not a production HTTP backend or actual client performance.
- Company-level services only: the previously proposed named specialist profiles were withdrawn from all public routes and removed from current source pending explicit approval.
- src/app/enterprise.css: bespoke layered compositions, responsive charts, refined typography and service priorities, all using original CSS and SVG rather than stock photos.
- src/app/page.tsx: new visual structure on Home, Software, Work and Company, using existing route infrastructure.
- src/app/layout.tsx: local font imports and first-paint dark default while keeping light and system controls.
- tests/enterprise-visuals.contract.test.mjs: check visual wiring and transparent demonstration labels.

## Truth and scope limits
Synthetic request REQ-104, dashboard counts and source-code snippets are strictly demonstrations; not claims of clients or deployed integrations. Personal names, individual biographies and portraits are not presented as marketing material. The current three eight-page service PDFs and ZIP remain; a shorter sales brochure and approved real photographs are a later work item. No new analytics or trackers are added.

## Verification gates
1. npm run build, including source contract tests.
2. Browser suites for video playback, responsive service cards, working demo buttons, period selector and language switching.
3. 320/390/768/1024/1440 px reflow, FI/EN/SV, both appearance modes, keyboard and focus tests.
4. Live brochure and contact delivery checks.
5. Exact Vercel URL, deployed SHA and desktop/mobile screenshots; only mark deployed once verified.
6. Human signoff on translated commercial copy.

## Status at source handover
DONE IN SOURCE: core visual components, integration wiring, privacy-first company presentation, design layer, contract tests, reused existing routes and controls.
IN PROGRESS: browser verification, CI and deployment proof.
DEFERRED UNTIL APPROVED: personal specialist introductions and photography; new two-page brochure not started.
BLOCKED: claiming production success without Vercel release evidence.

## 30 October owner revision
Personal details and individual biographies are withheld from the marketing website until specifically authorized. Named specialist cards are absent from Home, Software and About. Compact film-first hero and EB Garamond normal-weight editorial headings are the current typography direction. The software simulator remains in a separate section, not on top of video.
