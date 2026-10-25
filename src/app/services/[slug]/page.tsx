import { pageMetadata } from '@/lib/route-meta'
export const dynamicParams=false
export function generateMetadata({params}:{params:{slug:string}}){return pageMetadata('fi','services',params.slug)}
import { serviceSlugs } from '@/lib/commercial'
export { default } from '../../page'
export function generateStaticParams(){ return serviceSlugs.map(slug=>({slug})) }
