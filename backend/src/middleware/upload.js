const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "portfolio");

// ✅ ensure folder exists (prevents ENOENT crash)
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

// ✅ allow images + videos
function fileFilter(req, file, cb) {
  const ok =
    file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/");
  if (ok) return cb(null, true);
  return cb(new Error("Only images/videos allowed"));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 25 * 1024 * 1024 }, // ✅ 25MB (videos need more than 5MB)
});

module.exports = upload;
