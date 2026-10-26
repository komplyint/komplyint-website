'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { content, services, serviceSlugs, type Lang } from '@/lib/commercial'
import { pathFor } from '@/lib/site-route'
import Arrow from '@/components/Arrow'
import { ui } from '@/lib/i18n-ui'

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
  useEffect(()=>{if(status==='invalid')formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()},[status,fieldErrors])
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
        return
      }
      if(response.status===429){setStatus('rate_limited');return}
      if(!response.ok||result?.accepted!==true){setStatus('error');return}
      setName('');setCompany('');setEmail('');setMessage('');setTopic('');setStatus('sent');requestKey.current=null
    }catch(error){
      setStatus(error instanceof Error&&error.name==='AbortError'?'unknown':'error')
    }finally{clearTimeout(timeout)}
  }
  const f=ui[lang].form
  return (
    <form className="kc-form" ref={formRef} onSubmit={submit}>
      <div className="kc-form-two">
        <label>{t.formName}<input type="text" value={name} onChange={e=>{setName(e.target.value);resetStatus()}} maxLength={120} autoComplete="name" placeholder={f.nameHint} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name?'kc-contact-name-error':undefined}/>{fieldErrors.name&&<span id="kc-contact-name-error" className="kc-field-error">{f.nameError}</span>}</label>
        <label>{f.company}<input type="text" value={company} onChange={e=>{setCompany(e.target.value);resetStatus()}} maxLength={140} autoComplete="organization" placeholder={f.companyHint} aria-invalid={!!fieldErrors.company} aria-describedby={fieldErrors.company?'kc-contact-company-error':undefined}/>{fieldErrors.company&&<span id="kc-contact-company-error" className="kc-field-error">{f.companyError}</span>}</label>
        <label>{t.formEmail}<input type="email" value={email} onChange={e=>{setEmail(e.target.value);resetStatus()}} required maxLength={254} autoComplete="email" placeholder="name@company.fi" aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email?'kc-contact-email-error':undefined}/>{fieldErrors.email&&<span id="kc-contact-email-error" className="kc-field-error">{f.emailError}</span>}</label>
      </div>
      <label>{t.formService}
        <select value={topic} onChange={e=>{setTopic(e.target.value);resetStatus()}} aria-invalid={!!fieldErrors.service} aria-describedby={fieldErrors.service?'kc-contact-service-error':undefined}>
          <option value="">{t.select}</option>
          {services[lang].map((service,i)=><option key={service.title} value={serviceSlugs[i]}>{service.title}</option>)}
          <option value="other">{t.other}</option>
        </select>
        {fieldErrors.service&&<span id="kc-contact-service-error" className="kc-field-error">{f.serviceError}</span>}
      </label>
      <label>{t.formMessage}<textarea rows={6} maxLength={4500} minLength={10} required value={message} onChange={e=>{setMessage(e.target.value);resetStatus()}} placeholder={f.messageHint} aria-invalid={!!fieldErrors.message} aria-describedby={fieldErrors.message?'kc-contact-message-error':undefined}/>{fieldErrors.message&&<span id="kc-contact-message-error" className="kc-field-error">{f.messageError}</span>}</label>
      <label className="kc-honeypot" aria-hidden="true">Website <input tabIndex={-1} autoComplete="off" value={trap} onChange={e=>setTrap(e.target.value)}/></label>
      <p className="kc-form-privacy">{t.privacy} <a href={pathFor(lang,'privacy')}>{ui[lang].privacyLink}</a>.</p>
      {status==='invalid'&&<div role="alert" className="kc-form-error" tabIndex={-1}>{f.invalid}</div>}
      {status==='rate_limited'&&<p role="alert" className="kc-form-error">{f.rateLimited} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
      {status==='unknown'&&<p role="alert" className="kc-form-error">{f.unknown} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
      {status==='sent'&&<p role="status" className="kc-form-success">{t.sent}</p>}
      {status==='error'&&<p role="alert" className="kc-form-error">{t.fail} <a href="mailto:info@komplyint.fi">info@komplyint.fi</a></p>}
      <button className="kc-button kc-button-primary" disabled={status==='sending'||status==='unknown'} type="submit">{status==='sending'?t.sending:t.send}<Arrow /></button>
    </form>
  )
}
