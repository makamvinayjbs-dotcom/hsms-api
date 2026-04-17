export const createBed = ({
    id,
    bedNumber,
    ward,
    status = "available",
    patientId = null
  }) => {
    return {
      id,
      bedNumber,
      ward,
      status, // available | requested | occupied
      patientId,
      approvedBy: null,
      denialReason: null,
      createdAt: new Date()
    };
  };