"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 2000, suffix: "+", label: "Happy Clients", desc: "Satisfied clients trust us" },
  { value: 50, suffix: "+", label: "Services", desc: "Premium beauty services" },
  { value: 5, suffix: "+", label: "Years Experience", desc: "Expert professionals" },
  { value: 98, suffix: "%", label: "Satisfaction Rate", desc: "Client happiness score" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #4E3D2F 0%, #6B5340 50%, #8A6E52 100%)" }}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D6C2AE' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map(({ value, suffix, label, desc }, i) => (
            <motion.div
              key={label}
              className="text-center"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="font-display text-4xl md:text-5xl font-bold mb-1"
                style={{ color: "#EFE7DD" }}
              >
                <Counter target={value} suffix={suffix} />
              </div>
              <div
                className="text-sm font-medium tracking-wider uppercase mb-1"
                style={{ color: "#D6C2AE" }}
              >
                {label}
              </div>
              <div
                className="text-xs font-light"
                style={{ color: "rgba(214,194,174,0.6)" }}
              >
                {desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
