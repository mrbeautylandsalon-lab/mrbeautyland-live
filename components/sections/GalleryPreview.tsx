"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn, ArrowRight } from "lucide-react";

// ── YOUR 6 images from /public/images/gallery/ ──
const IMAGES = [
  {src:"/images/gallery/g1.jpg",alt:"MR Beauty Land"},
  {src:"/images/gallery/g2.jpg",alt:"MR Beauty Land"},
  {src:"/images/gallery/g3.jpg",alt:"MR Beauty Land"},
  {src:"/images/gallery/g4.jpg",alt:"MR Beauty Land"},
  {src:"/images/gallery/g5.jpg",alt:"MR Beauty Land"},
  {src:"/images/gallery/g6.jpg",alt:"MR Beauty Land"},
];

export default function GalleryPreview() {
  const ref      = useRef<HTMLElement>(null);
  const isInView = useInView(ref,{once:true,amount:0.1});
  const [lb, setLb] = useState<null|typeof IMAGES[0]>(null);

  return (
    <section ref={ref} className="py-20 md:py-28" style={{background:"#EFE7DD"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div className="text-center mb-12" initial={{opacity:0,y:25}} animate={isInView?{opacity:1,y:0}:{}} transition={{duration:0.7}}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{color:"#B89B7A"}}>Our Work</p>
          <h2 className="font-display text-4xl sm:text-5xl" style={{color:"#3D2E22"}}>
            Beauty <em className="not-italic" style={{color:"#8A6E52"}}>Gallery</em>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {IMAGES.map((img,i)=>(
            <motion.div
              key={i}
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{aspectRatio: i===0||i===3 ? "3/4" : "4/3"}}
              initial={{opacity:0,scale:0.94}}
              animate={isInView?{opacity:1,scale:1}:{}}
              transition={{delay:i*0.08,duration:0.55}}
              onClick={()=>setLb(img)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 50vw,33vw" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{background:"rgba(61,46,34,0.45)"}}>
                <ZoomIn size={22} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="text-center mt-9" initial={{opacity:0}} animate={isInView?{opacity:1}:{}} transition={{delay:0.5}}>
          <Link href="/gallery" className="btn-outline">View Full Gallery</Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {lb && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:"rgba(25,16,8,0.95)"}}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setLb(null)}>
            <motion.div className="relative max-w-3xl w-full" initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.85,opacity:0}} onClick={e=>e.stopPropagation()}>
              <div className="rounded-2xl overflow-hidden" style={{position:"relative",aspectRatio:"4/3"}}>
                <Image src={lb.src} alt={lb.alt} fill className="object-cover" sizes="1000px" />
              </div>
              <button onClick={()=>setLb(null)} className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center" style={{background:"#F8F6F2",color:"#3D2E22"}} aria-label="Close">
                <X size={16}/>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
