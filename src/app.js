const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectToDatabase = require("./config/dbconfig"); // Import the database connection
const routes = require("./routes"); // Import the index.js file

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectToDatabase();

app.get("/", (req, res) => {
  res.send({ message: "HELLO" });
});
// Routes
app.use("/api", routes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
