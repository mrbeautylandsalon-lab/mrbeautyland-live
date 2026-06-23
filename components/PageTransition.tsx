"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ── Scissor SVG paths ── */
function ScissorIcon({ flip = false, progress = 0 }: { flip?: boolean; progress?: number }) {
  const angle = flip ? -progress * 35 : progress * 35;
  return (
    <svg
      width="80" height="80" viewBox="0 0 80 80" fill="none"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      {/* Blade 1 */}
      <motion.g style={{ transformOrigin: "28px 40px", rotate: -angle }}>
        <path
          d="M28 40 L72 18"
          stroke="#B89B7A" strokeWidth="3" strokeLinecap="round"
        />
        <circle cx="20" cy="40" r="8" stroke="#B89B7A" strokeWidth="2.5" fill="#F8F6F2" />
        <circle cx="20" cy="40" r="3" fill="#B89B7A" />
      </motion.g>
      {/* Blade 2 */}
      <motion.g style={{ transformOrigin: "28px 40px", rotate: angle }}>
        <path
          d="M28 40 L72 62"
          stroke="#8A6E52" strokeWidth="3" strokeLinecap="round"
        />
        <circle cx="20" cy="40" r="8" stroke="#8A6E52" strokeWidth="2.5" fill="#F8F6F2" />
        <circle cx="20" cy="40" r="3" fill="#8A6E52" />
      </motion.g>
      {/* Screw */}
      <circle cx="28" cy="40" r="3" fill="#D6C2AE" />
    </svg>
  );
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname  = usePathname();
  const [show,    setShow]    = useState(false);
  const [cutting, setCutting] = useState(false);
  const [prog,    setProg]    = useState(0);
  const prevPath  = useRef(pathname);
  const rafRef    = useRef<number>();

  useEffect(() => {
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    /* Start transition */
    setShow(true);
    setCutting(false);
    setProg(0);

    /* Animate scissors opening → cutting → closing */
    let start: number | null = null;
    const duration = 900;

    const animate = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      setProg(p);

      /* Cutting motion: open 0→0.4, cut 0.4→0.7, close 0.7→1 */
      if (p < 0.4) {
        setCutting(false);
      } else if (p < 0.7) {
        setCutting(true);
      } else {
        setCutting(false);
      }

      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setShow(false), 150);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [pathname]);

  /* Scissor open angle: 0→1 maps 0→35 deg open, then closes */
  const bladeAngle =
    prog < 0.4 ? (prog / 0.4) * 35
    : prog < 0.7 ? 35 - ((prog - 0.4) / 0.3) * 35
    : 0;

  /* Horizontal travel: scissor slides left→right across screen */
  const xPos = `${prog * 110 - 5}%`;

  return (
    <>
      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Scissor overlay */}
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Cut line — horizontal */}
            <motion.div
              className="absolute top-1/2 left-0 right-0 -translate-y-1/2"
              style={{ height: 1 }}
              initial={{ scaleX: 0, transformOrigin: "left center" }}
              animate={{ scaleX: prog }}
              transition={{ duration: 0 }}
            >
              <div
                className="w-full h-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(184,155,122,0.4), transparent)",
                }}
              />
            </motion.div>

            {/* Top slice — slides up */}
            {cutting && (
              <motion.div
                className="absolute inset-x-0 top-0"
                style={{
                  height: "50%",
                  background: "rgba(248,246,242,0.15)",
                  backdropFilter: "blur(2px)",
                  borderBottom: "1px solid rgba(184,155,122,0.3)",
                }}
                animate={{ y: cutting ? -4 : 0 }}
                transition={{ duration: 0.15 }}
              />
            )}

            {/* Scissors icon — slides across */}
            <div
              className="absolute top-1/2 -translate-y-1/2 flex items-center gap-0"
              style={{ left: xPos, transform: `translate(-50%, -50%)` }}
            >
              {/* Left scissors */}
              <motion.div
                animate={{ rotate: cutting ? [0, -5, 0] : 0 }}
                transition={{ duration: 0.12, repeat: cutting ? 3 : 0 }}
              >
                <ScissorIcon progress={bladeAngle} />
              </motion.div>

              {/* Sparkle on cut point */}
              {cutting && (
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [0, 1, 0] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: "radial-gradient(circle, #B89B7A, transparent)" }}
                  />
                </motion.div>
              )}
            </div>

            {/* Snip particles */}
            {cutting && Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: xPos,
                  top: "50%",
                  width: 3 + (i % 3),
                  height: 3 + (i % 3),
                  background: "#B89B7A",
                  opacity: 0.7,
                }}
                animate={{
                  x: (i % 2 === 0 ? 1 : -1) * (20 + i * 8),
                  y: (i < 3 ? -1 : 1) * (15 + i * 6),
                  opacity: 0,
                  scale: 0,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
