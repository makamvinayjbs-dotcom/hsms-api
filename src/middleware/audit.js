import { logAction } from "../services/audit.service.js";

export default function audit(action, resource) {
  return async (req, res, next) => {
    await logAction({
      userId: req.user?.id,
      action,
      resource,
      resourceId: req.params.id,
      ip: req.ip,
      metadata: {
        method: req.method,
        url: req.originalUrl
      }
    });

    next();
  };
}