# Komplyint Oy website update

## What changed

This update adds a clear company software-production presence while keeping the existing visual identity and existing hero image/video assets unchanged.

### New pages

- `/software` — Finnish software-production page
- `/en/software` — English software-production page
- `/privacy` — Finnish website privacy notice
- `/en/privacy` — English website privacy notice

### Main content updates

- Added a navigation link for **Software production / Ohjelmistotuotanto**.
- Added a homepage teaser section pointing to the software-production page.
- Added a dedicated software-production page describing:
  - web and mobile application development
  - data and reporting tools
  - quality assurance and testing
  - compliance-ready systems
  - Floently as a product of Komplyint Oy
- Added careful product wording around Floently:
  - Floently is a product of Komplyint Oy
  - Floently supports Finnish learning and practice
  - Floently does not guarantee exam results, employment outcomes, immigration outcomes, or official certification
  - Floently is not a public authority, official exam body, accredited language-test provider, or legal/immigration advisor
- Added company/product clarity:
  - Komplyint Oy
  - Business ID / Y-tunnus: 3588595-3
  - website: komplyint.fi
- Added footer links to software production and privacy notice.
- Added contact-form privacy notice text.
- Improved contact API input validation and HTML escaping.
- Added optional `CONTACT_TO_EMAIL` environment variable support for the contact form recipient. If not set, it keeps the old fallback recipient `komplyint@komplyint.com`.

## Files changed

- `src/app/page.tsx`
- `src/lib/translations.ts`
- `src/app/globals.css`
- `src/app/api/contact/route.ts`
- `src/app/layout.tsx`
- `src/app/software/page.tsx`
- `src/app/en/software/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/en/privacy/page.tsx`
- `CHANGES_AND_DEPLOYMENT.md`

## How to place this update

1. Unzip the updated website package.
2. Copy the contents of the `komplyint-website` folder into your existing GitHub website repository.
3. Let the files overwrite the old matching files.
4. Do **not** manually copy `node_modules` or `.next` into GitHub.
5. Commit and push:

```bash
git status
git add src/app/page.tsx src/lib/translations.ts src/app/globals.css src/app/api/contact/route.ts src/app/layout.tsx src/app/software src/app/en/software src/app/privacy src/app/en/privacy CHANGES_AND_DEPLOYMENT.md
git commit -m "Add software production and Floently product pages"
git push
```

## Local check

The TypeScript check passed with:

```bash
node node_modules/typescript/bin/tsc --noEmit
```

A full Next build started compiling successfully, but the container environment timed out while running the production build. Please run the normal build locally or in your deployment environment:

```bash
npm install
npm run build
```

If `npm run build` fails because the uploaded ZIP had a broken `node_modules/.bin/next` file, remove `node_modules` and reinstall:

```bash
rm -rf node_modules .next
npm install
npm run build
```

## Environment variable note

For the contact form, keep your existing SMTP variables:

```bash
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

Optional but recommended:

```bash
CONTACT_TO_EMAIL=your-company-email@example.com
```

For Apple and Google company profiles, a domain-based company email such as `hello@komplyint.fi`, `support@komplyint.fi`, or `admin@komplyint.fi` is better than a Gmail address.


## Additional update: company contact details, contact page, Floently link, and Google verification

Added after initial deployment:

- `/contact` and `/en/contact` pages with Komplyint Oy company details.
- Footer company details:
  - Komplyint Oy
  - Business ID / Y-tunnus: 3588595-3
  - D-U-N-S Number / DUNS-numero: 369283279
  - Contact / Yhteystieto: gliavex@gliavex.fi
- Footer and software page links to Floently: https://floently.com/learn
- Google site verification meta tag through Next.js metadata:
  - `UsxKulfzvhtTwPhshasRf4MO3qJAbGTP1nlN07iyLWs`
- Contact form fallback recipient changed to `gliavex@gliavex.fi` if `CONTACT_TO_EMAIL` is not set.
