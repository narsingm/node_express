const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      unique: true, // Ensures email values are unique
      required: true, // Requires email field to be provided
      trim: true, // Removes leading/trailing spaces
    },
    password: String,
  },
  {
    timestamps: true,
  }
);

// Define an index on the 'email' field
userSchema.index({ email: 1 });

module.exports = mongoose.model("User", userSchema);
