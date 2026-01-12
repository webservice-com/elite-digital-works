import { useState } from "react";
import { api } from "../lib/api";
import { 
  FaUser, FaPhone, FaEnvelope, FaBuilding, FaClipboardList,
  FaRocket, FaChartLine, FaCrown, FaCheckCircle, FaStar,
  FaLightbulb, FaCalendarAlt, FaShieldAlt, FaUsers, FaMagic,
  FaPalette, FaMobileAlt, FaGlobe, FaLock, FaBolt,
  FaArrowRight, FaClock, FaHeadset, FaCertificate
} from "react-icons/fa";

const PACKAGES = [
  {
    name: "Starter",
    price: "$149",
    desc: "Perfect for new brands & simple launches",
    icon: <FaRocket className="text-blue-600" />,
    color: "border-blue-200 bg-blue-50",
    highlight: "bg-blue-100 text-blue-800",
    items: [
      "1–3 pages (Home, About, Contact)",
      "Mobile-first premium layout",
      "Basic SEO setup",
      "Contact / inquiry form",
      "1 round of revisions",
    ],
    features: ["Fast Launch", "Mobile Ready", "Basic Support"]
  },
  {
    name: "Business",
    price: "$349",
    desc: "Best for growing businesses",
    icon: <FaChartLine className="text-purple-600" />,
    color: "border-purple-200 bg-purple-50",
    highlight: "bg-purple-100 text-purple-800",
    items: [
      "Up to 6 pages",
      "Conversion-focused UI/UX",
      "Advanced SEO-ready structure",
      "Performance optimization",
      "Social media integration",
      "2 rounds of revisions",
    ],
    features: ["SEO Ready", "High Performance", "Priority Support"],
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For advanced needs & custom systems",
    icon: <FaCrown className="text-amber-600" />,
    color: "border-amber-200 bg-amber-50",
    highlight: "bg-amber-100 text-amber-800",
    items: [
      "Custom pages & sections",
      "Admin panel / CMS (optional)",
      "Booking / order forms (optional)",
      "Priority support",
      "Custom integrations",
      "Unlimited revisions (project-based)",
    ],
    features: ["Custom Solutions", "24/7 Support", "Enterprise Grade"]
  },
];

const BENEFITS = [
  { icon: <FaCertificate className="text-green-600" />, text: "30-Day Support", desc: "Free post-launch assistance" },
  { icon: <FaShieldAlt className="text-blue-600" />, text: "Secure Hosting", desc: "SSL & daily backups" },
  { icon: <FaHeadset className="text-purple-600" />, text: "Dedicated Support", desc: "Direct communication channel" },
  { icon: <FaClock className="text-amber-600" />, text: "Fast Turnaround", desc: "Quick project completion" },
];

