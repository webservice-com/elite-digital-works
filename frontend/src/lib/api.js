// frontend/src/lib/api.js

// Base URL from Cloudflare Pages env var
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Local dev fallback ONLY when running on localhost
const DEV_FALLBACK = "http://localhost:5000";
const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

function getBase() {
  if (API_BASE) return API_BASE;
  if (isLocalDev) return DEV_FALLBACK;

  // In production, don't silently call localhost
  throw new Error(
    "VITE_API_URL is not set. Add it in Cloudflare Pages → Settings → Environment variables (Production + Preview)."
  );
}

export async function api(path, options = {}) {
  const base = getBase();

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const headers = { ...(options.headers || {}) };

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  // Set JSON header ONLY when body is not FormData and Content-Type not already set
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${base}${cleanPath}`, {
    ...options,
    headers,
  });

  // Try JSON first; fallback to text
  const text = await res.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text || "Request failed" };
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed (${res.status})`);
  }

  return data;
}
