// userService.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/config");
const User = require("../models/User");

async function registerUser(username, email, password) {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already registered.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    return { message: "Registration successful!" };
  } catch (error) {
    throw error;
  }
}

async function loginUser(email, password) {
  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error("Invalid email or password.");
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, secretKey);

    return { message: "Login successful!", token };
  } catch (error) {
    throw error;
  }
}

module.exports = { registerUser, loginUser };
