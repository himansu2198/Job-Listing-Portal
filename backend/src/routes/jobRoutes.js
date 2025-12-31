// backend/src/routes/jobRoutes.js
const express = require("express");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,     // ✅ NEW
  deleteJob,
  getEmployerJobs,
} = require("../controllers/jobController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getJobs);                      // Get all jobs (with filters)
router.get("/:id", getJobById);                // Get single job

// Protected routes (require authentication)
router.get("/employer/jobs", protect, getEmployerJobs);  // Get employer's jobs
router.post("/", protect, createJob);                    // Create job
router.put("/:id", protect, updateJob);                  // ✅ NEW: Update job
router.delete("/:id", protect, deleteJob);               // Delete job

module.exports = router;



