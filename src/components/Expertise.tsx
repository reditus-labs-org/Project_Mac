'use client';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {DrawSVGPlugin} from 'gsap/DrawSVGPlugin';
import {services} from '@/data/projects';
import {Arrow} from './Icons';
gsap.registerPlugin(DrawSVGPlugin);
const paths=[
'M105 285 330 170 552 280M185 245v-60l145-74 140 70v54M260 205v-60l70-37',
'M90 306 330 186 569 308M235 231v-59l95-47 95 49v60',
'M134 321 329 221 526 322M329 221v-95',
'M175 337 330 259 486 337M330 259v-83',
'M216 357 330 300 445 357M330 300v-93',
'M93 261 330 139 569 261M330 139V78'];
export default function Expertise(){
 const [active,setActive]=useState(0);const diagram=useRef<SVGSVGElement>(null);
 useEffect(()=>{const el=diagram.current?.querySelector('.selected-system-path');if(!el)return;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const tween=gsap.fromTo(el,{drawSVG:reduced?'100%':'0%'},{drawSVG:'100%',duration:1.3,ease:'power2.inOut'});return()=>{tween.kill();};},[active]);
 return <section className="expertise section-pad" id="expertise" aria-labelledby="expertise-heading">

 <div className="section-heading"><h2 id="expertise-heading" data-reveal>Everything connects.</h2><span className="mono">EXPLORE THE SYSTEM ↓</span></div>
 <div className="expertise-grid"><div className="system-diagram">
 <div className="diagram-top mono"><span>MAC / SYSTEM ATLAS</span><span>ISOMETRIC VIEW +</span></div>
 <svg ref={diagram} viewBox="0 0 660 430" aria-label={'Illustrative '+services[active].name+' service network'} role="img">
 <defs><pattern id="diagram-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0v30" fill="none" stroke="#c9cdc3" strokeWidth=".35"/></pattern></defs>
 <rect width="660" height="430" fill="url(#diagram-grid)"/>
 <g stroke="#9da699" fill="#d8ddd2" fillOpacity=".35">{[0,1,2,3].map(i=><g key={i} transform={'translate(0 '+(-i*55)+')'}><path d="m90 303 240-123 240 123-240 123Z"/><path d="m90 303 240 123v8L90 311Z" fill="#b7c0b1"/><path d="m570 303-240 123v8l240-123Z" fill="#a7b3a0"/></g>)}</g>
 <g stroke="#68775f" strokeWidth="2">{[90,210,330,450,570].map((x,i)=><path key={x} d={'M'+x+' '+(303-Math.min(i,4-i)*61.5)+'v-165'}/>)}<path d="M330 426V261M210 365v-165M450 365v-165"/></g>
 <g fill="none" strokeWidth="2">{paths.map((d,i)=><path key={d} d={d} stroke={i===active?services[i].color:'#b7c0af'} strokeOpacity={i===active?0:0.55}/>)}<path className="selected-system-path" key={active} d={paths[active]} stroke={services[active].color} strokeWidth="3"/></g>
 <g fill={services[active].color}><circle cx="330" cy={active===5?78:125} r="5"/><circle cx="330" cy={active===5?78:125} r="11" fill="none" stroke={services[active].color} strokeOpacity=".35"/></g>
 <g stroke="#718166" fill="#c6cebf"><path d="m285 79 38-19 61 31-38 19Z"/><path d="M285 79v25l61 32v-26Z"/><path d="m384 91-38 19v26l38-20Z"/></g>
 </svg><div className="diagram-bottom"><span className="mono">ILLUSTRATIVE SERVICE NETWORK</span><span style={{color:services[active].color}} className="mono">{services[active].code}</span></div>
 </div><div className="services-panel"><div className="service-list" aria-label="Select a service">{services.map((s,i)=><button key={s.name} onClick={()=>setActive(i)} aria-pressed={active===i} className={active===i?'active':''}><span className="service-index">0{i+1}</span><span>{s.name}</span><Arrow diagonal/></button>)}</div><div className="service-description" aria-live="polite"><span className="dot" style={{background:services[active].color}}/><h3>{services[active].label}</h3><p>{services[active].description}</p><a href="#contact" className="text-link">Discuss your requirements <Arrow/></a></div></div></div>
 </section>;
}
