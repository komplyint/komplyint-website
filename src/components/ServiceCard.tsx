import type { Lang, Service } from '@/lib/commercial'
import { serviceSlugs } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'
import Arrow from '@/components/Arrow'
import ServiceIcon from '@/components/ServiceIcon'

// C20: the same semantic service card for every bilingual service.
export default function ServiceCard({ lang, service, index }: { lang: Lang; service: Service; index: number }) {
  const href = pathFor(lang, 'services') + '/' + serviceSlugs[index]
  return (
    <a className="kc-service-tile" href={href}>
      <div className="kc-tile-top"><span>{String(index+1).padStart(2,'0')}</span><Arrow /></div>
      <ServiceIcon index={index}/>
      <h3>{service.title}</h3>
      <p>{service.intro}</p>
    </a>
  )
}
