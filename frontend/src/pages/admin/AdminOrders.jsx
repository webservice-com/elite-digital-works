import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { getToken } from "../../lib/auth";

const STATUSES = ["New", "In Progress", "Completed", "Cancelled"];

function preview(text, max = 90) {
  const t = String(text || "").trim();
  if (!t) return "-";
  return t.length > max ? t.slice(0, max) + "…" : t;
}

function OrderDetailsModal({ open, order, onClose, onChangeStatus }) {
  if (!open || !order) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b bg-slate-50">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Order Details
            </h3>
            <p className="text-sm text-slate-600">
              ID: <span className="font-mono">{order._id}</span>
            </p>
          </div>

          <button
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        <div className="p-5 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Customer */}
          <div className="rounded-xl border border-slate-200 p-4">
            <h4 className="font-extrabold text-slate-900 mb-3">Customer</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Name</p>
                <p className="font-bold text-slate-900">{order.name || "-"}</p>
              </div>
              <div>
                <p className="text-slate-500">Business</p>
                <p className="font-bold text-slate-900">
                  {order.businessName || "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <p className="font-bold text-slate-900">{order.email || "-"}</p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="font-bold text-slate-900">{order.phone || "-"}</p>
              </div>
            </div>
          </div>

          {/* Package & Status */}
          <div className="rounded-xl border border-slate-200 p-4">
            <h4 className="font-extrabold text-slate-900 mb-3">
              Package & Status
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Package</p>
                <p className="font-bold text-slate-900">
                  {order.packageType || "-"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Budget</p>
                <p className="font-bold text-slate-900">{order.budget || "-"}</p>
              </div>

              <div>
                <p className="text-slate-500">Status</p>
                <select
                  value={order.status || "New"}
                  onChange={(e) => onChangeStatus(order._id, e.target.value)}
                  className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 bg-white font-semibold"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="text-slate-500">Created At</p>
                <p className="font-bold text-slate-900">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-xl border border-slate-200 p-4">
            <h4 className="font-extrabold text-slate-900 mb-3">
              Order Description
            </h4>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 whitespace-pre-line text-sm text-slate-800">
              {order.requirements?.trim() ? order.requirements : "—"}
            </div>
          </div>
        </div>

        <div className="p-5 border-t bg-slate-50 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");
  const [selected, setSelected] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const authHeaders = () => {
    const token = getToken();
    if (!token) throw new Error("Admin token missing. Please login again.");
    return { Authorization: `Bearer ${token}` };
  };

  const closeModal = () => {
    setDetailsOpen(false);
    // optional: keep selected cached or clear it
    // setSelected(null);
  };

  async function load() {
    setMsg("");
    setLoading(true);
    try {
      const res = await api("/api/admin/orders", {
        headers: authHeaders(),
      });
      setOrders(res.items || []);
    } catch (e) {
      setOrders([]);
      setMsg(e.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  async function openDetails(order) {
    setMsg("");
    try {
      const full = await api(`/api/admin/orders/${order._id}`, {
        headers: authHeaders(),
      });
      setSelected(full.item);
      setDetailsOpen(true);
    } catch (e) {
      setMsg(e.message || "Failed to load order details");
    }
  }

  async function setStatus(id, status) {
    setMsg("");
    try {
      const res = await api(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });

      const updated = res?.item;
      if (!updated) throw new Error("Status updated but no item returned.");

      // update list
      setOrders((prev) => prev.map((o) => (o._id === id ? updated : o)));

      // update modal selected
      setSelected((prev) => (prev?._id === id ? updated : prev));
    } catch (e) {
      setMsg(e.message || "Failed to update status");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold">Orders</h2>
          <p className="text-slate-600 mt-1">Manage customer requests.</p>
        </div>

        <button
          onClick={load}
          className="px-4 py-2 rounded-xl border border-slate-300 bg-white font-bold hover:bg-slate-50"
          type="button"
        >
          Refresh
        </button>
      </div>

      {msg && (
        <div className="mt-4 rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm font-semibold">
          {msg}
        </div>
      )}

      <OrderDetailsModal
        open={detailsOpen}
        order={selected}
        onClose={closeModal}
        onChangeStatus={setStatus}
      />

      <div className="mt-6 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Customer</th>
              <th className="py-2">Package</th>
              <th className="py-2">Contact</th>
              <th className="py-2">Description</th>
              <th className="py-2">Status</th>
              <th className="py-2">Created</th>
              <th className="py-2"></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-6 text-slate-600">
                  Loading orders...
                </td>
              </tr>
            ) : (
              orders.map((o) => (
                <tr key={o._id} className="border-t align-top">
                  <td className="py-3">
                    <p className="font-bold">{o.name || "-"}</p>
                    <p className="text-slate-500">{o.businessName || "-"}</p>
                  </td>

                  <td className="py-3 font-semibold">{o.packageType || "-"}</td>

                  <td className="py-3 text-slate-700">
                    <div>{o.email || "-"}</div>
                    <div>{o.phone || "-"}</div>
                  </td>

                  <td className="py-3 text-slate-700 max-w-[380px]">
                    <div className="whitespace-pre-line">
                      {preview(o.requirements, 120)}
                    </div>
                  </td>

                  <td className="py-3">
                    <select
                      value={o.status || "New"}
                      onChange={(e) => setStatus(o._id, e.target.value)}
                      className="border border-slate-300 rounded-lg px-3 py-2 bg-white"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 text-slate-500">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}
                  </td>

                  <td className="py-3 text-right">
                    <button
                      onClick={() => openDetails(o)}
                      className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800"
                      type="button"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {!loading && orders.length === 0 && (
          <p className="text-slate-600 mt-4">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
