const express = require("express");
const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const router = express.Router();

// ✅ THESE MUST BE FUNCTIONS
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;



