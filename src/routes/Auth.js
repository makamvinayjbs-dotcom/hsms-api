import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, role = "NURSE" } = req.body;

  const existing = db.users.find(u => u.email === email);
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

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  user.lastLogin = new Date();

  res.json({ msg: "Login success", token });
});

export default router;