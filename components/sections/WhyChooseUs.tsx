"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, Users, Leaf, Clock, Star, Shield } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Expert Professionals",
    desc: "Certified stylists with years of international training and expertise",
  },
  {
    icon: Leaf,
    title: "Premium Products",
    desc: "We use only top-tier, skin-safe products for all our services",
  },
  {
    icon: Users,
    title: "Personalized Care",
    desc: "Every service is tailored to your unique needs and preferences",
  },
  {
    icon: Clock,
    title: "Punctual Service",
    desc: "We respect your time with prompt, efficient and exceptional service",
  },
  {
    icon: Star,
    title: "Luxury Experience",
    desc: "Premium ambiance and hospitality from the moment you walk in",
  },
  {
    icon: Shield,
    title: "Hygiene First",
    desc: "Strict sanitization protocols for your complete safety and comfort",
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#EFE7DD" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image collage */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="relative h-[600px]">
              {/* Large image */}
              <div className="absolute top-0 left-0 w-64 h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80"
                  alt="Salon service"
                  fill
                  className="object-cover"
                  sizes="256px"
                />
              </div>
              {/* Small image */}
              <div className="absolute top-16 right-0 w-52 h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80"
                  alt="Beauty treatment"
                  fill
                  className="object-cover"
                  sizes="208px"
                />
              </div>
              {/* Bottom image */}
              <div className="absolute bottom-0 left-12 w-60 h-52 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&q=80"
                  alt="Nail service"
                  fill
                  className="object-cover"
                  sizes="240px"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute right-4 bottom-20 glass rounded-2xl p-4 shadow-xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #8A6E52, #B89B7A)" }}
                  >
                    <Star size={16} className="text-white fill-white" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold" style={{ color: "#4E3D2F" }}>4.9</div>
                    <div className="text-[10px] tracking-wider uppercase" style={{ color: "#8A6E52" }}>
                      Google Rating
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p
                className="text-xs tracking-[0.4em] uppercase mb-3"
                style={{ color: "#B89B7A" }}
              >
                Why Choose Us
              </p>
              <h2
                className="font-display text-4xl md:text-5xl leading-tight mb-4"
                style={{ color: "#4E3D2F" }}
              >
                The Art of{" "}
                <em className="not-italic" style={{ color: "#8A6E52" }}>
                  Luxury Beauty
                </em>
              </h2>
              <p
                className="text-base font-light leading-relaxed"
                style={{ color: "#6B5340" }}
              >
                At MR Beauty Land, we combine expert technique with premium products and a luxurious environment to deliver an unparalleled beauty experience.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:shadow-md cursor-default group"
                  style={{ background: "rgba(248,246,242,0.6)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                  whileHover={{ y: -2, background: "rgba(248,246,242,0.95)" }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #D6C2AE, #B89B7A)" }}
                  >
                    <f.icon size={18} style={{ color: "#4E3D2F" }} />
                  </div>
                  <div>
                    <h4
                      className="font-medium text-sm mb-1"
                      style={{ color: "#4E3D2F" }}
                    >
                      {f.title}
                    </h4>
                    <p
                      className="text-xs font-light leading-relaxed"
                      style={{ color: "#8A6E52" }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
