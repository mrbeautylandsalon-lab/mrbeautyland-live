"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Tag, Clock, Star } from "lucide-react";

const offers = [
  {
    badge: "Limited Time",
    title: "Bridal Season Special",
    desc: "Complete bridal package with makeup, hair, mehendi and skin prep",
    discount: "20% OFF",
    original: "₹25,000",
    price: "₹20,000",
    validity: "Valid till December 2025",
    color: "#8A6E52",
    bg: "#F8F6F2",
  },
  {
    badge: "New Member",
    title: "First Visit Package",
    desc: "Haircut + Facial + Manicure bundle exclusively for first-time clients",
    discount: "30% OFF",
    original: "₹2,500",
    price: "₹1,750",
    validity: "For new clients only",
    color: "#6B5340",
    bg: "#EFE7DD",
    featured: true,
  },
  {
    badge: "Monthly",
    title: "Glow Membership",
    desc: "Monthly skin care routine with 4 sessions — glow all year round",
    discount: "25% OFF",
    original: "₹8,000",
    price: "₹6,000",
    validity: "Monthly plan",
    color: "#4E3D2F",
    bg: "#D6C2AE",
  },
];

export default function Offers() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#F8F6F2" }}
    >
      {/* Decorative circles */}
      <div
        className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #D6C2AE, transparent)" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, #B89B7A, transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
            Special Offers
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "#4E3D2F" }}>
            Exclusive{" "}
            <em className="not-italic" style={{ color: "#8A6E52" }}>
              Deals
            </em>
          </h2>
          <p className="text-base font-light" style={{ color: "#6B5340" }}>
            Premium services at extraordinary prices — limited time offers
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.title}
              className={`luxury-card relative rounded-2xl overflow-hidden p-8 border ${
                offer.featured ? "ring-2" : ""
              }`}
              style={{
                background: offer.bg,
                borderColor: "rgba(184,155,122,0.2)",
              
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              {offer.featured && (
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase flex items-center gap-1"
                  style={{ background: "#8A6E52", color: "#F8F6F2" }}
                >
                  <Star size={10} className="fill-current" />
                  Best Value
                </div>
              )}

              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] tracking-widest uppercase mb-5"
                style={{ background: "rgba(184,155,122,0.15)", color: offer.color }}
              >
                <Tag size={10} />
                {offer.badge}
              </div>

              <h3 className="font-display text-2xl mb-2" style={{ color: "#4E3D2F" }}>
                {offer.title}
              </h3>
              <p className="text-sm font-light mb-6 leading-relaxed" style={{ color: "#8A6E52" }}>
                {offer.desc}
              </p>

              <div className="flex items-end gap-3 mb-4">
                <span className="font-display text-3xl font-bold" style={{ color: offer.color }}>
                  {offer.price}
                </span>
                <span className="text-sm line-through mb-1 font-light" style={{ color: "#B89B7A" }}>
                  {offer.original}
                </span>
                <span
                  className="text-sm font-semibold mb-1 px-2 py-0.5 rounded"
                  style={{ background: "rgba(138,110,82,0.1)", color: "#6B5340" }}
                >
                  {offer.discount}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: "#B89B7A" }}>
                <Clock size={12} />
                <span>{offer.validity}</span>
              </div>

              <Link
                href="/booking"
                className="btn-primary"
              >
                Claim Offer
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
