export const createEquipment = ({
    id,
    name,
    type,
    totalUnits
  }) => {
    return {
      id,
      name,
      type,
      totalUnits,
      availableUnits: totalUnits,
      assignedBedId: null,
      status: "available",
      createdAt: new Date()
    };
  };