export default function Order() {
  const [packageType, setPackageType] = useState("Business");

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [budget, setBudget] = useState("");
  const [requirements, setRequirements] = useState("");

  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");
  const [okMsg, setOkMsg] = useState("");

  const validate = () => {
    if (!name.trim()) return "Please enter your name.";
    if (!packageType) return "Please select a package.";
    if (!requirements.trim()) return "Please describe your requirements.";
    if (phone.trim()) {
      const cleaned = phone.replace(/\s/g, "");
      if (!/^[0-9+]{9,15}$/.test(cleaned)) return "Please enter a valid phone number.";
    }
    if (email.trim()) {
      const cleaned = email.trim();
      if (!/^\S+@\S+\.\S+$/.test(cleaned)) return "Please enter a valid email address.";
    }
    return "";
  };

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOkMsg("");

    const v = validate();
    if (v) {
      setErr(v);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setSending(true);
    try {
      const payload = {
        name,
        email,
        phone,
        businessName,
        packageType,
        budget,
        requirements,
      };

      const res = await api("/api/orders", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setOkMsg(
        `✅ Quote Request Submitted Successfully!\n\nReference ID: ${res?.orderId || "N/A"}\nPackage: ${packageType}\n\nWe'll contact you within 24 hours with your custom quote. Thank you!`
      );

      // Reset form
      setName("");
      setBusinessName("");
      setEmail("");
      setPhone("");
      setBudget("");
      setRequirements("");
      setPackageType("Business");

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e2) {
      setErr(e2?.message || "Failed to submit order. Please try again or contact us directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
              <FaStar className="text-amber-500" />
              Premium Web Development Services
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Get Your Custom Website Quote
            </h1>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Professional web development tailored to your needs. Choose a package, 
              share your vision, and we'll deliver a stunning website that drives results.
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

        {/* Success/Error Messages */}
        <div className="mb-8 space-y-4">
          {err && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FaStar className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800 mb-1">Attention Required</h3>
                  <p className="text-red-700">{err}</p>
                </div>
              </div>
            </div>
          )}

          {okMsg && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FaCheckCircle className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-green-800 mb-2">Request Submitted! 🎉</h3>
                  <p className="text-green-700 whitespace-pre-line leading-relaxed">{okMsg}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Packages Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Package</h2>
              <p className="text-gray-600">Select the package that best fits your business needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {PACKAGES.map((p) => {
                const active = packageType === p.name;
                return (
                  <div
                    key={p.name}
                    onClick={() => setPackageType(p.name)}
                    className={`relative cursor-pointer border-2 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                      active 
                        ? `${p.color} border-purple-500 shadow-md` 
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    {/* {p.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold flex items-center gap-2">
                          <FaStar className="text-xs" /> MOST POPULAR
                        </div>
                      </div>
                    )} */}
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-3 rounded-lg bg-gray-50">
                              {p.icon}
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{p.name}</h3>
                              <div className="text-2xl font-bold text-gray-900 mt-1">{p.price}</div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{p.desc}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
                          active ? "border-purple-600 bg-purple-600" : "border-gray-300"
                        }`}>
                          {active && <FaCheckCircle className="text-white text-xs" />}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.features.map((feature, idx) => (
                            <span 
                              key={idx}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${p.highlight}`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <ul className="space-y-3">
                          {p.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Project Timeline */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <FaCalendarAlt className="text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Project Timeline</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { step: "1. Quote & Planning", time: "1-2 Days", color: "bg-purple-100 text-purple-800" },
                  { step: "2. Design Phase", time: "3-5 Days", color: "bg-blue-100 text-blue-800" },
                  { step: "3. Development", time: "5-10 Days", color: "bg-green-100 text-green-800" },
                  { step: "4. Testing & Launch", time: "2-3 Days", color: "bg-amber-100 text-amber-800" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center font-bold`}>
                        {idx + 1}
                      </div>
                      <span className="font-medium text-gray-900">{item.step}</span>
                    </div>
                    <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <FaShieldAlt className="text-gray-600" />
                  <h4 className="font-bold text-gray-900">What's Included</h4>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                    Free Domain Consultation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    Hosting Setup Assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    30 Days Free Support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                    Performance Optimization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Request Form */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Form Header */}
          <div className="p-8 border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                <FaMagic className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Your Custom Quote</h2>
                <p className="text-gray-600">Fill in the details below and we'll get back to you within 24 hours</p>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FormField
                label="Your Full Name *"
                icon={<FaUser className="text-gray-400" />}
                value={name}
                onChange={setName}
                placeholder="John Smith"
                required
              />
              <FormField
                label="Business Name"
                icon={<FaBuilding className="text-gray-400" />}
                value={businessName}
                onChange={setBusinessName}
                placeholder="Elite Digital Works"
              />
              <FormField
                label="Email Address"
                icon={<FaEnvelope className="text-gray-400" />}
                value={email}
                onChange={setEmail}
                placeholder="contact@company.com"
                type="email"
              />
              <FormField
                label="Phone / WhatsApp *"
                icon={<FaPhone className="text-gray-400" />}
                value={phone}
                onChange={setPhone}
                placeholder="07XXXXXXXX"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <FormField
                label="Budget Range (Optional)"
                icon={<span className="text-gray-600 font-bold">$</span>}
                value={budget}
                onChange={setBudget}
                placeholder="e.g., $500 - $1000"
              />
              <div>
                <label className="block font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FaCrown className="text-amber-500" />
                  Selected Package
                </label>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl font-semibold text-gray-900 flex items-center justify-between">
                  <span>{packageType}</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <label className="block font-semibold text-gray-900 mb-3">
                <span className="flex items-center gap-2">
                  <FaLightbulb className="text-amber-500" />
                  Project Requirements *
                  <span className="text-gray-500 text-sm font-normal">(describe what you need)</span>
                </span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4">
                  <FaClipboardList className="text-gray-400" />
                </div>
                <textarea
                  className="w-full min-h-[180px] bg-white border-2 border-gray-200 rounded-xl p-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder={`Example Requirements:
• Website type (Business, E-commerce, Portfolio, etc.)
• Specific features needed (contact forms, booking system, etc.)
• Design preferences or existing branding
• Preferred timeline or deadline
• Any special considerations or must-have features`}
                />
                <div className="text-sm text-gray-500 mt-2 flex justify-between">
                  <span>Be as detailed as possible for an accurate quote</span>
                  <span>{requirements.length}/2000 characters</span>
                </div>
              </div>
            </div>

            {/* Submit Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl p-6">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <FaUsers className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">What Happens Next?</p>
                    <p className="text-gray-600">
                      1. We review your request<br/>
                      2. Send detailed quote & timeline<br/>
                      3. Schedule a free consultation
                    </p>
                  </div>
                </div>

                <button
                  disabled={sending}
                  className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <span className="relative flex items-center gap-3">
                    {sending ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Processing Your Request...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Guarantee Section */}
        <div className="mt-12">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
                  <FaCertificate className="text-blue-600 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">30-day support & unlimited revisions</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
                  <FaShieldAlt className="text-green-600 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600">SSL encryption & daily backups</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-sm mb-4">
                  <FaHeadset className="text-purple-600 text-2xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Dedicated Support</h3>
                <p className="text-gray-600">Direct communication throughout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, icon, value, onChange, placeholder, type = "text", required = false }) {
  return (
    <div>
      <label className="block font-semibold text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">{icon}</div>
        <input
          type={type}
          className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 pl-12 text-gray-900 placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}