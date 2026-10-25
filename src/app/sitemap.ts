import type { MetadataRoute } from 'next'
import { serviceSlugs, canonicalHost } from '@/lib/commercial'
import { languages, localizedPath } from '@/lib/i18n'
export default function sitemap():MetadataRoute.Sitemap {
 const pages=['','/services','/software','/work','/about','/contact','/privacy','/accessibility',...serviceSlugs.map(slug=>'/services/'+slug)]
 return pages.flatMap(page=>{
   const alternates=Object.fromEntries(languages.map(language=>[language.code,canonicalHost+localizedPath(page||'/',language.code)]))
   return languages.map(language=>({
     url:canonicalHost+localizedPath(page||'/',language.code),
     changeFrequency:'monthly' as const,priority:page?0.65:language.code==='fi'?1:0.9,
     alternates:{languages:alternates}
   }))
 })
}
