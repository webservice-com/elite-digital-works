// // backend/src/routes/public.routes.js
// const router = require("express").Router();

// const Portfolio = require("../models/Portfolio");
// const Review = require("../models/Review");
// const Order = require("../models/Order");

// /* ======================
//    PUBLIC: PORTFOLIO
//    GET /api/portfolio
//    Query:
//      - page, limit
//      - category
// ====================== */
// router.get("/portfolio", async (req, res) => {
//   try {
//     const page = Math.max(parseInt(req.query.page || "1", 10), 1);
//     const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 200);
//     const skip = (page - 1) * limit;

//     const filter = { published: true };

//     if (req.query.category) {
//       filter.category = String(req.query.category).trim();
//     }

//     // ✅ DO NOT .select() here — so media is included
//     const [items, total] = await Promise.all([
//       Portfolio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
//       Portfolio.countDocuments(filter),
//     ]);

//     return res.json({
//       ok: true,
//       page,
//       limit,
//       total,
//       pages: Math.ceil(total / limit),
//       items,
//     });
//   } catch (e) {
//     console.error("❌ PUBLIC /portfolio error:", e);
//     return res.status(500).json({ ok: false, message: e.message || "Failed to load portfolio" });
//   }
// });

// /* ======================
//    PUBLIC: REVIEWS
//    GET  /api/reviews  (approved only)
//    POST /api/reviews  (create pending)
// ====================== */

// // ✅ Public list (only approved)
// router.get("/reviews", async (req, res) => {
//   try {
//     const items = await Review.find({ approved: true }).sort({ createdAt: -1 }).lean();
//     return res.json({ ok: true, items });
//   } catch (e) {
//     console.error("❌ PUBLIC /reviews error:", e);
//     return res.status(500).json({ ok: false, message: e.message || "Failed to load reviews" });
//   }
// });

// // ✅ Create review (pending until approved by admin)
// router.post("/reviews", async (req, res) => {
//   try {
//     const p = req.body || {};

//     const name = String(p.name || "").trim();
//     const businessName = String(p.businessName || "").trim();
//     const comment = String(p.comment || "").trim();
//     const ratingRaw = Number(p.rating);

//     if (!name || !comment) {
//       return res.status(400).json({ ok: false, message: "Name and comment are required." });
//     }

//     if (comment.length > 500) {
//       return res.status(400).json({ ok: false, message: "Comment must be 500 characters or less." });
//     }

//     let rating = 5;
//     if (Number.isFinite(ratingRaw)) {
//       rating = Math.max(1, Math.min(5, Math.round(ratingRaw)));
//     }

//     const created = await Review.create({
//       name,
//       businessName,
//       rating,
//       comment,
//       approved: false,
//     });

//     return res.json({ ok: true, id: created._id });
//   } catch (e) {
//     console.error("❌ PUBLIC POST /reviews error:", e);
//     return res.status(500).json({ ok: false, message: e.message || "Failed to create review" });
//   }
// });

// /* ======================
//    PUBLIC: CREATE ORDER
//    POST /api/orders
// ====================== */
// router.post("/orders", async (req, res) => {
//   try {
//     const p = req.body || {};

//     const name = String(p.name || "").trim();
//     const packageType = String(p.packageType || "").trim();
//     const requirements = String(p.requirements || "").trim();

//     if (!name || !packageType || !requirements) {
//       return res.status(400).json({
//         ok: false,
//         message: "Name, Package, and Requirements are required.",
//       });
//     }

//     const created = await Order.create({
//       name,
//       email: String(p.email || "").trim(),
//       phone: String(p.phone || "").trim(),
//       businessName: String(p.businessName || "").trim(),
//       packageType,
//       budget: String(p.budget || "").trim(),
//       requirements,
//       status: "New",
//     });

//     return res.json({ ok: true, orderId: created._id });
//   } catch (e) {
//     console.error("❌ PUBLIC POST /orders error:", e);
//     return res.status(500).json({ ok: false, message: e.message || "Failed to create order" });
//   }
// });

// module.exports = router;
// backend/src/routes/public.routes.js
const router = require("express").Router();

const Portfolio = require("../models/Portfolio");
const Review = require("../models/Review");
const Order = require("../models/Order");

/* ======================
   PUBLIC: PORTFOLIO
   GET /api/portfolio
   Query:
     - page, limit
     - category
====================== */
router.get("/portfolio", async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "50", 10), 1), 200);
    const skip = (page - 1) * limit;

    const filter = { published: true };

    if (req.query.category) {
      filter.category = String(req.query.category).trim();
    }

    // ✅ DO NOT .select() here — so media is included
    const [items, total] = await Promise.all([
      Portfolio.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Portfolio.countDocuments(filter),
    ]);

    return res.json({
      ok: true,
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      items,
    });
  } catch (e) {
    console.error("❌ PUBLIC /portfolio error:", e);
    return res.status(500).json({ ok: false, message: e.message || "Failed to load portfolio" });
  }
});

/* ======================
   PUBLIC: REVIEWS
   GET  /api/reviews  (approved only)
   POST /api/reviews  (create pending)
====================== */

// ✅ Public list (only approved)
router.get("/reviews", async (req, res) => {
  try {
    const items = await Review.find({ approved: true }).sort({ createdAt: -1 }).lean();
    return res.json({ ok: true, items });
  } catch (e) {
    console.error("❌ PUBLIC /reviews error:", e);
    return res.status(500).json({ ok: false, message: e.message || "Failed to load reviews" });
  }
});

// ✅ Create review (pending until approved by admin)
router.post("/reviews", async (req, res) => {
  try {
    const p = req.body || {};

    const name = String(p.name || "").trim();
    const businessName = String(p.businessName || "").trim();
    const comment = String(p.comment || "").trim();
    const ratingRaw = Number(p.rating);

    if (!name || !comment) {
      return res.status(400).json({ ok: false, message: "Name and comment are required." });
    }

    if (comment.length > 500) {
      return res.status(400).json({ ok: false, message: "Comment must be 500 characters or less." });
    }

    let rating = 5;
    if (Number.isFinite(ratingRaw)) {
      rating = Math.max(1, Math.min(5, Math.round(ratingRaw)));
    }

    const created = await Review.create({
      name,
      businessName,
      rating,
      comment,
      approved: false,
    });

    return res.json({ ok: true, id: created._id });
  } catch (e) {
    console.error("❌ PUBLIC POST /reviews error:", e);
    return res.status(500).json({ ok: false, message: e.message || "Failed to create review" });
  }
});

/* ======================
   PUBLIC: CREATE ORDER
   POST /api/orders
====================== */
router.post("/orders", async (req, res) => {
  try {
    const p = req.body || {};

    const name = String(p.name || "").trim();
    const packageType = String(p.packageType || "").trim();
    const requirements = String(p.requirements || "").trim();

    if (!name || !packageType || !requirements) {
      return res.status(400).json({
        ok: false,
        message: "Name, Package, and Requirements are required.",
      });
    }

    const created = await Order.create({
      name,
      email: String(p.email || "").trim(),
      phone: String(p.phone || "").trim(),
      businessName: String(p.businessName || "").trim(),
      packageType,
      budget: String(p.budget || "").trim(),
      requirements,
      status: "New",
    });

    return res.json({ ok: true, orderId: created._id });
  } catch (e) {
    console.error("❌ PUBLIC POST /orders error:", e);
    return res.status(500).json({ ok: false, message: e.message || "Failed to create order" });
  }
});

module.exports = router;
