import type { Lang, Page } from './commercial'
import { localizedPath } from './i18n'

export function pathFor(lang:Lang,page:Page):string{
  return localizedPath(page==='home'?'/':'/'+page,lang)
}
