// backend/src/routes/profileRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const protect = require("../middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  uploadResume,
} = require("../controllers/profileController");

// Create uploads/resumes directory if it doesn't exist
const uploadsDir = path.join(__dirname, "../../uploads/resumes");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = req.user.id + "-" + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Routes
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

// ✅ IMPORTANT: protect must come BEFORE upload.single()
router.post("/resume", protect, upload.single("resume"), uploadResume);

module.exports = router;