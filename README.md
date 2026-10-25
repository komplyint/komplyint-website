# Komplyint Oy - Public digital services website

Public Finnish and English website for Komplyint Oy, Business ID 3588595-3.

## Commercial direction
Komplyint focuses on practical B2B services: Excel, data and Power BI reporting; Microsoft 365 workflows and automation; websites and maintenance; small software and API integrations; software testing and QA; and limited office-document support.

Compliance consulting is **not currently part of the public offer**. We do not claim regulatory certification, legal advisory authority, enterprise-scale capacity or 24/7 support.

## Implementations
- Next.js 14 in the repository root: Finnish and English pages for home, services, software, contact and privacy.
- Express/static legacy site in frontend/: one-page bilingual presentation using the same commercial content and styling.
- Legacy contact backend in backend/: same-origin frontend proxy forwards to its contact endpoint. The Next.js implementation uses its own API route.

The original public logo.svg, media/hero.mp4 and media/hero.webp assets are unchanged. The new site keeps the moving video on desktop and mobile; users requesting reduced motion see the poster.

## Local validation
1. Run npm install in the repository root.
2. Run npm run build (public access regression checks and Next production build).
3. Run node --check frontend/src/modern.js and node --check frontend/server.js.
4. For the old static server, run npm install and npm run dev in frontend/; run the legacy backend separately when testing mail delivery.
5. Verify the form using actual SMTP settings with synthetic data. The frontend displays an error when mail delivery is not configured.

The repository also includes a .woodpecker.yml QA-only pipeline for the authorised ObumDelivery workflow. It does not deploy production.

## Preview and publication
The new redesign is staged on feature/digital-services-redesign-20261025 for owner review.
The standalone review HTML at preview/komplyint-review.html has its form disabled.

Before merging or deploying: build/test, verify responsive UI, confirm hero-video playback and consent-based motion fallback, check contact mail configuration, obtain visual approval, and retain a rollback route.

## Security and public access
Company landing, information and contact pages **never require login**. Product/admin functions use independent protected application identities; see PUBLIC_ACCESS_BOUNDARY.md. Avoid sending confidential business data through the initial contact form.

## Company details
- Website: https://komplyint.fi
- Email currently published in the source: gliavex@gliavex.fi
- Business ID: 3588595-3
