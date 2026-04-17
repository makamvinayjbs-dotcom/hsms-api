import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  role: {
    type: String,
    enum: ["admin", "provider", "patient"]
  },
  consentGiven: Boolean,
  createdAt: { type: Date, default: Date.now },
  lastLogin: Date
});

export default mongoose.model("User", userSchema);