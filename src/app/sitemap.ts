import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base='https://komplyint.fi'
  const pages=['','/services','/software','/contact','/privacy']
  return pages.flatMap(page=>[
    {url:base+(page||'/'),changeFrequency:'monthly' as const,priority:page ? 0.65 : 1},
    {url:base+'/en'+page,changeFrequency:'monthly' as const,priority:page ? 0.65 : 0.85}
  ])
}
