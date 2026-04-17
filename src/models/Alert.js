export const createAlert = ({
  id,
  type,
  message,
  severity = "low",
  source = "system"
}) => {
  return {
    id,
    type, // ICU | EQUIPMENT | SYSTEM
    message,
    severity, // low | medium | high
    source, // system | manual
    isResolved: false,
    createdAt: new Date(),
    resolvedAt: null
  };
};