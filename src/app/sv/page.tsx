import { pageMetadata } from '@/lib/route-meta'
export const metadata = pageMetadata('sv','home')
// This page uses the same component as the root page
// The language is determined by the pathname (/sv = Swedish)
export { default } from '../page'
