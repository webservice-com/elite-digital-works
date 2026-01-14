// backend/src/models/Order.js
const mongoose = require("mongoose");

const STATUSES = ["New", "In Progress", "Completed", "Cancelled"];
const PACKAGES = ["Starter", "Business", "Enterprise"];

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    businessName: {
      type: String,
      trim: true,
      maxlength: 120,
      default: "",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      maxlength: 120,
      default: "",
      validate: {
        validator: function (v) {
          if (!v) return true; // optional
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: "Invalid email address",
      },
    },

    // ✅ Make phone required because your UI says Phone/WhatsApp *
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
      validate: {
        validator: function (v) {
          const cleaned = String(v || "").replace(/\s/g, "");
          return /^[0-9+]{9,15}$/.test(cleaned);
        },
        message: "Invalid phone number",
      },
    },

    packageType: {
      type: String,
      required: true,
      trim: true,
      enum: PACKAGES,
    },

    budget: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    // ✅ "Order Description" / "Requirements"
    requirements: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 2000,
    },

    status: {
      type: String,
      enum: STATUSES,
      default: "New",
      index: true,
    },
  },
  { timestamps: true }
);

// helpful indexes for admin sorting/filtering
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model("Order", OrderSchema);
