"use client";

import { useEffect, useRef } from "react";

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    const COLORS = [
      "rgba(184,155,122,0.35)",
      "rgba(214,194,174,0.3)",
      "rgba(138,110,82,0.25)",
      "rgba(239,231,221,0.5)",
      "rgba(248,246,242,0.4)",
    ];

    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      const size = 3 + Math.random() * 5;
      const left = Math.random() * 100;
      const dur  = 8 + Math.random() * 14;
      const del  = Math.random() * 12;

      p.style.cssText = `
        position: fixed;
        left: ${left}%;
        bottom: -20px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        pointer-events: none;
        z-index: 0;
        animation: floatUp ${dur}s ${del}s linear infinite;
        will-change: transform;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => { particles.forEach(p => p.remove()); };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
