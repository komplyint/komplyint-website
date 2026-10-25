'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { content, services, serviceSlugs, type Lang } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'
import Arrow from '@/components/Arrow'

type SubmitState='idle'|'sending'|'sent'|'invalid'|'rate_limited'|'error'|'unknown'
export default function ContactForm({lang}:{lang:Lang}) {
  const t=content[lang].contactPage
  const [name,setName]=useState(''),[company,setCompany]=useState(''),[email,setEmail]=useState('')
  const [message,setMessage]=useState(''),[topic,setTopic]=useState(''),[trap,setTrap]=useState('')
  const [status,setStatus]=useState<SubmitState>('idle')
  const [fieldErrors,setFieldErrors]=useState<Record<string,string>>({})
  const requestKey=useRef<string|null>(null)
  const formRef=useRef<HTMLFormElement>(null)
  useEffect(()=>{
    const slug=new URLSearchParams(window.location.search).get('service')
    const i=serviceSlugs.indexOf(slug as typeof serviceSlugs[number])
    if(i>=0)setTopic(serviceSlugs[i])
  },[])
  function resetStatus(){setStatus('idle');setFieldErrors({});requestKey.current=null}
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    if(trap||status==='sending'||status==='unknown')return
    if(!requestKey.current)requestKey.current=crypto.randomUUID()
    setStatus('sending')
    setFieldErrors({})
    const controller=new AbortController()
    const timeout=setTimeout(()=>controller.abort(),28000)
    try{
      const payload={name,company,email,service:topic||undefined,locale:lang,website:trap,message,idempotencyKey:requestKey.current}
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:controller.signal})
      const result=await response.json().catch(()=>null)
      if(response.status===422){
        const issues=result?.fields&&typeof result.fields==='object'?result.fields:{}
        setFieldErrors(issues)
        setStatus('invalid')
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
        return
      }
      if(response.status===429){setStatus('rate_limited');return}
      if(!response.ok||result?.accepted!==true){setStatus('error');return}
      setName('');setCompany('');setEmail('');setMessage('');setTopic('');setStatus('sent');requestKey.current=null
    }catch(error){
      setStatus(error instanceof Error&&error.name==='AbortError'?'unknown':'error')
    }finally{clearTimeout(timeout)}
  }
  const fi=lang==='fi'
  return (
    <form className="kc-form" ref={formRef} onSubmit={submit}>
      <div className="kc-form-two">
        <label>{t.formName}<input type="text" value={name} onChange={e=>{setName(e.target.value);resetStatus()}} maxLength={120} autoComplete="name" placeholder={fi?'Nimesi':'Your name'} aria-invalid={!!fieldErrors.name}/></label>
        <label>{fi?'Yritys (valinnainen)':'Company (optional)'}<input type="text" value={company} onChange={e=>{setCompany(e.target.value);resetStatus()}} maxLength={140} autoComplete="organization" placeholder={fi?'Yrityksen nimi':'Company name'} aria-invalid={!!fieldErrors.company}/></label>
        <label>{t.formEmail}<input type="email" value={email} onChange={e=>{setEmail(e.target.value);resetStatus()}} required maxLength={254} autoComplete="email" placeholder="name@company.fi" aria-invalid={!!fieldErrors.email}/></label>
      </div>
      <label>{t.formService}
        <select value={topic} onChange={e=>{setTopic(e.target.value);resetStatus()}} aria-invalid={!!fieldErrors.service}>
          <option value="">{t.select}</option>
          {services[lang].map((service,i)=><option key={service.title} value={serviceSlugs[i]}>{service.title}</option>)}
          <option value="other">{t.other}</option>
        </select>
      </label>
      <label>{t.formMessage}<textarea rows={6} maxLength={4500} minLength={10} required value={message} onChange={e=>{setMessage(e.target.value);resetStatus()}} placeholder={fi?'Kerro lyhyesti ongelma ja toivottu lopputulos.':'Describe the problem and desired outcome.'} aria-invalid={!!fieldErrors.message}/></label>
      <label className="kc-honeypot" aria-hidden="true">Website <input tabIndex={-1} autoComplete="off" value={trap} onChange={e=>setTrap(e.target.value)}/></label>
      <p className="kc-form-privacy">{t.privacy} <a href={pathFor(lang,'privacy')}>{content[lang].navigation.privacy}.</a></p>
      {status==='invalid'&&<div role="alert" className="kc-form-error" tabIndex={-1}>{fi?'Tarkista lomakkeen tiedot ja korjaa merkityt kentät.':'Please check the marked fields and correct your details.'}</div>}
      {status==='rate_limited'&&<p role="alert" className="kc-form-error">{fi?'Liikaa lähetysyrityksiä. Yritä myöhemmin tai lähetä sähköpostia osoitteeseen':'Too many requests. Please try later or email'} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
      {status==='unknown'&&<p role="alert" className="kc-form-error">{fi?'Viestin tilaa ei voitu vahvistaa. Älä lähetä samaa viestiä uudelleen ilman tarkistusta. Voit ottaa yhteyttä osoitteeseen':'The request status is uncertain. Do not resubmit the same message without checking. You can contact'} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
      {status==='sent'&&<p role="status" className="kc-form-success">{t.sent}</p>}
      {status==='error'&&<p role="alert" className="kc-form-error">{t.fail} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
      <button className="kc-button kc-button-primary" disabled={status==='sending'||status==='unknown'} type="submit">{status==='sending'?t.sending:t.send}<Arrow /></button>
    </form>
  )
}
