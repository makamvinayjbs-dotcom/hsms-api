
/**
 * @swagger
 * /beds:
 *   get:
 *     summary: Get all beds
 *     tags: [Beds]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Bed list
 */
import express from "express";
import { db } from "../config/db.js";

function checkICUAlert() {
  const icuBeds = db.beds.filter(b => b.ward === "ICU");

  if (icuBeds.length === 0) return;

  const occupied = icuBeds.filter(b => b.status === "occupied");

  const usage = (occupied.length / icuBeds.length) * 100;

  if (usage > 80) {
    db.alerts.push({
      id: Date.now().toString(),
      type: "ICU",
      message: `ICU occupancy critical: ${usage.toFixed(1)}%`,
      severity: "high",
      source: "system",
      isResolved: false,
      createdAt: new Date(),
      resolvedAt: null
    });
  }
}

const router = express.Router();

//
// GET ALL BEDS
//
router.get("/", (req, res) => {
  res.json(db.beds);
});

//
// REQUEST BED (mark as requested)
//
router.post("/request", (req, res) => {
  const { bedId } = req.body;

  const bed = db.beds.find(b => b.id === bedId);

  if (!bed) {
    return res.status(404).json({ message: "Bed not found" });
  }

  if (bed.status !== "available") {
    return res.status(400).json({ message: "Bed not available" });
  }

  bed.status = "requested";

  res.json(bed);
});

//
// ASSIGN BED TO PATIENT
//
router.post("/assign", (req, res) => {
  const { bedId, patientId } = req.body;

  const bed = db.beds.find(b => b.id === bedId);
  const patient = db.patients.find(p => p.id === patientId);

  if (!bed || !patient) {
    return res.status(404).json({ message: "Bed or Patient not found" });
  }

  if (bed.status === "occupied") {
    return res.status(400).json({ message: "Bed already occupied" });
  }

  bed.status = "occupied";
  bed.assignedPatient = patientId;

  patient.assignedBed = bedId;

  res.json({ bed, patient });
});

//
// RELEASE BED
//
router.post("/release", (req, res) => {
  const { bedId } = req.body;

  const bed = db.beds.find(b => b.id === bedId);

  if (!bed) {
    return res.status(404).json({ message: "Bed not found" });
  }

  const patient = db.patients.find(p => p.id === bed.assignedPatient);

  bed.status = "available";
  bed.assignedPatient = null;

  if (patient) {
    patient.assignedBed = null;
  }

  res.json({ message: "Bed released", bed });
});

export default router;