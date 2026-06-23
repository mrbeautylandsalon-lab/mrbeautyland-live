"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Star, Heart } from "lucide-react";

const bridalPackages = [
  {
    name: "Classic Bridal",
    price: "₹12,000",
    tag: "Entry",
    color: "#8A6E52",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    includes: [
      "Bridal makeup (HD)",
      "Hair styling with accessories",
      "Draping assistance",
      "Touch-up kit",
    ],
    duration: "3-4 hours",
  },
  {
    name: "Royal Bridal",
    price: "₹20,000",
    tag: "Most Popular",
    featured: true,
    color: "#6B5340",
    img: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80",
    includes: [
      "Bridal makeup (Airbrush)",
      "Hairstyling + extension setup",
      "Mehendi design (both hands)",
      "Pre-bridal skin session",
      "Draping + jewelry consultation",
      "Touch-up kit & artist on call",
    ],
    duration: "5-6 hours",
  },
  {
    name: "Platinum Bridal",
    price: "₹35,000",
    tag: "Premium",
    color: "#4E3D2F",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80",
    includes: [
      "Airbrush bridal makeup",
      "Full hair setup with extensions",
      "Full body mehendi",
      "3 pre-bridal sessions",
      "Engagement makeup included",
      "Sangeet / reception look",
      "Draping + jewelry styling",
      "On-site artist for full day",
    ],
    duration: "Full day",
  },
];

const preBridalServices = [
  { name: "Skin Brightening Facial", sessions: "4 sessions", price: "₹6,000", desc: "Advanced glow treatment over 4 weeks" },
  { name: "Hair Botox Treatment", sessions: "2 sessions", price: "₹4,000", desc: "Deep repair for lustrous bridal hair" },
  { name: "Full Body Polishing", sessions: "2 sessions", price: "₹5,000", desc: "Head to toe glow and smoothening" },
  { name: "Eyebrow & Lash Tinting", sessions: "1 session", price: "₹800", desc: "Define brows and lashes for the big day" },
];

export default function BridalPage() {
  const packRef = useRef<HTMLElement>(null);
  const preRef = useRef<HTMLElement>(null);
  const packInView = useInView(packRef, { once: true, amount: 0.05 });
  const preInView = useInView(preRef, { once: true, amount: 0.1 });

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
            alt="Bridal makeup"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(248,246,242,0.92), rgba(239,231,221,0.75))" }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart size={14} style={{ color: "#B89B7A" }} className="fill-current" />
              <p className="text-xs tracking-[0.4em] uppercase" style={{ color: "#B89B7A" }}>
                Your Dream Day
              </p>
              <Heart size={14} style={{ color: "#B89B7A" }} className="fill-current" />
            </div>
            <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#4E3D2F" }}>
              Bridal{" "}
              <em className="not-italic" style={{ color: "#8A6E52" }}>Makeup</em>
            </h1>
            <p className="text-base font-light max-w-xl mx-auto mb-4" style={{ color: "#6B5340" }}>
              Your wedding day deserves nothing less than perfection. Our bridal experts craft looks that make you radiant, confident and unforgettable.
            </p>
            <div className="flex items-center justify-center gap-1 mb-8">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={14} style={{ color: "#B89B7A" }} className="fill-current" />
              ))}
              <span className="text-sm ml-2 font-light" style={{ color: "#8A6E52" }}>
                Trusted by 500+ brides
              </span>
            </div>
            <Link
              href="/booking"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase text-white"
              style={{ background: "linear-gradient(135deg, #6B5340, #8A6E52, #B89B7A)" }}
            >
              Book Bridal Consultation <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section ref={packRef} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={packInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
              Choose Your Package
            </p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: "#4E3D2F" }}>
              Bridal{" "}
              <em className="not-italic" style={{ color: "#8A6E52" }}>Packages</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bridalPackages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                className={`luxury-card rounded-2xl overflow-hidden border ${pkg.featured ? "ring-2 shadow-2xl" : ""}`}
                style={{
                  background: "#FDFCFA",
                  borderColor: pkg.featured ? "#B89B7A" : "rgba(214,194,174,0.2)",
                  transform: pkg.featured ? "scale(1.02)" : "scale(1)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={packInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.7 }}
              >
                {pkg.featured && (
                  <div
                    className="py-1.5 text-center text-[10px] tracking-[0.3em] uppercase font-medium"
                    style={{ background: "linear-gradient(90deg, #8A6E52, #B89B7A)", color: "#F8F6F2" }}
                  >
                    <Star size={9} className="inline mr-1 fill-current" /> Most Popular
                  </div>
                )}
                <div className="relative h-52 overflow-hidden">
                  <Image src={pkg.img} alt={pkg.name} fill className="object-cover" sizes="400px" />
                  <div
                    className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-widest"
                    style={{ background: "rgba(248,246,242,0.9)", color: pkg.color }}
                  >
                    {pkg.tag}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-2xl" style={{ color: "#4E3D2F" }}>{pkg.name}</h3>
                    <div className="text-right">
                      <p className="font-display text-xl font-bold" style={{ color: pkg.color }}>{pkg.price}</p>
                      <p className="text-[10px] uppercase tracking-widest" style={{ color: "#B89B7A" }}>{pkg.duration}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#6B5340" }}>
                        <Check size={12} className="mt-0.5 shrink-0" style={{ color: "#8A6E52" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/booking"
                    className="magnetic-btn block w-full py-3 rounded-xl text-sm font-medium tracking-widest uppercase text-center"
                    style={{
                      background: pkg.featured ? "linear-gradient(135deg, #6B5340, #8A6E52)" : "transparent",
                      color: pkg.featured ? "#F8F6F2" : "#6B5340",
                      border: pkg.featured ? "none" : "1px solid rgba(107,83,64,0.3)",
                    }}
                  >
                    Book This Package
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Bridal Services */}
      <section ref={preRef} className="py-20" style={{ background: "#EFE7DD" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={preInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
              Prepare in Advance
            </p>
            <h2 className="font-display text-4xl" style={{ color: "#4E3D2F" }}>
              Pre-Bridal{" "}
              <em className="not-italic" style={{ color: "#8A6E52" }}>Care</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {preBridalServices.map((s, i) => (
              <motion.div
                key={s.name}
                className="p-6 rounded-2xl border"
                style={{ background: "#FDFCFA", borderColor: "rgba(214,194,174,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={preInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-display text-lg" style={{ color: "#4E3D2F" }}>{s.name}</h4>
                  <span className="text-sm font-semibold" style={{ color: "#8A6E52" }}>{s.price}</span>
                </div>
                <p className="text-xs font-light mb-1" style={{ color: "#8A6E52" }}>{s.desc}</p>
                <p className="text-[10px] uppercase tracking-widest" style={{ color: "#B89B7A" }}>{s.sessions}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
