# Handbook execution evidence — Komplyint Oy

Specification: **Komplyint Redesign Handbook v1.0 (25 October 2026)**. This document reports actual implementation scope; it is not a claim that the 1,517-entry checklist has passed.

## This iteration: F07, T12, F15–F18, E01/E02, Q11

| Topic | Reused foundation | Implementation | Acceptance evidence |
| --- | --- | --- | --- |
| Initial HTML language (F07/T12) | Existing FI/EN routes, localized metadata and LangSetter | Server middleware forwards verified route locale to the root layout, where `<html lang>` is set before hydration | `tests/language-font.contract.mjs`: actual response HTML and browser behavior for six public routes |
| Authentic font faces (F15–F18) | Approved EB Garamond/Lato roles from existing handbook.css | Next.js `next/font/google` generates build-time self-hosted, fingerprinted WOFF2 assets; true weights 400/700 and swap display | Browser tests inspect `document.fonts` for loaded EB Garamond and Lato on both locales |
| Quality enforcement (Q11) | Existing browser smoke, Axe, movie and CLS harness | Run new locale/font test on `main` as well as feature branches | CI workflow evidence is required; a committed test is not a PASS |

## Current exceptions — not signed off

- **F18**: Production designer approval, exact EB Garamond 12 specimen parity, font checksums/license records, measured transfer budget and full FI/EN glyph proof remain **NOT TESTED**.
- **E02/E03**: Splitting `src/app/page.tsx`, removing redundant legacy declarations from `globals.css`/`commercial.css`, and publishing the 1,517-entry requirement status register remain **IN PROGRESS / NOT TESTED**.
- **Q11–Q22/R03**: End-to-end inbox receipt, screen reader/manual audit, real-device matrix, human art-direction approval and signed competition review remain **NOT TESTED**.
- Production publication requires checking `/api/release` for the exact build and verifying the live paths. Merged source is not proof of publication.

## Reuse vs new work

Reused: actual Next.js production routes, `src/lib/commercial.ts`, bilingual paths, existing CSS, current automated browser runner and original hero media. Newly integrated: one small route-locale middleware, Next.js self-hosted font setup, and regression checks. No duplicate site/runtime or externally hosted runtime dependency was added.

## Architecture continuation — E02/C20

The existing public client facade now delegates `VideoHero`, `FeaturedWork`, `PublicBrochures`, `ServiceCard` and `Arrow` to shared components, and `pathFor` to a shared route helper. This is a code extraction and reorganization, not a second site. The original hero/video, bilingual content, links, analytics graphic and contact functionality remain unchanged. A new source-architecture contract is part of the production build's Node tests. Browser-level parity still requires the quality workflow.

Remaining E02: extract the form and service explorer, consolidate the legacy stylesheet cascade and review static rendering boundaries.

## Full handbook inventory — F01-R06 / R02-Q18

The actual 191-page PDF table of contents has been normalized into `docs/handbook-specification-units.json`: 24 F, 64 C, 18 P, 20 T, 16 E, 22 Q and 6 R units. Each unit includes its exact printed title and source page, validation initially **NOT_TESTED**, plus selected pointers to existing implementation files where verified by file location. The 1,517 detailed acceptance entries are **not** the same as the 170 top-level units and remain to be imported, individually checked and signed off. Run `npm run report:handbook` for an honest completion tally; `npm run build` validates IDs and evidence paths.

## Legacy global CSS cleanup — E02/F10

Replaced the unused pre-redesign site selectors in `src/app/globals.css` with a minimal reset. The scoped `kc-*` and `qh-*` styling still comes from the existing `commercial.css` and `handbook.css` (no new CSS engine). This eliminates the obsolete bare `section` rule and conflicting `.hero`, `.header`, `.card`, `.footer` and `.contact` declarations from the production CSS. Structural checks run during `npm run build`; responsive visual-parity checks are required before marking E02 complete.

GitHub quality CI now cancels superseded runs on the same ref so the latest main build gets the evidence without wasting execution time.

## Service and contact component extraction — C20/C27/C35 / E02

Moved `SectionIntro`, `ServiceExplorer` and the actual inquiry `ContactForm` out of the public routing monolith while retaining the existing service catalogue and `/api/contact` backend. Added keyboard-operable service tabs (Arrow keys, Home, End, roving Tab order and labelled active panel) and both-locale browser regression evidence. Contact form validation, submitted data, labels, error states, anti-spam field and links are reused verbatim; live inbox delivery still requires independent end-to-end proof.

## Color and depth tokens — F09/F10/F12/F13/E03

