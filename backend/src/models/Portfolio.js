const mongoose = require("mongoose");

const MediaSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
    publicId: { type: String, default: "" },
  },
  { _id: false }
);

const PortfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, default: "Website", trim: true },
    industry: { type: String, default: "", trim: true },
    summary: { type: String, default: "", trim: true },

    tags: { type: [String], default: [] },
    features: { type: [String], default: [] },
    results: { type: [String], default: [] },

    media: { type: [MediaSchema], default: [] },

    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Portfolio", PortfolioSchema);
