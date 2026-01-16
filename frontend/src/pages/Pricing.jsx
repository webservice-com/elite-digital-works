import React from "react";
import { Link } from "react-router-dom";
import { 
  FaRocket, FaChartLine, FaCrown, FaCheckCircle, FaStar,
  FaCalendarAlt, FaShieldAlt, FaUsers, FaQuestionCircle,
  FaWhatsapp, FaArrowRight, FaClock, FaHeadset, FaCertificate,
  FaChevronRight, FaBolt, FaPalette, FaMobileAlt, FaGlobe
} from "react-icons/fa";

const PACKAGES = [
  {
    name: "Starter",
    price: "$249",
    originalPrice: "$295",
    tagline: "Perfect for new brands & simple launches",
    icon: <FaRocket className="text-blue-600" />,
    color: "blue",
    highlight: "bg-blue-100 text-blue-800",
    gradient: "from-blue-500 to-cyan-400",
    features: [
      "1–3 pages (Home, About, Contact)",
      "Mobile-first premium layout",
      "Basic SEO setup",
      "Contact / inquiry form",
      "Fast delivery (7-10 days)",
      "1 round of revisions",
    ],
    serviceFeatures: ["Fast Launch", "Mobile Ready", "Basic Support"],
    popular: false,
  },
  {
    name: "Business",
    price: "$529",
    originalPrice: "$625",
    tagline: "Best for growing businesses",
    icon: <FaChartLine className="text-purple-600" />,
    color: "purple",
    highlight: "bg-purple-100 text-purple-800",
    gradient: "from-purple-600 to-pink-500",
    features: [
      "Up to 6 pages (multi-section design)",
      "Conversion-focused UI/UX",
      "Advanced SEO-ready structure",
      "Order / quotation form",
      "Performance optimization",
      "Professional copy guidance",
      "Social media integration",
      "2 rounds of revisions",
    ],
    serviceFeatures: ["SEO Ready", "High Performance", "Priority Support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Starting $1200",
    tagline: "For scalable systems & advanced features",
    icon: <FaCrown className="text-amber-600" />,
    color: "amber",
    highlight: "bg-amber-100 text-amber-800",
    gradient: "from-amber-500 to-orange-500",
    features: [
      "Custom pages & flows",
      "Review system + anti-spam protection",
      "API integrations (WhatsApp, email, analytics)",
      "Custom dashboards",
      "Scalable architecture",
      "Priority support & maintenance",
      "Monthly analytics reports",
      "Unlimited revisions",
    ],
    serviceFeatures: ["Custom Solutions", "24/7 Support", "Enterprise Grade"],
    popular: false,
  },
];

const BENEFITS = [
  { icon: <FaCertificate className="text-green-600" />, text: "30-Day Support", desc: "Free post-launch assistance" },
  { icon: <FaShieldAlt className="text-blue-600" />, text: "Secure Hosting", desc: "SSL & daily backups" },
  { icon: <FaHeadset className="text-purple-600" />, text: "Dedicated Support", desc: "Direct communication channel" },
  { icon: <FaClock className="text-amber-600" />, text: "Fast Turnaround", desc: "Quick project completion" },
];

const WEB_FEATURES = [
  { icon: <FaPalette />, text: "Modern UI/UX Design", color: "text-purple-500" },
  { icon: <FaMobileAlt />, text: "Fully Responsive", color: "text-blue-500" },
  { icon: <FaGlobe />, text: "SEO Optimized", color: "text-green-500" },
  { icon: <FaShieldAlt />, text: "Secure & Fast", color: "text-red-500" },
  { icon: <FaBolt />, text: "Fast Loading", color: "text-amber-500" },
  { icon: <FaUsers />, text: "User Friendly", color: "text-indigo-500" },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-semibold">
              <FaStar className="text-amber-500" />
              Limited Time Offer - 15% OFF
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Premium Web Development Packages
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Get professional websites at 15% off for a limited time. 
              Transparent pricing with no hidden costs. Choose your package and start building today.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Benefits Bar */}
        <div className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BENEFITS.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3">
                  <span className="text-xl">{benefit.icon}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{benefit.text}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Web Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What You Get With Every Package</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {WEB_FEATURES.map((feature, index) => (
              <div 
                key={index}
                className="group p-4 rounded-2xl bg-white border border-gray-200 hover:border-purple-300 transition-all duration-300"
              >
                <div className={`text-2xl mb-3 ${feature.color}`}>
                  {feature.icon}
                </div>
                <p className="text-sm font-medium text-gray-900">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="mb-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
            <p className="text-gray-600">Select the perfect package for your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-2xl border-2 bg-white transition-all duration-200 hover:shadow-lg ${
                  p.popular 
                    ? "border-purple-500 shadow-lg scale-105" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Popular Badge
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm shadow-lg flex items-center gap-2">
                      <FaStar className="text-xs" /> MOST POPULAR
                    </div>
                  </div>
                )} */}

                {/* Discount Ribbon */}
                {p.originalPrice && (
                  <div className="absolute -right-2 top-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1 rounded-l-lg font-bold text-sm shadow-lg">
                    SAVE 15%
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 rounded-lg bg-gray-50">
                          {p.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-3xl font-bold text-gray-900">{p.price}</span>
                            {p.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">
                                {p.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4">{p.tagline}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.serviceFeatures.map((feature, idx) => (
                        <span 
                          key={idx}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${p.highlight}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <ul className="space-y-3">
                      {p.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      to={`/order?package=${encodeURIComponent(p.name)}`}
                      className={`block text-center px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
                        p.popular
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:-translate-y-0.5 shadow-lg"
                          : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 hover:from-gray-200 hover:to-gray-300 hover:-translate-y-0.5 border border-gray-300"
                      }`}
                    >
                      {p.price === "Custom"
                        ? "Get Custom Quote"
                        : `Choose ${p.name} Package`}
                    </Link>
                  </div>

                  {p.price !== "Custom" && (
                    <p className="text-xs text-gray-500 text-center mt-6">
                      One-time payment • No hidden fees
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-12 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FaCalendarAlt className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Project Timeline</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1. Quote & Planning", time: "1-2 Days", color: "bg-purple-100 text-purple-800" },
              { step: "2. Design Phase", time: "3-5 Days", color: "bg-blue-100 text-blue-800" },
              { step: "3. Development", time: "5-10 Days", color: "bg-green-100 text-green-800" },
              { step: "4. Testing & Launch", time: "2-3 Days", color: "bg-amber-100 text-amber-800" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center font-bold`}>
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-gray-900">{item.step}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">Estimated time:</p>
                <div className="px-3 py-1 bg-white border border-gray-200 rounded-full inline-block">
                  <span className="text-sm font-medium text-gray-700">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about our services and offers
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: "How long does the 50% discount last?",
                a: "This special pricing is available for the next 30 days only. We recommend booking your spot early.",
              },
              {
                q: "Do you offer payment plans?",
                a: "Yes! We offer flexible payment options: 50% upfront and 50% upon completion.",
              },
              {
                q: "What if I need more features later?",
                a: "All packages can be upgraded. We'll apply the 50% discount to any additional features added.",
              },
              {
                q: "Is hosting included?",
                a: "Hosting is not included, but we help you set it up and offer recommendations.",
              },
              {
                q: "Do you provide source files?",
                a: "Yes! You receive all source code and design files upon final payment.",
              },
              {
                q: "What's your revision policy?",
                a: "Each package includes specific revision rounds. Additional revisions are available at a minimal cost.",
              },
            ].map((x, idx) => (
              <div
                key={x.q}
                className="group rounded-2xl border border-gray-200 p-6 hover:border-purple-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0">
                    <FaQuestionCircle className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      {x.q}
                    </p>
                    <p className="text-gray-600 mt-2">{x.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-purple-900 p-8 md:p-10">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Online Presence?
            </h3>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Get your premium website at 50% off before this limited-time offer ends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/order"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-white to-slate-100 text-slate-900 font-bold hover:from-white hover:to-slate-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Start Your Project Today
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/9402742696?text=Hi%20I%20want%20to%20discuss%20website%20package%20at%2050%25%20off"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>

            <p className="text-slate-400 text-sm mt-6">
              Limited spots available • Offer ends in 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}