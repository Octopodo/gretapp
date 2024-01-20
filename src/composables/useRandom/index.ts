import { ref, toValue, type Ref } from 'vue'

type Min = number | Ref<number>
type Max = number | Ref<number>

function checkOptions(min: Min, max: Max) {
  const checkMin = Number(toValue(min))
  const checkMax = Number(toValue(max))
  if (isNaN(checkMin) || isNaN(checkMax)) return false
  return true
}

function useRandomInRange(min: Min, max: Max) {
  if (!checkOptions(min, max)) return ref(0)

  const roundMin = Math.floor(Number(toValue(min)))
  const roundMax = Math.ceil(Number(toValue(max)))
  const random = Math.random() * (roundMax - roundMin + 1) + roundMin
  return ref(random)
}

function useRandomIntInRange(min: Min, max: Max) {
  if (!checkOptions(min, max)) return ref(0)

  const roundMin = Math.floor(Number(toValue(min)))
  const roundMax = Math.ceil(Number(toValue(max)))
  const random = Math.floor(
    Math.random() * (roundMax - roundMin + 1) + roundMin
  )
  return ref(random)
}

export { checkOptions, useRandomInRange, useRandomIntInRange }
