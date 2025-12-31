// backend/src/routes/applicationRoutes.js
const express = require("express");
const {
  applyJob,
  getEmployerApplications,
  getJobSeekerApplications,
  shortlistApplication,    // ✅ ADD THIS
  rejectApplication,       // ✅ ADD THIS
} = require("../controllers/applicationController");

const protect = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const router = express.Router();

// ✅ APPLY JOB WITH RESUME UPLOAD
router.post("/apply", protect, upload.single("resume"), applyJob);

// ✅ EMPLOYER: VIEW APPLICATIONS
router.get("/employer", protect, getEmployerApplications);

// ✅ JOB SEEKER: VIEW OWN APPLICATIONS
router.get("/jobseeker", protect, getJobSeekerApplications);

// ✅ SHORTLIST APPLICATION
router.put("/:applicationId/shortlist", protect, shortlistApplication);

// ✅ REJECT APPLICATION
router.put("/:applicationId/reject", protect, rejectApplication);

module.exports = router;

