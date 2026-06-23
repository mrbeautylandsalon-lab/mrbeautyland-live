"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, Heart, Users, Sparkles } from "lucide-react";

const timeline = [
  { year: "2018", title: "The Beginning", desc: "MR Beauty Land was founded with a vision to bring world-class luxury beauty services to Jaipur." },
  { year: "2019", title: "Expanding Services", desc: "Launched bridal and spa services, quickly becoming the go-to salon for brides across Rajasthan." },
  { year: "2021", title: "Premium Upgrade", desc: "Renovated our space with a luxury salon interior and onboarded internationally trained professionals." },
  { year: "2023", title: "2000+ Happy Clients", desc: "Crossed the milestone of 2000 satisfied clients and expanded our team of expert beauticians." },
  { year: "2024", title: "Award Winning", desc: "Recognized as Jaipur's Best Luxury Salon by local beauty awards and media." },
];

const team = [
  { name: "Meena Rajput", role: "Master Hair Stylist", exp: "10 years experience", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Priya Verma", role: "Senior Makeup Artist", exp: "8 years experience", img: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400&q=80" },
  { name: "Sunita Sharma", role: "Skin Care Specialist", exp: "7 years experience", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Kavita Agarwal", role: "Bridal Expert", exp: "12 years experience", img: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=80" },
];

export default function AboutPage() {
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const timelineInView = useInView(timelineRef, { once: true, amount: 0.1 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.1 });

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      {/* Hero */}
      <section className="py-16 md:py-24" style={{ background: "linear-gradient(180deg, #EFE7DD 0%, #F8F6F2 100%)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>Our Story</p>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight" style={{ color: "#4E3D2F" }}>
                About <em className="not-italic" style={{ color: "#8A6E52" }}>MR Beauty Land</em>
              </h1>
              <p className="text-base font-light leading-relaxed mb-6" style={{ color: "#6B5340" }}>
                Born from a passion for beauty and luxury, MR Beauty Land was founded with one simple mission: to make every woman feel like royalty. We believe that beauty is not just about looking good — it is about feeling confident, radiant and empowered.
              </p>
              <p className="text-base font-light leading-relaxed mb-8" style={{ color: "#6B5340" }}>
                Our salon combines expert technique with the finest products and a warm, welcoming atmosphere to deliver an experience that goes beyond just a service. Every visit is a journey of self-care and luxury.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Award, label: "Award Winning Salon" },
                  { icon: Heart, label: "Trusted by 2000+ Clients" },
                  { icon: Users, label: "Expert Professional Team" },
                  { icon: Sparkles, label: "Luxury Beauty Products" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #D6C2AE, #B89B7A)" }}>
                      <Icon size={14} style={{ color: "#4E3D2F" }} />
                    </div>
                    <span className="text-xs font-medium" style={{ color: "#6B5340" }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative h-[480px] hidden lg:block"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="absolute top-0 right-0 w-72 h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80" alt="Salon" fill className="object-cover" sizes="288px" />
              </div>
              <div className="absolute bottom-0 left-0 w-60 h-64 rounded-2xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" alt="Stylist" fill className="object-cover" sizes="240px" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24" style={{ background: "#F8F6F2" }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={timelineInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>Our Journey</p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: "#4E3D2F" }}>Our <em className="not-italic" style={{ color: "#8A6E52" }}>Story</em></h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(180deg, transparent, #D6C2AE, transparent)" }} />
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                initial={{ opacity: 0, y: 30 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.6 }}
              >
                <div className="w-16 md:w-1/2 md:text-right">
                  {i % 2 === 0 && (
                    <div className="hidden md:block">
                      <p className="font-display text-3xl font-bold" style={{ color: "#B89B7A" }}>{item.year}</p>
                      <h3 className="font-medium text-base" style={{ color: "#4E3D2F" }}>{item.title}</h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: "#8A6E52" }}>{item.desc}</p>
                    </div>
                  )}
                  {i % 2 !== 0 && <div className="hidden md:block" />}
                </div>

                <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10" style={{ background: "linear-gradient(135deg, #8A6E52, #B89B7A)" }} />

                <div className="ml-16 md:ml-0 md:w-1/2 md:text-left">
                  {i % 2 !== 0 && (
                    <div className="hidden md:block">
                      <p className="font-display text-3xl font-bold" style={{ color: "#B89B7A" }}>{item.year}</p>
                      <h3 className="font-medium text-base" style={{ color: "#4E3D2F" }}>{item.title}</h3>
                      <p className="text-sm font-light leading-relaxed" style={{ color: "#8A6E52" }}>{item.desc}</p>
                    </div>
                  )}
                  <div className="md:hidden">
                    <p className="font-display text-2xl font-bold" style={{ color: "#B89B7A" }}>{item.year}</p>
                    <h3 className="font-medium text-sm" style={{ color: "#4E3D2F" }}>{item.title}</h3>
                    <p className="text-xs font-light leading-relaxed" style={{ color: "#8A6E52" }}>{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24" style={{ background: "#EFE7DD" }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>Meet The Team</p>
            <h2 className="font-display text-4xl md:text-5xl" style={{ color: "#4E3D2F" }}>Our <em className="not-italic" style={{ color: "#8A6E52" }}>Experts</em></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                className="luxury-card text-center rounded-2xl overflow-hidden border"
                style={{ background: "#FDFCFA", borderColor: "rgba(214,194,174,0.2)" }}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="relative h-52 overflow-hidden">
                  <Image src={member.img} alt={member.name} fill className="object-cover" sizes="250px" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg mb-1" style={{ color: "#4E3D2F" }}>{member.name}</h3>
                  <p className="text-xs font-medium tracking-wider uppercase mb-1" style={{ color: "#8A6E52" }}>{member.role}</p>
                  <p className="text-xs font-light" style={{ color: "#B89B7A" }}>{member.exp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
