"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 text-center"
      style={{ background: "#F8F6F2" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-display text-8xl font-bold mb-4" style={{ color: "rgba(184,155,122,0.3)" }}>
          404
        </p>
        <h1 className="font-display text-3xl md:text-4xl mb-4" style={{ color: "#4E3D2F" }}>
          Page Not Found
        </h1>
        <p className="text-base font-light mb-8 max-w-sm mx-auto" style={{ color: "#8A6E52" }}>
          The page you are looking for does not exist. Let us take you back to the luxury experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase"
            style={{ background: "linear-gradient(135deg, #8A6E52, #B89B7A)", color: "#F8F6F2" }}
          >
            Back to Home
          </Link>
          <Link
            href="/booking"
            className="px-8 py-3.5 rounded-full text-sm font-medium tracking-widest uppercase border"
            style={{ borderColor: "rgba(138,110,82,0.3)", color: "#6B5340" }}
          >
            Book Appointment
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
