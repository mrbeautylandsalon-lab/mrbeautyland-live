"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref,{once:true,amount:0.2});

  return (
    <section ref={ref} className="py-24 md:py-32 relative overflow-hidden"
      style={{background:"linear-gradient(135deg,#4E3D2F 0%,#6B5340 40%,#8A6E52 100%)"}}>
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1.5' fill='%23EFE7DD'/%3E%3C/svg%3E")`,backgroundSize:"40px 40px"}} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{background:"#D6C2AE"}} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{opacity:0,y:35}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.8}}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{color:"rgba(214,194,174,0.7)"}}>Ready to Transform?</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight" style={{color:"#F8F6F2"}}>
            Book Your{" "}
            <em className="not-italic" style={{color:"#D6C2AE"}}>Luxury Experience</em>{" "}Today
          </h2>
          <p className="text-sm sm:text-base font-light mb-10 max-w-xl mx-auto leading-relaxed" style={{color:"rgba(239,231,221,0.8)"}}>
            Step into the world of luxury beauty. Our expert team is ready to transform your look.
          </p>
        </motion.div>

        <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{opacity:0,y:20}} animate={isInView?{opacity:1,y:0}:{}} transition={{delay:0.2,duration:0.7}}>
          <Link href="/booking"
            className="btn-primary w-full sm:w-auto"
            style={{background:"#F8F6F2",color:"#4E3D2F",boxShadow:"0 6px 24px rgba(0,0,0,0.2)"}}>
            <Calendar size={14}/> Book Appointment
          </Link>
          <a href="https://wa.me/+917073937995?text=Hello, I want to book an appointment at MR Beauty Land"
            target="_blank" rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto"
            style={{borderColor:"rgba(248,246,242,0.3)",color:"#EFE7DD",background:"rgba(255,255,255,0.08)"}}>
            <MessageCircle size={14}/> WhatsApp Us
          </a>
          <a href="tel:+917073937995"
            className="btn-outline w-full sm:w-auto"
            style={{borderColor:"rgba(248,246,242,0.3)",color:"#EFE7DD",background:"rgba(255,255,255,0.08)"}}>
            <Phone size={14}/> Call Now
          </a>
        </motion.div>

        {/* Hours */}
        <motion.div className="mt-12 inline-flex items-center gap-6 px-6 py-3 rounded-full"
          style={{background:"rgba(248,246,242,0.1)",border:"1px solid rgba(248,246,242,0.15)"}}
          initial={{opacity:0,y:16}} animate={isInView?{opacity:1,y:0}:{}} transition={{delay:0.4,duration:0.7}}>
          <div className="text-center">
            <p className="text-[9px] tracking-widest uppercase" style={{color:"rgba(214,194,174,0.7)"}}>Weekdays</p>
            <p className="text-sm font-medium" style={{color:"#EFE7DD"}}>10 AM – 8 PM</p>
          </div>
          <div className="h-8 w-px" style={{background:"rgba(214,194,174,0.3)"}} />
          <div className="text-center">
            <p className="text-[9px] tracking-widest uppercase" style={{color:"rgba(214,194,174,0.7)"}}>Sunday</p>
            <p className="text-sm font-medium" style={{color:"#EFE7DD"}}>11 AM – 6 PM</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
