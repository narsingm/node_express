// userDataProvider.js

const User = require("../models/User");

async function findUserByEmail(email) {
  try {
    return await User.findOne({ email });
  } catch (error) {
    throw error;
  }
}

module.exports = { findUserByEmail };
