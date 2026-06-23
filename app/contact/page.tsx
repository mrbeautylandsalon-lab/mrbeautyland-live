"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", service: "", message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="pt-28" style={{ background: "#F8F6F2" }}>
      {/* Header */}
      <section className="py-16 text-center" style={{ background: "linear-gradient(180deg, #EFE7DD, #F8F6F2)" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: "#B89B7A" }}>Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl mb-4" style={{ color: "#4E3D2F" }}>
            Contact <em className="not-italic" style={{ color: "#8A6E52" }}>Us</em>
          </h1>
          <p className="text-base font-light max-w-xl mx-auto" style={{ color: "#6B5340" }}>
            We would love to hear from you. Reach out for appointments or any queries.
          </p>
        </motion.div>
      </section>

      <section ref={ref} className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div>
                <h2 className="font-display text-3xl mb-2" style={{ color: "#4E3D2F" }}>Let's Connect</h2>
                <p className="text-sm font-light leading-relaxed" style={{ color: "#6B5340" }}>
                  Visit us at our salon or reach out via call, WhatsApp or email. We are always happy to help!
                </p>
              </div>

              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Location", value: "MR BEAUTYLAND, opp. firstcry, panchsati circle, sadul ganj, Bikaner(raj.) 334001" },
                  { icon: Phone, label: "Phone", value: "+91 7073937995", href: "tel:+91XXXXXXXXXX" },
                  { icon: Mail, label: "Email", value: "mrbeautylandsalon@gmail.com", href: "mailto:mrbeautylandsalon@gmail.com" },
                  { icon: Clock, label: "Hours", value: "Mon–Sat: 10AM–8PM | Sun: 11AM–6PM" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4 p-4 rounded-xl" style={{ background: "#EFE7DD" }}>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg, #D6C2AE, #B89B7A)" }}>
                      <Icon size={16} style={{ color: "#4E3D2F" }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#B89B7A" }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: "#4E3D2F" }}>{value}</a>
                      ) : (
                        <p className="text-sm font-medium" style={{ color: "#4E3D2F" }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/91XXXXXXXXXX?text=Hello, I would like to book an appointment"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn flex items-center justify-center gap-3 w-full py-4 rounded-xl font-medium tracking-wider uppercase text-sm"
                style={{ background: "#25D366", color: "#fff" }}
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>

              {/* Map embed placeholder */}
              <div className="rounded-2xl overflow-hidden h-52" style={{ background: "#D6C2AE" }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.0!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjciTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="MR Beauty Land Location"
                />
              </div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="p-8 md:p-10 rounded-2xl border" style={{ background: "#FDFCFA", borderColor: "rgba(214,194,174,0.25)" }}>
                {submitted ? (
                  <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "linear-gradient(135deg, #8A6E52, #B89B7A)" }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle size={28} className="text-white" />
                    </motion.div>
                    <h3 className="font-display text-2xl mb-3" style={{ color: "#4E3D2F" }}>Message Sent!</h3>
                    <p className="text-sm font-light" style={{ color: "#6B5340" }}>
                      Thank you for reaching out. Our team will get back to you within 2 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 px-6 py-2.5 rounded-full text-sm border"
                      style={{ borderColor: "rgba(138,110,82,0.3)", color: "#6B5340" }}
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-display text-2xl mb-6" style={{ color: "#4E3D2F" }}>Send a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      {[
                        { key: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                        { key: "phone", label: "Phone Number", type: "tel", placeholder: "+91 7073937995" },
                      ].map(({ key, label, type, placeholder }) => (
                        <div key={key}>
                          <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#B89B7A" }}>{label}</label>
                          <input
                            type={type}
                            required
                            placeholder={placeholder}
                            value={form[key as keyof typeof form]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl text-sm outline-none border transition-all duration-300 focus:border-cream-400"
                            style={{
                              background: "#F8F6F2",
                              borderColor: "rgba(214,194,174,0.4)",
                              color: "#4E3D2F",
                            }}
                          />
                        </div>
                      ))}

                      <div>
                        <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#B89B7A" }}>Service</label>
                        <select
                          value={form.service}
                          onChange={(e) => setForm({ ...form, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none border"
                          style={{ background: "#F8F6F2", borderColor: "rgba(214,194,174,0.4)", color: "#4E3D2F" }}
                        >
                          <option value="">Select a service</option>
                          <option>Hair Services</option>
                          <option>Skin Services</option>
                          <option>Bridal Makeup</option>
                          <option>Spa Services</option>
                          <option>Nail Art</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: "#B89B7A" }}>Message</label>
                        <textarea
                          rows={4}
                          placeholder="Your message..."
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl text-sm outline-none border resize-none"
                          style={{ background: "#F8F6F2", borderColor: "rgba(214,194,174,0.4)", color: "#4E3D2F" }}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="magnetic-btn w-full py-4 rounded-xl font-medium tracking-widest uppercase text-sm flex items-center justify-center gap-3"
                        style={{ background: loading ? "#D6C2AE" : "linear-gradient(135deg, #6B5340, #8A6E52, #B89B7A)", color: "#F8F6F2" }}
                      >
                        {loading ? (
                          <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                        ) : (
                          <><Send size={14} /> Send Message</>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
