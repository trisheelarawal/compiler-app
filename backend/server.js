import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import runRoutes from "./routes/runRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

//  CONNECT TO MONGODB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", runRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});