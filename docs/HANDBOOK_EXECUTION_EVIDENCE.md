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
