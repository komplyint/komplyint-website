# Native-language editorial pass — 26 October 2026

Scope: all public Komplyint website copy across Finnish, English and Finland-Swedish routes, plus source and browser regression tests. This is an editorial rewrite, not a certified translation or independent native-speaker sign-off.

## Three writing standards

**Finnish**: Finnish business language with direct verbs and familiar service descriptions. Avoid English-derived slogans, metaphors, bureaucratic phrasing and unexplained references to delivery. Standard spelling and idioms used in Finland.

**English**: plain UK/international business English with consistent terms such as enquiry, agreed work, quote, licences, and practical solutions. Do not translate Finnish constructions back into English verbatim.

**Swedish in Finland**: natural service language and established Finnish-Swedish terms (finländskt, Helsingfors, FO-nummer, dataskydd). Use ni/er in company-facing text and du/din where an individual contacts the company.

## Examples of improvements

| Locale | Earlier version | Revised |
|---|---|---|
| FI | ALOITETAAN SOPIVAN KOKOISESTI | OTA YHTEYTTÄ |
| FI | Käytännöllistä digiapua. Selkeillä toimituksilla. | Apua dataan, automaatioon ja ohjelmistoihin. |
| FI | Selkeyttä työhön. Varmuutta toteutukseen. | Kun työkalut toimivat, työ sujuu. |
| EN | Clarity for your work. Care in every delivery. | Digital tools that make everyday work easier. |
| EN | START WITH SOMETHING MANAGEABLE | GET IN TOUCH |
| SV | Mer klarhet i arbetet. Trygghet i leveransen. | Digitala verktyg som förenklar arbetsdagen. |
| SV | BÖRJA I LAGOM SKALA | KONTAKTA OSS |

## What was edited

Every homepage section, 18 service descriptions across three languages, service-detail instructions, example project text, software, about, contact, privacy, accessibility, error messages, buttons, brochure labels, footer and SEO titles/descriptions. Replaced repeated company text in the footer with a concise one-line introduction and localized Helsinki / Helsingfors as appropriate.

No changes to the six stable service URLs, business ID, email address, contact payload contract, service exclusions, product availability or legal representations. Examples remain labelled fictional; no invented client work or official certification is implied.

## Verification

Run `npm run build`, source checks, browser checks on FI/EN/SV pages, service navigation, form labels and locale-specific SEO. Source tests reject known original mistranslations. Automated tests cannot determine whether every sentence sounds fully native to every speaker: final human linguistic proofing and legal/privacy review are separate editorial approvals.
