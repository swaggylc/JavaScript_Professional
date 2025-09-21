export function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function hasChange(oldVal, newVal) {
  return Object.is(oldVal, newVal);
}
