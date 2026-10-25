/**
 * Komplyint site internationalization.
 *
 * Explicit locale URLs are authoritative: FI at /, English at /en,
 * Swedish at /sv. No automatic Accept-Language redirect (bookmarked URLs,
 * search indexes and the user's deliberate choice must stay stable).
 * Kept dependency-free and safe for middleware, server and browser use.
 */
export const localeCodes = ['fi','en','sv'] as const
export type Locale = typeof localeCodes[number]
export const defaultLocale:Locale='fi'
export const languages = [
  {code:'fi',name:'Suomi',flag:'🇫🇮',ogLocale:'fi_FI'},
  {code:'en',name:'English',flag:'🇬🇧',ogLocale:'en_GB'},
  {code:'sv',name:'Svenska',flag:'🇸🇪',ogLocale:'sv_FI'},
] as const

export function isLocale(input:string):input is Locale{
  return (localeCodes as readonly string[]).includes(input)
}
export function getLocaleFromPath(pathname:string):Locale{
  const segment=pathname.split('/')[1]||''
  return segment==='en'||segment==='sv'?segment:'fi'
}
export function stripLocale(pathname:string):string{
  const clean=pathname.startsWith('/')?pathname:'/'+pathname
  if(/^\/(?:en|sv)(?=\/|$)/.test(clean))return clean.replace(/^\/(?:en|sv)(?=\/|$)/,'')||'/'
  return clean
}
export function localizedPath(pathname:string,locale:Locale):string{
  const unprefixed=stripLocale(pathname)
  const clean=unprefixed.startsWith('/')?unprefixed:'/'+unprefixed
  const prefix=locale===defaultLocale?'':'/'+locale
  return (prefix+(clean==='/'?'':clean))||'/'
}
