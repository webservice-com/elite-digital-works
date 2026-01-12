import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import { setToken } from "../../lib/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@elitedigitalworks.com");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await api("/api/admin/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(res.token);
      navigate("/admin", { replace: true });
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold">Admin Login</h1>
        <p className="text-slate-600 mt-2">Private access only.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-bold text-slate-700">Email</label>
            <input
              className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input
              className="mt-1 w-full border border-slate-300 rounded-xl px-4 py-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter admin password"
            />
          </div>

          {msg && (
            <div className="rounded-xl px-4 py-3 text-sm font-semibold bg-red-50 text-red-800 border border-red-200">
              {msg}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full rounded-xl bg-slate-900 text-white font-extrabold py-3 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-xs text-slate-500">
            URL: <span className="font-semibold">/admin/login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
