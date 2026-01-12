import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Customer pages
import Home from "./pages/Home";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Portfolio from "./pages/Portfolio";
import Order from "./pages/Order";
import OrderSuccess from "./pages/OrderSuccess";
import Reviews from "./pages/Reviews";

// Admin pages
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminPortfolio from "./pages/admin/AdminPortfolio"; // ✅ ADD THIS

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          {/* ✅ CUSTOMER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order/success" element={<OrderSuccess />} />
          <Route path="/reviews" element={<Reviews />} />

          {/* ✅ ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="portfolio" element={<AdminPortfolio />} /> {/* ✅ ADD THIS */}
          </Route>

          {/* ✅ 404 */}
          <Route
            path="*"
            element={<div className="text-lg font-bold">404 Not Found</div>}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
