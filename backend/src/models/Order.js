const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    businessName: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },

    packageType: { type: String, required: true, trim: true }, // Starter/Business/Enterprise
    budget: { type: String, trim: true },
    requirements: { type: String, required: true, trim: true },

    status: {
      type: String,
      enum: ["New", "In Progress", "Completed", "Cancelled"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
