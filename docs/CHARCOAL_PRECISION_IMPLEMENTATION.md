# Charcoal Precision — website visual design revision

Requested and implemented 25 October 2026, using **the existing Next.js Komplyint website**, not a duplicate runtime. This is the source specification and proof plan for the second, black/neutral-led design. Public availability depends on the existing Vercel production connection.

## Section-by-section design, handbook IDs and evidence

| Component | Design direction | Implementation | Verification |
| --- | --- | --- | --- |
| F09 / E03 palette | ~80% neutrals, ~18% forest/soft-green accents, ~2% crimson highlights (directional target, not measured screen coverage) | `src/design/tokens.json` v1.2.0 plus synchronized CSS variables | `tests/design-tokens.contract.test.mjs` |
| F10 / C09 light and dark | Warm off-white / white / pale warm-gray neutrals in light, charcoal / graphite surfaces in dark | `src/app/handbook.css` shared semantic tokens, existing persisted System/light/dark switch | `tests/charcoal-theme.contract.mjs` |
| C02–C06 navigation | Charcoal header; preserve original wordmark and visible FI/EN/SV flags beside language names | Existing component and `src/app/i18n.css`; no extra navigation engine | 1440px and mobile 390px screenshots, functional locale switch QA |
| C11–C18 hero | True near-black reading plate; visible existing film, light copy and green CTA | Existing `VideoHero.tsx`; presentation-only CSS | Hero-media browser checks and CSS snapshots |
| C20–C29 service discovery | White cards / graphite dark cards with subtle elevation; limited red detail on one tile | Existing `ServiceCard` and `ServiceExplorer` | Keyboard and viewport tests |
| C30–C34 work | Cinematic charcoal section, high-contrast original green reporting illustration and **one red CTA** with white text | Existing `FeaturedWork`, original FI/EN/SV artwork, color override | Browser computed color and text contrast |
| C40–C44 process/trust | Graphite process; neutral trust surfaces; no broad saturated-green bands | Existing components and dark-neutral CSS | Browser theme and contrast |
| C49–C55 contact/CTA | Neutral form inputs and panels, charcoal bottom CTA and green primary action | Existing contact API/form; no new mail transport | Form contract/visual QA |
| C57–C64 footer and responsive | Near-black footer, dark mobile drawer, matching language controls and footer theme selector | Existing component / CSS | Playwright mobile screenshots and keyboard tests |

### Technical decisions

- Original Komplyint logo, motion/video assets and all real hand-authored FI/EN/SV translations are retained unchanged.
- Original illustration assets stay; the visual frame becomes charcoal to increase contrast and highlight the diagram.
- Only the existing token design master and existing styles are updated; no second render engine, theme library or dependency from a third-party project.
- Neutral text contrast target >= 4.5:1 for regular text, reduced-motion remains intact, and all key buttons maintain visible focus.
- Crimson brand accent `#C74C57` remains decorative; the high-contrast red CTA uses `#B52D43` for white text (calculated 6.14:1).
- Brand green `#124C35` remains an accent/action identity in light, with lighter action/focus green for the dark design.

### Acceptance gates and remaining handbook obligations

Implementation evidence from automated browser builds can close *individual scoped automated controls* when their CI results are attached to immutable commits. It does not close the entire 1,517-entry checklist.

Pending:
1. Accessible real-device/browser matrix and independent screen-reader manual testing (Q11–Q18).
2. External art-direction / owner acceptance of the new charcoal balance (Q16/Q19/R03).
3. Verified end-to-end SMTP inbox receipt and resilient distributed contact idempotency (E08/E09).
4. Consolidation of older CSS declarations and complete decomposition of the source facade (E02).
5. Full handbook 1,517-entry execution ledger, item-by-item dispositions and compliance sign-offs.
6. Authorized production deployment on **existing** Vercel project and live release SHA match (Q20/Q21).

**Critical environment blocker:** the repository deployment workflow fails because `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are missing from GitHub Actions. Reconnect the original Vercel GitHub integration, or securely provide the three repository secrets. Never claim source QA is production publication.

## C20 card precision correction (26 October 2026)

The service-card implementation was reconciled with the explicit typography and component measurements on source handbook page 60. The same six service cards and dark/neutral design remain, but the content now grows from a 300px minimum, uses Lato 26/24/22px headings, 18px body and 16px localized destination label with one anchor. The card-specific browser matrix tests FI/EN/SV at mobile/tablet/desktop widths and synthetic 200% card text. Signed human sign-off remains pending.
