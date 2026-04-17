import { db } from "../config/db.js";

export const logAction = async ({
  userId,
  action,
  resource,
  resourceId,
  ip
}) => {
  db.auditLogs.push({
    id: Date.now().toString(),
    userId,
    action,
    resource,
    resourceId,
    ip,
    timestamp: new Date()
  });
};

export const getLogs = async () => {
  return db.auditLogs;
};