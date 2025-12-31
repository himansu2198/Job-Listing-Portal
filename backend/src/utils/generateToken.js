const jwt = require("jsonwebtoken");

const generateToken = (userId, userRole) => {
  return jwt.sign(
    { 
      id: userId,
      role: userRole  // ✅ This is critical!
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = generateToken;
