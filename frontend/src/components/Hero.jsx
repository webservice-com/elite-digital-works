import React from "react";
import { Link } from "react-router-dom";

// ✅ Add your image here:
import heroImage from "../assets/hero/hero.png";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Elite Digital Works hero"
          className="h-full w-full object-cover"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/65 to-slate-950/85" />
        {/* Soft glow */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-20 md:py-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center text-white">
          {/* Left */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-200/90">
              Elite Digital Works
            </p>

            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Premium Websites <br />
              for Serious Businesses
            </h1>

            <p className="mt-6 text-lg text-slate-200/90 max-w-xl">
              High-end design, performance-first development, and scalable admin panels —
              built for international standards and real business growth.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/order"
                className="px-7 py-3 rounded-xl bg-white text-slate-900 font-extrabold hover:bg-slate-100 transition"
              >
                Start a Project
              </Link>

              <Link
                to="/reviews"
                className="px-7 py-3 rounded-xl border border-white/25 text-white font-extrabold hover:bg-white/10 transition"
              >
                Client Reviews
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-200/90">
              <span>✔ International-ready</span>
              <span>✔ Premium UI/UX</span>
              <span>✔ Admin Panel</span>
            </div>
          </div>

          {/* Right: premium card
          <div className="relative">
            <div className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur p-6 shadow-2xl">
              <div className="flex items-center justify-between">
                <p className="font-extrabold">What you get</p>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-200 font-bold">
                  Premium
                </span>
              </div>

              <div className="mt-4 space-y-3 text-slate-100/90">
                {[
                  "Modern design system & clean UI",
                  "Mobile-first + fast performance",
                  "SEO-ready structure",
                  "Order + Review system",
                  "Optional admin dashboard",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-1 w-2 h-2 rounded-full bg-white/70" />
                    <p className="text-sm">{t}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                  <p className="text-xs text-slate-200/80">Delivery</p>
                  <p className="font-extrabold mt-1">7–14d</p>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                  <p className="text-xs text-slate-200/80">Quality</p>
                  <p className="font-extrabold mt-1">High</p>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/15 p-3">
                  <p className="text-xs text-slate-200/80">Support</p>
                  <p className="font-extrabold mt-1">Included</p>
                </div>
              </div>
            </div>

            <div className="absolute -inset-10 -z-10 bg-white/5 blur-3xl rounded-full" />
          </div> */}
        </div>
      </div>
    </section>
  );
}
