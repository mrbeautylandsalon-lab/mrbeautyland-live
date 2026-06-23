"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

const hairServices = [
  {
    name: "Hair Cut & Styling",
    price: "₹500 onwards",
    duration: "45 min",
    img: "https://images.unsplash.com/photo-1487412947147-5cebf96e9e5a?w=600&q=80",
    desc: "Expert cut tailored to your face shape, lifestyle and hair texture. Includes wash, cut, blow dry.",
    includes: ["Consultation", "Hair wash", "Cut & style", "Blow dry finish"],
  },
  {
    name: "Hair Color & Highlights",
    price: "₹1,500 onwards",
    duration: "2-3 hrs",
    img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    desc: "Global color, balayage, ombre and highlights using premium international color brands.",
    includes: ["Color consultation", "Patch test", "Professional coloring", "Toner & treatment"],
  },
  {
    name: "Keratin Treatment",
    price: "₹3,000 onwards",
    duration: "3-4 hrs",
    img: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=600&q=80",
    desc: "Say goodbye to frizz with our premium keratin smoothing treatment. Results last 3-4 months.",
    includes: ["Deep cleanse shampoo", "Keratin application", "Heat sealing", "Finishing serum"],
  },
  {
    name: "Hair Spa",
    price: "₹800 onwards",
    duration: "60 min",
    img: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80",
    desc: "Deeply nourishing spa treatment for damaged, dry or color-treated hair. Restores shine and softness.",
    includes: ["Scalp analysis", "Oil massage", "Steam treatment", "Deep conditioning"],
  },
  {
    name: "Smoothening / Rebonding",
    price: "₹2,500 onwards",
    duration: "3-4 hrs",
    img: "https://images.unsplash.com/photo-1634309329985-aa4f5c38c8e5?w=600&q=80",
    desc: "Permanent hair straightening for pin-straight, frizz-free hair with long lasting results.",
    includes: ["Pre-treatment", "Straightening cream", "Heat processing", "Neutralizer & serum"],
  },
  {
    name: "Balayage & Ombre",
    price: "₹3,500 onwards",
    duration: "3-4 hrs",
    img: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&q=80",
    desc: "Artistic freehand coloring techniques for a natural, sun-kissed and dimensional hair look.",
    includes: ["Technique consultation", "Freehand painting", "Toning", "Gloss treatment"],
  },
];

export default function HairServicesPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=80"
            alt="Hair salon"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(135deg, rgba(248,246,242,0.92), rgba(214,194,174,0.7))" }}
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
              Expert Stylists
            </p>
            <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#4E3D2F" }}>
              Hair{" "}
              <em className="not-italic" style={{ color: "#8A6E52" }}>Services</em>
            </h1>
            <p className="text-base font-light max-w-xl mx-auto mb-8" style={{ color: "#6B5340" }}>
              From precision cuts to transformative color — our master stylists craft your perfect look
            </p>
            <Link
              href="/booking"
              className="magnetic-btn inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase text-white"
              style={{ background: "linear-gradient(135deg, #6B5340, #8A6E52, #B89B7A)" }}
            >
              Book Hair Appointment <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section ref={ref} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hairServices.map((s, i) => (
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
                  <div className="flex items-start justify-between mb-2">
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
                  <Link
                    href="/booking"
                    className="flex items-center gap-2 text-xs font-medium tracking-wider uppercase"
                    style={{ color: "#B89B7A" }}
                  >
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
