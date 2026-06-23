"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const spaServices = [
  {
    name: "Swedish Full Body Massage",
    price: "₹2,000",
    duration: "60 min",
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    desc: "Classic relaxation massage using long gliding strokes to release tension and improve circulation.",
    includes: ["Aroma oil selection", "Full body massage", "Hot towel wrap", "Herbal tea service"],
  },
  {
    name: "Aromatherapy Massage",
    price: "₹2,500",
    duration: "75 min",
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80",
    desc: "Luxurious essential oil massage that rejuvenates the body and calms the mind completely.",
    includes: ["Personalized oil blend", "Full body massage", "Scalp massage", "Foot ritual"],
  },
  {
    name: "Deep Tissue Massage",
    price: "₹2,800",
    duration: "60 min",
    img: "https://images.unsplash.com/photo-1552693673-1bf958298935?w=600&q=80",
    desc: "Targets deep muscle layers to relieve chronic pain, stiffness and sports injuries.",
    includes: ["Muscle assessment", "Deep pressure techniques", "Targeted trigger points", "Post care advice"],
  },
  {
    name: "Body Polishing",
    price: "₹3,500",
    duration: "90 min",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80",
    desc: "Head to toe exfoliation and moisturization for silky smooth, glowing skin all over.",
    includes: ["Full body scrub", "Steam session", "Body butter application", "Hydration wrap"],
  },
  {
    name: "Foot Reflexology",
    price: "₹1,200",
    duration: "45 min",
    img: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=600&q=80",
    desc: "Therapeutic foot massage targeting pressure points for whole body healing and relaxation.",
    includes: ["Foot soak", "Reflexology massage", "Heel scrub", "Moisturizing treatment"],
  },
  {
    name: "Royal Spa Package",
    price: "₹5,500",
    duration: "2.5 hrs",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80",
    desc: "Complete luxury spa experience — our most indulgent package for ultimate relaxation.",
    includes: ["Full body massage", "Facial", "Body scrub", "Foot ritual", "Herbal bath", "Refreshments"],
  },
];

export default function SpaPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&q=80" alt="Spa" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(248,246,242,0.92), rgba(214,194,174,0.7))" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>Relax & Restore</p>
            <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#4E3D2F" }}>
              Spa &amp; <em className="not-italic" style={{ color: "#8A6E52" }}>Wellness</em>
            </h1>
            <p className="text-base font-light max-w-xl mx-auto mb-8" style={{ color: "#6B5340" }}>
              Escape the everyday. Our spa services are designed to restore your body, calm your mind and renew your spirit.
            </p>
            <Link href="/booking" className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase text-white" style={{ background: "linear-gradient(135deg, #6B5340, #8A6E52, #B89B7A)" }}>
              Book Spa Session <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaServices.map((s, i) => (
              <motion.div
                key={s.name}
                className="luxury-card rounded-2xl overflow-hidden border"
                style={{ background: "#FDFCFA", borderColor: "rgba(214,194,174,0.2)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="relative h-52 overflow-hidden group">
                  <Image src={s.img} alt={s.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="400px" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl" style={{ color: "#4E3D2F" }}>{s.name}</h3>
                    <div className="text-right shrink-0 ml-2">
                      <p className="text-sm font-semibold" style={{ color: "#8A6E52" }}>{s.price}</p>
                      <p className="text-[10px] uppercase tracking-widest" style={{ color: "#B89B7A" }}>{s.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#6B5340" }}>{s.desc}</p>
                  <ul className="space-y-1.5 mb-5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs" style={{ color: "#8A6E52" }}>
                        <Check size={11} style={{ color: "#B89B7A" }} /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking" className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase" style={{ color: "#B89B7A" }}>
                    Book Now <ArrowRight size={11} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
