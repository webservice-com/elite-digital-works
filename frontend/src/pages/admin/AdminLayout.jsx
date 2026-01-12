import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken } from "../../lib/auth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const cls = ({ isActive }) =>
    `px-3 py-2 rounded-xl font-bold transition ${
      isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
    }`;

  function logout() {
    clearToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-extrabold">
              ← Back to Site
            </Link>
            <span className="text-slate-300">|</span>
            <span className="font-extrabold">Admin Panel</span>
          </div>

          <nav className="flex items-center gap-2">
            <NavLink to="/admin/dashboard" className={cls}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/orders" className={cls}>
              Orders
            </NavLink>
            <NavLink to="/admin/reviews" className={cls}>
              Reviews
            </NavLink>
            <NavLink to="/admin/portfolio" className={cls}>
              Portfolio
            </NavLink>
            <button
              onClick={logout}
              className="px-3 py-2 rounded-xl font-bold border border-slate-300 hover:bg-slate-50"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
