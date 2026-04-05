import express from "express";
import { runCode } from "../controllers/runController.js";

const router = express.Router();

// POST /api/run
router.post("/run", runCode);

export default router;