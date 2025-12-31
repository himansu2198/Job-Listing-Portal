// backend/src/controllers/jobController.js
const Job = require("../models/Job");
const Application = require("../models/Application");

// ================= CREATE JOB (EMPLOYER) =================
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      employer: req.user.id,
    });

    res.status(201).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("CREATE JOB ERROR:", error);
    res.status(400).json({
      message: "Job creation failed",
      error: error.message,
    });
  }
};

// ================= GET ALL JOBS (PUBLIC) =================
exports.getJobs = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const jobs = await Job.find(filter)
      .populate("employer", "username email")
      .sort({ createdAt: -1 });

    const jobsWithApplicationsCount = await Promise.all(
      jobs.map(async (job) => {
        const applicationsCount = await Application.countDocuments({
          job: job._id,
        });

        return {
          ...job.toObject(),
          applicationsCount,
        };
      })
    );

    res.json({
      success: true,
      count: jobsWithApplicationsCount.length,
      jobs: jobsWithApplicationsCount,
    });
  } catch (error) {
    console.error("GET JOBS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

// ================= GET SINGLE JOB =================
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "employer",
      "username email"
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicationsCount = await Application.countDocuments({
      job: job._id,
    });

    res.json({
      success: true,
      job: {
        ...job.toObject(),
        applicationsCount,
      },
    });
  } catch (error) {
    console.error("GET JOB BY ID ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch job",
      error: error.message,
    });
  }
};

// ================= GET EMPLOYER JOBS (DASHBOARD) =================
exports.getEmployerJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ employer: req.user.id }).sort({
      createdAt: -1,
    });

    const jobsWithCount = await Promise.all(
      jobs.map(async (job) => {
        const applicationsCount = await Application.countDocuments({
          job: job._id,
        });

        return {
          ...job.toObject(),
          applicationsCount,
        };
      })
    );

    res.json({
      success: true,
      count: jobsWithCount.length,
      jobs: jobsWithCount,
    });
  } catch (error) {
    console.error("GET EMPLOYER JOBS ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
};

// ================= UPDATE JOB (EMPLOYER) - NEW =================
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if user is the employer who posted the job
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this job",
      });
    }

    // Update job with new data
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("UPDATE JOB ERROR:", error);
    res.status(400).json({
      message: "Job update failed",
      error: error.message,
    });
  }
};

// ================= DELETE JOB (EMPLOYER) =================
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check authorization
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ 
        message: "Not authorized to delete this job" 
      });
    }

    await job.deleteOne();
    
    res.json({ 
      success: true, 
      message: "Job deleted successfully" 
    });
  } catch (error) {
    console.error("DELETE JOB ERROR:", error);
    res.status(500).json({
      message: "Failed to delete job",
      error: error.message,
    });
  }
};


