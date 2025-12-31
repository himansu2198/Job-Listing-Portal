const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// ================= ROUTES =================
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const profileRoutes = require("./routes/profileRoutes"); // ✅ ADDED

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files (resumes, etc.)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ================= TEST ROUTE =================
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
    timestamp: new Date().toISOString(),
  });
});

// ================= API ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/profile", profileRoutes); // ✅ ADDED

// ================= FALLBACK =================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;



