'use client';
import {useEffect,useRef,useState} from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {Arrow} from './Icons';
const Equipment=dynamic(()=>import('./Equipment'),{ssr:false});
gsap.registerPlugin(ScrollTrigger);
export default function Hero(){
 const section=useRef<HTMLElement>(null);const progress=useRef(0);
 const [chapter,setChapter]=useState(0);const [ready,setReady]=useState(false);const [failed,setFailed]=useState(false);
 const [view,setView]=useState<'auto'|'assembled'|'exploded'>('auto');const [rotate,setRotate]=useState(false);
 useEffect(()=>{
  const root=section.current;if(!root)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const trigger=ScrollTrigger.create({trigger:root,start:'top top',end:'bottom bottom',onUpdate:s=>{
   progress.current=reduced.matches?0:s.progress;setChapter(reduced.matches?0:s.progress<.30?0:s.progress<.68?1:2);
  }});
  return()=>{trigger.kill();};
 },[]);
 const jump=(i:number)=>{
  const el=section.current;if(!el)return;setView('auto');
  const top=el.getBoundingClientRect().top+window.scrollY+(el.offsetHeight-window.innerHeight)*[0,.44,.91][i];
  window.scrollTo({top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 };
 return <section ref={section} className="experience" id="experience" aria-label="Interactive engineering experience">
 <div className={'hero-stage chapter-'+chapter}>
 <div className="hero-grid" aria-hidden="true"/><div className="hero-topline mono"><span><i className="dot"/> HVAC & MEP ENGINEERING</span><span>CHENNAI, INDIA Â· EST. 2010</span></div>
 <div className="hero-titles"><div className={'hero-title-slide '+(chapter===0?'active':'')} aria-hidden={chapter!==0}><h1>ENGINEERED<br/><span>TO FLOW.</span></h1></div>
 <div className={'hero-title-slide secondary '+(chapter===1?'active':'')} aria-hidden={chapter!==1}><h2>PRECISION.<br/><span>FROM WITHIN.</span></h2></div>
 <div className={'hero-title-slide secondary '+(chapter===2?'active':'')} aria-hidden={chapter!==2}><h2>ONE BUILDING.<br/><span>EVERY SYSTEM.</span></h2></div></div>
 <div className={'scene-wrap '+(ready&&!failed?'scene-ready':'')}>
 <div className="scene-fallback" aria-hidden="true" style={{display:failed?undefined:'none'}}><svg viewBox="0 0 900 500" fill="none"><g transform="translate(270 140) rotate(-12)"><path d="M0 40 170 0l350 70-170 65z" fill="#c5c7c3" stroke="#797d77"/><path d="M0 40v185l350 95V135z" fill="#333c36" stroke="#797d77"/><path d="m350 135 170-65v200l-170 50z" fill="#a8ada6"/><g stroke="#7d8c80">{Array.from({length:20},(_,i)=><path key={i} d={'M'+(15+i*16)+' '+(60+i*4.3)+'v140'}/>)}</g><circle cx="115" cy="159" r="57" fill="#101714" stroke="#809085" strokeWidth="8"/><circle cx="115" cy="159" r="16" fill="#254fff"/><circle cx="248" cy="195" r="57" fill="#101714" stroke="#809085" strokeWidth="8"/><circle cx="248" cy="195" r="16" fill="#254fff"/></g></svg></div>
 {!failed&&<Equipment progress={progress} view={view} rotate={rotate} onReady={()=>setReady(true)} onFailure={()=>setFailed(true)}/>}
 </div>
 <div className="hero-caption"><span className="crosshair">+</span><div className="mono">{chapter===2?'SYSTEM / MEP NETWORK':'SYSTEM / AIR HANDLING'}<small>ILLUSTRATIVE ENGINEERING MODEL</small></div></div>
 <div className="hero-bottom"><div className="hero-description"><p>{chapter===0?'The engineering behind better spaces. From design to commissioning.':chapter===1?'Every component has a purpose. Every detail works together.':'Climate. Power. Water. Safety. Coordinated from the inside out.'}</p><a href="#work" className="primary-button">Explore our work <Arrow diagonal/></a></div>
 <div className="experience-controls"><div className="view-controls" aria-label="Equipment view"><button className={view==='auto'?'selected':''} onClick={()=>setView('auto')} aria-pressed={view==='auto'}>Scroll view</button><button className={view==='exploded'?'selected':''} onClick={()=>setView(view==='exploded'?'assembled':'exploded')} aria-pressed={view==='exploded'}>Explode <span>â†—</span></button><button className={rotate?'selected':''} onClick={()=>setRotate(!rotate)} aria-pressed={rotate} aria-label={rotate?'Stop model rotation':'Rotate model'}>Rotate <span>â†»</span></button></div>
 <span className="mono scroll-hint">SCROLL TO LOOK CLOSER <span>â†“</span></span></div></div>
 <div className="chapter-nav" aria-label="Experience chapters">{['The object','The detail','The system'].map((t,i)=><button key={t} className={chapter===i?'active':''} onClick={()=>jump(i)} aria-current={chapter===i?'step':undefined}><span>0{i+1}</span>{t}<i/></button>)}</div>
 </div></section>;
}