Added the versioned design token master `src/design/tokens.json` and generated matching `--ki-*` definitions at the start of the already-loaded handbook stylesheet. The existing `--kc-*` consumer aliases now map to the approved light/dark semantic roles, preserving the existing pages. The featured work composition and service card shadows use the handbook E2/E3 elevation values. The specific crimson #C74C57 is an owner-requested extension, **not a claim that the original green handbook specified red**. The token master and CSS are compared by a production-build test. Remaining: migrate every component literal, perform dark/light contrast calculation and independent visual sign-off.

## Appearance semantics — F10/C09

Changed the first-time appearance choice from a forced dark theme to the handbook's **System** preference. Early inline prepaint code now resolves the operating-system preference unless the visitor explicitly selected light or dark. The footer/mobile appearance selector preserves the chosen mode in storage; browser checks cover both system settings, user override, persistence and restoration. Original green identity and full manual theme control are retained.

## Component-by-component acceptance — C01-C64 / Q18

Imported **all 225 explicitly numbered C01-T01 through C64-T03 style component tests** from pages 41–106 of the original PDF into `docs/handbook-component-acceptance.json`. Each test has its exact source wording, parent Cxx unit, page and initial **NOT_TESTED** result, linked back to the 170-unit register. `npm run build` checks count, unique IDs, parent references and status honesty. These 225 are not a substitute for the rest of the 1,517-item detailed acceptance/verification obligations.

## Public release media and locale attestation — F20/F22/Q11/Q21

Extended the existing `scripts/verify-public-release.mjs` production verifier to require the actual original vector graphics in both languages, valid optimized/mobile MP4 headers, the responsive WebP poster and the correct initial FI/EN HTML language alongside the existing release commit, routes and brochure signatures. The Node contract includes broken-media, missing-art and incorrect-language failure cases. This is a byte/availability gate; real video decoding and interaction remain separately covered by Playwright and actual production browser review.

## Work page illustration family — F19/F20/C23

Added three original, editable SVG-in-React compositions for the existing honest demonstration scenarios: Excel reporting, request workflow automation, and website functional review. They share the established green/charcoal/crimson art direction, remain decorative to assistive technology, carry no fabricated client values, and sit under the already-present demonstration disclaimer. The browser quality workflow now asserts all three visuals render and captures a dedicated work-gallery screenshot.

## Contact request contract — E08/E09/E11

The existing Next.js contact API now reads request bodies with an actual 32KB bound before JSON parsing; normalizes Unicode input, validates email, six stable service keys and FI/EN locale, enforces message code-point limits and returns structured 422 field failures. The email recipient remains server-controlled. The existing SMTP acceptance requirement, escaping and honeypot are preserved. The form now sends independent service/locale fields, surfaces 422/429/unknown statuses and preserves drafts on failures. Browser tests intercept the endpoint and use fictional data only.

The process-local idempotency key cache is explicitly best-effort; **distributed durable idempotency, anti-abuse coordination across instances and real inbox delivery remain operational NOT_TESTED gates**, not claimed complete.

## Trilingual internationalization (F07/T12, E12/Q11)

Added complete Swedish (Finland) site content under explicit `/sv` routes alongside the existing Finnish default and English `/en` routes, all backed by one typed locale table. Added a three-language, flag-and-native-name selector to desktop and mobile navigation. Preserved deep links, query/hash and contact-draft protection. Reused the existing Next.js route templates, editorial content, original film and two existing downloadable brochure PDFs; only the Swedish UI dictionary, Swedish illustrations, locale paths and tests were built new. Added server `lang=sv`, Swedish canonical/OpenGraph metadata, three-language `hreflang` and sitemap. See `docs/I18N_SWEDISH_IMPLEMENTATION.md`.

**Acceptance state:** code and tests awaiting GitHub CI. Production requires an authorized deploy to the existing Vercel project; no live release is claimed.

## Error-state locale parity (F07/Q11)

Localized both 404 and runtime-error recovery screens using the same typed FI/EN/SV dictionary, keeping the current-language homepage return route. The trilingual browser test now checks a real Swedish 404 response; no duplicate error handling runtime was introduced.

## CI runner reliability — F21/F22, Q11 (25 Oct 2026)

The previous `25eaaf7` full QA job was cancelled after the 22-minute budget because a routine `sudo apt-get update && sudo apt-get install ffmpeg` held the runner for approximately 20 minutes. The build, 66 source tests, Swedish initial `lang`/fonts, locale switcher, contact form and hero-media browser tests all passed before the timeout; the final award/accessibility audit did not finish. Reuse the existing system `ffprobe` when available, but always enforce MP4 header and minimum source size without invoking APT. The separate existing real browser media checks remain mandatory. This fix reduces network-dependency risk without weakening functional playback tests.

## Swedish brochure parity — C24/F07/Q11

