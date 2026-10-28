/**
 * Komplyint Oy's domain-address inventory from the Zoho EU admin alias screen,
 * confirmed by the operator on 28 October 2026. Aliases all point to the same
 * mailbox. This inventory does not certify external delivery or SMTP readiness.
 *
 * Keep the website's contact form directed to info@komplyint.fi until its
 * authenticated delivery is independently tested. Never commit SMTP secrets.
 */
export const primaryZohoMailbox = 'komplyint@komplyint.fi' as const

export const zohoAliases = {
  sales: ['tarjous@komplyint.fi', 'proposals@komplyint.fi', 'sales@komplyint.fi'],
  general: ['info@komplyint.fi', 'contacts@komplyint.fi', 'hello@komplyint.fi'],
  recruitment: ['hakemus@komplyint.fi', 'apply@komplyint.fi', 'careers@komplyint.fi'],
  financeAndLegal: ['laskutus@komplyint.fi', 'invoices@komplyint.fi', 'compliance@komplyint.fi', 'legal@komplyint.fi'],
  deliveryAndSupport: ['delivery@komplyint.fi', 'support@komplyint.fi'],
} as const

type ContactLocale = 'fi' | 'en' | 'sv'
type Localized = Record<ContactLocale, string>

export const contactChannelsTitle: Localized = {
  fi: 'Muut yhteydenotot',
  en: 'Other enquiries',
  sv: 'Andra ärenden',
}

// Only publish practical customer-facing channels. Keep other registered
// aliases reserved until there is a real operational reason to advertise them.
export const websiteContactChannels = [
  {
    id: 'proposals',
    label: {fi: 'Tarjouspyynnöt', en: 'Quotes and proposals', sv: 'Offertförfrågningar'},
    email: {fi: zohoAliases.sales[0], en: zohoAliases.sales[1], sv: zohoAliases.sales[1]},
  },
  {
    id: 'billing',
    label: {fi: 'Laskutusasiat', en: 'Billing enquiries', sv: 'Faktureringsärenden'},
    email: {fi: zohoAliases.financeAndLegal[0], en: zohoAliases.financeAndLegal[1], sv: zohoAliases.financeAndLegal[1]},
  },
  {
    id: 'support',
    label: {fi: 'Asiakastuki', en: 'Customer support', sv: 'Kundsupport'},
    email: {fi: zohoAliases.deliveryAndSupport[1], en: zohoAliases.deliveryAndSupport[1], sv: zohoAliases.deliveryAndSupport[1]},
  },
  {
    id: 'privacy',
    label: {fi: 'Tietosuoja ja sopimukset', en: 'Privacy and contracts', sv: 'Dataskydd och avtal'},
    email: {fi: zohoAliases.financeAndLegal[2], en: zohoAliases.financeAndLegal[2], sv: zohoAliases.financeAndLegal[2]},
  },
] as const
