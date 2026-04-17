import express from "express";
import auth from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";
import Alert from "../models/Alert.js";
import audit from "../middleware/audit.js";

const router = express.Router();

// GET alerts
router.get(
  "/",
  auth,
  audit("GET_ALERTS", "ALERT"),
  async (req, res) => {
    const alerts = await Alert.find();
    res.json(alerts);
  }
);

// ICU alerts only
router.get(
  "/icu",
  auth,
  audit("GET_ICU_ALERTS", "ALERT"),
  async (req, res) => {
    const alerts = await Alert.find({ type: "ICU" });
    res.json(alerts);
  }
);

// TRIGGER (admin)
router.post(
  "/trigger",
  auth,
  authorize("admin"),
  audit("TRIGGER_ALERT", "ALERT"),
  async (req, res) => {
    const alert = await Alert.create(req.body);
    res.json(alert);
  }
);

export default router;