Extended the **existing** reviewed `scripts/generate_public_portfolio.py` ReportLab engine and six-page template to read `scripts/portfolio_sv.json`. The shared generator now produces a Finnish, English and Swedish edition with exactly three PDFs inside `Komplyint_Service_Documents.zip`. The Services page exposes the Swedish PDF directly and labels all three downloads in all website languages. Rewired the existing brochure workflow to build from `main`, check page counts and text, render all 18 PDF pages for review, check ZIP byte identity and commit the generated assets back to `main`. Source contract tests guard the complete language set. Note that generated binary files are **pending the workflow run**; presence of a source recipe does not prove published PDF bytes.

Improved the production deployment workflow to report missing Vercel credentials as an actual blocked/failing status instead of a misleading green preflight that skips publication. No new hosting project or authorization bypass is used.

## Published three-language brochure verification — C24, Q11

The existing CI builder succeeded for source commit `fd873d3` and produced **all three real six-page PDF binaries**, an integrity-checked three-file ZIP, and 18 render previews. Bot asset commit: `60a6a00d93629316dae0f903993c9cd8ba452ea8`. The updated source contract now checks the exact committed binary signatures and ZIP directory names; Playwright additionally fetches each public PDF from the local Next.js static server, checks byte signatures, and tests the Swedish page's responsiveness at 360–1440px. Human visual sign-off remains pending. Note that the live Vercel domain has not yet published these assets.

## Charcoal Precision revision — F09/F10/F12/E03, C02–C64, Q11 (25 Oct 2026)

Applied the owner-directed near-black/charcoal + warm-white visual hierarchy through `src/design/tokens.json` v1.2.0 and the **existing** `src/app/handbook.css` component consumers, preserving the original logo/video and the FI/EN/SV routes and assets. The hero's reading plate, navigation, process, feature-work stage, contact CTA and footer now use charcoal instead of large green surfaces. Cards use true white/light or graphite/dark; forest green remains the primary action/accent; crimson is used in the demo CTA and small highlights, not as an entire-page fill. The previous full-bleed green mobile hero has been overridden as well.

Reused: all existing Next.js components, three-language content, media, layout, tokens, CI browser harness. Newly authored: CSS art-direction changes, v1.2 token contract, browser computed-style and text-contrast regression tests, review evidence. Visual and source checks still require the referenced CI run. Manual human art-direction approval and production publication remain pending. See `docs/CHARCOAL_PRECISION_IMPLEMENTATION.md`.

## Skip-link focus and whole-site responsive reflow — C01/C03, F07, P18, Q10-Q12 (26 Oct 2026)

**Previously:** the page shell rendered a native skip link to `#main-content`, but the destination was not programmatically focusable; the quality suite checked selected representative templates rather than all 42 FI/EN/SV public paths at 320 CSS px.

**Now implemented in the actual website:** the existing `<main id="main-content">` is additionally `tabIndex={-1}`, and the shared handbook stylesheet gives the destination an appropriate scroll margin behind the sticky header. A new Playwright matrix reads the actual `/sitemap.xml` and checks the expected 42 real routes (14 page families x three explicit locales) at 320 CSS px in light and dark themes. It asserts HTTP success, initial HTML language, canonical and reciprocal locale metadata, exactly one main H1, and no page-level horizontal overflow. The test also activates skip links by keyboard in FI/EN/SV, visits representative pages with JavaScript disabled, and measures text-spacing override resilience at 320 px. It emits an immutable-run JSON evidence report under `site-preview/handbook-route-reflow-evidence.json` and representative screenshots.

**Reuse:** existing Next.js public routes and SSR content, accessible anchor/landmark, theme management, 42-entry sitemap, Playwright Chromium harness, and GitHub screenshot artifact workflow. **New code:** one focusability attribute, two CSS scroll-margin rules, one site-wide automated acceptance script, and CI integration. No new runtime dependency or alternate site was introduced.

**Acceptance status:** changes are committed as engineering work, but formal C01/C03/P18/Q10 and the declared 1,517 obligations remain NOT_TESTED until the corresponding CI run and human/manual evidence are reviewed. A narrow Chromium viewport approximates the reflow width of a desktop browser at high zoom; it is not equivalent to actual browser 400% zoom, NVDA/VoiceOver, or physical-device inspection. Do not claim those passed.

## Handbook PDF source-trace import — R02/Q18, F01-F24, C01-C64, P01-P18, T01-T20, E01-E16, Q01-Q22 (26 Oct 2026)

The original 191-page PDF, SHA256 `fa3b42f584f9fe79448f9a335b3fd0f81c6171fc5cacbc020b7f15589d233951`, was processed using native PDF words and page rules rather than invented acceptance text. Recovered 1,257 ruled-table requirement rows and all 225 explicitly numbered component acceptance lines, for **1,482 source-traceable draft records**. The 1,517-entry declared count leaves **35 items still requiring manual source reconciliation**. A reproducible import-only script (`scripts/import_handbook_pdf.py`) and a machine-readable count audit were added; the actual 1,482-entry dump remains an offline output, not yet a signed-off repository source ledger.

