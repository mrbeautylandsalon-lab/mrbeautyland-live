"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Scissors, Sparkles, Heart, Leaf, Star, Palette } from "lucide-react";

const CATS = [
  {icon:Scissors, title:"Hair Services",  desc:"Cuts, color, keratin, spa & more by expert stylists", price:"from ₹149",  href:"/services", bg:"#F8F6F2"},
  {icon:Sparkles, title:"Facial Services",desc:"Fruit, Oxy, Korean Glass Skin & bridal facials",      price:"from ₹800",  href:"/services", bg:"#EFE7DD"},
  {icon:Leaf,     title:"Waxing",         desc:"Honey, Milk & Rica wax — full body options",           price:"from ₹50",   href:"/services", bg:"#F8F6F2"},
  {icon:Star,     title:"D-Tan & Bleach", desc:"O3+ tan removal & brightening bleach treatments",      price:"from ₹300",  href:"/services", bg:"#EFE7DD"},
  {icon:Heart,    title:"Bridal Makeup",  desc:"O3+ bridal facial, full makeup & pre-bridal packages", price:"from ₹2000", href:"/services", bg:"#F8F6F2"},
  {icon:Palette,  title:"Beauty Packages",desc:"Combo packages starting at just ₹499",                 price:"from ₹499",  href:"/services", bg:"#EFE7DD"},
];

export default function ServicesPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref,{once:true,amount:0.1});

  return (
    <section ref={ref} className="py-20 md:py-28" style={{background:"#F8F6F2"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-14" initial={{opacity:0,y:25}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{color:"#B89B7A"}}>What We Offer</p>
          <h2 className="font-display text-4xl sm:text-5xl" style={{color:"#3D2E22"}}>
            Premium <em className="not-italic" style={{color:"#8A6E52"}}>Services</em>
          </h2>
          <p className="text-sm font-light mt-2 max-w-lg mx-auto" style={{color:"#6B5340"}}>
            50+ services — all at prices with real discounts, no hidden charges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATS.map((c,i)=>(
            <motion.div
              key={c.title}
              className="luxury-card rounded-2xl p-6 border group"
              style={{background:c.bg,borderColor:"rgba(214,194,174,0.22)"}}
              initial={{opacity:0,y:30}}
              animate={isInView?{opacity:1,y:0}:{}}
              transition={{delay:i*0.09,duration:0.6,ease:[0.23,1,0.32,1]}}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{background:"linear-gradient(135deg,#D6C2AE,#B89B7A)"}}>
                <c.icon size={20} style={{color:"#3D2E22"}} />
              </div>
              <h3 className="font-display text-xl mb-1.5" style={{color:"#3D2E22"}}>{c.title}</h3>
              <p className="text-xs font-light leading-relaxed mb-4" style={{color:"#6B5340"}}>{c.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold" style={{color:"#8A6E52"}}>{c.price}</span>
                <Link href={c.href} className="flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase group-hover:gap-2.5 transition-all" style={{color:"#B89B7A"}}>
                  View All <ArrowRight size={10}/>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-10" initial={{opacity:0}} animate={isInView?{opacity:1}:{}} transition={{delay:0.6}}>
          <Link href="/services" className="btn-outline">View All 50+ Services</Link>
        </motion.div>
      </div>
    </section>
  );
}
