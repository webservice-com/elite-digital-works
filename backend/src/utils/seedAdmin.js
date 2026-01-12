require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("../config/db");
const AdminUser = require("../models/AdminUser");

(async () => {
  try {
    await connectDB();

    const email = (process.env.ADMIN_EMAIL || "").toLowerCase();
    const pass = process.env.ADMIN_PASSWORD || "";

    if (!email || !pass) throw new Error("ADMIN_EMAIL / ADMIN_PASSWORD missing in .env");

    const existing = await AdminUser.findOne({ email });
    if (existing) {
      console.log("ℹ️ Admin already exists:", email);
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(pass, 10);
    await AdminUser.create({ email, passwordHash });

    console.log("✅ Admin created:", email);
    process.exit(0);
  } catch (e) {
    console.error("❌ Seed failed:", e.message);
    process.exit(1);
  }
})();
