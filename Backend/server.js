import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Start server AFTER DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
  }
};

startServer();
