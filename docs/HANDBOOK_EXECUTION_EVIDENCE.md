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
