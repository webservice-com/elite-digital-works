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
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true })); // ✅ helpful for forms
app.use(morgan("dev"));

/* ======================
   ENSURE UPLOADS FOLDERS EXIST
   - uploads/
   - uploads/portfolio/
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
   Now /uploads/portfolio/xxx.jpg will work
====================== */
app.use("/uploads", express.static(uploadsDir));

/* ======================
   CORS (Node 25 safe)
====================== */
const allowedOrigins = new Set();

// From env: FRONTEND_URL="https://x.netlify.app,https://y.netlify.app"
if (process.env.FRONTEND_URL) {
  process.env.FRONTEND_URL
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean)
    .forEach((u) => allowedOrigins.add(u));
}

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow Postman/curl/no-origin
      if (!origin) return cb(null, true);

      // Allow any localhost (dev)
      if (origin.startsWith("http://localhost")) return cb(null, true);

      // Allow from env list
      if (allowedOrigins.has(origin)) return cb(null, true);

      // Block others
      return cb(new Error("CORS blocked: " + origin));
    },
    credentials: true,
  })
);

/* ======================
   ROUTES
====================== */
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

/* ======================
   404 HANDLER (Helpful)
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

  const status = isMulter ? 400 : 500;

  res.status(status).json({ ok: false, message: err.message });
});

/* ======================
   START SERVER
====================== */
/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

async function start() {
  // 1) Start HTTP server FIRST (so :5000 is alive)
  const server = app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
    console.log(`✅ Uploads served at: http://localhost:${PORT}/uploads`);
  });

  // 2) Then connect DB (so DB failure doesn't cause ERR_CONNECTION_REFUSED)
  try {
    await connectDB();
    console.log("✅ MongoDB connected");
  } catch (e) {
    console.error("❌ MongoDB connection failed:", e.message);
    console.error("➡️ Server is still running, but DB routes will fail until DB connects.");

    // Optional: close server if you want hard-fail in production only
    if (process.env.NODE_ENV === "production") {
      console.error("❌ Production mode: shutting down because DB is required.");
      server.close(() => process.exit(1));
    }
  }
}

start();

