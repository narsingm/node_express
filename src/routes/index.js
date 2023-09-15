// routes/index.js
const express = require("express");
const router = express.Router();

// Import and use different route modules here
const authRoutes = require("./authRoutes");
// Import other route modules as needed

// Use the route modules
router.use("/auth", authRoutes);
// Use other route modules as needed

module.exports = router;
