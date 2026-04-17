import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/Auth.js";
import patientRoutes from "./routes/Patient.js";
import bedRoutes from "./routes/Bed.js";

import errorHandler from "./middleware/errorHandler.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*", // for development only
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


// routes
app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/beds", bedRoutes);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});