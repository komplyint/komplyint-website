'use client'

import { useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/commercial'

export default function VideoHero({lang}:{lang:Lang}){
  type FilmState='poster'|'loading'|'playing'|'paused'|'blocked'|'error'
  const frame=useRef<HTMLDivElement>(null)
  const video=useRef<HTMLVideoElement>(null)
  const [state,setState]=useState<FilmState>('poster')
  const [sourceReady,setSourceReady]=useState(false)
  const [reducedMotion,setReducedMotion]=useState(false)
  const [saveData,setSaveData]=useState(false)
  const [visible,setVisible]=useState(false)
  const [inViewport,setInViewport]=useState(false)
  const [hidden,setHidden]=useState(false)
  const [userPaused,setUserPaused]=useState(false)
  const [manualPlay,setManualPlay]=useState(false)
  const [mobileViewport,setMobileViewport]=useState(false)

  useEffect(()=>{
    const media=window.matchMedia('(prefers-reduced-motion: reduce)')
    const compact=window.matchMedia('(max-width: 767px)')
    setMobileViewport(compact.matches)
    const connection=(navigator as Navigator&{connection?:{saveData?:boolean}}).connection
    setReducedMotion(media.matches)
    setSaveData(Boolean(connection?.saveData))
    try{setUserPaused(window.sessionStorage.getItem('komplyint-video-paused')==='1')}catch{}
    const onMotion=()=>{setReducedMotion(media.matches);if(media.matches)setManualPlay(false)}
    const onWidth=()=>setMobileViewport(compact.matches)
    const onVisibility=()=>setHidden(document.hidden)
    media.addEventListener('change',onMotion)
    compact.addEventListener('change',onWidth)
    document.addEventListener('visibilitychange',onVisibility)
    onVisibility()
    const observer=new IntersectionObserver(entries=>{
      setInViewport(entries.some(x=>x.isIntersecting))
      setVisible(entries.some(x=>x.isIntersecting&&x.intersectionRatio>=(compact.matches?0.7:0.05)))
    },{threshold:[0.05,0.7]})
    if(frame.current)observer.observe(frame.current)
    return()=>{
      media.removeEventListener('change',onMotion)
      compact.removeEventListener('change',onWidth)
      document.removeEventListener('visibilitychange',onVisibility)
      observer.disconnect()
    }
  },[])

  const allowPlayback=(visible||(manualPlay&&inViewport))&&!hidden&&!userPaused&&(!reducedMotion&&!saveData||manualPlay)
  useEffect(()=>{
    if(allowPlayback&&!sourceReady)setSourceReady(true)
  },[allowPlayback,sourceReady])
  useEffect(()=>{
    const el=video.current
    if(sourceReady&&el&&!el.hasAttribute('src'))el.load()
  },[sourceReady,mobileViewport])
  useEffect(()=>{
    const el=video.current
    if(!el)return
    if(!allowPlayback){
      el.pause()
      return
    }
    if(!sourceReady)return
    // Play must be muted and inline. Some browsers require a direct user gesture;
    // when autoplay is rejected, the visible Play control always remains usable.
    el.muted=true
    void el.play().then(()=>setState('playing')).catch(()=>{
      if(el.paused)setState('blocked')
    })
  },[allowPlayback,sourceReady])

  async function toggle(){
    const el=video.current
    if(!el)return
    if(!el.paused){
      setUserPaused(true)
      setManualPlay(false)
      try{window.sessionStorage.setItem('komplyint-video-paused','1')}catch{}
      el.pause()
      setState('paused')
      return
    }
    try{window.sessionStorage.removeItem('komplyint-video-paused')}catch{}
    setUserPaused(false)
    setManualPlay(true)
    setState('loading')
    el.muted=true
    // Desktop Safari/Chrome autoplay policies may reject effect-driven play.
    // Supply media and call play() SYNCHRONOUSLY inside the user's click gesture.
    if(!sourceReady){
      el.src=window.matchMedia('(max-width: 767px)').matches?'/media/hero-mobile.mp4':'/media/hero-optimized.mp4'
      el.load()
      setSourceReady(true)
    }
    try{
      await el.play()
      setState('playing')
    }catch{
      // Retain the original 4K source as an explicit recovery fallback.
      if(el.getAttribute('src')!=='/media/hero.mp4'){
        el.src='/media/hero.mp4'
        el.load()
        try{await el.play();setState('playing');return}catch{}
      }
      setState('error')
    }
  }

  return <>
    <div className="qh-film-layer" ref={frame}>
      <img className="kc-hero-poster" src="/media/hero.webp" srcSet="/media/hero-mobile.webp 800w, /media/hero.webp 1920w" sizes="100vw" alt="" width={1920} height={1080} fetchPriority="high" decoding="sync" aria-hidden="true" />
      <video className={'kc-hero-video'+(manualPlay?' qh-user-play':'')+(state==='error'?' qh-failed':'')}
        ref={video} muted loop playsInline preload="none" autoPlay={allowPlayback} aria-hidden="true"
        onPlaying={()=>setState('playing')}
        onPause={()=>setState(previous=>previous==='error'?'error':'paused')}
        onWaiting={()=>setState(previous=>previous==='playing'?'loading':previous)}
        onError={()=>setState('error')}>
        {sourceReady&&<><source src={mobileViewport?'/media/hero-mobile.mp4':'/media/hero-optimized.mp4'} type="video/mp4" /><source src="/media/hero.mp4" type="video/mp4" /></>}
      </video>
    </div>
    <div className="qh-video-controls">
      <button type="button" onClick={toggle}
        aria-label={state==='playing'?(lang==='fi'?'Pysäytä taustavideo':'Pause background video'):(lang==='fi'?'Toista taustavideo':'Play background video')}>
        <span aria-hidden="true">{state==='playing'?'Ⅱ':'▶'}</span> {state==='playing'?(lang==='fi'?'Pysäytä':'Pause'):(lang==='fi'?'Toista':'Play')}
      </button>
      {(state==='blocked'||state==='error')&&<span className="qh-film-note" role="status">{lang==='fi'?'Automaattinen toisto on estetty. Käynnistä video painikkeesta.':'Autoplay is blocked. Use Play to start the film.'}</span>}
    </div>
  </>
}
