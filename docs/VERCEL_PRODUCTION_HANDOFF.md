# Komplyint production publication — existing Vercel project

This repo builds the Next.js site for https://www.komplyint.fi. Deploy to the **existing** Vercel project called **komplyint-website** under Komplyint Oy's team. Never create a second production project as a substitute.

## Option A — reconnect Vercel Git integration

1. Open https://vercel.com/komplyint-oys-projects/komplyint-website/settings/git.
2. Under Connected Git Repository, connect **komplyint/komplyint-website**.
3. Under Settings -> Environments -> Production -> Branch Tracking, select **main**.
4. Confirm project domain www.komplyint.fi and apex redirect.
5. In Deployments, select the NEW main commit; do not redeploy the old May snapshot.

## Option B — GitHub Actions production deploy

Fallback workflow: .github/workflows/deploy-vercel-production.yml.
Configure GitHub repository Actions secrets (not plaintext files):
- VERCEL_TOKEN: a token with access to the existing project
- VERCEL_ORG_ID: the actual team ID of the existing domain-owning project
- VERCEL_PROJECT_ID: the actual ID of the existing komplyint-website project

IDs come from project settings / Vercel CLI link. The workflow uses vercel pull, vercel build --prod and vercel deploy --prebuilt --prod; it verifies the public homepage and critical routes afterward. Its preflight exposes only missing secret *names*, not values.

## Acceptance against real public domain

- Homepage contains new heading: Selkeyttä työhön. Varmuutta toteutukseen.
- /en: English edition.
- /services/data-reporting: dedicated service details.
- /about: verified business identity and D-U-N-S.
- /contact: public email info@komplyint.fi; ensure a real test email reaches the mailbox.
- /downloads/Komplyint_Palveluesite_FI.pdf: valid six-page Finnish brochure.
- /downloads/Komplyint_Service_Portfolio_EN.pdf: valid six-page English brochure.
- /downloads/Komplyint_Service_Documents.zip: opens with both brochures.
- Hero: original film, mobile derivative, working pause/resume, motion and data saving.
- No legacy gliavex email in visitor-facing pages.
- Record actual deployed commit and live Vercel deployment identity.

Never mark production Done based on source merge or GitHub CI alone.
