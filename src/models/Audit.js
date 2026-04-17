export const createAuditLog = ({
  id,
  action,
  module,
  performedBy,
  resourceId,
  metadata = {}
}) => {
  return {
    id,
    action,        // CREATE | UPDATE | DELETE | ASSIGN | RELEASE
    module,        // PATIENT | BED | ALERT
    performedBy,   // userId or "system"
    resourceId,
    metadata,
    timestamp: new Date()
  };
};

export const addAuditLog = (logData) => {
  const log = createAuditLog(logData);
  db.auditLogs.push(log);
  return log;
};