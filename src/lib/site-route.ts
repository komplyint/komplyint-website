import type { Lang, Page } from './commercial'

export function pathFor(lang: Lang, page: Page): string {
  const prefix = lang === 'en' ? '/en' : ''
  return page === 'home' ? (prefix || '/') : prefix + '/' + page
}
