import Link from "next/link";
import { Instagram, Facebook, Youtube, Phone, MapPin, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1612" }} className="text-cream-300 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, #B89B7A, transparent)" }} />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-cream-400/30">
                <img src="/logo.png" alt="MR Beauty Land" className="w-full h-full object-contain bg-black" />
              </div>
              <div>
                <h3 className="font-display text-xl text-cream-200 tracking-wide">MR Beauty Land</h3>
                <p className="text-[9px] tracking-[0.3em] text-cream-400 uppercase">Luxury Salon</p>
              </div>
            </div>
            <p className="text-sm text-cream-400 leading-relaxed font-light">
              Where beauty meets luxury. Experience premium hair, skin, bridal and spa services crafted for the discerning woman.
            </p>
            <div className="flex items-center gap-4">
              {[
                { icon: Instagram, href: "https://instagram.com/mrbeautyland" },
                { icon: Facebook, href: "https://facebook.com/mrbeautyland" },
                { icon: Youtube, href: "https://youtube.com/mrbeautyland" },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-cream-400/20 hover:border-cream-400/60 hover:text-cream-200 transition-all duration-300"
                  style={{ color: "#B89B7A" }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-cream-200 tracking-wide">Quick Links</h4>
            <div className="h-px w-8" style={{ background: "#B89B7A" }} />
            <ul className="space-y-2.5">
              {["Home", "About Us", "Services", "Gallery", "Offers", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-cream-400 hover:text-cream-200 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cream-400 group-hover:w-4 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-cream-200 tracking-wide">Our Services</h4>
            <div className="h-px w-8" style={{ background: "#B89B7A" }} />
            <ul className="space-y-2.5">
              {["Hair Services", "Skin Services", "Bridal Makeup", "Spa & Wellness", "Nail Art", "Mehendi"].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-sm text-cream-400 hover:text-cream-200 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-cream-400 group-hover:w-4 transition-all duration-300" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-cream-200 tracking-wide">Visit Us</h4>
            <div className="h-px w-8" style={{ background: "#B89B7A" }} />
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: "#B89B7A" }} />
                <span className="text-sm text-cream-400 leading-relaxed">
                  MR Beauty Land,opp.firstcry, panchsati circle sadul ganj, Bikaner (raj.) 334001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} style={{ color: "#B89B7A" }} />
                <a href="tel:+917073937995" className="text-sm text-cream-400 hover:text-cream-200 transition-colors">
                  +91 7073937995
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} style={{ color: "#B89B7A" }} />
                <a href="mailto:mrbeautylandsalon@gmail.com" className="text-sm text-cream-400 hover:text-cream-200 transition-colors">
                  mrbeautylandsalon@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="mt-0.5 shrink-0" style={{ color: "#B89B7A" }} />
                <div className="text-sm text-cream-400">
                  <p>Mon – Sat: 10:00 AM – 9:00 PM</p>
                  <p>Sunday: 11:00 AM – 8:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cream-600/20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-cream-500 tracking-wider">
            &copy; {new Date().getFullYear()} MR Beauty Land. All rights reserved.
          </p>
          <p className="text-xs text-cream-500 tracking-wider">
            Luxury &bull; Beauty &bull; Confidence
          </p>
        </div>
      </div>
    </footer>
  );
}
