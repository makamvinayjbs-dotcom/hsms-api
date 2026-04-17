import { db } from "../config/db.js";

export const createAlert = async ({ type, message, severity }) => {
  const alert = {
    id: Date.now().toString(),
    type,
    message,
    severity,
    isResolved: false,
    triggeredAt: new Date()
  };

  db.alerts.push(alert);
  return alert;
};

export const getAlerts = async () => {
  return db.alerts;
};

export const checkICUThreshold = async () => {
  const icuBeds = db.beds.filter(b => b.ward === "ICU");

  if (icuBeds.length === 0) return null;

  const occupied = icuBeds.filter(b => b.status === "occupied");

  const usage = (occupied.length / icuBeds.length) * 100;

  const existing = db.alerts.find(
    a => a.type === "ICU" && !a.isResolved
  );

  if (usage > 90 && !existing) {
    const alert = {
      id: Date.now().toString(),
      type: "ICU",
      message: `ICU occupancy critical: ${usage.toFixed(1)}%`,
      severity: "high",
      isResolved: false,
      triggeredAt: new Date()
    };

    db.alerts.push(alert);
    return alert;
  }

  return null;
};