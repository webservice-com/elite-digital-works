import React, { useEffect, useMemo, useState } from "react";
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
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setMsg("");
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Admin token missing. Please login again.");

      const headers = { Authorization: `Bearer ${token}` };

      const [o, r] = await Promise.all([
        api("/api/admin/orders", { headers }),
        api("/api/admin/reviews", { headers }),
      ]);

      // ✅ BACKEND RETURNS: { ok: true, items: [...] }
      setOrders(o.items || []);
      setReviews(r.items || []);
    } catch (e) {
      setMsg(e.message || "Failed to load dashboard");
      setOrders([]);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const byStatus = {
      New: 0,
      "In Progress": 0,
      Completed: 0,
      Cancelled: 0,
      Other: 0,
    };

    orders.forEach((o) => {
      const s = o?.status || "Other";
      if (byStatus[s] !== undefined) byStatus[s] += 1;
      else byStatus.Other += 1;
    });

    const totalReviews = reviews.length;
    const pendingReviews = reviews.filter((x) => !x?.approved).length;
    const approvedReviews = reviews.filter((x) => !!x?.approved).length;

    const recentOrders = [...orders]
      .sort((a, b) => {
        const da = safeDate(a?.createdAt);
        const db = safeDate(b?.createdAt);
        return (db?.getTime() || 0) - (da?.getTime() || 0);
      })
      .slice(0, 5);

    const recentReviews = [...reviews]
      .sort((a, b) => {
        const da = safeDate(a?.createdAt);
        const db = safeDate(b?.createdAt);
        return (db?.getTime() || 0) - (da?.getTime() || 0);
      })
      .slice(0, 5);

    return {
      totalOrders,
      byStatus,
      totalReviews,
      pendingReviews,
      approvedReviews,
      recentOrders,
      recentReviews,
    };
  }, [orders, reviews]);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-extrabold">Dashboard</h2>
          <p className="text-slate-600 mt-1">
            Quick overview of orders and review approvals.
          </p>
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
          {/* Top stats */}
          <section className="grid md:grid-cols-4 gap-4">
            <StatCard label="Total Orders" value={stats.totalOrders} />
            <StatCard
              label="New Orders"
              value={stats.byStatus.New || 0}
              sub="Needs follow-up"
            />
            <StatCard
              label="Pending Reviews"
              value={stats.pendingReviews}
              sub="Approve to show publicly"
            />
            <StatCard
              label="Completed Orders"
              value={stats.byStatus.Completed || 0}
              sub="Delivered projects"
            />
          </section>

          {/* Status breakdown */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold">Orders by Status</h3>
            <div className="mt-4 grid md:grid-cols-5 gap-3">
              {Object.entries(stats.byStatus).map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-2xl border border-slate-200 p-4 bg-slate-50"
                >
                  <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
                    {k}
                  </p>
                  <p className="text-2xl font-extrabold mt-2">{v}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent lists */}
          <section className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Latest Orders</h3>
              <div className="mt-4 space-y-3">
                {stats.recentOrders.map((o) => {
                  const d = safeDate(o?.createdAt);
                  return (
                    <div
                      key={o._id}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-extrabold">{o?.name || "—"}</p>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                          {o?.status || "New"}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 mt-1">
                        {o?.packageType || "—"} • {o?.businessName || "—"}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">
                        {d ? d.toLocaleString() : "—"}
                      </p>
                    </div>
                  );
                })}

                {stats.recentOrders.length === 0 && (
                  <p className="text-slate-600">No orders yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-extrabold">Latest Reviews</h3>
              <div className="mt-4 space-y-3">
                {stats.recentReviews.map((r) => {
                  const d = safeDate(r?.createdAt);
                  return (
                    <div
                      key={r._id}
                      className="rounded-2xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-extrabold">
                          {r?.name || "—"}{" "}
                          <span className="text-slate-500 font-semibold">
                            ({r?.rating ?? "—"}/5)
                          </span>
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

                      <p className="text-sm text-slate-700 mt-2 line-clamp-2">
                        {r?.comment || "—"}
                      </p>

                      <p className="text-xs text-slate-500 mt-2">
                        {d ? d.toLocaleString() : "—"}
                      </p>
                    </div>
                  );
                })}

                {stats.recentReviews.length === 0 && (
                  <p className="text-slate-600">No reviews yet.</p>
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
