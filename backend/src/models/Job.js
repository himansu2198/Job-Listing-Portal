// backend/src/models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    
    description: { 
      type: String, 
      required: true 
    },
    
    // ✅ NEW: Separate responsibilities field
    responsibilities: {
      type: String,
      required: true,
      default: "",
    },
    
    // ✅ Separate qualifications field
    qualifications: {
      type: String,
      required: true,
      default: "",
    },
    
    location: { 
      type: String, 
      required: true 
    },

    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Technology",
        "Marketing",
        "Design",
        "Finance",
        "Healthcare",
        "Education",
      ],
    },

    role: {
      type: String,
      required: true,
      enum: [
        // Software
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",

        // Data
        "Data Analyst",
        "Data Scientist",
        "Data Engineer",

        // Infra & Security
        "DevOps Engineer",
        "Cybersecurity Analyst",
        "Systems Analyst",
      ],
    },

    // Experience required
    experienceRequired: {
      type: String,
      default: "",
    },

    // Salary
    salary: {
      type: String,
      default: "",
    },

    salaryRange: {
      min: Number,
      max: Number,
    },

    companyName: { 
      type: String, 
      required: true 
    },
    
    companyWebsite: String,
    careerPageLink: String,

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);