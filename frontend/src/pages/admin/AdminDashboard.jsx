import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { getToken } from "../../lib/auth";

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
        {label}
      </p>
      <p className="text-3xl font-extrabold mt-2">{value}</p>
      {sub && <p className="text-sm text-slate-600 mt-1">{sub}</p>}
    </div>
  );
}

function safeDate(d) {
  const x = new Date(d);
  return isNaN(x.getTime()) ? null : x;
}

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setMsg("");
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Admin token missing. Please login again.");

      const headers = { Authorization: `Bearer ${token}` };
      const res = await api("/api/admin/dashboard", { headers });

      setData(res);
    } catch (e) {
      setMsg(e.message || "Failed to load dashboard");
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const cards = data?.cards || {};
  const statusMap = data?.statusMap || { New: 0, "In Progress": 0, Completed: 0, Cancelled: 0 };
  const latestOrders = data?.latestOrders || [];
  const latestReviews = data?.latestReviews || [];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-extrabold">Dashboard</h2>
          <p className="text-slate-600 mt-1">Quick overview of orders and review approvals.</p>
        </div>

        <button
          onClick={load}
          className="px-4 py-2 rounded-xl font-bold border border-slate-300 bg-white hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {msg && (
        <div className="rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm font-semibold">
          {msg}
        </div>
      )}

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          Loading dashboard...
        </div>
      ) : (
        <>
          <section className="grid md:grid-cols-4 gap-4">
            <StatCard label="Total Orders" value={cards.totalOrders ?? 0} />
            <StatCard label="New Orders" value={cards.newOrders ?? 0} sub="Needs follow-up" />
            <StatCard label="Pending Reviews" value={cards.pendingReviews ?? 0} sub="Approve to show publicly" />
            <StatCard label="Completed Orders" value={cards.completedOrders ?? 0} sub="Delivered projects" />
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold">Orders by Status</h3>
            <div className="mt-4 grid md:grid-cols-4 gap-3">
              {Object.entries(statusMap).map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-slate-200 p-4 bg-slate-50">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">{k}</p>
                  <p className="text-2xl font-extrabold mt-2">{v}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Latest Orders</h3>
              <div className="mt-4 space-y-3">
                {latestOrders.map((o) => {
                  const d = safeDate(o?.createdAt);
                  return (
                    <div key={o._id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-extrabold">{o?.name || "—"}</p>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                          {o?.status || "New"}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {o?.packageType || "—"} • {o?.businessName || "—"}
                      </p>
                      <p className="text-xs text-slate-500 mt-2">{d ? d.toLocaleString() : "—"}</p>
                    </div>
                  );
                })}
                {latestOrders.length === 0 && <p className="text-slate-600">No orders yet.</p>}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Latest Reviews</h3>
              <div className="mt-4 space-y-3">
                {latestReviews.map((r) => {
                  const d = safeDate(r?.createdAt);
                  return (
                    <div key={r._id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-extrabold">
                          {r?.name || "—"}{" "}
                          <span className="text-slate-500 font-semibold">({r?.rating ?? "—"}/5)</span>
                        </p>
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full border ${
                            r?.approved
                              ? "bg-green-50 text-green-800 border-green-200"
                              : "bg-amber-50 text-amber-800 border-amber-200"
                          }`}
                        >
                          {r?.approved ? "Approved" : "Pending"}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 mt-2 line-clamp-2">{r?.comment || "—"}</p>
                      <p className="text-xs text-slate-500 mt-2">{d ? d.toLocaleString() : "—"}</p>
                    </div>
                  );
                })}
                {latestReviews.length === 0 && <p className="text-slate-600">No reviews yet.</p>}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
