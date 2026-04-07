import express from "express";
import { runCode } from "../controllers/runController.js";
import Submission from "../models/Submission.js";

const router = express.Router();

// POST /api/run
router.post("/run", runCode);

//  GET /api/history
router.get("/history", async (req, res) => {
  try {
    const history = await Submission.find()
      .sort({ createdAt: -1 }) // latest first
      .limit(20); // limit to 20 entries

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Error fetching history" });
  }
});

export default router;