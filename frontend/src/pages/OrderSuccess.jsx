import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-3xl bg-white border border-slate-200 p-8 md:p-12 shadow-sm text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-green-700 text-3xl font-extrabold">✓</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold mt-6">
          Order Submitted Successfully
        </h1>

        <p className="text-slate-600 mt-4 text-lg">
          Thank you for contacting Elite Digital Works.  
          We’ve received your project request and will get back to you shortly.
        </p>

        {orderId && (
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 inline-block">
            <p className="text-sm text-slate-500">Order Reference</p>
            <p className="font-mono font-bold text-slate-900">{orderId}</p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-7 py-3 rounded-xl bg-slate-900 text-white font-extrabold hover:opacity-95"
          >
            Back to Home
          </Link>

          <Link
            to="/pricing"
            className="px-7 py-3 rounded-xl border border-slate-300 bg-white font-extrabold hover:bg-slate-50"
          >
            View Packages
          </Link>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          If you need urgent assistance, feel free to contact us via WhatsApp.
        </p>
      </div>
    </div>
  );
}
