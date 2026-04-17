export const createPatient = ({
  id,
  name,
  age,
  diagnosis,
  admittedBy,
  assignedBed = null
}) => {
  return {
    id,
    name,
    age,
    diagnosis,
    admittedBy,
    assignedBed,
    admittedAt: new Date(),
    dischargedAt: null
  };
};