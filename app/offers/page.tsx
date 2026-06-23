"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check, Star, Clock, Tag, Sparkles } from "lucide-react";

const memberships = [
  {
    name: "Silver",
    subtitle: "Perfect Start",
    price: "₹2,999",
    period: "/ month",
    color: "#8A6E52",
    bg: "#F8F6F2",
    features: [
      "2 Hair Services/month",
      "1 Cleanup/month",
      "10% off on all services",
      "Priority booking",
      "Welcome gift hamper",
    ],
    notIncluded: ["Bridal services", "Spa therapies"],
  },
  {
    name: "Gold",
    subtitle: "Most Popular",
    price: "₹5,999",
    period: "/ month",
    color: "#6B5340",
    bg: "#EFE7DD",
    featured: true,
    features: [
      "4 Hair Services/month",
      "2 Facials/month",
      "1 Spa session/month",
      "20% off on all services",
      "Priority booking",
      "Monthly skin analysis",
      "Exclusive member events",
    ],
    notIncluded: ["Bridal packages"],
  },
  {
    name: "Platinum",
    subtitle: "Ultimate Luxury",
    price: "₹9,999",
    period: "/ month",
    color: "#4E3D2F",
    bg: "#D6C2AE",
    features: [
      "Unlimited Hair Services",
      "4 Facials/month",
      "2 Spa sessions/month",
      "30% off on all services",
      "Bridal package discount",
      "Personal stylist assigned",
      "Home service available",
      "VIP lounge access",
      "Birthday special package",
    ],
    notIncluded: [],
  },
];

const specialOffers = [
  {
    tag: "Festival Special",
    title: "Diwali Glow Package",
    desc: "Complete glow facial + hair spa + nail art combo",
    original: "₹4,500",
    price: "₹2,999",
    discount: "33% OFF",
    validity: "Limited period offer",
  },
  {
    tag: "Bridal Season",
    title: "Pre-Bridal Package",
    desc: "6 sessions of skin prep, hair treatment & body polishing",
    original: "₹18,000",
    price: "₹12,999",
    discount: "28% OFF",
    validity: "Book 30 days in advance",
  },
  {
    tag: "Weekend Deal",
    title: "Sunday Relaxation",
    desc: "Full body massage + facial + hair wash & blow dry",
    original: "₹5,000",
    price: "₹3,499",
    discount: "30% OFF",
    validity: "Every Sunday only",
  },
  {
    tag: "Student Offer",
    title: "Campus Beauty",
    desc: "Haircut + cleanup + nail paint for students",
    original: "₹1,200",
    price: "₹799",
    discount: "34% OFF",
    validity: "Valid student ID required",
  },
];

