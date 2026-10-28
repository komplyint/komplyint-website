import { contactChannelsTitle, websiteContactChannels } from '@/lib/contact-addresses'
import type { Lang } from '@/lib/commercial'

/** Public department links. The full alias inventory is deliberately not listed. */
export default function ContactAddressLinks({lang}:{lang:Lang}) {
  return (
    <div className="kc-mail-channels" aria-label={contactChannelsTitle[lang]}>
      <p className="kc-mail-channels-title">{contactChannelsTitle[lang]}</p>
      <dl>
        {websiteContactChannels.map(channel => (
          <div className="kc-mail-channel" key={channel.id}>
            <dt>{channel.label[lang]}</dt>
            <dd><a href={'mailto:'+channel.email[lang]}>{channel.email[lang]}</a></dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
