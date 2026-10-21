# Komplyint Oy: public website versus protected apps

**Owner:** Komplyint Oy · **Status:** accepted access boundary, 2026-10-21

## Public company site (no login)

- Both `https://komplyint.fi/` and `https://www.komplyint.fi/` are public company websites. All informational home, contact, privacy, software, and English/Finnish pages remain reachable without authentication, cookies for auth, identity-provider redirects, Google sign-in buttons, sign-up links, or a company-wide auth wall.
- Do not add a Log in / Continue with Google button in the corporate homepage, its navigation or its footer. Public links to product information are fine.
- The public contact form is not an administrator page; keep it accessible with its own input validation, abuse prevention and privacy controls.
- To prevent regressions, `npm run test:public-access` guards the Next.js public pages and the legacy static frontend. The production `npm run build` runs this guard before `next build`.

## Protected administrative and product functions

- Komplyint's shared identity service is `https://auth.komplyint.fi` (separate ZITADEL + PostgreSQL), not a corporate-homepage sign-in. It issues tokens only as part of a request from an authorized **protected** app/admin route.
- Administrative dashboards and settings require Komplyint ZITADEL OIDC authorization-code + S256 PKCE (for browser clients), Google as an available sign-in provider, and explicit server-verified administrator authorization. Google email possession alone is **never** an administrative role.
- Functional areas of each Komplyint product (for example Proctor candidate sessions or approved staff review) use that product's independent ZITADEL OIDC client, redirect and audience/tenant/role checks. Public product descriptions, accessibility information and synthetic demos need no login.
- ZITADEL's own `/ui/console/` requires an administrator account. A one-time native bootstrap password remains an emergency/recovery mechanism until Google login, MFA and verified administrator account-linking are configured and independently tested.
- Each app's backend verifies OIDC issuer, signature, expiry, audience and product-specific authorization before returning private data. UI route hiding or merely authenticating with Google is not authorization.
- The Google OAuth web client and client secret are configured **server-side** only in Komplyint ZITADEL's Google identity-provider settings. Do not include the Google client secret in company pages, Git, JavaScript bundles or Cloudflare Pages.

## Routes and rollout gates

| Route | Public information? | Google sign-in available? | Protected? |
| --- | --- | --- | --- |
| `komplyint.fi/` and `/software`, `/contact`, `/privacy`, EN/FI variants | Yes | No | No |
| `proctor.komplyint.fi/` and `/preview/` synthetic demonstration | Yes | Not needed | No real examination data |
| `proctor.komplyint.fi/login/` and future candidate/staff functional routes | No: real functional entry | Planned | Yes, when backend and institution gates pass |
| `auth.komplyint.fi/ui/console/` | No | Planned, when Google IdP is connected | Administrator only |
| Any future Komplyint business/admin dashboard | No | Required sign-in option | Explicit administrator authorization |

**As tested on 2026-10-21:** Komplyint company homepage is public without a login in its navigation; Komplyint ZITADEL public OIDC/PKCE and Login V2 acceptance passed on the actual OVH host. Proctor's `/login/config.json` still has empty OIDC client ID and Google disabled by default. Google identity-provider configuration, verified account linking, MFA and full product API authorization are NOT yet ready. Do not turn on Google or self-registration flags before end-to-end tests.

### Test

Run `npm run test:public-access`, or `npm run build` to enforce the no-login boundary as part of building the corporate site. This checks public source files; also verify deployed site routes manually. It does not test Google, protected app backends, or real browser login.
