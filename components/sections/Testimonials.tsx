"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Bridal Client",
    text: "My bridal makeover at MR Beauty Land was absolutely breathtaking. The team understood exactly what I wanted and delivered beyond my expectations. Every guest was asking about my makeup artist!",
    rating: 5,
    service: "Bridal Makeup",
  },
  {
    name: "Sunita Agarwal",
    role: "Regular Client",
    text: "I have been coming here for 3 years now. The hair treatments are exceptional and the staff is so warm and professional. It truly feels like a luxury experience every single time.",
    rating: 5,
    service: "Hair Treatment",
  },
  {
    name: "Kavya Mehta",
    role: "Skin Care Client",
    text: "The skin glow facial changed my skin completely. The aesthetician was so knowledgeable and personalized everything for my skin type. My friends cannot stop complimenting my glow!",
    rating: 5,
    service: "Glow Facial",
  },
  {
    name: "Ritu Bansal",
    role: "Spa Client",
    text: "The spa experience here is world class. The moment you walk in you feel relaxed. The body massage was therapeutic and I left feeling completely rejuvenated. Highly recommended!",
    rating: 5,
    service: "Spa Therapy",
  },
  {
    name: "Anita Joshi",
    role: "Hair Color Client",
    text: "Got balayage done here and I am absolutely in love with the result. The colorist is a true artist. The color looks so natural yet so stunning. Will definitely come back!",
    rating: 5,
    service: "Hair Color",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const visible = [
    testimonials[(current) % testimonials.length],
    testimonials[(current + 1) % testimonials.length],
    testimonials[(current + 2) % testimonials.length],
  ];

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#F8F6F2" }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%238A6E52' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='40' cy='40' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
            Client Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "#4E3D2F" }}>
            What Our Clients{" "}
            <em className="not-italic" style={{ color: "#8A6E52" }}>
              Say
            </em>
          </h2>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
              {visible.map((t, i) => (
                <motion.div
                  key={`${current}-${i}`}
                  className="relative p-8 rounded-2xl border"
                  style={{
                    background: i === 1 ? "#EFE7DD" : "#FDFCFA",
                    borderColor: i === 1 ? "rgba(184,155,122,0.4)" : "rgba(214,194,174,0.2)",
                    transform: i === 1 ? "scale(1.02)" : "scale(1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                >
                  <Quote
                    size={28}
                    className="mb-4 opacity-20"
                    style={{ color: "#B89B7A" }}
                  />
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={12} className="fill-current" style={{ color: "#B89B7A" }} />
                    ))}
                  </div>
                  <p
                    className="text-sm font-light leading-relaxed mb-6"
                    style={{ color: "#6B5340" }}
                  >
                    {t.text}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
                      style={{
                        background: "linear-gradient(135deg, #D6C2AE, #B89B7A)",
                        color: "#4E3D2F",
                      }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#4E3D2F" }}>{t.name}</p>
                      <p className="text-xs font-light" style={{ color: "#B89B7A" }}>{t.service}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "rgba(184,155,122,0.3)",
                color: "#8A6E52",
              }}
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: current === i ? 20 : 6,
                    height: 6,
                    background: current === i ? "#8A6E52" : "rgba(184,155,122,0.4)",
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:shadow-md"
              style={{
                borderColor: "rgba(184,155,122,0.3)",
                color: "#8A6E52",
              }}
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
