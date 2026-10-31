# Komplyint business-operations expansion — review and release record

Date: 31 October 2026
Baseline main SHA: 593f84ad30768bde3c6f4bb315ed5d53d653ccad
Branch: feature/business-operations-20261031
Status: REVIEW BRANCH — expanded PDFs committed, no production deployment or email sending

## Commercial decision
Retain an engineering-forward company positioning and the existing hero video/headline. Expand outcomes under data quality and reporting; process documentation and BPMN; SharePoint intranet and knowledge management; cross-platform workflows; project and grant tracking; CRM/marketing analytics; and engineering/QA. Customer-facing language must remain conditional on specific project scope, verified availability, licenses and competence. Do not imply every listed tool is an established specialization.

## Delivery catalogue
- Six buyer-focused business solution packages (reporting & cleanup, workplace/intranet, process improvement/automation, project support, performance/analytics, software/QA).
- 27 A+B services defined in a stable catalogue with FI, EN and sv-FI names, four filters and searchable tools. Eight are visible initially for concise mobile browsing; an explicit expansion button exposes the full 27.
- Microsoft 365 and other ecosystems grouped; platform presence does not imply certified skill.
- Existing six /services/<slug> URLs are preserved and used for enquiry preselection.
- Homepage preserved, with FI/EN/SV supporting copy broadened to mention processes, intranet and reporting.

## Interactive demonstrations
Three independently interactive synthetic demonstrations:
1. Funding/project dashboard with year filter, dynamically recalculated KPIs and decision breakdown.
2. Intranet/process library with departmental filtering, text search, document detail and SOP steps.
3. Request/approval queue with creation, approval, rejection, pending count and reset.
All data are local/static; controls update React state, not back-end services. All three are labelled fictional, not historical case studies. Existing DeliveryLab remains available.

## Test and release boundary
New contract regression test added to the existing build contract list. This is source-level evidence only until test execution in CI and browser validation is seen. Verify:
- npm run test:public-access
- npm run build and static routes for /, /en, /sv, /services, /en/services, /sv/services, /work, /en/work, /sv/work
- keyboard tabs/search/select inputs and contrast/focus
- mobile 320/375, tablet and wide desktop
- new component CSS and legacy hero/video do not overlap
- no cross-origin data, no client-record leakage
- privacy text and working-language descriptions remain accurate
- test brochure downloads after brochure regeneration

## Brochure sync — VERIFIED IN REVIEW BRANCH
The four `public/downloads/` assets have been generated and committed in this PR as 10-page FI/EN/SV PDF brochures and one ZIP. New pages eight and nine present the six buyer packages and 27 service examples. PR brochure workflow verified 3 PDFs / 30 rendered pages / ZIP membership / website-copy parity. CI artifact Git blob IDs match committed branch asset hashes; human sample render review performed on pages 8 and 9 in all three languages. Actual production URLs remain old until the PR is deployed. The main-branch brochure workflow must not be used to claim PR publication.

## Outreach — separate controlled workflow
Prior contact package was a 948-company 30 Oct campaign with 914 addresses and 34 missing at last known review, and excluded the originally contacted first 100; the 107 current already-sent contacts stated by the user are distinct from 107 officially confirmed email addresses in the source audit. Do not confuse contact verification count with sent count.
The newest verified 948 spreadsheet/HTML and identities of the 107 sent contacts were not available in this session, so no recipient-by-recipient changes were made, no email sent and no specific contact marked unsent. An offline review workbook contains six editable Finnish/English templates, a suppression-import tab and 1,314 earlier ranked leads from a 26 Oct tracker, all marked HOLD. Neither the older tracker nor a row-number threshold may replace the 948 source of truth. Merge only after matching sent recipients by verified company ID/email and preserving opt-outs and reply states.

## REA-first reuse decision
Existing first-party source read: src/app/page.tsx, src/components/DeliveryLab.tsx, ServiceExplorer.tsx, ServiceDetail.tsx, src/lib/commercial.ts, src/design/tokens.json, src/app/enterprise.css. First-party components, route semantics, type structure and brand tokens reused. New code limited to the expanded catalogue, demo, scoped CSS and tests. REA status: REA_NOT_APPLICABLE for external software extraction (original business content and synthetic examples, no third-party executable application to recover); REA not run, so no REA-derived extraction or time savings asserted. Confirm this classification against internal REA-first directive if later expanding from external implementations.

## Outcome and status
DONE (source branch): catalog, packages, tool coverage, local synthetic demos, responsive progressive-disclosure catalogue, layout injection, FI/EN/SV support copy, 10-page trilingual brochure files + ZIP synced and tested; tests registered.
IN PROGRESS: final-source GitHub Actions browser/axe/build verification and pull request review.
BLOCKED: production publication (explicit merge/release and Vercel credential preflight) and exact 948-campaign retargeting without latest verified HTML board and actual 107 sent-state backup.
NOT STARTED: production deployment, live-contact email sending, third-party integration of portfolio demonstrations.

## Audit findings and corrections
- Original 56-route/2-theme accessibility audit returned 12 `label-content-name-mismatch` route failures in the original delivery-lab chart bars. A successful offline artifact inspection isolated all 12 to that issue. Fixed by using content-derived button accessible names with visually hidden descriptive context; functionality kept unchanged. Full rerun required before release.
- Existing two brochure contract tests were hard-coded to eight pages. Updated to verify ten pages, canonical brochure sources and 27 services.
- Browser and cross-engine tests already demonstrated the 27-service catalogue and three interactive examples before progressive-disclosure change; the latest 8-initial / 27-on-demand view is covered by an updated browser test.
- Production credential preflight now executes only on actual release events, not review PRs; production deploy still requires authorized secrets and passing verification.
- Separate local-only Zoho migration utility produced for the user's exact HTML+JSON input; actual 30 Oct board and saved sent list are not accessible in this environment and are NOT claimed to be merged.
