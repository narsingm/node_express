// authController.js

const userService = require("../services/userService");
const userDataProvider = require("../dataProviders/userDataProvider");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists in the database
    const existingUser = await userDataProvider.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    // Register the user using the service
    const result = await userService.registerUser(username, email, password);

    res.status(201).json(result);
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Login the user using the service
    const result = await userService.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = { register, login };
