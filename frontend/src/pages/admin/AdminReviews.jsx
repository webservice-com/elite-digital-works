import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { getToken } from "../../lib/auth";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setMsg("");
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error("Admin token missing. Please login again.");

      const res = await api("/api/admin/reviews", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ backend returns { ok:true, items:[...] }
      setReviews(res.items || []);
    } catch (e) {
      setMsg(e.message || "Failed to load reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  async function toggleApprove(id, approvedNow) {
    setMsg("");
    try {
      const token = getToken();
      if (!token) throw new Error("Admin token missing. Please login again.");

      // ✅ correct endpoints
      const url = approvedNow
        ? `/api/admin/reviews/${id}/hide`
        : `/api/admin/reviews/${id}/approve`;

      await api(url, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });

      load();
    } catch (e) {
      setMsg(e.message || "Failed to update review");
    }
  }

  async function remove(id) {
    if (!window.confirm("Delete this review?")) return;
    setMsg("");
    try {
      const token = getToken();
      if (!token) throw new Error("Admin token missing. Please login again.");

      await api(`/api/admin/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      load();
    } catch (e) {
      setMsg(e.message || "Failed to delete review");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-extrabold">Reviews</h2>
          <p className="text-slate-600 mt-1">Approve to show publicly.</p>
        </div>

        <button
          onClick={load}
          className="px-4 py-2 rounded-xl font-bold border border-slate-300 bg-white hover:bg-slate-50"
        >
          Refresh
        </button>
      </div>

      {msg && (
        <div className="mt-4 rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm font-semibold">
          {msg}
        </div>
      )}

      {loading ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          Loading reviews...
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="rounded-2xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-extrabold">
                    {r.name}{" "}
                    <span className="text-slate-500 font-semibold">
                      ({r.rating}/5)
                    </span>
                  </p>

                  {/* keep safe: businessName might not exist in schema */}
                  {r.businessName ? (
                    <p className="text-sm text-slate-500">{r.businessName}</p>
                  ) : null}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleApprove(r._id, r.approved)}
                    className={`px-4 py-2 rounded-xl font-bold ${
                      r.approved
                        ? "bg-slate-100 border border-slate-300"
                        : "bg-slate-900 text-white"
                    }`}
                  >
                    {r.approved ? "Unapprove" : "Approve"}
                  </button>

                  <button
                    onClick={() => remove(r._id)}
                    className="px-4 py-2 rounded-xl font-bold border border-red-200 text-red-700 bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-slate-700 mt-3">{r.comment}</p>

              <p className="text-xs text-slate-500 mt-3">
                Status:{" "}
                <span className="font-bold">
                  {r.approved ? "Approved" : "Pending"}
                </span>{" "}
                • {r.createdAt ? new Date(r.createdAt).toLocaleString() : "—"}
              </p>
            </div>
          ))}

          {reviews.length === 0 && (
            <p className="text-slate-600">No reviews yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
