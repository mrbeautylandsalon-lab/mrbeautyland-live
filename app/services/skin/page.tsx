"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const skinServices = [
  {
    name: "Glow Facial",
    price: "₹1,200",
    duration: "60 min",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    desc: "Advanced brightening facial using vitamin C and hyaluronic acid for instant glow.",
    includes: ["Skin analysis", "Deep cleanse", "Exfoliation", "Mask + serum", "SPF finish"],
  },
  {
    name: "Anti-Aging Treatment",
    price: "₹2,500",
    duration: "75 min",
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    desc: "Premium anti-aging facial targeting fine lines, wrinkles and loss of elasticity.",
    includes: ["Collagen mask", "Microcurrent therapy", "Eye treatment", "Neck & décolleté care"],
  },
  {
    name: "Acne & Pore Treatment",
    price: "₹1,500",
    duration: "60 min",
    img: "https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=600&q=80",
    desc: "Targeted treatment for acne-prone skin — clears pores and reduces active breakouts.",
    includes: ["Extraction", "Salicylic peel", "Calming mask", "Oil control serum"],
  },
  {
    name: "Cleanup & Bleach",
    price: "₹600",
    duration: "45 min",
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&q=80",
    desc: "Quick and effective cleanup to remove tan and refresh your skin's natural radiance.",
    includes: ["Cleansing", "Scrub", "Steam", "Bleach application", "Moisturizer"],
  },
  {
    name: "D-Tan & Pigmentation",
    price: "₹800",
    duration: "50 min",
    img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    desc: "Effective treatment to remove sun tan and reduce dark spots for even skin tone.",
    includes: ["D-tan pack", "Brightening serum", "Cooling mask", "UV protection"],
  },
  {
    name: "Hydra Facial",
    price: "₹3,000",
    duration: "60 min",
    img: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80",
    desc: "The most advanced multi-step facial for deep cleansing, hydration and rejuvenation.",
    includes: ["Vortex cleansing", "Glycolic peel", "Extraction vortex", "Antioxidant serum"],
  },
];

export default function SkinServicesPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1920&q=80"
            alt="Skin services"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(248,246,242,0.93), rgba(214,194,174,0.7))" }} />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>Glow Up</p>
            <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#4E3D2F" }}>
              Skin <em className="not-italic" style={{ color: "#8A6E52" }}>Services</em>
            </h1>
            <p className="text-base font-light max-w-xl mx-auto mb-8" style={{ color: "#6B5340" }}>
              Advanced skin treatments using premium products for glowing, healthy and youthful skin
            </p>
            <Link
              href="/booking"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase text-white"
              style={{ background: "linear-gradient(135deg, #6B5340, #8A6E52, #B89B7A)" }}
            >
              Book Skin Appointment <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section ref={ref} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skinServices.map((s, i) => (
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
