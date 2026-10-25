'use client'

import type { MouseEvent } from 'react'
import { languages, localizedPath, type Locale } from '@/lib/i18n'
import { ui } from '@/lib/i18n-ui'

/**
 * Real anchor links remain useful without JS. The visible flag sits immediately
 * beside its native language name. No geo-detection or silent URL rewriting.
 */
export default function LanguageSwitcher({locale,pathname}:{locale:Locale;pathname:string}){
  function change(event:MouseEvent<HTMLAnchorElement>,target:Locale){
    if(target===locale){event.preventDefault();return}
    if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return
    if(pathname==='/contact'||pathname==='/en/contact'||pathname==='/sv/contact'){
      const form=document.querySelector<HTMLFormElement>('form.kc-form')
      const hasDraft=!!form&&Array.from(form.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>('input:not([type=hidden]),textarea')).some(input=>input.value.trim().length>0)
      if(hasDraft&&!window.confirm(ui[locale].localeDraftWarning)){event.preventDefault();return}
    }
    if(window.location.search||window.location.hash){
      event.preventDefault()
      window.location.assign(localizedPath(pathname,target)+window.location.search+window.location.hash)
    }
  }
  return <div className="ki-locale-switcher" role="group" aria-label={ui[locale].languageSwitcher}>
    {languages.map(language=><a key={language.code}
      href={localizedPath(pathname,language.code)}
      hrefLang={language.code}
      lang={language.code}
      data-locale={language.code}
      aria-current={locale===language.code?'true':undefined}
      onClick={event=>change(event,language.code)}>
      <span className="ki-language-flag" aria-hidden="true">{language.flag}</span>
      <span className="ki-language-name">{language.name}</span>
    </a>)}
  </div>
}
