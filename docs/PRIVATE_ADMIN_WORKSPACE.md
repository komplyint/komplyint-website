# Komplyint private operations /admin — release handoff

## User outcome
The existing **public** www.komplyint.fi marketing, contact and trilingual pages remain public. A separately authenticated Komplyint administrator can open **https://www.komplyint.fi/admin**, view approved operational categories and follow links only to separately protected service deployments. Unauthorized, expired, unknown-tenant, unsigned and unconfigured requests fail closed. Nothing is scraped from customers or provisioned by this route.

## Authentication design
- Create a **Cloudflare Access self-hosted application** protecting the exact www.komplyint.fi/admin path and all nested admin paths. Enforce an allow policy restricted to specifically approved Komplyint administrator email identities with MFA/OTP as applicable, with no broad email-domain or "everyone" policy.
- The Vercel origin independently validates the signed **Cf-Access-Jwt-Assertion** JWT via the signing keys at the configured team.cloudflareaccess.com endpoint. Require exact issuer, audience, expiry, future-issued guard and email allowlist. A forwarded email header or cookie without signed assertion is not an identity. Cloudflare Access config does not count as proof of enforcement until a real denial test works.
- Configure environment variables **only in the existing Vercel project secret settings**, never source:
  - KOMPLYINT_ACCESS_TEAM_DOMAIN = exact team.cloudflareaccess.com hostname (no scheme/path)
  - KOMPLYINT_ACCESS_AUD = Cloudflare Access application AUD tag
  - KOMPLYINT_ADMIN_EMAILS = comma-separated exact approved administrator mailboxes; no default
  - KOMPLYINT_ADMIN_ALLOWED_HOSTS = comma-separated exact HTTPS hostnames for allowed destination apps
  - Optional: KOMPLYINT_ADMIN_BUSINESS_OS_URL, KOMPLYINT_ADMIN_TINYERG_OPERATOR_URL, KOMPLYINT_ADMIN_DATA_URL, KOMPLYINT_ADMIN_AUTOMATION_URL, KOMPLYINT_ADMIN_STUDIO_URL, KOMPLYINT_ADMIN_SECURITY_URL
- Never put tokens, API keys, customer data, host credentials or JWTs in URLs, query strings or source-controlled values.
- Configured app links are **NOT** a guarantee that a tool is active. Each external tool must independently enforce its admin identity, session, tenant and action authorization. A protected website page does not protect a separately reachable upstream origin.
- Ensure Cloudflare routes requests to the actual Vercel deployment through an approved configuration and does not cache /admin. Do not open public reverse proxies to FounderOS, Tinyerg R2 or ObumAI internals.
- Keep the original public marketing navigation unmodified. No public login prompts or route changes.

## Tool ownership and integration
1. **Business OS:** galapoto/FounderOS-Adaptation private application. Preserve MIT notices, sanitize original credentials, use private auth on its own origin; implement real lead-to-proposal-with-approval first. The present copied source does not prove live deployment.
2. **Tinyerg:** galapoto/tinyerg is customer-facing, with a separately token-protected /operator path in source. A paid order service is not live until real signed Stripe events, checkout, retention and operator download/email/delete are verified. No public customer R2 data through Komplyint.
3. **Data/reporting:** approved first-party BI or verified DuckDB/Evidence outputs, with customer isolation and correct provenance.
4. **Automation:** approved Microsoft 365/Power Automate workflows first; Activepieces community edition only when it fills a verified gap, consented scopes and independent credentials.
5. **Media:** actual user-authorized Studio video workers and verified MP4, licensed audio/footage; no placeholder "rendered" state.
6. **Security:** authorized QA receipts, secret scanning and scoped vulnerability checks only.

## Acceptance (separate evidence states)
- Source: application compiles and native CI test commands pass; admin-access.test.mjs covers signed authorization, bad issuer/audience, missing config, expiry, token forgery and destination allowlisting.
- Security: real anonymous request to /admin returns no private data, including direct-to-Vercel bypass; denied-but-valid Access account forbidden; approved account allowed; access revoked account denied promptly; cache/noindex/cookie leakage negative checks.
- Browser: login, load, sign out/revoke and responsive keyboard accessible admin view. Verify allowed links are HTTPS and each requires its own valid identity. No public service route regresses.
- Deployment: existing komplyint-website Vercel release/rollback process only. Exact main commit, CI and live signed-in journey receipts required to call feature USER_VERIFIED.
- Any missing Access domain, AUD, owner emails or upstream auth = **NOT VERIFIED / BLOCKED**, never silently open an unprotected admin route.

## Provenance
- First-party source adapted: komplyint/komplyint-website, baseline at 16add65d01189619aaada1ae99d4187c2ae3b52b
- New source: src/lib/admin-access.mjs, src/app/admin/page.tsx, src/app/admin/admin.css, tests/admin-access.test.mjs
- External services: no external code copied into the public site. Copied: none.
- REA_NOT_APPLICABLE for the signed-JWT origin check (official documented Cloudflare verification and built-in Node crypto, no appropriate reusable site auth component identified).
- Planned initial rollout: dark/disabled until Cloudflare and Vercel controls are configured and verified. No operational service is assumed deployed.
