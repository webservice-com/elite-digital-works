import React from "react";
import { Link } from "react-router-dom";
import aboutHero from "../assets/hero/about_hero.jpeg";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl mb-12">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-pink-300/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-sky-300/20 to-blue-300/20 rounded-full blur-3xl" />

          {/* Border Gradient */}
          <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-transparent via-purple-300/50 to-transparent -z-10" />

          {/* Split layout: Text left, Image right */}
          <div className="relative p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* LEFT: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
                  About Elite Digital Works
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
                Premium Websites <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Built for Excellence
                </span>
              </h1>

              <p className="text-slate-600 text-lg md:text-xl max-w-3xl mb-10 leading-relaxed">
                Elite Digital Works is a modern web studio focused on crafting
                high-performance, conversion-driven websites for businesses that value
                quality, brand integrity, and sustainable growth.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/order"
                  className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40" />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative flex items-center gap-3">
                    <span className="text-white">Start Your Project</span>
                    <svg
                      className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </Link>

                <Link
                  to="/reviews"
                  className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-purple-200 group-hover:border-purple-300 shadow-lg" />
                  <div className="relative flex items-center gap-3">
                    <span className="text-purple-700 group-hover:text-purple-800 transition-colors duration-300">
                      Client Success Stories
                    </span>
                    <svg
                      className="w-5 h-5 text-purple-600 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* RIGHT: Hero Image */}
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-2xl rounded-[2rem]" />
              <div className="relative rounded-3xl overflow-hidden border border-white/60 shadow-2xl">
                <img
                  src={aboutHero}
                  alt="Elite Digital Works"
                  className="w-full h-[320px] sm:h-[380px] lg:h-[420px] object-cover transform transition duration-500 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl" />
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-r from-sky-500/20 to-blue-500/20 blur-xl" />
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Core Values
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Guiding principles that define how we work and what we deliver
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Design with Purpose",
                desc: "Every pixel serves a purpose. We design for clarity, trust, and user experience — not just aesthetics.",
                icon: "🎯",
                gradient: "from-purple-500 to-pink-500",
                bg: "bg-gradient-to-br from-purple-50 to-pink-50",
              },
              {
                title: "Performance First",
                desc: "Speed matters. We build fast-loading, SEO-optimized websites using modern development standards.",
                icon: "⚡",
                gradient: "from-blue-500 to-cyan-500",
                bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
              },
              {
                title: "Built to Scale",
                desc: "From simple sites to complex systems — we architect solutions that grow with your business.",
                icon: "🚀",
                gradient: "from-emerald-500 to-teal-500",
                bg: "bg-gradient-to-br from-emerald-50 to-teal-50",
              },
            ].map((value, index) => (
              <div key={value.title} className="group relative">
                <div
                  className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl blur-xl"
                  style={{
                    backgroundImage: `linear-gradient(90deg, var(--tw-gradient-stops))`,
                    ["--tw-gradient-from"]: `rgb(147 51 234 / 0.2)`,
                    ["--tw-gradient-to"]: `rgb(236 72 153 / 0.2)`,
                    ["--tw-gradient-stops"]: `var(--tw-gradient-from), var(--tw-gradient-to)`,
                  }}
                />
                <div
                  className={`relative rounded-3xl p-8 border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 ${value.bg}`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-2xl">{value.icon}</span>
                    </div>
                    <div className="text-4xl font-bold text-slate-300">0{index + 1}</div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ✅ Process Section (FIXED ALIGNMENT, LINE NOT TOUCHED) */}
        <section className="mb-12">
          <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Process
                </span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                A streamlined approach that ensures clarity, quality, and timely delivery
              </p>
            </div>

            <div className="relative">
              {/* Center line (UNCHANGED) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-400 to-pink-400 transform -translate-x-1/2" />

              {/* Rows */}
              <div className="space-y-14 md:space-y-12">
                {[
                  {
                    side: "right",
                    step: "01",
                    title: "Discovery",
                    desc: "Deep dive into your business, audience, and objectives to understand your unique needs.",
                    icon: "🔍",
                  },
                  {
                    side: "left",
                    step: "02",
                    title: "Planning",
                    desc: "Define scope, features, timeline, and deliverables for complete transparency.",
                    icon: "📋",
                  },
                  {
                    side: "right",
                    step: "03",
                    title: "Development",
                    desc: "Design and build with regular updates and collaborative feedback sessions.",
                    icon: "💻",
                  },
                  {
                    side: "left",
                    step: "04",
                    title: "Launch",
                    desc: "Thorough testing, deployment, and post-launch support for a smooth transition.",
                    icon: "🚀",
                  },
                ].map((p) => (
                  <div
                    key={p.step}
                    className="grid grid-cols-1 md:grid-cols-[1fr,80px,1fr] items-center gap-6"
                  >
                    {/* LEFT COLUMN */}
                    <div className="hidden md:block">
                      {p.side === "left" ? (
                        <div className="flex items-center justify-end gap-6">
                          {/* text (aligned to line) */}
                          <div className="max-w-md text-right">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{p.desc}</p>
                          </div>

                          {/* icon (nearest to line) */}
                          <div className="relative flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">{p.icon}</span>
                            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{p.step}</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}
                    </div>

                    {/* CENTER GAP (keeps line space; DO NOT TOUCH) */}
                    <div className="hidden md:block" />

                    {/* RIGHT COLUMN */}
                    <div>
                      {p.side === "right" ? (
                        <div className="flex items-center justify-start gap-6">
                          {/* icon (nearest to line) */}
                          <div className="relative flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-3xl">{p.icon}</span>
                            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                              <span className="text-xs font-bold text-white">{p.step}</span>
                            </div>
                          </div>

                          {/* text (aligned to line) */}
                          <div className="max-w-md text-left">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">{p.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{p.desc}</p>
                          </div>
                        </div>
                      ) : (
                        /* Mobile fallback for left items */
                        <div className="md:hidden flex items-center gap-6">
                          <div className="relative flex-shrink-0 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                            <span className="text-2xl">{p.icon}</span>
                            <div className="absolute -top-2 -right-2 w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                              <span className="text-[11px] font-bold text-white">{p.step}</span>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{p.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{p.desc}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <div className="rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-8 md:p-12 shadow-xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Choose Us
                </span>
              </h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                What sets us apart in delivering exceptional digital solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Premium design that builds trust and credibility",
                "Mobile-first approach with exceptional performance",
                "SEO-optimized architecture for better visibility",
                "Clean, maintainable code for long-term success",
                "Scalable solutions that grow with your business",
                "Dedicated support throughout the entire process",
                "Transparent communication and regular updates",
                "Industry-best practices and modern technologies",
                "Proven track record of client satisfaction",
              ].map((benefit) => (
                <div
                  key={benefit}
                  className="group rounded-2xl border border-slate-200 p-6 bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold text-slate-800 group-hover:text-purple-700 transition-colors duration-300">
                      {benefit}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200">
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/order"
                    className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40" />
                    <div className="relative flex items-center justify-center gap-3">
                      <span className="text-white">Request Custom Quote</span>
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>

                  <a
                    href="https://wa.me/94702742696?text=Hi%20I%20need%20a%20premium%20website%20for%20my%20business"
                    target="_blank"
                    rel="noreferrer"
                    className="group relative px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/40" />
                    <div className="relative flex items-center justify-center gap-3">
                      <span className="text-white">Chat on WhatsApp</span>
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
