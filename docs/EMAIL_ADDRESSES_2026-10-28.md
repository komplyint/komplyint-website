# Komplyint Oy — business email address register

**Recorded:** 28 October 2026. **Source:** owner-provided Zoho Mail EU Admin Console screenshot, Users → Komplyint Oy → Mailbox Settings → Email Alias. **Provider plan:** Zoho Mail Free.

This is an **address-creation record, not an email-delivery acceptance certificate**. The screenshot shows one mailbox and 15 aliases under the existing Zoho user.

- **Primary mailbox:** `komplyint@komplyint.fi`
- **Sales / quotations:** `tarjous@komplyint.fi`, `proposals@komplyint.fi`, `sales@komplyint.fi`
- **General enquiries:** `info@komplyint.fi`, `contacts@komplyint.fi`, `hello@komplyint.fi`
- **Recruitment:** `hakemus@komplyint.fi`, `apply@komplyint.fi`, `careers@komplyint.fi`
- **Finance, privacy and legal correspondence:** `laskutus@komplyint.fi`, `invoices@komplyint.fi`, `compliance@komplyint.fi`, `legal@komplyint.fi`
- **Delivery / customer support:** `delivery@komplyint.fi`, `support@komplyint.fi`

## Website integration

The authoritative source-code inventory and the website's localized, customer-facing subset live in [`src/lib/contact-addresses.ts`](../src/lib/contact-addresses.ts). Keep one mailbox, not 15 new user accounts.

The public FI/EN/SV contact page should expose:
- General / Yleiset tiedustelut / Allmänna frågor → `info@komplyint.fi` (existing public contact and contact form destination)
- Quotes / Tarjouspyynnöt / Offertförfrågningar → `tarjous@` (FI), `proposals@` (EN/SV)
- Billing / Laskutusasiat / Faktureringsärenden → `laskutus@` (FI), `invoices@` (EN/SV)
- Support / Asiakastuki / Kundsupport → `support@`
- Privacy and contracts / Tietosuoja ja sopimukset / Dataskydd och avtal → `compliance@`

All abbreviated addresses above end in `komplyint.fi`. Remaining valid aliases stay reserved and are not automatically published (for example, recruitment addresses should appear when recruitment begins). Email address creation is not a promise of staffed support, regulated legal services, or specific response times.

The Next.js website's `/api/contact` endpoint currently sends to **`info@komplyint.fi`** via configured `SMTP_*` environment variables. Keep this recipient unchanged. A Zoho Mail Free account and registered aliases do **not** prove that external SMTP is available to the deployed app; configure an authorized mail transport separately using deployment secrets, and verify that the message reaches the Zoho inbox. Do not put passwords, DNS private keys, OAuth credentials, or the Gmail management account in the public repo.

## Operational acceptance (not yet completed)

- [x] Primary Zoho user and 15 aliases shown in owner-provided screenshot
- [x] Domain registered with Zoho Mail Free
- [x] MX and DKIM indicated verified in an earlier Zoho DNS setup screenshot
- [ ] SPF reverified after resolving the duplicate root TXT SPF records
- [ ] Each public alias receives a test message in the main Zoho mailbox
- [ ] Send a message from each website-published alias and validate Reply-To, SPF, DKIM and DMARC
- [ ] Submit a real website form request and verify delivery into `info@komplyint.fi`
- [ ] Verify the public website deployment and translated contact links

**Do not report production mail as working until the relevant live tests pass.** Avoid changing existing website, authentication, SmartPloy or Proctor DNS records when making mail changes.
