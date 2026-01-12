import React, { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { getToken } from "../../lib/auth";

const STATUSES = ["New", "In Progress", "Completed", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    try {
      const res = await api("/api/admin/orders", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setOrders(res.items || []); // ✅ FIX
    } catch (e) {
      setMsg(e.message);
    }
  }

  async function setStatus(id, status) {
    setMsg("");
    try {
      await api(`/api/admin/orders/${id}/status`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ status }),
      });
      load();
    } catch (e) {
      setMsg(e.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
      <h2 className="text-2xl font-extrabold">Orders</h2>
      <p className="text-slate-600 mt-1">Manage customer requests.</p>

      {msg && (
        <div className="mt-4 rounded-xl bg-red-50 text-red-800 border border-red-200 px-4 py-3 text-sm font-semibold">
          {msg}
        </div>
      )}

      <div className="mt-6 overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500">
              <th className="py-2">Customer</th>
              <th className="py-2">Package</th>
              <th className="py-2">Contact</th>
              <th className="py-2">Status</th>
              <th className="py-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t">
                <td className="py-3">
                  <p className="font-bold">{o.name}</p>
                  <p className="text-slate-500">{o.businessName || "-"}</p>
                </td>
                <td className="py-3 font-semibold">{o.packageType}</td>
                <td className="py-3 text-slate-700">
                  <div>{o.email || "-"}</div>
                  <div>{o.phone || "-"}</div>
                </td>
                <td className="py-3">
                  <select
                    value={o.status}
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
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-slate-600 mt-4">No orders yet.</p>
        )}
      </div>
    </div>
  );
}
