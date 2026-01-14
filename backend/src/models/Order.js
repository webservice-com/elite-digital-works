// backend/src/models/Order.js
const mongoose = require("mongoose");

const STATUSES = ["New", "In Progress", "Completed", "Cancelled"];

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
    },

    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: "",
    },

    packageType: {
      type: String,
      required: true,
      trim: true,
      enum: ["Starter", "Business", "Enterprise"],
    },

    budget: {
      type: String,
      trim: true,
      maxlength: 60,
      default: "",
    },

    // ✅ This is the "Order Description" / "Requirements"
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
