
/**
 * @swagger
 * /patients:
 *   post:
 *     summary: Create patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: number
 *               diagnosis:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient created
 */

/**
 * @swagger
 * /patients:
 *   get:
 *     summary: Get all patients
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of patients
 */
import express from "express";
import { db } from "../config/db.js";
import { createPatient } from "../models/Patient.js";
import { addAuditLog } from "../utils/audit.js";

const router = express.Router();

/**
 * GET ALL PATIENTS
 */
router.get("/", (req, res) => {
  res.json(db.patients);
});

/**
 * CREATE PATIENT
 */
router.post("/", (req, res) => {
  const { name, age, diagnosis, admittedBy } = req.body;

  const patient = createPatient({
    id: Date.now().toString(),
    name,
    age,
    diagnosis,
    admittedBy
  });

  db.patients.push(patient);

  addAuditLog({
    id: Date.now().toString(),
    action: "CREATE",
    module: "PATIENT",
    performedBy: admittedBy || "system",
    resourceId: patient.id,
    metadata: {
      name: patient.name,
      age: patient.age,
      diagnosis: patient.diagnosis
    }
  });

  res.json(patient);
});

export default router;