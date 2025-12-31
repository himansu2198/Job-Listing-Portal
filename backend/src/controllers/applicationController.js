const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const Notification = require("../models/Notification");

// ================= APPLY JOB (FINAL FIXED VERSION) =================
exports.applyJob = async (req, res) => {
  try {
    // ✅ ALWAYS GET USER FROM DATABASE (NOT JWT ROLE)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ ROLE CHECK FROM DB (FIXES 403 ISSUE)
    if (user.role !== "jobseeker") {
      return res.status(403).json({
        message: "Only job seekers can apply for jobs",
      });
    }

    const { jobId } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Job ID is required" });
    }

    // ✅ Resume check
    if (!user.resume) {
      return res.status(400).json({
        message: "Please upload your resume in your profile before applying",
      });
    }

    // ✅ Profile completion check
    if (!user.profileCompleted) {
      return res.status(400).json({
        message: "Please complete your profile before applying for jobs",
      });
    }

    // ✅ Check job existence
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ✅ Prevent duplicate application for same job
    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: user._id,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "You have already applied to this job",
      });
    }

    // ✅ Create application
    const application = await Application.create({
      job: jobId,
      applicant: user._id,
      resume: user.resume,
    });

    // 🔔 Notify employer
    await Notification.create({
      user: job.employer,
      message: `New application received for ${job.title}`,
    });

    if (global.io) {
      global.io.to(job.employer.toString()).emit("notification", {
        message: `New application received for ${job.title}`,
      });
    }

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("APPLY JOB ERROR:", error);
    res.status(500).json({
      message: "Job application failed",
      error: error.message,
    });
  }
};

// ================= EMPLOYER APPLICATIONS =================
exports.getEmployerApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job", "title employer")
      .populate("applicant", "username email phone location professionalTitle")
      .sort({ createdAt: -1 });

    const filteredApplications = applications.filter(
      (app) => app.job?.employer?.toString() === req.user.id
    );

    res.json({
      success: true,
      applications: filteredApplications,
    });
  } catch (error) {
    console.error("GET EMPLOYER APPLICATIONS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};

// ================= JOB SEEKER APPLICATIONS =================
exports.getJobSeekerApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user.id,
    })
      .populate("job", "title companyName location salary")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error("GET JOB SEEKER APPLICATIONS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch applications",
    });
  }
};

// ================= SHORTLIST APPLICATION =================
exports.shortlistApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("job", "title employer")
      .populate("applicant", "username email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Employer authorization check
    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized action",
      });
    }

    application.status = "shortlisted";
    await application.save();

    await Notification.create({
      user: application.applicant._id,
      message: `Your application for ${application.job.title} has been shortlisted!`,
    });

    if (global.io) {
      global.io.to(application.applicant._id.toString()).emit("notification", {
        message: `Your application for ${application.job.title} has been shortlisted!`,
      });
    }

    res.json({
      success: true,
      message: "Application shortlisted successfully",
      application,
    });
  } catch (error) {
    console.error("SHORTLIST ERROR:", error);
    res.status(500).json({
      message: "Failed to shortlist application",
    });
  }
};

// ================= REJECT APPLICATION =================
exports.rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("job", "title employer")
      .populate("applicant", "username email");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // ✅ Employer authorization check
    if (application.job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized action",
      });
    }

    application.status = "rejected";
    await application.save();

    await Notification.create({
      user: application.applicant._id,
      message: `Your application for ${application.job.title} has been rejected.`,
    });

    if (global.io) {
      global.io.to(application.applicant._id.toString()).emit("notification", {
        message: `Your application for ${application.job.title} has been rejected.`,
      });
    }

    res.json({
      success: true,
      message: "Application rejected successfully",
      application,
    });
  } catch (error) {
    console.error("REJECT ERROR:", error);
    res.status(500).json({
      message: "Failed to reject application",
    });
  }
};






