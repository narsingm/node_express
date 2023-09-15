// Example for authRoutes.js
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

// Register a new user
router.post("/register", register);

// Login route (protected)
router.post("/login", login);

// Example protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "You have access to this route!", user: req.user });
});

module.exports = router;
