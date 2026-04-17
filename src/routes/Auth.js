/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token returned
 */
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role = "NURSE" } = req.body;

  const existing = db.users.find(u => u.email == email);
  if (existing) {
    return res.status(400).json({ msg: "User exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now().toString(),
    name,
    email,
    password: hashed,
    role,
    status: "ACTIVE",
    createdAt: new Date(),
    lastLogin: null
  };

  db.users.push(user);

  res.json({ msg: "Registered", user: { id: user.id, email, role } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN EMAIL:", email);
  console.log("ALL USERS:", db.users);

  const user = db.users.find(u => u.email === email);

  console.log("FOUND USER:", user);

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  // TEMP FALLBACK SECRET (for testing only)
  const secret = process.env.JWT_SECRET || "dev_secret_key_123";

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    secret,
    { expiresIn: "1h" }
  );

  user.lastLogin = new Date();

  res.json({
    msg: "Login success",
    token
  });
});

export default router;