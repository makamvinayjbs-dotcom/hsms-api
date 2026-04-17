export const db = {
  users: [
    {
      id: "u1",
      name: "Admin User",
      email: "admin@hospital.com",
      password: "$2a$10$examplehashedpassword", // bcrypt hashed (placeholder)
      role: "ADMIN",
      status: "ACTIVE",
      createdAt: new Date(),
      lastLogin: null
    },
    {
      id: "u2",
      name: "Doctor Strange",
      email: "doctor@hospital.com",
      password: "$2a$10$examplehashedpassword",
      role: "DOCTOR",
      status: "ACTIVE",
      createdAt: new Date(),
      lastLogin: null
    },
    {
      id: "u3",
      name: "Nurse Joy",
      email: "nurse@hospital.com",
      password: "$2a$10$examplehashedpassword",
      role: "NURSE",
      status: "ACTIVE",
      createdAt: new Date(),
      lastLogin: null
    }
  ],
  beds: [
    {
      id: "b1",
      bedNumber: "ICU-101",
      ward: "ICU",
      status: "available",
      assignedPatient: null
    },
    {
      id: "b2",
      bedNumber: "ICU-102",
      ward: "ICU",
      status: "available",
      assignedPatient: null
    },
    {
      id: "b3",
      bedNumber: "GEN-201",
      ward: "General",
      status: "available",
      assignedPatient: null
    }
  ],
  patients: [
    {
      id: "p1",
      name: "John Doe",
      age: 45,
      diagnosis: "Flu",
      admittedBy: "admin1",
      assignedBed: null,
      admittedAt: new Date(),
      dischargedAt: null
    },
    {
      id: "p2",
      name: "Jane Smith",
      age: 32,
      diagnosis: "Fracture",
      admittedBy: "admin2",
      assignedBed: null,
      admittedAt: new Date(),
      dischargedAt: null
    }
  ],
  equipment: [],
  alerts: [
    {
      id: "a1",
      type: "SYSTEM",
      message: "System initialized",
      severity: "low",
      source: "system",
      isResolved: false,
      createdAt: new Date(),
      resolvedAt: null
    }
  ],
  auditLogs: [
    {
      id: "log1",
      action: "SYSTEM_INIT",
      module: "SYSTEM",
      performedBy: "system",
      resourceId: null,
      metadata: { message: "Audit system started" },
      timestamp: new Date()
    }
  ]
};