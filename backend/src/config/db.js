const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) throw new Error("MONGO_URI is missing in .env");

  // Helpful logs
  mongoose.connection.on("connected", () => console.log("✅ MongoDB connected"));
  mongoose.connection.on("error", (err) => console.error("❌ MongoDB error:", err.message));
  mongoose.connection.on("disconnected", () => console.warn("⚠️ MongoDB disconnected"));

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000, // fail fast if Atlas not reachable
    connectTimeoutMS: 10000,
  });
};
