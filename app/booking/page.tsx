"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  User, Phone, Mail, Scissors, Calendar, Clock,
  MessageSquare, CheckCircle, ChevronRight, ChevronLeft,
  Sparkles, Star, Heart, Tag
} from "lucide-react";

const ALL_SERVICES: Record<string, {name:string;price:number}[]> = {
  "Hair Services":[
    {name:"Haircut Women",price:500},{name:"Normal Trim",price:200},{name:"Blow Dry",price:300},
    {name:"Keratin Shoulder",price:1500},{name:"Botox",price:2500},{name:"Nanoplastia",price:3000},
    {name:"Women Smoothing",price:2500},{name:"Matrix Spa",price:800},{name:"Wella Spa",price:1200},
    {name:"Loreal Wash",price:250},{name:"Curls",price:500},{name:"Crimping",price:500},
    {name:"Head Massage With Wash",price:500},{name:"Temporary Ironing",price:500},
  ],
  "Men Services":[
    {name:"Mens Haircut",price:149},{name:"Beard Trim",price:99},{name:"Keratin",price:2000},
    {name:"Hair Straightening",price:3500},{name:"Smoothing",price:3000},{name:"Loreal Spa",price:1000},
    {name:"Fruit Cleanup",price:600},{name:"Oxy Cleanup",price:800},{name:"O3+ Cleanup",price:1000},
    {name:"Head Massage",price:250},{name:"Manicure",price:500},{name:"Pedicure",price:500},
  ],
  "Facials":[
    {name:"Fruit Facial",price:800},{name:"Oxy Life Facial",price:1500},{name:"Aroma Magic Facial",price:1200},
    {name:"O3+ Bridal Facial",price:2000},{name:"Korean Glass Skin",price:2500},{name:"Kanpeki Facial",price:2500},
  ],
  "Threading":[
    {name:"Eyebrows",price:30},{name:"Upper Lips",price:20},{name:"Full Face",price:150},
    {name:"Chin",price:20},{name:"Forehead",price:20},{name:"Side Locks",price:40},
  ],
  "Waxing":[
    {name:"Honey Full Body Wax",price:1200},{name:"Milk Body Wax",price:1500},
    {name:"Rica Full Body Wax",price:2000},{name:"Arms Wax",price:100},
    {name:"Half Legs",price:150},{name:"Full Legs",price:300},{name:"Underarms",price:50},
    {name:"Bikini Wax",price:600},{name:"Rica Full Legs",price:700},
  ],
  "Bleach & D-Tan":[
    {name:"Full Face & Neck Bleach",price:500},{name:"Full Arms Bleach",price:500},
    {name:"Body Bleach",price:2000},{name:"Ragga D-Tan",price:500},{name:"O3+ D-Tan Premium",price:600},
    {name:"O3+ D-Tan Men",price:500},
  ],
  "Manicure & Pedicure":[
    {name:"Basic Manicure",price:500},{name:"Spa Manicure",price:700},
    {name:"Basic Pedicure",price:600},{name:"Spa Pedicure",price:800},
  ],
  "Body Services":[
    {name:"Body Polishing",price:2000},{name:"Full Body Massage",price:2000},
    {name:"Aromatherapy",price:2500},{name:"Rica Wax Full Body",price:2000},
  ],
  "Beauty Packages":[
    {name:"Package 1 — ₹499",price:499},{name:"Package 2 — ₹699",price:699},
    {name:"Package 3 — ₹799",price:799},{name:"Package 4 — ₹999",price:999},
  ],
};

const TIME_SLOTS = [
  "09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM",
  "02:00 PM","03:00 PM","04:00 PM","05:00 PM","06:00 PM",
  "07:00 PM","08:00 PM","09:00 PM",
];

const STEPS = [
  {label:"Details",   icon:User},
  {label:"Service",   icon:Scissors},
  {label:"Schedule",  icon:Calendar},
  {label:"Confirm",   icon:CheckCircle},
];