export default function OffersPage() {
  const heroRef = useRef<HTMLElement>(null);
  const memberRef = useRef<HTMLElement>(null);
  const offersRef = useRef<HTMLElement>(null);
  const memberInView = useInView(memberRef, { once: true, amount: 0.1 });
  const offersInView = useInView(offersRef, { once: true, amount: 0.1 });

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      {/* Header */}
      <section
        ref={heroRef}
        className="py-20 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(180deg, #EFE7DD 0%, #F8F6F2 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238A6E52' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
            Exclusive Deals
          </p>
          <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#4E3D2F" }}>
            Offers &amp;{" "}
            <em className="not-italic" style={{ color: "#8A6E52" }}>
              Membership
            </em>
          </h1>
          <p className="text-base font-light max-w-xl mx-auto" style={{ color: "#6B5340" }}>
            Premium services at extraordinary value — join our exclusive membership or grab a limited deal
          </p>
        </motion.div>
      </section>

      {/* Membership Plans */}
      <section ref={memberRef} className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={memberInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
              Monthly Plans
            </p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: "#4E3D2F" }}>
              Luxury{" "}
              <em className="not-italic" style={{ color: "#8A6E52" }}>
                Membership
              </em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {memberships.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden border ${plan.featured ? "ring-2 shadow-2xl" : "shadow-md"}`}
                style={{
                  background: plan.bg,
                  borderColor: plan.featured ? "#B89B7A" : "rgba(214,194,174,0.3)",
                  ringColor: "#B89B7A",
                  transform: plan.featured ? "scale(1.03)" : "scale(1)",
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={memberInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              >
                {plan.featured && (
                  <div
                    className="absolute top-0 left-0 right-0 py-1.5 text-center text-[10px] tracking-[0.3em] uppercase font-medium"
                    style={{ background: "linear-gradient(90deg, #8A6E52, #B89B7A)", color: "#F8F6F2" }}
                  >
                    <Star size={10} className="inline mr-1 fill-current" />
                    Most Popular
                  </div>
                )}

                <div className={`p-8 ${plan.featured ? "pt-12" : ""}`}>
                  <div className="mb-6">
                    <p className="text-[10px] tracking-[0.3em] uppercase mb-1" style={{ color: "#B89B7A" }}>
                      {plan.subtitle}
                    </p>
                    <h3 className="font-display text-3xl font-bold mb-4" style={{ color: plan.color }}>
                      {plan.name}
                    </h3>
                    <div className="flex items-end gap-1">
                      <span className="font-display text-4xl font-bold" style={{ color: "#4E3D2F" }}>
                        {plan.price}
                      </span>
                      <span className="text-sm font-light mb-1" style={{ color: "#8A6E52" }}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div
                    className="h-px w-full mb-6"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(184,155,122,0.4), transparent)" }}
                  />

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "linear-gradient(135deg, #8A6E52, #B89B7A)" }}
                        >
                          <Check size={9} className="text-white" strokeWidth={3} />
                        </div>
                        <span className="text-sm font-light" style={{ color: "#4E3D2F" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <li key={f} className="flex items-start gap-3 opacity-40">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border"
                          style={{ borderColor: "#B89B7A" }}
                        />
                        <span className="text-sm font-light line-through" style={{ color: "#8A6E52" }}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="magnetic-btn block w-full py-3.5 rounded-xl text-sm font-medium tracking-widest uppercase text-center"
                    style={{
                      background: plan.featured
                        ? "linear-gradient(135deg, #6B5340, #8A6E52)"
                        : "transparent",
                      color: plan.featured ? "#F8F6F2" : "#6B5340",
                      border: plan.featured ? "none" : "1px solid rgba(107,83,64,0.3)",
                    }}
                  >
                    Get {plan.name} Plan
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section ref={offersRef} className="py-20 md:py-28" style={{ background: "#EFE7DD" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }}
            animate={offersInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
              Limited Time
            </p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: "#4E3D2F" }}>
              Special{" "}
              <em className="not-italic" style={{ color: "#8A6E52" }}>
                Offers
              </em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialOffers.map((offer, i) => (
              <motion.div
                key={offer.title}
                className="luxury-card p-6 md:p-8 rounded-2xl border flex flex-col md:flex-row gap-5 items-start"
                style={{ background: "#FDFCFA", borderColor: "rgba(214,194,174,0.25)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={offersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: "linear-gradient(135deg, #D6C2AE, #B89B7A)" }}
                >
                  <Sparkles size={22} style={{ color: "#4E3D2F" }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: "rgba(184,155,122,0.15)", color: "#8A6E52" }}
                    >
                      <Tag size={8} className="inline mr-1" />
                      {offer.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl mb-1" style={{ color: "#4E3D2F" }}>
                    {offer.title}
                  </h3>
                  <p className="text-sm font-light mb-3 leading-relaxed" style={{ color: "#8A6E52" }}>
                    {offer.desc}
                  </p>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-2xl font-bold" style={{ color: "#6B5340" }}>
                      {offer.price}
                    </span>
                    <span className="text-sm line-through font-light" style={{ color: "#B89B7A" }}>
                      {offer.original}
                    </span>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded"
                      style={{ background: "rgba(138,110,82,0.1)", color: "#6B5340" }}
                    >
                      {offer.discount}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={11} style={{ color: "#B89B7A" }} />
                    <span className="text-xs" style={{ color: "#B89B7A" }}>{offer.validity}</span>
                  </div>

                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-medium tracking-widest uppercase border"
                    style={{ borderColor: "rgba(138,110,82,0.3)", color: "#6B5340" }}
                  >
                    Claim Offer
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 text-center"
        style={{ background: "linear-gradient(135deg, #4E3D2F, #8A6E52)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display text-3xl md:text-4xl mb-4" style={{ color: "#F8F6F2" }}>
            Not Sure Which Plan?
          </h2>
          <p className="text-sm font-light mb-8" style={{ color: "rgba(239,231,221,0.8)" }}>
            Call us and our team will help you choose the best option
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/booking"
              className="px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase"
              style={{ background: "#F8F6F2", color: "#4E3D2F" }}
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+91XXXXXXXXXX"
              className="px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase border"
              style={{ borderColor: "rgba(248,246,242,0.3)", color: "#EFE7DD" }}
            >
              Call Us Now
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
