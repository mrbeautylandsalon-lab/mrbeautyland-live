"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Star, Sparkles } from "lucide-react";

const WORDS = ["Elegance","Radiance","Luxury","Beauty","Grace","Glow","Style"];

export default function HeroSection() {
  const ref      = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const [wordIdx, setWordIdx] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref });
  const yParallax = useTransform(scrollYProgress, [0,1], ["0%","25%"]);
  const opParallax = useTransform(scrollYProgress, [0,0.7],[1,0]);

  /* ── canvas animated background ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Orb = { x:number;y:number;r:number;vx:number;vy:number;hue:number;alpha:number };
    const orbs: Orb[] = Array.from({length:8},()=>({
      x: Math.random()*window.innerWidth,
      y: Math.random()*window.innerHeight,
      r: 160+Math.random()*220,
      vx:(Math.random()-.5)*.5,
      vy:(Math.random()-.5)*.5,
      hue: 25+Math.random()*25,
      alpha: 0.05+Math.random()*0.07,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);

      /* base gradient */
      const bg = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
      bg.addColorStop(0,"#F8F6F2");
      bg.addColorStop(.4,"#EFE7DD");
      bg.addColorStop(.7,"#F5EFE8");
      bg.addColorStop(1,"#F8F6F2");
      ctx.fillStyle = bg; ctx.fillRect(0,0,canvas.width,canvas.height);

      /* mouse orb */
      const mg = ctx.createRadialGradient(mouseRef.current.x,mouseRef.current.y,0,mouseRef.current.x,mouseRef.current.y,350);
      mg.addColorStop(0,"rgba(184,155,122,0.08)"); mg.addColorStop(1,"transparent");
      ctx.fillStyle=mg; ctx.fillRect(0,0,canvas.width,canvas.height);

      /* floating orbs */
      orbs.forEach(o=>{
        o.x+=o.vx; o.y+=o.vy;
        if(o.x<-o.r)o.x=canvas.width+o.r;
        if(o.x>canvas.width+o.r)o.x=-o.r;
        if(o.y<-o.r)o.y=canvas.height+o.r;
        if(o.y>canvas.height+o.r)o.y=-o.r;
        const g=ctx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);
        g.addColorStop(0,`hsla(${o.hue},45%,72%,${o.alpha})`);
        g.addColorStop(1,"transparent");
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(o.x,o.y,o.r,0,Math.PI*2); ctx.fill();
      });

      /* subtle grid */
      ctx.strokeStyle="rgba(184,155,122,0.04)"; ctx.lineWidth=1;
      for(let x=0;x<canvas.width;x+=80){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
      for(let y=0;y<canvas.height;y+=80){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}

      raf=requestAnimationFrame(draw);
    };
    draw();

    const onMouse=(e:MouseEvent)=>{mouseRef.current={x:e.clientX,y:e.clientY};};
    window.addEventListener("mousemove",onMouse,{passive:true});
    return ()=>{
      window.removeEventListener("resize",resize);
      window.removeEventListener("mousemove",onMouse);
      cancelAnimationFrame(raf);
    };
  },[]);

  /* word rotation */
  useEffect(()=>{
    const t=setInterval(()=>setWordIdx(i=>(i+1)%WORDS.length),2200);
    return ()=>clearInterval(t);
  },[]);

  const particles = Array.from({length:16},(_,i)=>({
    left:`${6+(i*6.1)%88}%`, top:`${8+(i*7.7)%84}%`,
    size:2+(i%3), dur:4+(i%5), delay:(i*0.65)%6,
  }));

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{zIndex:0}} />

      {/* Particles */}
      {particles.map((p,i)=>(
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{left:p.left,top:p.top,width:p.size,height:p.size,
            background:"radial-gradient(circle,rgba(184,155,122,0.9),transparent)",zIndex:1}}
          animate={{y:[0,-60,-120],opacity:[0,0.8,0],scale:[0,1,0]}}
          transition={{duration:p.dur,delay:p.delay,repeat:Infinity,ease:"easeOut"}} />
      ))}

      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{zIndex:1}}>
        {[640,460,300].map((size,i)=>(
          <motion.div key={size} className="absolute rounded-full border"
            style={{width:size,height:size,borderColor:`rgba(184,155,122,${0.04+i*0.02})`}}
            animate={{rotate:i%2===0?360:-360}}
            transition={{duration:28+i*10,repeat:Infinity,ease:"linear"}} />
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 text-center"
        style={{y:yParallax,opacity:opParallax}}
      >
        {/* Logo */}
        <motion.div className="flex justify-center mb-8"
          initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}}
          transition={{delay:3.7,duration:0.8,type:"spring",stiffness:180,damping:18}}>
          <div className="relative">
            <motion.div className="absolute inset-0 rounded-full"
              style={{background:"conic-gradient(from 0deg,transparent,rgba(184,155,122,0.6),transparent)"}}
              animate={{rotate:360}} transition={{duration:4,repeat:Infinity,ease:"linear"}} />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden flex items-center justify-center"
              style={{background:"radial-gradient(circle at 30% 30%,#1a1410,#0d0a06)",
                border:"2.5px solid rgba(184,155,122,0.55)",
                boxShadow:"0 0 60px rgba(184,155,122,0.25),inset 0 0 24px rgba(0,0,0,0.5)"}}>
              <img src="/logo.png" alt="MR Beauty Land"
                className="w-full h-full object-contain p-1.5"
                onError={e=>{(e.target as HTMLImageElement).style.opacity="0"}} />
            </div>
            {/* Shimmer sweep */}
            <motion.div className="absolute inset-0 rounded-full pointer-events-none overflow-hidden">
              <motion.div className="absolute inset-0"
                style={{background:"linear-gradient(135deg,transparent 30%,rgba(255,255,255,0.4) 50%,transparent 70%)"}}
                animate={{x:["-100%","200%"]}}
                transition={{duration:2.5,repeat:Infinity,repeatDelay:3,ease:"easeInOut"}} />
            </motion.div>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.div className="flex items-center justify-center gap-3 mb-5"
          initial={{opacity:0,y:18}} animate={{opacity:1,y:0}}
          transition={{delay:4.0,duration:0.7}}>
          <div className="h-px w-10 sm:w-16" style={{background:"linear-gradient(90deg,transparent,#B89B7A)"}} />
          <span className="text-[10px] sm:text-xs tracking-[0.35em] uppercase font-light" style={{color:"#8A6E52"}}>
            Luxury Salon Experience
          </span>
          <div className="h-px w-10 sm:w-16" style={{background:"linear-gradient(90deg,#B89B7A,transparent)"}} />
        </motion.div>

        {/* Headline */}
        <motion.h1 className="font-display leading-tight mb-5"
          style={{color:"#3D2E22"}}
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:4.15,duration:0.7}}>
          <motion.span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{y:40,opacity:0}} animate={{y:0,opacity:1}}
            transition={{delay:4.2,duration:0.8,ease:[0.23,1,0.32,1]}}>
            Where Beauty
          </motion.span>
          <motion.span className="block text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
            initial={{y:40,opacity:0}} animate={{y:0,opacity:1}}
            transition={{delay:4.4,duration:0.8,ease:[0.23,1,0.32,1]}}>
            Meets{" "}
            <span className="inline-block overflow-hidden align-bottom" style={{minWidth:"6ch"}}>
              <AnimatePresence mode="wait">
                <motion.span key={WORDS[wordIdx]} className="inline-block italic" style={{color:"#8A6E52"}}
                  initial={{y:"100%",opacity:0}} animate={{y:"0%",opacity:1}} exit={{y:"-100%",opacity:0}}
                  transition={{duration:0.5,ease:[0.23,1,0.32,1]}}>
                  {WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.span>
        </motion.h1>

        {/* Sub */}
        <motion.p className="text-sm sm:text-base md:text-lg font-light max-w-xl mx-auto mb-9 leading-relaxed px-2"
          style={{color:"#6B5340"}}
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{delay:4.6,duration:0.7}}>
          Premium Hair, Skin, Bridal &amp; Spa Services — Crafted for You
        </motion.p>

        {/* ── BUTTONS ── */}
        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4 sm:px-0"
          initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{delay:4.8,duration:0.7}}>
          <Link href="/booking" className="btn-primary w-full sm:w-auto">
            Book Appointment
          </Link>
          <Link href="/services" className="btn-outline w-full sm:w-auto">
            Explore Services
          </Link>
        </motion.div>

        {/* Stats chips */}
        <motion.div className="flex flex-wrap items-center justify-center gap-3 mt-10"
          initial={{opacity:0}} animate={{opacity:1}}
          transition={{delay:5.1,duration:0.7}}>
          {[
            {icon:Star,    value:"4.9★", label:"Rating"},
            {icon:Sparkles,value:"50+",  label:"Services"},
            {icon:Star,    value:"2000+",label:"Happy Clients"},
          ].map(({icon:Icon,value,label})=>(
            <div key={label} className="glass flex items-center gap-2 px-4 py-2.5 rounded-full shadow-sm">
              <Icon size={11} style={{color:"#B89B7A"}} />
              <span className="font-display font-semibold text-sm" style={{color:"#3D2E22"}}>{value}</span>
              <span className="text-[10px] tracking-widest uppercase" style={{color:"#8A6E52"}}>{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{opacity:0}} animate={{opacity:1}} transition={{delay:5.5,duration:0.8}}>
        <span className="text-[9px] tracking-[0.35em] uppercase" style={{color:"#B89B7A"}}>Scroll</span>
        <motion.div animate={{y:[0,8,0]}} transition={{duration:2,repeat:Infinity,ease:"easeInOut"}}>
          <ArrowDown size={13} style={{color:"#B89B7A"}} />
        </motion.div>
      </motion.div>
    </section>
  );
}
