// frontend/src/lib/api.js

const DEV_FALLBACK = "http://localhost:5000";

function stripSlashEnd(url) {
  return String(url || "").replace(/\/+$/, "");
}

function stripSlashStart(path) {
  return String(path || "").replace(/^\/+/, "");
}

function isLocalHost() {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1";
}

function getEnvBase() {
  // supports both names (in case you used VITE_API_BASE_URL earlier)
  const raw =
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "";

  return stripSlashEnd(raw);
}

function getBase() {
  const base = getEnvBase();

  // ✅ If env is set, use it
  if (base) return base;

  // ✅ Local dev fallback
  if (isLocalHost()) return DEV_FALLBACK;

  // ✅ Production MUST have env
  throw new Error(
    "API is not configured. Set VITE_API_URL in Cloudflare Pages (Production + Preview) and redeploy."
  );
}

// Optional API key support
const API_KEY = import.meta.env.VITE_API_KEY || "";

/**
 * api("/api/admin/portfolio", { method: "POST", body: JSON.stringify(payload), token })
 * api("/api/admin/portfolio/123/media", { method: "POST", body: formData, token })
 */
export async function api(path, options = {}) {
  const base = getBase();
  const cleanPath = stripSlashStart(path);
  const url = `${base}/${cleanPath}`;

  const headers = { ...(options.headers || {}) };

  // token support (you can pass token: "xxx" or use headers yourself)
  if (options.token && !headers.Authorization) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  // API key support
  if (API_KEY) {
    headers["x-api-key"] = API_KEY;
    headers["api_key"] = API_KEY;
  }

  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  // JSON content-type only when not FormData
  if (!isFormData && options.body !== undefined && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers,
    });
  } catch (err) {
    throw new Error(
      `Network error. Cannot reach API server (${base}). Check backend URL and CORS.`
    );
  }

  // Parse response
  const contentType = res.headers.get("content-type") || "";
  let data = {};

  if (contentType.includes("application/json")) {
    data = await res.json().catch(() => ({}));
  } else {
    const text = await res.text().catch(() => "");
    data = text ? { message: text } : {};
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      `Request failed (${res.status}) ${res.statusText || ""}`.trim();

    // 🔥 add URL info for easier debugging
    throw new Error(`${msg} | URL: ${url}`);
  }

  return data;
}

// Export resolved base for media URL building (Portfolio page uses this)
export const API_BASE = getEnvBase();
