import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="space-y-24">
      <Hero />

      {/* Premium Features Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 via-white to-purple-50/30"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-sky-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-300/15 to-teal-300/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(60deg, #8b5cf677 25%, transparent 25.5%, transparent 75%, #8b5cf677 75%, #8b5cf677)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 40px 70px, 40px 70px, 0px 70px, 0 0'
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-4">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></span>
              <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
                Premium Solutions
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Why We're{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Different
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We don't just build websites – we create digital experiences that drive results and elevate your brand.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-Edge Design",
                desc: "Premium UI/UX that blends aesthetics with functionality for maximum engagement.",
                icon: "🎨",
                color: "purple",
                gradient: "from-purple-500 to-pink-500",
                features: ["Modern aesthetics", "User-centered design", "Brand consistency"]
              },
              {
                title: "Blazing Performance",
                desc: "Optimized for speed and SEO, ensuring your site ranks higher and converts better.",
                icon: "⚡",
                color: "blue",
                gradient: "from-blue-500 to-cyan-500",
                features: ["Fast loading", "SEO optimized", "Mobile-first"]
              },
              {
                title: "Scalable Solutions",
                desc: "Future-proof architecture that grows with your business and adapts to your needs.",
                icon: "🚀",
                color: "emerald",
                gradient: "from-emerald-500 to-teal-500",
                features: ["Scalable code", "Easy updates", "Future-ready"]
              },
            ].map((x, index) => (
              <div
                key={x.title}
                className="group relative"
              >
                {/* Card Background Effects */}
                <div className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl blur-xl"
                     style={{
                       backgroundImage: `linear-gradient(90deg, var(--tw-gradient-stops))`,
                       [`--tw-gradient-from`]: `rgb(147 51 234 / 0.2)`,
                       [`--tw-gradient-to`]: `rgb(236 72 153 / 0.2)`,
                       [`--tw-gradient-stops`]: `var(--tw-gradient-from), var(--tw-gradient-to)`
                     }}
                ></div>

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                  
                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                    <div className={`absolute -top-12 -right-12 w-32 h-32 rotate-45 bg-gradient-to-r ${x.gradient} opacity-5`}></div>
                  </div>

                  {/* Index Badge */}
                  <div className="absolute top-6 right-6">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${x.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-sm">0{index + 1}</span>
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-${x.color}-100 to-${x.color}-50 mb-6 shadow-lg`}>
                    <div className="text-3xl">{x.icon}</div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {x.title}
                  </h3>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {x.desc}
                  </p>

                  {/* Feature List */}
                  <ul className="space-y-2 mb-6">
                    {x.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${x.gradient}`}></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Animated Bottom Border */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${x.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Row */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "50+", label: "Projects Delivered", suffix: "" },
              { number: "99", label: "Client Satisfaction", suffix: "%" },
              { number: "24", label: "Hour Response", suffix: "h" },
              { number: "100", label: "Money Back Guarantee", suffix: "%" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                  {stat.number}<span className="text-lg">{stat.suffix}</span>
                </div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}