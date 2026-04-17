// routes/audit.js
import express from "express";
import { db } from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json(db.auditLogs);
});

export default router;