// backend/src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["jobseeker", "employer"],
      required: true,
    },
    
    // ============ JOB SEEKER PROFILE FIELDS ============
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    professionalTitle: {
      type: String,
      default: "",
    },
    professionalSummary: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    
    // Resume (stored as file path)
    resume: {
      type: String,
      default: null,
    },
    
    // Track profile completion - FIXED
    profileCompleted: {
      type: Boolean,
      default: false,
      required: false, // Make it optional to avoid validation errors
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);


