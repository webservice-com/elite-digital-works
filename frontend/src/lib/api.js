// frontend/src/lib/api.js

// ✅ Backend base URL (example: https://your-backend.onrender.com)
// Set this in your hosting Environment Variables as VITE_API_URL
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// ✅ Optional API key (if your backend requires it)
// Set this as VITE_API_KEY in hosting Environment Variables
const API_KEY = import.meta.env.VITE_API_KEY || "";

// ✅ Local dev fallback only when running locally
const DEV_FALLBACK = "http://localhost:5000";
const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

function getBase() {
  if (API_BASE) return API_BASE;
  if (isLocalDev) return DEV_FALLBACK;

  // ✅ Production must have VITE_API_URL set
  throw new Error(
    "VITE_API_URL is not set. Add it in your hosting Environment Variables (Production + Preview) and redeploy."
  );
}

/**
 * api("/api/admin/portfolio", { method: "POST", body: JSON.stringify(payload) })
 * api("/api/admin/portfolio", { method: "POST", body: formData })
 */
export async function api(path, options = {}) {
  const base = getBase();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const headers = { ...(options.headers || {}) };

  // ✅ Detect FormData (do NOT set Content-Type manually for it)
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  // ✅ Attach API key if provided (safe)
  if (API_KEY) {
    headers["x-api-key"] = API_KEY;
    headers["api_key"] = API_KEY; // optional extra (some backends check this)
  }

  // ✅ JSON requests only
  if (!isFormData && options.body !== undefined && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${base}${cleanPath}`, {
    ...options,
    headers,
    // Optional: include cookies only if you use cookie auth
    // credentials: "include",
  });

  // Try JSON first, fallback to text
  const contentType = res.headers.get("content-type") || "";
  let data;

  if (contentType.includes("application/json")) {
    data = await res.json().catch(() => ({}));
  } else {
    const text = await res.text().catch(() => "");
    data = text ? { message: text } : {};
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}
