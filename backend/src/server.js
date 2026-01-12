// backend/src/server.js
const express = require("express");
const cors = require("cors");
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
app.set("trust proxy", 1); // ✅ helpful on Render / reverse proxies
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* ======================
   HEALTH CHECK
   Test: https://YOUR-BACKEND.onrender.com/health
====================== */
app.get("/health", (req, res) => {
  res.status(200).json({ ok: true, message: "Backend is healthy ✅" });
});

/* ======================
   ENSURE UPLOADS FOLDERS EXIST
====================== */
const uploadsDir = path.join(__dirname, "..", "uploads");
const portfolioDir = path.join(uploadsDir, "portfolio");

try {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
  if (!fs.existsSync(portfolioDir)) fs.mkdirSync(portfolioDir, { recursive: true });
} catch (e) {
  console.error("❌ Failed to create uploads folders:", e.message);
}

/* ======================
   STATIC UPLOADS
====================== */
app.use("/uploads", express.static(uploadsDir));

/* ======================
   CORS (FIXED FOR NETLIFY + PREVIEW URLS)
   - Allows localhost in dev
   - Allows any *.netlify.app (preview links)
   - Allows extra custom domains via FRONTEND_URL (comma-separated)
   - Removes trailing slash issues
====================== */
const allowedOrigins = new Set();

if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL
    .split(",")
    .map((u) => u.trim().replace(/\/$/, "")) // ✅ remove trailing slash
    .filter(Boolean)
    .forEach((u) => allowedOrigins.add(u));
}

function isAllowedOrigin(origin) {
  // Allow Postman/curl/no-origin
  if (!origin) return true;

  // Allow localhost dev
  if (origin.startsWith("http://localhost")) return true;

  // ✅ Allow Netlify preview + main domains
  if (origin.endsWith(".netlify.app")) return true;

  // Allow explicitly listed origins
  return allowedOrigins.has(origin);
}

const corsOptions = {
  origin: (origin, cb) => {
    if (isAllowedOrigin(origin)) return cb(null, true);
    return cb(new Error("CORS blocked: " + origin));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ IMPORTANT: handle preflight requests
app.options("*", cors(corsOptions));

/* ======================
   ROUTES
====================== */
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

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
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);

  // If multer throws file errors, return 400 (better than 500)
  const isMulter =
    err.name === "MulterError" ||
    String(err.message || "").toLowerCase().includes("only images") ||
    String(err.message || "").toLowerCase().includes("only images/videos") ||
    String(err.message || "").toLowerCase().includes("file too large");

  // If it's a CORS block error, return 403 (clearer)
  const isCors = String(err.message || "").toLowerCase().includes("cors blocked");

  const status = isCors ? 403 : isMulter ? 400 : 500;
  res.status(status).json({ ok: false, message: err.message });
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

async function start() {
  const server = app.listen(PORT, () => {
    console.log(`✅ Backend running on PORT: ${PORT}`);
    console.log(`✅ Health: /health`);
    console.log(`✅ Uploads served at: /uploads`);
  });

  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e.message);
    console.error("➡️ Server running but DB routes will fail until DB connects.");

    if (process.env.NODE_ENV === "production") {
      console.error("❌ Production mode: shutting down because DB is required.");
      server.close(() => process.exit(1));
    }
  }
}

start();
