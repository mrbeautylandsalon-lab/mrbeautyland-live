"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const LINKS = [
  {href:"/",label:"Home"},
  {href:"/about",label:"About"},
  {href:"/services",label:"Services"},
  {href:"/gallery",label:"Gallery"},
  {href:"/offers",label:"Offers"},
  {href:"/contact",label:"Contact"},
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(()=>{
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll",fn,{passive:true});
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{ setOpen(false); },[path]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{y:-80,opacity:0}}
        animate={{y:0,opacity:1}}
        transition={{duration:0.8,delay:3.6,ease:[0.23,1,0.32,1]}}
      >
        <div className="mx-3 mt-2 rounded-2xl transition-all duration-500"
          style={{
            background: scrolled ? "rgba(253,252,250,0.9)" : "rgba(253,252,250,0.25)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: scrolled ? "1px solid rgba(214,194,174,0.35)" : "1px solid rgba(214,194,174,0.1)",
            boxShadow: scrolled ? "0 8px 32px rgba(138,110,82,0.07)" : "none",
          }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 min-w-0 shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border shrink-0" style={{borderColor:"rgba(184,155,122,0.4)",background:"#111"}}>
                <img src="/logo.png" alt="MR Beauty Land" className="w-full h-full object-contain p-0.5" onError={e=>{(e.target as HTMLImageElement).style.display="none"}} />
              </div>
              <div className="hidden sm:block min-w-0">
                <p className="font-display text-base font-semibold tracking-wide truncate" style={{color:"#3D2E22"}}>MR Beauty Land</p>
                <p className="text-[8px] tracking-[0.2em] uppercase font-light" style={{color:"#8A6E52"}}>Luxury Salon</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7">
              {LINKS.map(l=>(
                <Link key={l.href} href={l.href}
                  className="text-[11px] tracking-[0.12em] uppercase font-medium relative group transition-colors duration-300"
                  style={{color:path===l.href?"#6B5340":"#8A6E52"}}>
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                    style={{width:path===l.href?"100%":"0%",background:"#B89B7A"}} />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+917073937995" className="flex items-center gap-1.5 text-[11px] font-medium" style={{color:"#8A6E52"}}>
                <Phone size={12}/> Call
              </a>
              <Link href="/booking" className="magnetic-btn px-5 py-2.5 rounded-full text-[11px] font-medium tracking-widest uppercase"
                style={{background:"linear-gradient(135deg,#6B5340,#8A6E52,#B89B7A)",color:"#FDFCFA"}}>
                Book Now
              </Link>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-2">
              <Link href="/booking" className="px-4 py-2 rounded-full text-[10px] font-medium tracking-wider uppercase"
                style={{background:"linear-gradient(135deg,#8A6E52,#B89B7A)",color:"#FDFCFA"}}>
                Book
              </Link>
              <button onClick={()=>setOpen(o=>!o)} className="w-9 h-9 flex items-center justify-center rounded-xl"
                style={{color:"#6B5340",background:open?"rgba(214,194,174,0.25)":"transparent"}} aria-label="Menu">
                {open ? <X size={19}/> : <Menu size={19}/>}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-40 lg:hidden" style={{background:"rgba(40,28,18,0.45)",backdropFilter:"blur(4px)"}}
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setOpen(false)} />
            <motion.div className="fixed top-0 right-0 bottom-0 z-50 lg:hidden w-72 flex flex-col"
              style={{background:"#FDFCFA",borderLeft:"1px solid rgba(214,194,174,0.3)",boxShadow:"-20px 0 60px rgba(138,110,82,0.12)"}}
              initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}}
              transition={{duration:0.35,ease:[0.23,1,0.32,1]}}>

              <div className="flex items-center justify-between px-6 py-5 border-b" style={{borderColor:"rgba(214,194,174,0.2)"}}>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden" style={{background:"#111"}}>
                    <img src="/logo.png" alt="Logo" className="w-full h-full object-contain p-0.5" />
                  </div>
                  <p className="font-display text-base" style={{color:"#3D2E22"}}>MR Beauty Land</p>
                </div>
                <button onClick={()=>setOpen(false)} className="w-9 h-9 flex items-center justify-center rounded-xl"
                  style={{background:"rgba(214,194,174,0.2)",color:"#6B5340"}} aria-label="Close">
                  <X size={17}/>
                </button>
              </div>

              <nav className="flex-1 px-4 py-5 space-y-1">
                {LINKS.map((l,i)=>(
                  <motion.div key={l.href} initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} transition={{delay:0.05+i*0.05}}>
                    <Link href={l.href} className="flex items-center px-4 py-3.5 rounded-xl text-sm font-medium tracking-wide transition-all"
                      style={{color:path===l.href?"#6B5340":"#8A6E52",background:path===l.href?"rgba(184,155,122,0.1)":"transparent"}}>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="px-4 py-5 space-y-3 border-t" style={{borderColor:"rgba(214,194,174,0.2)"}}>
                <Link href="/booking" className="magnetic-btn block w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase text-center"
                  style={{background:"linear-gradient(135deg,#6B5340,#8A6E52,#B89B7A)",color:"#FDFCFA"}}>
                  Book Appointment
                </Link>
                <a href="tel:+91" className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm border"
                  style={{borderColor:"rgba(184,155,122,0.3)",color:"#6B5340"}}>
                  <Phone size={13}/> Call Now
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
