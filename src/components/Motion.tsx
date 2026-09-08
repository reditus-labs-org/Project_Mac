'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
gsap.registerPlugin(ScrollTrigger);
export default function Motion(){
 useEffect(()=>{
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let lenis:Lenis|undefined;
  const tick=(time:number)=>lenis?.raf(time*1000);
  if(!reduced.matches && window.matchMedia('(pointer:fine)').matches){
   lenis=new Lenis({autoRaf:false,lerp:0.09,smoothWheel:true,anchors:{offset:-80},prevent:node=>node.tagName==='DIALOG'||!!node.closest('dialog')});
   lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(tick);
  }
  const context=gsap.context(()=>{
   if(reduced.matches)return;
   gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>{
    gsap.fromTo(el,{y:36,opacity:0},{y:0,opacity:1,duration:0.95,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 94%',once:true}});
   });
   gsap.utils.toArray<HTMLElement>('.project-visual img').forEach(el=>{
    gsap.fromTo(el,{yPercent:-4,scale:1.09},{yPercent:4,scale:1.09,ease:'none',scrollTrigger:{trigger:el.parentElement,start:'top bottom',end:'bottom top',scrub:0.5}});
   });
  });
  const onHash=()=>{if(!lenis && window.location.hash){document.getElementById(window.location.hash.slice(1))?.scrollIntoView();}};
  window.addEventListener('hashchange',onHash);
  document.fonts.ready.then(()=>ScrollTrigger.refresh());
  return()=>{context.revert();gsap.ticker.remove(tick);lenis?.destroy();window.removeEventListener('hashchange',onHash);};
 },[]);
 return null;
}
