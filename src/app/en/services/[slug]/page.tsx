import { serviceSlugs } from '@/lib/commercial'
export { default } from '../../../page'
export function generateStaticParams(){ return serviceSlugs.map(slug=>({slug})) }
