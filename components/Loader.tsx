"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0);
  const particlesRef = useRef<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    particlesRef.current = Array.from({ length: 24 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }));

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2200);
    const t4 = setTimeout(() => setIsLoading(false), 3400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center flex-col overflow-hidden"
          style={{ background: "#F8F6F2" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Floating particles */}
          {particlesRef.current.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                background: `radial-gradient(circle, rgba(184,155,122,0.7), transparent)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={phase >= 1 ? {
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                y: [0, -60, -120],
              } : {}}
              transition={{
                duration: 3,
                delay: p.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Logo container */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={phase >= 1 ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Logo circle */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -15 }}
              animate={phase >= 1 ? {
                scale: phase >= 3 ? [1, 1.08, 20] : 1,
                rotate: 0,
                opacity: phase >= 3 ? [1, 1, 0] : 1,
              } : {}}
              transition={phase >= 3 ? {
                duration: 0.6,
                ease: [0.76, 0, 0.24, 1],
              } : {
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.1,
              }}
            >
              {/* Shimmer ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(184,155,122,0.6), transparent)",
                }}
                animate={phase >= 1 ? { rotate: 360 } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              {/* Logo image - using text fallback */}
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #2a2a2a, #000)",
                  border: "2px solid rgba(184,155,122,0.5)",
                  boxShadow: "0 0 40px rgba(184,155,122,0.2), inset 0 0 20px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="MR Beauty Land Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.removeAttribute("hidden");
                  }}
                />
                <span
                  className="font-display text-3xl font-bold hidden"
                  style={{ color: "#B89B7A" }}
                >
                  MR
                </span>
              </div>

              {/* Light sweep */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                }}
                animate={phase >= 1 ? { backgroundPosition: ["200% 200%", "-200% -200%"] } : {}}
                transition={{ duration: 1.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
              />
            </motion.div>

            {/* Brand name */}
            <motion.div
              className="text-center space-y-1"
              initial={{ opacity: 0, y: 20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <h1
                className="font-display text-3xl tracking-[0.2em] uppercase"
                style={{ color: "#8A6E52" }}
              >
                MR Beauty Land
              </h1>
              <div className="luxury-divider">
                <span
                  className="text-xs tracking-[0.4em] uppercase font-light"
                  style={{ color: "#B89B7A" }}
                >
                  Luxury &bull; Beauty &bull; Confidence
                </span>
              </div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              className="w-40 h-px overflow-hidden"
              style={{ background: "rgba(214,194,174,0.3)" }}
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full"
                style={{ background: "linear-gradient(90deg, #B89B7A, #D6C2AE, #B89B7A)" }}
                initial={{ x: "-100%" }}
                animate={phase >= 2 ? { x: "0%" } : {}}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
