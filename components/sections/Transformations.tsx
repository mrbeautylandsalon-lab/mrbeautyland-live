"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const transformations = [
  {
    label: "Hair Color Transformation",
    before: "https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600&q=80",
    after: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  },
  {
    label: "Skin Glow Treatment",
    before: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80",
    after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
  },
  {
    label: "Bridal Makeover",
    before: "https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80",
    after: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
  },
];

function BeforeAfterSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPos(pct);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-center tracking-wide" style={{ color: "#6B5340" }}>
        {label}
      </p>
      <div
        ref={containerRef}
        className="relative h-72 rounded-2xl overflow-hidden cursor-col-resize select-none"
        onMouseMove={(e) => { if (dragging.current) updatePos(e.clientX); }}
        onMouseDown={() => { dragging.current = true; }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchMove={(e) => updatePos(e.touches[0].clientX)}
      >
        {/* Before image */}
        <div className="absolute inset-0">
          <Image src={before} alt="Before" fill className="object-cover" sizes="400px" />
          <div className="absolute top-3 left-3 px-2 py-1 rounded text-[10px] uppercase tracking-widest"
            style={{ background: "rgba(78,61,47,0.7)", color: "#EFE7DD" }}>
            Before
          </div>
        </div>

        {/* After image */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image src={after} alt="After" fill className="object-cover" sizes="400px" />
          <div className="absolute top-3 right-3 px-2 py-1 rounded text-[10px] uppercase tracking-widest"
            style={{ background: "rgba(138,110,82,0.8)", color: "#F8F6F2" }}>
            After
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 z-10"
          style={{ left: `${pos}%`, background: "#B89B7A" }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            style={{ background: "#B89B7A" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5 8L2 5M2 5L5 2M2 5H14M11 8L14 5M14 5L11 2" stroke="#F8F6F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-center tracking-widest uppercase" style={{ color: "#B89B7A" }}>
        Drag to compare
      </p>
    </div>
  );
}

export default function Transformations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#EFE7DD" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>
            Real Results
          </p>
          <h2 className="font-display text-4xl md:text-5xl mb-4" style={{ color: "#4E3D2F" }}>
            Before &amp;{" "}
            <em className="not-italic" style={{ color: "#8A6E52" }}>
              After
            </em>
          </h2>
          <p className="text-base font-light" style={{ color: "#6B5340" }}>
            Witness the magic of our expert transformations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {transformations.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <BeforeAfterSlider {...t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
