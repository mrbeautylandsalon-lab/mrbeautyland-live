"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Reveal on scroll hook
export function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  return { ref, isInView };
}

// Stagger children variants
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const scaleVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
  },
};

export const slideLeftVariant = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

export const slideRightVariant = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

// Section label component data
export const sectionLabelStyle = {
  fontSize: "11px",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "#B89B7A",
  fontFamily: "Jost, sans-serif",
  fontWeight: 400,
};
