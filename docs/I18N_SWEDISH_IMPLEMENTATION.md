# Komplyint website i18n — Finnish, English and Swedish

Implementation: October 25, 2026. This is a source contract and QA inventory; production publication must be separately verified.

## Production locale contract

| Language | Visible flag and native name | Canonical homepage | Route pattern | HTML language |
| --- | --- | --- | --- | --- |
| Finnish (default) | 🇫🇮 Suomi | `/` | `/services/…`, `/contact`, etc. | `fi` |
| English | 🇬🇧 English | `/en` | `/en/services/…`, `/en/contact`, etc. | `en` |
| Swedish (Finland) | 🇸🇪 Svenska | `/sv` | `/sv/services/…`, `/sv/contact`, etc. | `sv` |

All three languages have the homepage, six service-detail pages, Services, Software, Work, About, Contact, Privacy and Accessibility — **42 canonical content URLs**. URLs do not silently redirect based on IP or browser language. Finnish remains the default.

- `src/lib/i18n.ts`: sole locale list, flags/native names, URL language parsing and switching.
- `src/lib/commercial.ts` + `src/lib/i18n-sv.ts`: full service and page content records, six services per locale, same service slugs in every language.
- `src/lib/i18n-ui.ts`: one structured localized dictionary for shared controls, legal/accessibility copy, card buttons, video controls, form states, mobile navigation and service detail phases.
- `src/components/LanguageSwitcher.tsx`: 3 explicit real links; each flag is immediately beside the matching native language name. The current locale uses `aria-current`; links include `hreflang` and work even without JavaScript. JavaScript preserves query strings and hashes and warns before abandoning an unsent contact draft.
- `src/middleware.ts` and `src/app/layout.tsx`: server-produced `<html lang>` for FI, EN and SV; the client `LangSetter` remains a safety net after in-app navigation.
- `src/lib/route-meta.ts` and `src/app/sitemap.ts`: canonical URLs, all three `hreflang` alternatives, `x-default` and localized OpenGraph titles/descriptions.
- `public/media/featured-reporting-art-sv.svg`: real, locally delivered Swedish variant of the existing original illustration. The video/logo assets are unchanged.
- `src/app/api/contact/route.ts`: accepts the validated `sv` locale in the same operational contact flow.

## Content parity and honest exceptions

The six service descriptions, example scenarios, product/service boundaries, company page, contact page, privacy notice and accessibility information are translated into Swedish without a runtime translation API or English fallback. Original protected assets remain unchanged.

**Brochures:** only Finnish and English PDFs and their shared ZIP package currently exist. The Swedish Services page explains this clearly; no Swedish-language downloadable brochure is claimed.

The historical `src/lib/translations.ts` belongs to the pre-redesign presentation and is not imported by the active Next.js site. The active locale contract is the `i18n.ts` / `commercial.ts` / `i18n-ui.ts` set.

## Required checks before accepting the implementation

- `npm run build`: checks legacy public boundaries, 3-locale source invariants, the actual Next.js production build and TypeScript.
- `tests/language-font.contract.mjs`: language in the initial response and loaded real fonts for all three locales.
- `tests/i18n-browser.contract.mjs`: visible flags beside native names on desktop and mobile, translated headings, SEO alternates, route preservation on language switches, query/hash continuity.
- `tests/service-keyboard.contract.mjs`: FI/EN/SV service explorer keyboard navigation and locale-specific contact link.
- `tests/contact-flow.contract.mjs`: Swedish inquiry payload, successful response and safe rate-limit feedback with intercepted mail endpoint.
- `tests/visual.smoke.mjs` and `tests/award-audit.mjs`: Swedish screenshot and page-level layout/accessibility evidence.
- `scripts/verify-public-release.mjs`: checks Swedish public pages, actual server-side language and Swedish illustration signature on the real public domain.

Do not mark the change as deployed until `/api/release` reports the same commit as `main` and live page/media checks pass.
