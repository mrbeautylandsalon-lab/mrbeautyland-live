"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Tag, Search } from "lucide-react";

const ALL_SERVICES: Record<string, {name:string;price:number;original?:number;brief:string}[]> = {
  "Men Services": [
    {name:"Mens Haircut",price:149,original:200,brief:"Expert cut tailored for your face shape & style"},
    {name:"Beard Trim",price:99,original:150,brief:"Precision beard shaping and grooming"},
    {name:"Regular D-Tan",price:400,original:550,brief:"Remove tan and refresh your skin tone"},
    {name:"O3+ D-Tan",price:500,original:700,brief:"Premium O3+ formula for deep tan removal"},
    {name:"Threading",price:50,original:70,brief:"Quick and precise eyebrow threading"},
    {name:"Hair Curly",price:2000,original:2800,brief:"Stylish curls with long-lasting results"},
    {name:"Hair Color Matrix",price:500,original:700,brief:"Professional Matrix color for vibrant results"},
    {name:"Hair Color Loreal",price:600,original:850,brief:"Loreal Paris professional hair coloring"},
    {name:"Gel Color",price:400,original:550,brief:"Trendy gel color for a sharp look"},
    {name:"Smoothing",price:3000,original:4000,brief:"Frizz-free smooth hair for months"},
    {name:"Keratin",price:2000,original:2800,brief:"Deep keratin treatment for silky hair"},
    {name:"Hair Straightening",price:3500,original:4800,brief:"Permanent straightening with shine"},
    {name:"Fruit Cleanup",price:600,original:800,brief:"Refreshing fruit enzyme skin cleanup"},
    {name:"Oxy Cleanup",price:800,original:1100,brief:"Oxygen-infused deep pore cleansing"},
    {name:"O3+ Cleanup",price:1000,original:1400,brief:"Premium O3+ professional cleanup"},
    {name:"Scrub",price:200,original:280,brief:"Exfoliating scrub for fresh skin"},
    {name:"Berina Spa",price:600,original:850,brief:"Nourishing Berina hair spa treatment"},
    {name:"Loreal Spa",price:1000,original:1400,brief:"Premium Loreal spa for shiny hair"},
    {name:"Bleach",price:500,original:700,brief:"Brightening bleach for even skin tone"},
    {name:"Hair Wash",price:200,original:280,brief:"Deep cleansing wash with conditioning"},
    {name:"Head Massage",price:250,original:350,brief:"Relaxing scalp massage for stress relief"},
    {name:"Bean Wax",price:500,original:700,brief:"Smooth bean wax for clean results"},
    {name:"Milk Wax",price:2000,original:2800,brief:"Gentle milk wax for sensitive skin"},
    {name:"Rica Wax",price:2500,original:3500,brief:"Premium Rica wax for long-lasting smoothness"},
    {name:"Manicure",price:500,original:700,brief:"Complete nail and hand care treatment"},
    {name:"Pedicure",price:500,original:700,brief:"Relaxing foot care and nail treatment"},
  ],
  "Threading": [
    {name:"Eyebrows",price:30,original:50,brief:"Clean arched brows by expert hands"},
    {name:"Upper Lips",price:20,original:35,brief:"Precise upper lip hair removal"},
    {name:"Forehead",price:20,original:35,brief:"Clean forehead hair removal"},
    {name:"Chin",price:20,original:35,brief:"Smooth chin threading service"},
    {name:"Side Locks",price:40,original:60,brief:"Defined side lock threading"},
    {name:"Full Face",price:150,original:220,brief:"Complete face threading package"},
  ],
  "Normal Wax": [
    {name:"Eyebrow Wax",price:60,original:90,brief:"Precise eyebrow shaping with wax"},
    {name:"Upper Lips Wax",price:50,original:75,brief:"Smooth upper lip waxing"},
    {name:"Forehead Wax",price:80,original:120,brief:"Clean forehead wax treatment"},
    {name:"Chin Wax",price:50,original:75,brief:"Smooth chin hair removal"},
    {name:"Side Lock Wax",price:100,original:150,brief:"Neat side lock waxing"},
    {name:"Full Face Wax",price:400,original:580,brief:"Complete face waxing package"},
    {name:"Nose Wax",price:50,original:80,brief:"Safe and quick nose waxing"},
  ],
  "Honey Wax": [
    {name:"Arms Wax",price:100,original:150,brief:"Smooth arms with honey wax"},
    {name:"Underarms",price:50,original:80,brief:"Quick underarm hair removal"},
    {name:"Half Legs",price:150,original:220,brief:"Smooth half leg waxing"},
    {name:"Full Legs",price:300,original:430,brief:"Full leg smoothness with honey wax"},
    {name:"Tummy",price:150,original:220,brief:"Tummy area hair removal"},
    {name:"Half Back",price:150,original:220,brief:"Upper or lower back waxing"},
    {name:"Full Back",price:300,original:430,brief:"Complete back waxing service"},
    {name:"Bikini Wax",price:600,original:850,brief:"Professional bikini line waxing"},
    {name:"Full Body Wax",price:1200,original:1700,brief:"Complete full body honey wax"},
  ],
  "Milk Wax": [
    {name:"Milk Arms Wax",price:250,original:360,brief:"Gentle milk wax for arms"},
    {name:"Milk Underarms",price:70,original:100,brief:"Soft milk wax underarm service"},
    {name:"Milk Half Legs",price:300,original:430,brief:"Half leg milk wax treatment"},
    {name:"Milk Full Legs",price:500,original:720,brief:"Full leg smoothness — milk wax"},
    {name:"Milk Tummy",price:200,original:290,brief:"Tummy area milk wax"},
    {name:"Milk Half Back",price:200,original:290,brief:"Back milk wax — upper or lower"},
    {name:"Milk Full Back",price:400,original:580,brief:"Complete back milk wax"},
    {name:"Milk Bikini Wax",price:800,original:1150,brief:"Bikini area milk wax"},
    {name:"Body Wax",price:1500,original:2100,brief:"Full body milk wax treatment"},
  ],
  "Rica Wax": [
    {name:"Rica Arms Wax",price:400,original:580,brief:"Premium Rica wax for arms"},
    {name:"Rica Underarms",price:100,original:150,brief:"Rica wax underarm — extra smooth"},
    {name:"Rica Half Legs",price:400,original:580,brief:"Half legs with Rica formula"},
    {name:"Rica Full Legs",price:700,original:1000,brief:"Full leg Rica wax — silky finish"},
    {name:"Rica Tummy",price:300,original:430,brief:"Tummy Rica wax treatment"},
    {name:"Rica Half Back",price:300,original:430,brief:"Back Rica wax service"},
    {name:"Rica Full Back",price:500,original:720,brief:"Full back Rica premium wax"},
    {name:"Rica Bikini Wax",price:1000,original:1400,brief:"Professional Rica bikini wax"},
    {name:"Rica Full Body Wax",price:2000,original:2800,brief:"Ultimate Rica full body wax"},
  ],
  "Facials": [
    {name:"Fruit Facial",price:800,original:1100,brief:"Vitamin-rich fruit facial for natural glow"},
    {name:"Oxy Life Facial",price:1500,original:2100,brief:"Oxygen infusion for radiant skin"},
    {name:"Aroma Magic Facial",price:1200,original:1700,brief:"Aromatic facial for skin rejuvenation"},
    {name:"O3+ Bridal Facial",price:2000,original:2800,brief:"Bridal prep facial for perfect skin"},
    {name:"Korean Glass Skin Facial",price:2500,original:3500,brief:"K-beauty glass skin glow treatment"},
    {name:"Kanpeki Facial",price:2500,original:3500,brief:"Japanese deep brightening facial"},
  ],
  "Manicure": [
    {name:"Basic Manicure",price:500,original:700,brief:"Complete hand and nail care"},
    {name:"Spa Manicure",price:700,original:1000,brief:"Luxury spa manicure treatment"},
  ],
  "Pedicure": [
    {name:"Basic Pedicure",price:600,original:850,brief:"Relaxing foot and nail care"},
    {name:"Spa Pedicure",price:800,original:1150,brief:"Premium spa pedicure experience"},
  ],
  "Bleach": [
    {name:"Full Face & Neck",price:500,original:700,brief:"Brightening bleach for face & neck"},
    {name:"Full Arms",price:500,original:700,brief:"Even tone arm bleach treatment"},
    {name:"Half Legs Bleach",price:300,original:430,brief:"Half leg brightening bleach"},
    {name:"Full Legs Bleach",price:600,original:850,brief:"Complete leg bleach treatment"},
    {name:"Half Back Bleach",price:400,original:580,brief:"Back area bleach service"},
    {name:"Full Back Bleach",price:600,original:850,brief:"Full back brightening bleach"},
    {name:"Body Bleach",price:2000,original:2800,brief:"Full body bleach treatment"},
  ],
  "D-Tan": [
    {name:"Ragga D-Tan",price:500,original:700,brief:"Effective tan removal formula"},
    {name:"O3+ D-Tan Premium",price:600,original:850,brief:"Premium O3+ tan removal"},
  ],
  "Body Polishing": [
    {name:"Body Polishing",price:2000,original:2800,brief:"Full body scrub & polish for silky skin"},
  ],
  "Hair Services": [
    {name:"Hair Wash Premium",price:200,original:280,brief:"Deep cleanse with conditioning"},
    {name:"Loreal Wash",price:250,original:350,brief:"Loreal professional hair wash"},
    {name:"Blow Dry",price:300,original:430,brief:"Salon-smooth blow dry finish"},
    {name:"Haircut Women",price:500,original:800,brief:"Expert women's haircut & styling"},
    {name:"Normal Trim",price:200,original:300,brief:"Quick trim for neat ends"},
    {name:"Temporary Ironing",price:500,original:700,brief:"Silky flat iron styling"},
    {name:"Curls",price:500,original:700,brief:"Beautiful bouncy curls"},
    {name:"Crimping",price:500,original:700,brief:"Trendy crimped texture styling"},
    {name:"Keratin Shoulder",price:1500,original:2100,brief:"Shoulder-length keratin treatment"},
    {name:"Botox",price:2500,original:3500,brief:"Hair botox for deep repair & shine"},
    {name:"Nanoplastia",price:3000,original:4200,brief:"Nano treatment for ultra-smooth hair"},
    {name:"Women Smoothing",price:2500,original:3500,brief:"Frizz-free smoothening treatment"},
    {name:"Matrix Spa",price:800,original:1100,brief:"Matrix professional hair spa"},
    {name:"Wella Spa",price:1200,original:1700,brief:"Wella luxury hair spa treatment"},
    {name:"Head Massage Without Wash",price:300,original:430,brief:"Relaxing scalp massage"},
    {name:"Head Massage With Wash",price:500,original:700,brief:"Massage plus deep cleanse wash"},
  ],
  "Beauty Packages": [
    {name:"Package 1",price:499,original:700,brief:"Eyebrows + Upper Lips + Cleanup"},
    {name:"Package 2",price:699,original:1000,brief:"Threading + Bleach + Hair Wash"},
    {name:"Package 3",price:799,original:1150,brief:"Facial + Threading + Wax combo"},
    {name:"Package 4",price:999,original:1500,brief:"Premium combo — glow head to toe"},
  ],
};

