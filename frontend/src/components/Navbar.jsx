import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import {
  FaHome,
  FaUser,
  FaTag,
  FaShoppingCart,
  FaImages,
  FaStar,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home", icon: <FaHome className="text-lg" /> },
    { path: "/about", label: "About Us", icon: <FaUser className="text-lg" /> },
    { path: "/pricing", label: "Pricing", icon: <FaTag className="text-lg" /> },
    { path: "/order", label: "Get Quote", icon: <FaShoppingCart className="text-lg" /> },
    { path: "/portfolio", label: "Portfolio", icon: <FaImages className="text-lg" /> },
    { path: "/reviews", label: "Reviews", icon: <FaStar className="text-lg" /> },
  ];

  const NavLinkItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;

    return (
      <NavLink
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={`
          relative px-4 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3
          ${
            isActive
              ? "text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/30"
              : "text-slate-700 hover:text-purple-700 hover:bg-purple-50"
          }
        `}
      >
        {icon}
        <span>{label}</span>

        {isActive && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
        )}
      </NavLink>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="relative">
              <img
                src={logo}
                alt="Elite Digital Works"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-md group-hover:blur-xl transition-all duration-500" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-xl bg-gradient-to-r from-slate-900 to-purple-700 bg-clip-text text-transparent">
                Elite Digital Works
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Premium Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.path}
                to={link.path}
                icon={link.icon}
                label={link.label}
              />
            ))}

            {/* CTA Button */}
            <Link
              to="/order"
              className="ml-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <FaShoppingCart />
              <span>Get Started</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 hover:from-slate-200 hover:to-slate-100 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* ✅ Mobile Backdrop (prevents “click not working” issues) */}
      {isMenuOpen && (
        <button
          className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu backdrop"
        />
      )}

      {/* ✅ Mobile Menu (position fixed below navbar) */}
      <div
        className={`
          lg:hidden fixed inset-x-4 top-[76px] z-50 bg-white rounded-2xl shadow-2xl border border-slate-200
          transition-all duration-300 transform origin-top
          ${isMenuOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"}
        `}
      >
        <div className="p-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300
                ${
                  location.pathname === link.path
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                }
              `}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}

          <div className="pt-3 border-t border-slate-200">
            <Link
              to="/order"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              <FaShoppingCart />
              <span>Start Your Project</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
