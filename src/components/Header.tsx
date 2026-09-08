'use client';
import {useEffect,useRef,useState} from 'react';
import {Arrow,Mark} from './Icons';
export default function Header(){
 const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{const update=()=>setScrolled(window.scrollY>40);update();window.addEventListener('scroll',update,{passive:true});return()=>window.removeEventListener('scroll',update);},[]);
 useEffect(()=>{const d=dialog.current;if(!d)return;const previous=document.body.style.overflow;if(open){if(!d.open)d.showModal();document.body.style.overflow='hidden';}else d.close();return()=>{document.body.style.overflow=previous;};},[open]);
 const close=()=>setOpen(false);
 return <><a className="skip-link" href="#main">Skip to content</a><header className={"site-header "+(scrolled?"scrolled":"")}>
 <a href="/" aria-label="MAC Engineering Services home"><Mark/></a>
 <nav className="desktop-nav" aria-label="Main navigation"><a href="#expertise">Expertise</a><a href="#work">Our work</a><a href="#about">Our story</a></nav>
 <div className="header-actions"><a href="#contact" className="header-contact">Let’s talk <Arrow diagonal/></a><button className="menu-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="site-menu" onClick={()=>setOpen(true)}><span/><span/></button></div>
 </header>
 <dialog ref={dialog} id="site-menu" className="menu-dialog" onCancel={close} onClick={e=>{if(e.target===e.currentTarget)close();}}>
 <div className="menu-top"><Mark/><button className="round-button" onClick={close} aria-label="Close menu">×</button></div>
 <div className="menu-links">{[['01','The experience','#experience'],['02','Our expertise','#expertise'],['03','Selected work','#work'],['04','Our story','#about'],['05','Start a project','#contact']].map(([n,t,h])=><a href={h} key={h} onClick={close}><small>{n}</small>{t}<Arrow diagonal/></a>)}</div>
 <a href="mailto:info@maceng.in" className="menu-email">info@maceng.in <Arrow diagonal/></a>
 </dialog></>;
}
