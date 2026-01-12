import React, { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";

function Stars({ n, size = "md", interactive = false, onChange }) {
  const value = Number.isFinite(Number(n)) ? Number(n) : 0;

  const renderStar = (index) => {
    const isFilled = index < Math.round(value);
    return (
      <button
        type="button"
        key={index}
        onClick={() => interactive && onChange?.(index + 1)}
        className={`${
          interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
        } ${size === "lg" ? "text-2xl" : size === "md" ? "text-xl" : "text-lg"}`}
        disabled={!interactive}
      >
        <span className={isFilled ? "text-yellow-500" : "text-slate-300"}>★</span>
      </button>
    );
  };

  return (
    <div className="flex items-center gap-0.5">
      {[0, 1, 2, 3, 4].map(renderStar)}
      <span className={`ml-2 font-bold ${size === "lg" ? "text-lg" : "text-sm"} text-slate-700`}>
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 200;

  const name = review?.name || "Anonymous";
  const comment = review?.comment || "";
  const businessName = review?.businessName || "";
  const rating = Number(review?.rating) || 0;

  return (
    <div className="group rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-slate-200 p-6 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center font-bold text-purple-700 text-lg">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{name}</h3>
              {businessName && (
                <p className="text-sm text-purple-600 font-medium">{businessName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Date */}
        <span className="text-xs text-slate-500 font-medium px-3 py-1 bg-slate-100 rounded-full">
          {review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : "Recently"}
        </span>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <Stars n={rating} />
      </div>

      {/* Comment */}
      <div className="relative">
        <p className="text-slate-700 leading-relaxed">
          {expanded || comment.length <= maxLength ? comment : `${comment.substring(0, maxLength)}...`}
        </p>

        {comment.length > maxLength && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    name: "",
    businessName: "",
    rating: 5,
    comment: "",
  });

  const [hoverRating, setHoverRating] = useState(0);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  async function load() {
    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await api("/api/reviews");

      // ✅ FIX: backend returns { ok:true, items:[...] }
      const items = Array.isArray(res.items) ? res.items : [];
      setReviews(items);
    } catch (e) {
      setReviews([]);
      setMsg({ type: "err", text: e.message || "Failed to load reviews" });
    } finally {
      setLoading(false);
    }
  }

  async function submit(e) {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!form.name.trim() || !form.comment.trim()) {
      setMsg({ type: "err", text: "Please fill Name and Comment fields." });
      return;
    }

    try {
      // ✅ requires backend route POST /api/reviews (I give below)
      await api("/api/reviews", {
        method: "POST",
        body: JSON.stringify({
          name: form.name.trim(),
          businessName: form.businessName.trim(),
          rating: Number(form.rating),
          comment: form.comment.trim(),
        }),
      });

      setMsg({
        type: "ok",
        text: "Thank you! Your review has been submitted.",
      });

      setForm({ name: "", businessName: "", rating: 5, comment: "" });
      setHoverRating(0);

      // Don't reload immediately because new review is pending (not approved yet)
      // But you can still refresh approved list if you want:
      // setTimeout(() => load(), 1000);
    } catch (e) {
      setMsg({ type: "err", text: e.message || "Failed to submit review" });
    }
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    const total = reviews.length;

    let sum = 0;
    for (const r of reviews) {
      const rt = Math.max(1, Math.min(5, Number(r?.rating) || 0));
      sum += rt;
      if (distribution[rt] !== undefined) distribution[rt] += 1;
    }

    const average = total ? sum / total : 0;

    return { average, total, distribution };
  }, [reviews]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-4">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></span>
            <span className="text-sm font-bold text-purple-700 uppercase tracking-wider">
              Client Testimonials
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">
            What Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Clients Say
            </span>
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl mx-auto">
            Real feedback from businesses that trusted us with their digital presence.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="mb-12">
          <div className="rounded-3xl bg-gradient-to-r from-white to-slate-50 border border-slate-200 p-6 md:p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 mb-2">
                  {stats.average.toFixed(1)}
                </div>
                <Stars n={stats.average} size="lg" />
                <p className="text-slate-600 mt-2">Average Rating</p>
              </div>

              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 mb-2">{stats.total}</div>
                <p className="text-slate-600">Total Reviews</p>
              </div>

              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => {
                  const count = stats.distribution[rating] || 0;
                  const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;

                  return (
                    <div key={rating} className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-700 w-8">{rating}★</span>
                      <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 w-12 text-right">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Reviews */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Client Reviews</h2>
                  <p className="text-slate-600">Only approved reviews are displayed</p>
                </div>
                <button
                  type="button"
                  onClick={load}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 text-slate-900 font-bold hover:from-slate-200 hover:to-slate-300 transition-all duration-300 border border-slate-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>

              {msg.text && (
                <div
                  className={`mb-6 rounded-xl p-4 border ${
                    msg.type === "ok"
                      ? "bg-green-50 border-green-200 text-green-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {msg.text}
                </div>
              )}

              {loading ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6">Loading reviews…</div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Reviews Yet</h3>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Be the first to share your experience and help others.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Submit Review */}
          <div className="lg:col-span-1">
            <form
              onSubmit={submit}
              className="rounded-3xl bg-gradient-to-b from-white to-slate-50 border border-slate-200 p-6 md:p-8 shadow-lg sticky top-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Share Your Experience</h2>
                <p className="text-slate-600 mt-2">
                  Your review will appear after approval to maintain quality.
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <label className="block text-sm font-bold text-slate-700">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="space-y-2 mb-4">
                <label className="block text-sm font-bold text-slate-700">Business Name (Optional)</label>
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={onChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  placeholder="Your Company Inc."
                />
              </div>

              <div className="space-y-2 mb-4">
                <label className="block text-sm font-bold text-slate-700">
                  Rating <span className="text-slate-500 font-normal">({form.rating}/5)</span>
                </label>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setForm((s) => ({ ...s, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-3xl transition-all duration-200 hover:scale-110"
                      >
                        <span className={star <= (hoverRating || form.rating) ? "text-yellow-500" : "text-slate-300"}>
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="block text-sm font-bold text-slate-700">
                  Your Experience <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={onChange}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3.5 bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 min-h-[140px] resize-none"
                  placeholder="Tell us about your experience working with us..."
                  required
                />
                <div className="text-right">
                  <span className={`text-xs ${form.comment.length > 500 ? "text-red-500" : "text-slate-500"}`}>
                    {form.comment.length}/500
                  </span>
                </div>
              </div>

              <button type="submit" className="relative w-full group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  Submit Your Review
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
