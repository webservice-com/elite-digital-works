import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #4f46e5 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}
      ></div>

      {/* Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>

      <div className="relative pt-12 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-4 gap-10 mb-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src={Logo} 
                  alt="Elite Digital Works" 
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-2 border border-white/10 shadow-lg"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Elite Digital Works</h2>
                  <p className="text-slate-300 text-sm font-medium">Premium Web Solutions</p>
                </div>
              </div>
              
              <p className="text-slate-200 max-w-lg mb-8 leading-relaxed font-normal">
                We craft high-performance, conversion-optimized websites that help 
                businesses grow their online presence and achieve measurable results.
              </p>

              {/* Contact Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/94702742696?text=Hi%20I%20want%20to%20discuss%20a%20website%20project"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
                  </svg>
                  WhatsApp: +94 702 742 696
                </a>
                
                <a
                  href="mailto:nadunabeysinghepp@gmail.com"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold hover:from-blue-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Us
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 pb-2 border-b border-white/10">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Home", path: "/" },
                  { name: "Portfolio", path: "/portfolio" },
                  { name: "Pricing", path: "/pricing" },
                  { name: "About", path: "/about" },
                  { name: "Reviews", path: "/reviews" },
                  { name: "Contact", path: "/order" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-300 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <svg className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-bold text-lg mb-6 pb-2 border-b border-white/10">
                Our Services
              </h3>
              <ul className="space-y-3">
                {[
                  "Website Design & Development",
                  "Business Websites",
                  "E-commerce Solutions",
                  "SEO Optimization",
                  "Website Maintenance",
                  "Custom Web Applications"
                ].map((service) => (
                  <li key={service}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="px-6 bg-slate-900">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-blue-300">✦</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-slate-300 font-medium">
                © {currentYear} <span className="text-white font-bold">Elite Digital Works</span>
                <span className="mx-2 text-slate-500">•</span>
                Premium Web Solutions
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Based in Sri Lanka • Serving clients worldwide
              </p>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <div className="flex flex-col gap-2">
                <a 
                  href="tel:+94702742696" 
                  className="text-slate-300 hover:text-white transition-colors duration-300 font-medium"
                >
                  📞 +94 70 274 2696
                </a>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-white/10">
            {[
              { icon: "🔒", text: "Secure & Professional", color: "from-emerald-500 to-green-600" },
              { icon: "⚡", text: "Fast Delivery", color: "from-amber-500 to-orange-600" },
              { icon: "💬", text: "Direct Communication", color: "from-blue-500 to-cyan-600" },
              { icon: "✓", text: "Quality Guaranteed", color: "from-purple-500 to-pink-600" }
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${badge.color} flex items-center justify-center shadow-md`}>
                  <span className="text-white text-base">{badge.icon}</span>
                </div>
                <span className="text-sm text-slate-300 font-medium">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* WhatsApp Floating Button */}
          <a
            href="https://wa.me/94702742696?text=Hi%20I%20want%20to%20discuss%20a%20website%20project"
            target="_blank"
            rel="noreferrer"
            className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 shadow-xl shadow-green-600/30 hover:shadow-2xl hover:shadow-green-600/40 transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411"/>
            </svg>
          </a>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center group"
            aria-label="Back to top"
          >
            <svg className="w-5 h-5 text-white transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}