**Reuse:** the existing v1.0 PDF, 170-unit register, 225 component acceptance records and `scripts/handbook-progress.mjs`. **Built new:** offline PDF ruled-table importer, strict source SHA validation and explicit reconciliation metadata. No new production runtime or login is introduced. These numbers are documentation coverage, **not** verification PASS. Owner/independent approvals and Vercel production authorization remain pending.

## Published design identity gate — Q20/Q21 / F09–F12 (26 October 2026)

Added `design: charcoal-precision-v1.2.0` to the existing `/api/release` contract, tested its presence in local production-browser smoke checks and strengthened the independent public verifier to reject a stale green design. The contract is an immutable build identity cue; it does not prove a juror's aesthetic judgment. Reused the existing Next.js release endpoint, public media/page validator and source tests; newly added only the design attestation and fail-closed test case. Live Vercel authorization and visual owner approval remain outstanding.

## C20 service-card handbook parity (26 October 2026)

**Gap corrected:** the existing page had 258px minimum service cards, 24px heading text, 16px body and primarily an arrow to indicate the destination. Handbook C20 explicitly requires a growing 300px minimum, 26/24/22px desktop/tablet/mobile Lato headings, 18px supporting text and a visible 16px destination action. The actual shared `src/components/ServiceCard.tsx` now uses its existing single semantic anchor but presents an explicit localized 'read service details' action for FI/EN/SV; it does not nest a new interactive button. The original six services, icons, routes, light/dark colors and 3/2/1 column structure are preserved.

The existing `src/app/handbook.css` now implements the precise responsive geometry and text roles, with E2 resting / E3 focus elevation and no fixed-height clipping. `tests/service-card.contract.mjs` verifies all six cards in all three locales at 320/960/1440 CSS px; text selection; link anatomy; minimum height; typography; and 200% simulated card-type scaling without horizontal clipping. This extends the original Playwright harness and screenshots. Manual pointer/touch/actual browser zoom and independent review remain NOT_TESTED; do not falsely sign off the entire C20 family.

## F08/C02/C35 and E02 continuation — 26 October 2026

- **F08 original logo:** the actual stacked owner-supplied SVG is rendered at 124 × 89.2 px with a minimum 120px desktop header, 92 × 66.2 px with a minimum 92px mobile header and 172 × 123.8 px in the footer. A preceding white-only CSS filter was removed from the footer. The original SVG bytes have not been modified. Home-link accessible naming is translated across FI/EN/SV without duplicate image alt text. The newly reused Chromium CI harness measures those values on real rendered pages.
- **C35 contact validation:** server 422 validation issues now reveal localized field-level explanations with programmatically linked `aria-describedby`, and the invalid input receives keyboard focus after React has committed the error state. The existing form, SMTP API, honeypot, service choices and anti-duplicate request key are preserved; real email delivery and cross-instance exactly-once semantics are **NOT VERIFIED**.
- **E02 component architecture:** the actual Process, Trust, About and CTA marketing components have been moved unchanged into a shared, stateless component module. The Next.js runtime, content sources and public routing are reused, with no new framework or duplicated marketing site.
- **Evidence policy:** automated source assertions and the added F08/C35 browser checks must pass on immutable CI commits before the respective scoped controls can be classified as tested; formal handbook signoff and designer approval remain separate gates.

## Main-branch competition quality gates — Q10/Q11/Q16–Q21 (26 October 2026)

Reused the existing Next.js standalone build, public route contracts, Playwright scripts, PDF source brochures and Lighthouse CI configuration. The previously PR-only Lighthouse and brochure-visual workflows now also run on `main` and via explicit workflow dispatch. Lighthouse includes the real Swedish homepage as an additional route.

A separate Chromium, Firefox and WebKit browser workflow verifies nine meaningful FI/EN/SV pages at 390px and 1440px, one semantic main/H1, server locale, no horizontal overflow, company-home labeling and functional mobile navigation. Each run writes an immutable JSON artifact, and no per-user or customer submission is made. It does **not** pretend that Linux emulation equals Safari on real iOS, actual 400% browser zoom, keyboard screen-reader use or a named independent accessibility review.

Automated runs are evidence candidates only. Reviewers must still reconcile the 35 source obligations, review all 1,517 formal requirement results, verify SMTP inbox receipt, evaluate actual physical devices, approve original graphics and sign off the competition release. These obligations remain **OPEN / NOT_TESTED** without suitable independent evidence.
