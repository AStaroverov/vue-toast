export function isNumber(value) {
  return typeof value === "number" && isFinite(value)
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}
