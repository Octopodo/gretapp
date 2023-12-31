function checkOptions(min: number, max: number) {
  const checkMin = Number(min)
  const checkMax = Number(max)
  if (isNaN(checkMin) || isNaN(checkMax)) return false
  return true
}

export function useRandomInRange(min: number, max: number) {
  if (!checkOptions) return 0
  const roundMin = Math.floor(Number(min))
  const roundMax = Math.ceil(Number(max))
  const random = Math.random() * (roundMax - roundMin + 1) + roundMin
  return random
}
export function useRandomIntInRange(min: number, max: number) {
  if (!checkOptions) return 0
  const roundMin = Math.floor(Number(min))
  const roundMax = Math.ceil(Number(max))
  const random = Math.floor(
    Math.random() * (roundMax - roundMin + 1) + roundMin
  )
  return random
}