function Field({label,children}:{label:string;children:React.ReactNode}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] tracking-[0.25em] uppercase font-medium" style={{color:"#B89B7A"}}>{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full px-4 py-3.5 rounded-xl text-sm border-2 outline-none transition-all duration-300 placeholder:opacity-40";
const inputStyle = {background:"#FDFCFA",borderColor:"rgba(214,194,174,0.4)",color:"#3D2E22",fontFamily:"Jost,sans-serif"};

export default function BookingPage() {
  const [step,       setStep]       = useState(0);
  const [done,       setDone]       = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeCat,  setActiveCat]  = useState("Hair Services");
  const [form, setForm] = useState({
    name:"",phone:"",email:"",
    service:"",price:0,
    date:"",time:"",notes:"",
  });

  const set = (k:string,v:string|number) => setForm(f=>({...f,[k]:v}));

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const canNext = [
    !!(form.name.trim() && form.phone.trim()),
    !!form.service,
    !!(form.date && form.time),
    true,
  ][step];

  /* ── Send to Formspree which forwards to Gmail ── */
  const submit = async () => {
  setSubmitting(true);
  try {
    const formData = new FormData();
    formData.append("access_key", "24a419df-2f93-4d31-9317-4c3ef1f330d5");
    formData.append("subject", `New Booking — ${form.service} — ${form.name}`);
    formData.append("from_name", "MR Beauty Land Website");
    formData.append("email", "mrbeautylandsalon@gmail.com");
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("service", form.service);
    formData.append("price", `₹${form.price}`);
    formData.append("date", form.date ? new Date(form.date).toLocaleDateString("en-IN") : "");
    formData.append("time", form.time);
    formData.append("notes", form.notes || "None");
    formData.append("botcheck", "");

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.success) {
      console.log("Booking sent successfully!");
    } else {
      console.log("Error:", data);
    }
  } catch (err) {
    console.error("Error:", err);
  }
  setSubmitting(false);
  setDone(true);
};

  /* ── SUCCESS ── */
  if (done) return (
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4" style={{background:"linear-gradient(160deg,#FDFCFA,#EFE7DD)"}}>
      <motion.div className="w-full max-w-md text-center" initial={{opacity:0,scale:0.85}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:[0.23,1,0.32,1]}}>
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          initial={{scale:0}} animate={{scale:1}}
          transition={{delay:0.2,type:"spring",stiffness:200,damping:15}}
        >
          <span className="absolute inset-0 rounded-full opacity-20 animate-ping" style={{background:"#B89B7A"}} />
          <div className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-xl" style={{background:"linear-gradient(135deg,#8A6E52,#B89B7A)"}}>
            <CheckCircle size={40} className="text-white" />
          </div>
        </motion.div>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="space-y-3">
          <h2 className="font-display text-4xl" style={{color:"#3D2E22"}}>Booking Confirmed!</h2>
          <p className="text-sm font-light" style={{color:"#6B5340"}}>
            Thank you <strong>{form.name}</strong>! Your appointment is booked.
          </p>
          <div className="my-6 rounded-2xl p-5 border space-y-3 text-left" style={{background:"#FDFCFA",borderColor:"rgba(214,194,174,0.3)"}}>
            {[
              {icon:Scissors,  label:"Service",  value:form.service},
              {icon:Tag,       label:"Price",    value:`₹${form.price}`},
              {icon:Calendar,  label:"Date",     value:form.date ? new Date(form.date).toLocaleDateString("en-IN",{dateStyle:"long"}):""},
              {icon:Clock,     label:"Time",     value:form.time},
              {icon:Phone,     label:"WhatsApp", value:form.phone},
            ].map(({icon:Icon,label,value})=>(
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{background:"rgba(184,155,122,0.12)"}}>
                  <Icon size={12} style={{color:"#8A6E52"}} />
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] uppercase tracking-widest" style={{color:"#B89B7A"}}>{label}</span>
                  <span className="text-sm font-medium" style={{color:"#3D2E22"}}>{value}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs font-light" style={{color:"#8A6E52"}}>We will confirm via WhatsApp on {form.phone} within 30 min.</p>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={()=>{setDone(false);setStep(0);setForm({name:"",phone:"",email:"",service:"",price:0,date:"",time:"",notes:""});}}
              className="btn-outline flex-1 justify-center"
              
            >Book Another</button>
            <Link href="/" className="btn-primary flex-1 justify-center">
              Back Home
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );

  /* ── MAIN FORM ── */
  return (
    <main className="min-h-screen pt-24 pb-16" style={{background:"linear-gradient(160deg,#FDFCFA 0%,#EFE7DD 60%,#FDFCFA 100%)"}}>
      {/* Page title */}
      <div className="text-center py-10 px-4">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7}}>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{color:"#B89B7A"}}>Reserve Your Spot</p>
          <h1 className="font-display text-4xl sm:text-5xl" style={{color:"#3D2E22"}}>
            Book an <em className="not-italic" style={{color:"#8A6E52"}}>Appointment</em>
          </h1>
          <p className="text-xs font-light mt-2" style={{color:"#6B5340"}}>Confirmed in minutes — no advance payment needed</p>
        </motion.div>
      </div>

      <div className="max-w-xl mx-auto px-4">
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-8">
          {STEPS.map(({label,icon:Icon},i)=>(
            <div key={label} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1.5">
                <motion.div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold shadow-sm"
                  style={{
                    background: i<step ? "linear-gradient(135deg,#8A6E52,#B89B7A)"
                               :i===step ? "linear-gradient(135deg,#6B5340,#8A6E52)"
                               :"#F8F6F2",
                    color: i<=step?"#FDFCFA":"#B89B7A",
                    border: i>step?"1.5px solid rgba(184,155,122,0.3)":"none",
                  }}
                  animate={{scale:i===step?1.1:1}}
                  transition={{duration:0.3}}
                >
                  {i<step ? <CheckCircle size={16}/> : <Icon size={15}/>}
                </motion.div>
                <span className="text-[9px] tracking-wide uppercase hidden sm:block font-medium" style={{color:i===step?"#6B5340":"#B89B7A"}}>{label}</span>
              </div>
              {i<STEPS.length-1 && (
                <div className="flex-1 h-px mx-2 mb-5 transition-all duration-500" style={{background:i<step?"#B89B7A":"rgba(214,194,174,0.35)"}} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="rounded-3xl overflow-hidden border shadow-xl" style={{background:"#FDFCFA",borderColor:"rgba(214,194,174,0.25)",boxShadow:"0 24px 64px rgba(138,110,82,0.08)"}}>
          <div className="h-1" style={{background:"linear-gradient(90deg,#D6C2AE,#B89B7A,#8A6E52,#B89B7A,#D6C2AE)"}} />

          <div className="p-5 sm:p-7">
            <AnimatePresence mode="wait">

              {/* STEP 0 */}
              {step===0 && (
                <motion.div key="s0" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.3}} className="space-y-5">
                  <StepHeader icon={User} title="Your Details" sub="Tell us about yourself" />
                  <Field label="Full Name *">
                    <input type="text" placeholder="e.g. Priya Sharma" value={form.name} onChange={e=>set("name",e.target.value)} className={inputCls} style={inputStyle} required />
                  </Field>
                  <Field label="WhatsApp Number *">
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e=>set("phone",e.target.value)} className={inputCls} style={inputStyle} required />
                  </Field>
                  <Field label="Email (optional)">
                    <input type="email" placeholder="you@email.com" value={form.email} onChange={e=>set("email",e.target.value)} className={inputCls} style={inputStyle} />
                  </Field>
                  <div className="flex items-start gap-3 p-4 rounded-xl" style={{background:"rgba(184,155,122,0.07)",border:"1px solid rgba(184,155,122,0.15)"}}>
                    <Sparkles size={13} className="shrink-0 mt-0.5" style={{color:"#B89B7A"}} />
                    <p className="text-xs font-light leading-relaxed" style={{color:"#8A6E52"}}>
                      Booking confirmation will be sent on WhatsApp. Keep your number active on WhatsApp.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 1 */}
              {step===1 && (
                <motion.div key="s1" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.3}}>
                  <StepHeader icon={Scissors} title="Choose Service" sub="Select the service you want" />

                  {/* Category tabs — scrollable */}
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{scrollbarWidth:"none"}}>
                    {Object.keys(ALL_SERVICES).map(cat=>(
                      <button key={cat} onClick={()=>setActiveCat(cat)}
                        className="px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wider uppercase whitespace-nowrap flex-shrink-0 transition-all"
                        style={{
                          background:activeCat===cat?"linear-gradient(135deg,#8A6E52,#B89B7A)":"rgba(214,194,174,0.2)",
                          color:activeCat===cat?"#FDFCFA":"#6B5340",
                        }}>
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Service list */}
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1" style={{scrollbarWidth:"thin"}}>
                    {(ALL_SERVICES[activeCat]??[]).map(s=>{
                      const sel = form.service===s.name;
                      return (
                        <button key={s.name} onClick={()=>{set("service",s.name);set("price",s.price);}}
                          className="w-full text-left px-4 py-3 rounded-xl border-2 flex items-center justify-between transition-all duration-200"
                          style={{
                            background:sel?"rgba(184,155,122,0.08)":"#F8F6F2",
                            borderColor:sel?"#B89B7A":"rgba(214,194,174,0.3)",
                          }}>
                          <span className="text-sm font-medium" style={{color:"#3D2E22"}}>{s.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{color:"#8A6E52"}}>₹{s.price}</span>
                            {sel && <motion.div initial={{scale:0}} animate={{scale:1}} className="w-5 h-5 rounded-full flex items-center justify-center" style={{background:"linear-gradient(135deg,#8A6E52,#B89B7A)"}}>
                              <CheckCircle size={11} className="text-white" />
                            </motion.div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {form.service && (
                    <motion.div initial={{opacity:0,y:5}} animate={{opacity:1,y:0}} className="mt-3 px-4 py-2.5 rounded-xl flex items-center gap-2" style={{background:"rgba(138,110,82,0.07)"}}>
                      <CheckCircle size={12} style={{color:"#8A6E52"}} />
                      <span className="text-xs font-medium" style={{color:"#6B5340"}}>
                        Selected: <strong>{form.service}</strong> — ₹{form.price}
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* STEP 2 */}
              {step===2 && (
                <motion.div key="s2" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.3}} className="space-y-5">
                  <StepHeader icon={Calendar} title="Pick Date & Time" sub="Choose your preferred slot" />

                  <Field label="Preferred Date *">
                    <input type="date" min={minDate} value={form.date} onChange={e=>set("date",e.target.value)} className={inputCls} style={{...inputStyle,borderColor:form.date?"#B89B7A":"rgba(214,194,174,0.4)"}} />
                  </Field>

                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase font-medium mb-2" style={{color:"#B89B7A"}}>Preferred Time *</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {TIME_SLOTS.map(t=>(
                        <button key={t} onClick={()=>set("time",t)}
                          className="py-2.5 rounded-xl text-xs font-medium border-2 transition-all duration-200"
                          style={{
                            background:form.time===t?"linear-gradient(135deg,#8A6E52,#B89B7A)":"#F8F6F2",
                            borderColor:form.time===t?"transparent":"rgba(214,194,174,0.3)",
                            color:form.time===t?"#FDFCFA":"#6B5340",
                          }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Field label="Special Notes (optional)">
                    <textarea rows={3} placeholder="Allergies, preferences..." value={form.notes} onChange={e=>set("notes",e.target.value)} className={inputCls+" resize-none"} style={inputStyle} />
                  </Field>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step===3 && (
                <motion.div key="s3" initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-30}} transition={{duration:0.3}}>
                  <StepHeader icon={Heart} title="Almost Done!" sub="Review your appointment" />

                  <div className="rounded-2xl overflow-hidden border" style={{borderColor:"rgba(214,194,174,0.25)"}}>
                    <div className="px-4 py-3" style={{background:"linear-gradient(135deg,rgba(214,194,174,0.18),rgba(184,155,122,0.09))"}}>
                      <p className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{color:"#8A6E52"}}>Appointment Summary</p>
                    </div>
                    <div>
                      {[
                        {icon:User,       label:"Client",   value:form.name},
                        {icon:Phone,      label:"WhatsApp", value:form.phone},
                        {icon:Scissors,   label:"Service",  value:form.service},
                        {icon:Tag,        label:"Price",    value:`₹${form.price}`},
                        {icon:Calendar,   label:"Date",     value:form.date?new Date(form.date).toLocaleDateString("en-IN",{dateStyle:"long"}):""},
                        {icon:Clock,      label:"Time",     value:form.time},
                        ...(form.notes?[{icon:MessageSquare,label:"Notes",value:form.notes}]:[]),
                      ].map(({icon:Icon,label,value},i)=>(
                        <div key={label} className="flex items-center gap-3 px-4 py-3" style={{background:i%2===0?"#FDFCFA":"rgba(253,252,250,0.6)",borderTop:"1px solid rgba(214,194,174,0.12)"}}>
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{background:"rgba(184,155,122,0.1)"}}>
                            <Icon size={11} style={{color:"#8A6E52"}} />
                          </div>
                          <div className="flex items-center justify-between w-full gap-4">
                            <span className="text-[10px] uppercase tracking-widest shrink-0" style={{color:"#B89B7A"}}>{label}</span>
                            <span className="text-sm font-medium text-right" style={{color:"#3D2E22"}}>{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="text-[11px] text-center mt-4 font-light" style={{color:"#8A6E52"}}>
                    Confirmation will be sent to mrbeautylandsalon@gmail.com &amp; your WhatsApp.
                  </p>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Nav */}
            <div className="flex items-center justify-between mt-7 pt-5 border-t" style={{borderColor:"rgba(214,194,174,0.2)"}}>
              <button onClick={()=>setStep(s=>Math.max(s-1,0))} disabled={step===0}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm border font-medium disabled:opacity-30 transition-all"
                style={{borderColor:"rgba(184,155,122,0.3)",color:"#6B5340"}}>
                <ChevronLeft size={15}/> Back
              </button>

              {step<3 ? (
                <motion.button onClick={()=>{if(canNext)setStep(s=>s+1);}} disabled={!canNext}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium tracking-wider uppercase disabled:opacity-40"
                  style={{background:"linear-gradient(135deg,#6B5340,#8A6E52,#B89B7A)",color:"#FDFCFA"}}
                  whileHover={canNext?{scale:1.02}:{}} whileTap={canNext?{scale:0.98}:{}}>
                  Continue <ChevronRight size={15}/>
                </motion.button>
              ) : (
                <motion.button onClick={submit} disabled={submitting}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-medium tracking-wider uppercase"
                  style={{background:submitting?"#D6C2AE":"linear-gradient(135deg,#6B5340,#8A6E52,#B89B7A)",color:"#FDFCFA"}}
                  whileHover={!submitting?{scale:1.02}:{}} whileTap={!submitting?{scale:0.98}:{}}>
                  {submitting
                    ? <motion.div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" animate={{rotate:360}} transition={{duration:0.8,repeat:Infinity,ease:"linear"}} />
                    : <CheckCircle size={15}/>}
                  {submitting?"Confirming...":"Confirm Booking"}
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Trust */}
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          {["Free Cancellation (24hr)","No Advance Payment","WhatsApp Confirmation"].map(b=>(
            <div key={b} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px]" style={{background:"rgba(248,246,242,0.8)",color:"#8A6E52",border:"1px solid rgba(184,155,122,0.2)"}}>
              <CheckCircle size={9} style={{color:"#B89B7A"}} /> {b}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

function StepHeader({icon:Icon,title,sub}:{icon:any;title:string;sub:string}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{background:"rgba(184,155,122,0.12)"}}>
        <Icon size={18} style={{color:"#8A6E52"}} />
      </div>
      <div>
        <h2 className="font-display text-xl" style={{color:"#3D2E22"}}>{title}</h2>
        <p className="text-xs font-light" style={{color:"#8A6E52"}}>{sub}</p>
      </div>
    </div>
  );
}
