const router = require("express").Router();
const Portfolio = require("../models/Portfolio");
const upload = require("../middleware/uploadPortfolio"); 
const { requireAdmin } = require("../middleware/auth");

router.post(
  "/portfolio/:id/media",
  requireAdmin,
  upload.array("files", 10), 
  async (req, res) => {
    try {
      const item = await Portfolio.findById(req.params.id);
      if (!item) return res.status(404).json({ ok: false, message: "Not found" });

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ ok: false, message: "No files received" });
      }

      const newMedia = req.files.map((f) => {
        const isVideo = (f.mimetype || "").startsWith("video/");
        return {
          url: `/uploads/portfolio/${f.filename}`, 
          type: isVideo ? "video" : "image",
          publicId: "", 
        };
      });

      item.media = [...(item.media || []), ...newMedia];
      await item.save();

      res.json({ ok: true, message: "Media uploaded", media: item.media });
    } catch (e) {
      res.status(500).json({ ok: false, message: e.message || "Upload failed" });
    }
  }
);

module.exports = router;
