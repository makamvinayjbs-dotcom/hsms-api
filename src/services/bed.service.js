import { db } from "../config/db.js";

export const getAllBeds = async () => {
  return db.beds;
};

export const requestBed = async ({ patientId, ward }) => {
  const bed = {
    id: Date.now().toString(),
    patientId,
    ward,
    status: "requested"
  };

  db.beds.push(bed);
  return bed;
};

export const approveBed = async (bedId, adminId) => {
  const bed = db.beds.find(b => b.id === bedId);

  if (!bed) throw new Error("Bed not found");

  bed.status = "occupied";
  bed.approvedBy = adminId;

  return bed;
};

export const dischargeBed = async (bedId) => {
  const bed = db.beds.find(b => b.id === bedId);

  if (!bed) throw new Error("Bed not found");

  bed.status = "available";
  bed.patientId = null;

  return bed;
};