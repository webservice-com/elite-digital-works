// backend/src/server.js
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const connectDB = require("./config/db");

// Routes
const publicRoutes = require("./routes/public.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

/* ======================
   MIDDLEWARE
====================== */
app.set("trust proxy", 1);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* ======================
   HEALTH CHECK
====================== */
app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "Backend is healthy ✅" });
});

// Helpful for frontend to test API base
app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "API is healthy ✅" });
});

/* ======================
   ENSURE UPLOADS FOLDERS EXIST
====================== */
const uploadsDir = path.join(__dirname, "..", "uploads");
const portfolioDir = path.join(uploadsDir, "portfolio");

try {
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.mkdirSync(portfolioDir, { recursive: true });
} catch (e) {
  console.error("❌ Failed to create uploads folders:", e.message);
}

/* ======================
   STATIC UPLOADS
====================== */
app.use("/uploads", express.static(uploadsDir));

/* ======================
   CORS (MANUAL - RENDER SAFE)
   Supports:
   - localhost / 127.0.0.1
   - *.netlify.app
   - *.pages.dev
   - FRONTEND_URL env (comma separated)
====================== */
const allowedOrigins = new Set(
  (process.env.FRONTEND_URL || "")
    .split(",")
    .map((u) => u.trim().replace(/\/$/, ""))
    .filter(Boolean)
);

function normalizeOrigin(origin) {
  return String(origin || "").replace(/\/$/, "");
}

function isAllowedOrigin(origin) {
  if (!origin) return true; // Postman/curl/no-origin

  const o = normalizeOrigin(origin);

  // local dev
  if (o.startsWith("http://localhost") || o.startsWith("http://127.0.0.1")) return true;

  // platform preview domains
  if (o.endsWith(".netlify.app")) return true;
  if (o.endsWith(".pages.dev")) return true;

  // allow explicit domains from FRONTEND_URL
  return allowedOrigins.has(o);
}

// ✅ CORS headers applied BEFORE routes
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", normalizeOrigin(origin));
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");

    // ✅ IMPORTANT: allow custom headers too
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-api-key, api_key"
    );
  }

  // ✅ Preflight
  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});

/* ======================
   ROUTES
====================== */
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

/* ======================
   DEBUG: LIST ROUTES (OPTIONAL)
   Enable by setting LOG_ROUTES=true in Render env
====================== */
if (process.env.LOG_ROUTES === "true") {
  setTimeout(() => {
    try {
      console.log("✅ Mounted Routes:");
      app._router.stack
        .filter((l) => l.route || l.name === "router")
        .forEach((l) => {
          if (l.route?.path) {
            const methods = Object.keys(l.route.methods).join(",").toUpperCase();
            console.log(` - ${methods} ${l.route.path}`);
          } else if (l.name === "router") {
            // nested router
            const base = l.regexp?.toString() || "";
            console.log(` - Router mounted: ${base}`);
          }
        });
    } catch (e) {
      console.log("Route listing skipped.");
    }
  }, 500);
}

/* ======================
   404 HANDLER
====================== */
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: `Not Found: ${req.method} ${req.originalUrl}`,
  });
});

/* ======================
   ERROR HANDLER
====================== */
app.use((err, _req, res, _next) => {
  console.error("❌ Error:", err);

  const msg = String(err?.message || "").toLowerCase();

  const isMulter =
    err?.name === "MulterError" ||
    msg.includes("only images") ||
    msg.includes("only images/videos") ||
    msg.includes("file too large");

  const isCors = msg.includes("cors") || msg.includes("origin");
  const status = isCors ? 403 : isMulter ? 400 : 500;

  res.status(status).json({
    ok: false,
    message: err?.message || "Server error",
  });
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e.message);
    if (process.env.NODE_ENV === "production") process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`✅ Backend running on PORT: ${PORT}`);
    console.log(`✅ Health: /health`);
    console.log(`✅ API Health: /api/health`);
    console.log(`✅ Uploads served at: /uploads`);
    console.log(`✅ FRONTEND_URL: ${process.env.FRONTEND_URL || "(not set)"}`);
  });
}

start();
