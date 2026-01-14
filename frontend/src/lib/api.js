// // // // frontend/src/lib/api.js

// // // export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// // // // Allow localhost ONLY when running locally
// // // const DEV_FALLBACK = "http://localhost:5000";
// // // const isLocalDev =
// // //   typeof window !== "undefined" &&
// // //   (window.location.hostname === "localhost" ||
// // //     window.location.hostname === "127.0.0.1");

// // // function getBase() {
// // //   if (API_BASE) return API_BASE;
// // //   if (isLocalDev) return DEV_FALLBACK;

// // //   // Production: don't silently hit localhost
// // //   throw new Error(
// // //     "VITE_API_URL is not set. Set it in Cloudflare Pages → Settings → Environment variables (Production + Preview)."
// // //   );
// // // }

// // // export async function api(path, options = {}) {
// // //   const base = getBase();
// // //   const cleanPath = path.startsWith("/") ? path : `/${path}`;

// // //   const headers = { ...(options.headers || {}) };

// // //   const isFormData =
// // //     typeof FormData !== "undefined" && options.body instanceof FormData;

// // //   if (!isFormData && !headers["Content-Type"]) {
// // //     headers["Content-Type"] = "application/json";
// // //   }

// // //   const res = await fetch(`${base}${cleanPath}`, {
// // //     ...options,
// // //     headers,
// // //   });

// // //   const text = await res.text();
// // //   let data = {};
// // //   try {
// // //     data = text ? JSON.parse(text) : {};
// // //   } catch {
// // //     data = { message: text || "Request failed" };
// // //   }

// // //   if (!res.ok) {
// // //     throw new Error(data?.message || `Request failed (${res.status})`);
// // //   }

// // //   return data;
// // // }
// // // frontend/src/lib/api.js

// // export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
// // const API_KEY = import.meta.env.VITE_API_KEY || "";

// // // Allow localhost ONLY when running locally
// // const DEV_FALLBACK = "http://localhost:5000";
// // const isLocalDev =
// //   typeof window !== "undefined" &&
// //   (window.location.hostname === "localhost" ||
// //     window.location.hostname === "127.0.0.1");

// // function getBase() {
// //   if (API_BASE) return API_BASE;
// //   if (isLocalDev) return DEV_FALLBACK;

// //   // Production: don't silently hit localhost
// //   throw new Error(
// //     "VITE_API_URL is not set. Set it in Cloudflare Pages → Settings → Environment variables (Production + Preview)."
// //   );
// // }

// // export async function api(path, options = {}) {
// //   const base = getBase();
// //   const cleanPath = path.startsWith("/") ? path : `/${path}`;

// //   const headers = { ...(options.headers || {}) };

// //   // ✅ Detect FormData (DON'T set Content-Type for it)
// //   const isFormData =
// //     typeof FormData !== "undefined" && options.body instanceof FormData;

// //   // ✅ Always attach API key (send BOTH header names to be safe)
// //   // Some backends check "x-api-key", some check "api_key"
// //   if (API_KEY) {
// //     headers["x-api-key"] = API_KEY;
// //     headers["api_key"] = API_KEY;
// //   }

// //   if (!isFormData && !headers["Content-Type"]) {
// //     headers["Content-Type"] = "application/json";
// //   }

// //   const res = await fetch(`${base}${cleanPath}`, {
// //     ...options,
// //     headers,
// //   });

// //   const text = await res.text();
// //   let data = {};
// //   try {
// //     data = text ? JSON.parse(text) : {};
// //   } catch {
// //     data = { message: text || "Request failed" };
// //   }

// //   if (!res.ok) {
// //     throw new Error(data?.message || `Request failed (${res.status})`);
// //   }

// //   return data;
// // }
// // frontend/src/lib/api.js

// export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
// const API_KEY = import.meta.env.VITE_API_KEY || "";

// // Allow localhost ONLY when running locally
// const DEV_FALLBACK = "http://localhost:5000";
// const isLocalDev =
//   typeof window !== "undefined" &&
//   (window.location.hostname === "localhost" ||
//     window.location.hostname === "127.0.0.1");

// function getBase() {
//   if (API_BASE) return API_BASE;
//   if (isLocalDev) return DEV_FALLBACK;

//   // Production: don't silently hit localhost
//   throw new Error(
//     "VITE_API_URL is not set. Set it in Cloudflare Pages → Settings → Environment variables (Production + Preview)."
//   );
// }

// export async function api(path, options = {}) {
//   const base = getBase();
//   const cleanPath = path.startsWith("/") ? path : `/${path}`;

//   const headers = { ...(options.headers || {}) };

//   // ✅ Detect FormData (DON'T set Content-Type for it)
//   const isFormData =
//     typeof FormData !== "undefined" && options.body instanceof FormData;

//   // ✅ Always attach API key (send BOTH header names to be safe)
//   // Some backends check "x-api-key", some check "api_key"
//   if (API_KEY) {
//     headers["x-api-key"] = API_KEY;
//     headers["api_key"] = API_KEY;
//   }

//   if (!isFormData && !headers["Content-Type"]) {
//     headers["Content-Type"] = "application/json";
//   }

//   const res = await fetch(`${base}${cleanPath}`, {
//     ...options,
//     headers,
//   });

//   const text = await res.text();
//   let data = {};
//   try {
//     data = text ? JSON.parse(text) : {};
//   } catch {
//     data = { message: text || "Request failed" };
//   }

//   if (!res.ok) {
//     throw new Error(data?.message || `Request failed (${res.status})`);
//   }

//   return data;
// }
// frontend/src/lib/api.js

// Base URL for backend (Render URL in production)
export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// API key (must be defined in Cloudflare Pages env vars)
const API_KEY = import.meta.env.VITE_API_KEY || "";

// Local dev fallback only when running on localhost
const DEV_FALLBACK = "http://localhost:5000";
const isLocalDev =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

function getBase() {
  if (API_BASE) return API_BASE;
  if (isLocalDev) return DEV_FALLBACK;

  throw new Error(
    "VITE_API_URL is not set. Set it in Cloudflare Pages → Settings → Environment variables (Production + Preview)."
  );
}

export async function api(path, options = {}) {
  const base = getBase();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  const headers = { ...(options.headers || {}) };

  // ✅ Always send API key for every request (public + admin + upload)
  if (API_KEY) {
    headers["x-api-key"] = API_KEY;
    headers["api_key"] = API_KEY; // extra safe if backend checks this name
  }

  // ✅ Detect FormData (do NOT set Content-Type manually for it)
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  // For JSON requests only
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
