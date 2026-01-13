// frontend/src/lib/api.js

export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Allow localhost ONLY when running locally
const DEV_FALLBACK = "http://localhost:5000";
const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

function getBase() {
  if (API_BASE) return API_BASE;
  if (isLocalDev) return DEV_FALLBACK;

  // Production: don't silently hit localhost
  throw new Error(
    "VITE_API_URL is not set. Set it in Cloudflare Pages → Settings → Environment variables (Production + Preview)."
  );
}

export async function api(path, options = {}) {
  const base = getBase();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const headers = { ...(options.headers || {}) };

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${base}${cleanPath}`, {
    ...options,
    headers,
  });

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