const CATS = Object.keys(ALL_SERVICES);

function pct(orig:number,price:number){ return Math.round((orig-price)/orig*100); }

export default function ServicesPage() {
  const [active, setActive] = useState(CATS[0]);
  const [query,  setQuery]  = useState("");
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref,{once:true,amount:0.05});

  const services = ALL_SERVICES[active] ?? [];
  const filtered = query.trim()
    ? Object.values(ALL_SERVICES).flat().filter(s=>s.name.toLowerCase().includes(query.toLowerCase()))
    : services;

  return (
    <main className="pt-24 min-h-screen" style={{background:"#F8F6F2"}}>
      {/* Header */}
      <section className="py-14 text-center relative overflow-hidden" style={{background:"linear-gradient(180deg,#EFE7DD,#F8F6F2)"}}>
        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{color:"#B89B7A"}}>What We Offer</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-3" style={{color:"#3D2E22"}}>
            Our <em className="not-italic" style={{color:"#8A6E52"}}>Services</em>
          </h1>
          <p className="text-sm font-light" style={{color:"#6B5340"}}>All prices include GST — no hidden charges</p>
        </motion.div>
      </section>

      {/* Search */}
      <div className="sticky top-20 z-30 py-3 px-4" style={{background:"rgba(248,246,242,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid rgba(214,194,174,0.2)"}}>
        <div className="max-w-2xl mx-auto relative">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2" style={{color:"#B89B7A"}} />
          <input
            type="text"
            placeholder="Search any service..."
            value={query}
            onChange={e=>{setQuery(e.target.value)}}
            className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm border"
            style={{background:"#FDFCFA",borderColor:"rgba(214,194,174,0.35)",color:"#3D2E22"}}
          />
        </div>
      </div>

      {!query && (
        <div className="py-4 px-4 overflow-x-auto" style={{borderBottom:"1px solid rgba(214,194,174,0.15)"}}>
          <div className="flex gap-2 max-w-7xl mx-auto pb-1" style={{minWidth:"max-content"}}>
            {CATS.map(cat=>(
              <button
                key={cat}
                onClick={()=>setActive(cat)}
                className="px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-250 flex-shrink-0"
                style={{
                  background: active===cat ? "linear-gradient(135deg,#8A6E52,#B89B7A)" : "rgba(214,194,174,0.18)",
                  color: active===cat ? "#FDFCFA" : "#6B5340",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <section ref={ref} className="py-10 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {query && (
            <p className="mb-5 text-sm" style={{color:"#8A6E52"}}>
              {filtered.length} results for "<strong>{query}</strong>"
            </p>
          )}
          <AnimatePresence mode="wait">
            <motion.div
              key={query || active}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              transition={{duration:0.3}}
            >
              {filtered.map((s,i)=>{
                const disc = s.original ? pct(s.original,s.price) : 0;
                return (
                  <motion.div
                    key={s.name+i}
                    className="luxury-card rounded-2xl p-5 border relative overflow-hidden group"
                    style={{background:"#FDFCFA",borderColor:"rgba(214,194,174,0.22)"}}
                    initial={{opacity:0,y:22}}
                    animate={isInView?{opacity:1,y:0}:{}}
                    transition={{delay:i*0.04,duration:0.5}}
                  >
                    {/* Discount badge */}
                    {disc>0 && (
                      <div
                        className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-[9px] font-bold shadow-md"
                        style={{background:"linear-gradient(135deg,#8A6E52,#B89B7A)",color:"#FDFCFA"}}
                      >
                        {disc}%<br/>OFF
                      </div>
                    )}

                    {/* Icon dot */}
                    <div className="w-7 h-7 rounded-full mb-3" style={{background:"linear-gradient(135deg,#D6C2AE,#B89B7A)"}} />

                    <h3 className="font-medium text-sm mb-1 pr-10 leading-snug" style={{color:"#3D2E22"}}>{s.name}</h3>
                    <p className="text-xs font-light leading-relaxed mb-4" style={{color:"#8A6E52",minHeight:"2.5rem"}}>{s.brief}</p>

                    <div className="flex items-center gap-2">
                      <span className="font-display text-xl font-bold" style={{color:"#6B5340"}}>₹{s.price}</span>
                      {s.original && (
                        <span className="text-xs line-through font-light" style={{color:"#B89B7A"}}>₹{s.original}</span>
                      )}
                    </div>
                    {disc>0 && (
                      <p className="text-[10px] mt-0.5 font-medium" style={{color:"#8A6E52"}}>
                        You save ₹{(s.original!-s.price)}
                      </p>
                    )}

                    <Link
                      href="/booking"
                      className="mt-4 flex items-center gap-1.5 text-[10px] font-medium tracking-widest uppercase group-hover:gap-2.5 transition-all"
                      style={{color:"#B89B7A"}}
                    >
                      Book Now <ArrowRight size={10}/>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
