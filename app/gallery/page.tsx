"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

// ── YOUR 6 IMAGES ── put g1.jpg–g6.jpg in /public/images/gallery/
const IMAGES = [
  { src:"/images/gallery/g1.jpg", alt:"MR Beauty Land – Service 1", span:"tall" },
  { src:"/images/gallery/g2.jpg", alt:"MR Beauty Land – Service 2", span:"normal" },
  { src:"/images/gallery/g3.jpg", alt:"MR Beauty Land – Service 3", span:"normal" },
  { src:"/images/gallery/g4.jpg", alt:"MR Beauty Land – Service 4", span:"tall" },
  { src:"/images/gallery/g5.jpg", alt:"MR Beauty Land – Service 5", span:"normal" },
  { src:"/images/gallery/g6.jpg", alt:"MR Beauty Land – Service 6", span:"normal" },
];

export default function GalleryPage() {
  const [lb, setLb] = useState<null|typeof IMAGES[0]>(null);

  return (
    <main className="pt-24 pb-20 min-h-screen" style={{background:"#F8F6F2"}}>
      {/* Header */}
      <section className="py-14 text-center" style={{background:"linear-gradient(180deg,#EFE7DD,#F8F6F2)"}}>
        <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{color:"#B89B7A"}}>Our Work</p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-3" style={{color:"#3D2E22"}}>
            Beauty <em className="not-italic" style={{color:"#8A6E52"}}>Gallery</em>
          </h1>
          <p className="text-sm font-light" style={{color:"#6B5340"}}>A glimpse into our world of transformations</p>
        </motion.div>
      </section>

      {/* Masonry */}
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="masonry-grid">
          {IMAGES.map((img,i) => (
            <motion.div
              key={i}
              className="masonry-item cursor-pointer group"
              initial={{opacity:0,scale:0.94}}
              animate={{opacity:1,scale:1}}
              transition={{delay:i*0.08,duration:0.5}}
              onClick={()=>setLb(img)}
            >
              <div
                className="relative overflow-hidden"
                style={{aspectRatio:img.span==="tall"?"2/3":"4/3"}}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width:480px) 100vw,(max-width:768px) 50vw,33vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  style={{background:"rgba(61,46,34,0.45)"}}
                >
                  <ZoomIn size={22} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs mt-8 tracking-widest uppercase" style={{color:"#B89B7A"}}>
          Follow us on Instagram @mrbeautyland for more
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lb && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{background:"rgba(30,20,12,0.95)"}}
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            onClick={()=>setLb(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{scale:0.85,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.85,opacity:0}}
              onClick={e=>e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden" style={{aspectRatio:lb.span==="tall"?"2/3":"16/9",position:"relative"}}>
                <Image src={lb.src} alt={lb.alt} fill className="object-cover" sizes="900px" />
              </div>
              <button
                onClick={()=>setLb(null)}
                className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center"
                style={{background:"#F8F6F2",color:"#3D2E22"}}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
