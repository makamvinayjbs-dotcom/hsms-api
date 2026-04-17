// routes/audit.js
/**
 * @swagger
 * /audit:
 *   get:
 *     summary: Get audit logs
 *     tags: [Audit]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Audit logs
 */
import express from "express";
import { db } from "../config/db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, (req, res) => {
  res.json(db.auditLogs);
});

export default router;