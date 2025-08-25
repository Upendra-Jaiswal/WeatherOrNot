const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables


const DB_URI = process.env.MONGODB_URI_CLOUD;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};

// Monitor connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to database");
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from database");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose connection error:", err);
});

module.exports = connectDB;
