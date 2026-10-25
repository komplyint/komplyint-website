import type { MetadataRoute } from 'next'
import { serviceSlugs, canonicalHost } from '@/lib/commercial'
export default function sitemap(): MetadataRoute.Sitemap {
  const pages=['','/services','/software','/work','/about','/contact','/privacy','/accessibility',...serviceSlugs.map(x=>'/services/'+x)]
  return pages.flatMap(page=>([
    {url:canonicalHost+(page||'/'),changeFrequency:'monthly' as const,priority:page?0.65:1},
    {url:canonicalHost+'/en'+page,changeFrequency:'monthly' as const,priority:page?0.65:0.9}
  ]))
}
