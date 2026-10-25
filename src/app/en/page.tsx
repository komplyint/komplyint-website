import { pageMetadata } from '@/lib/route-meta'
export const metadata = pageMetadata('en','home')
// This page uses the same component as the root page
// The language is determined by the pathname (/en = English)
export { default } from '../page'
