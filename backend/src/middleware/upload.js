const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Store files inside: /uploads/portfolio
const UPLOAD_DIR = path.join(process.cwd(), "uploads", "portfolio");

// ✅ Ensure folder exists (prevents ENOENT)
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// ✅ Allowed extensions (extra safety)
const ALLOWED_EXT = new Set([
  // images
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  // videos
  ".mp4",
  ".mov",
  ".webm",
  ".mkv",
]);

// ✅ Allowed mime types (safer than ext alone)
const ALLOWED_MIME_PREFIX = ["image/", "video/"];

function safeBaseName(filename = "file") {
  const name = String(filename);

  // remove extension, sanitize, and keep short
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40) || "file";
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),

  filename: (req, file, cb) => {
    const original = file?.originalname || "file";
    const ext = (path.extname(original) || "").toLowerCase();
    const base = safeBaseName(original);

    // If extension missing or not allowed -> decide based on mimetype
    let finalExt = ext;

    if (!finalExt || !ALLOWED_EXT.has(finalExt)) {
      const mime = String(file?.mimetype || "");
      if (mime.startsWith("image/")) finalExt = ".jpg";
      else if (mime.startsWith("video/")) finalExt = ".mp4";
      else finalExt = ".bin";
    }

    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${base}-${unique}${finalExt}`);
  },
});

// ✅ Allow images + videos only (mimetype + extension check)
function fileFilter(req, file, cb) {
  const mime = String(file?.mimetype || "");
  const ext = (path.extname(file?.originalname || "") || "").toLowerCase();

  const mimeOk = ALLOWED_MIME_PREFIX.some((p) => mime.startsWith(p));
  const extOk = !ext || ALLOWED_EXT.has(ext); // allow missing ext, but enforce if present

  if (!mimeOk) {
    return cb(new Error("Only image/video files are allowed (invalid mimetype)."));
  }
  if (!extOk) {
    return cb(new Error(`File extension not allowed: ${ext || "(none)"}`));
  }

  return cb(null, true);
}

// ✅ 25MB limit (increase if you need larger videos)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 },
});

module.exports = upload;
