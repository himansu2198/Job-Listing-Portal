
const User = require("../models/User");

// ================= GET PROFILE =================
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      profile: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
        professionalTitle: user.professionalTitle,
        professionalSummary: user.professionalSummary,
        skills: user.skills,
        resume: user.resume,
        profileCompleted: user.profileCompleted,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
};


// ================= UPDATE PROFILE =================
exports.updateProfile = async (req, res) => {
  try {
    const {
      username,
      phone,
      location,
      professionalTitle,
      professionalSummary,
      skills,
    } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided
    if (username) user.username = username;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (professionalTitle) user.professionalTitle = professionalTitle;
    if (professionalSummary) user.professionalSummary = professionalSummary;
    
    // Handle skills (can be array or comma-separated string)
    if (skills) {
      if (Array.isArray(skills)) {
        user.skills = skills;
      } else if (typeof skills === 'string') {
        user.skills = skills.split(",").map(s => s.trim()).filter(Boolean);
      }
    }

    // Check if profile is completed - CONVERT TO BOOLEAN EXPLICITLY
    const isCompleted = Boolean(
      user.username &&
      user.phone &&
      user.location &&
      user.professionalTitle &&
      user.professionalSummary &&
      user.skills.length > 0 &&
      user.resume
    );

    user.profileCompleted = isCompleted;

    await user.save();

    res.json({
      success: true,
      message: "Profile updated successfully",
      profile: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        location: user.location,
        professionalTitle: user.professionalTitle,
        professionalSummary: user.professionalSummary,
        skills: user.skills,
        resume: user.resume,
        profileCompleted: user.profileCompleted,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

// ================= UPLOAD RESUME =================
// ================= UPLOAD RESUME =================
exports.uploadResume = async (req, res) => {
  try {
    console.log("========== UPLOAD RESUME DEBUG ==========");
    console.log("1. Request received");
    console.log("2. User from token:", req.user);
    console.log("3. File from multer:", req.file);

    if (!req.file) {
      console.log("ERROR: No file in request");
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    console.log("5. Looking for user in database...");
    const user = await User.findById(req.user.id);

    if (!user) {
      console.log("ERROR: User not found");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("6. User found:", user.email);

    // Save resume path
    user.resume = req.file.path;
    console.log("7. Resume path to save:", user.resume);

    // Check if profile is completed - CONVERT TO BOOLEAN EXPLICITLY
    const isCompleted = Boolean(
      user.username &&
      user.phone &&
      user.location &&
      user.professionalTitle &&
      user.professionalSummary &&
      user.skills.length > 0 &&
      user.resume
    );

    user.profileCompleted = isCompleted; // Now it's a proper boolean
    console.log("8. Profile completed:", isCompleted, typeof isCompleted);

    console.log("9. Saving user to database...");
    await user.save();

    console.log("10. SUCCESS! Resume uploaded");
    console.log("=========================================");

    res.json({
      success: true,
      message: "Resume uploaded successfully",
      resumePath: user.resume,
      profileCompleted: user.profileCompleted,
    });
  } catch (error) {
    console.error("========== UPLOAD RESUME ERROR ==========");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("=========================================");
    
    res.status(500).json({
      message: "Failed to upload resume",
      error: error.message,
    });
  }
};