import { db } from "../config/db.js";

export function addAuditLog({
  action,
  module,
  performedBy,
  resourceId,
  metadata
}) {
  const log = {
    id: Date.now().toString(),
    action,
    module,
    performedBy,
    resourceId,
    metadata,
    timestamp: new Date()
  };

  db.auditLogs.push(log);

  return log;
}