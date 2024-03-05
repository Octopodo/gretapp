export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function toCamelCase(string) {
  return string.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

export function toKebabCase(string) {
  return string.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
