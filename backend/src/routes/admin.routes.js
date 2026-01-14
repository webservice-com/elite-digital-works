// backend/src/routes/admin.routes.js
const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const mongoose = require("mongoose");

const AdminUser = require("../models/AdminUser");
const Portfolio = require("../models/Portfolio");
const Review = require("../models/Review");
const Order = require("../models/Order");
const { requireAdmin } = require("../middleware/auth");
const cloudinary = require("../config/cloudinary");

/* ======================
   Upload config (memory) - Render safe
====================== */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB
});

/* ======================
   Helpers
====================== */
function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

/* ======================
   ADMIN LOGIN
====================== */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ ok: false, message: "JWT_SECRET missing in .env" });
    }

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Email and password are required" });
    }

    const admin = await AdminUser.findOne({ email: String(email).toLowerCase().trim() });
    if (!admin) return res.status(401).json({ ok: false, message: "Invalid credentials" });

    const ok = await bcrypt.compare(String(password), admin.passwordHash);
    if (!ok) return res.status(401).json({ ok: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ ok: true, token });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Login failed" });
  }
});

/* ======================
   ADMIN DASHBOARD SUMMARY
====================== */
router.get("/dashboard", requireAdmin, async (req, res) => {
  try {
    const [
      totalOrders,
      newOrders,
      completedOrders,
      pendingReviews,
      ordersByStatusAgg,
      latestOrders,
      latestReviews,
    ] = await Promise.all([
      Order.countDocuments(),
      Order.countDocuments({ status: "New" }),
      Order.countDocuments({ status: "Completed" }),
      Review.countDocuments({ approved: false }),
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
      Review.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    const statusMap = { New: 0, "In Progress": 0, Completed: 0, Cancelled: 0 };
    for (const row of ordersByStatusAgg || []) {
      if (row?._id && statusMap[row._id] !== undefined) statusMap[row._id] = row.count;
    }

    return res.json({
      ok: true,
      cards: { totalOrders, newOrders, pendingReviews, completedOrders },
      statusMap,
      latestOrders,
      latestReviews,
    });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to load dashboard" });
  }
});

/* ======================
   ADMIN ORDERS
====================== */

// ✅ LIST (includes requirements/description)
router.get("/orders", requireAdmin, async (req, res) => {
  try {
    const items = await Order.find({})
      .sort({ createdAt: -1 })
      .select("name businessName email phone packageType budget requirements status createdAt") // ✅ explicit
      .lean();

    return res.json({ ok: true, items });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to load orders" });
  }
});

// ✅ SINGLE ORDER
router.get("/orders/:id", requireAdmin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid order id" });
    }

    const item = await Order.findById(req.params.id).lean();
    if (!item) return res.status(404).json({ ok: false, message: "Order not found" });

    return res.json({ ok: true, item });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to load order" });
  }
});

// ✅ UPDATE STATUS
router.patch("/orders/:id/status", requireAdmin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid order id" });
    }

    const { status } = req.body || {};
    const allowed = ["New", "In Progress", "Completed", "Cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ ok: false, message: "Invalid status" });
    }

    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    )
      .select("name businessName email phone packageType budget requirements status createdAt")
      .lean();

    if (!updated) return res.status(404).json({ ok: false, message: "Order not found" });

    return res.json({ ok: true, item: updated });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to update status" });
  }
});

/* ======================
   ADMIN REVIEWS
====================== */
router.get("/reviews", requireAdmin, async (req, res) => {
  try {
    const items = await Review.find().sort({ createdAt: -1 }).lean();
    return res.json({ ok: true, items });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to load reviews" });
  }
});

router.patch("/reviews/:id/approve", requireAdmin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid review id" });
    }

    const item = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: { approved: true } },
      { new: true }
    ).lean();

    if (!item) return res.status(404).json({ ok: false, message: "Review not found" });
    return res.json({ ok: true, item });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to approve review" });
  }
});

router.patch("/reviews/:id/hide", requireAdmin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid review id" });
    }

    const item = await Review.findByIdAndUpdate(
      req.params.id,
      { $set: { approved: false } },
      { new: true }
    ).lean();

    if (!item) return res.status(404).json({ ok: false, message: "Review not found" });
    return res.json({ ok: true, item });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to hide review" });
  }
});

router.delete("/reviews/:id", requireAdmin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid review id" });
    }

    const deleted = await Review.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ ok: false, message: "Review not found" });

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to delete review" });
  }
});

/* ======================
   ADMIN PORTFOLIO LIST
====================== */
router.get("/portfolio", requireAdmin, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.category) filter.category = String(req.query.category).trim();
    if (req.query.published === "true") filter.published = true;
    if (req.query.published === "false") filter.published = false;

    const [items, total] = await Promise.all([
      Portfolio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Portfolio.countDocuments(filter),
    ]);

    return res.json({ ok: true, page, limit, total, pages: Math.ceil(total / limit), items });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to load portfolio" });
  }
});

/* ======================
   PORTFOLIO MEDIA UPLOAD (Cloudinary)
====================== */
router.post("/portfolio/:id/media", requireAdmin, upload.array("files", 10), async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid portfolio id" });
    }

    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ ok: false, message: "Portfolio item not found" });

    const files = req.files || [];
    if (!files.length) return res.status(400).json({ ok: false, message: "No files uploaded" });

    const uploaded = [];

    for (const f of files) {
      const mime = String(f.mimetype || "");
      const isVideo = mime.startsWith("video/");
      const isImage = mime.startsWith("image/");
      if (!isVideo && !isImage) {
        return res.status(400).json({ ok: false, message: "Only images/videos allowed" });
      }

      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "portfolio", resource_type: "auto" },
          (err, out) => (err ? reject(err) : resolve(out))
        );
        stream.end(f.buffer);
      });

      uploaded.push({
        type: isVideo ? "video" : "image",
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    item.media = [...(item.media || []), ...uploaded];
    await item.save();

    return res.json({ ok: true, item });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Upload failed" });
  }
});

/* ======================
   DELETE SINGLE MEDIA (Cloudinary)
====================== */
router.delete("/portfolio/:id/media", requireAdmin, async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ ok: false, message: "Invalid portfolio id" });
    }

    const { publicId } = req.body || {};
    if (!publicId) return res.status(400).json({ ok: false, message: "publicId required" });

    // try both image/video
    await cloudinary.uploader.destroy(publicId).catch(() => null);
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" }).catch(() => null);

    const item = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { $pull: { media: { publicId } } },
      { new: true }
    ).lean();

    return res.json({ ok: true, item });
  } catch (e) {
    return res.status(500).json({ ok: false, message: e.message || "Failed to delete media" });
  }
});

module.exports = router;
