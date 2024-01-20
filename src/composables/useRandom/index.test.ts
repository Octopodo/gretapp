import { checkOptions, useRandomInRange, useRandomIntInRange } from './index'
import { describe, expect, it } from 'vitest'
describe('checkOptions', () => {
  it('should return true when options are valid', () => {
    expect(checkOptions(1, 10)).toBe(true)
  })

  it('should return false when options are invalid', () => {
    // @ts-ignore
    expect(checkOptions('Invalid', 1)).toBe(false)
  })
})

describe('useRandomInRange', () => {
  it('should return a number within the range', () => {
    const min = 1
    const max = 10
    const number = useRandomInRange(min, max)
    expect(number.value).toBeGreaterThanOrEqual(min)
    expect(number.value).toBeLessThanOrEqual(max)
  })
})

describe('useRandomIntInRange', () => {
  it('should return an integer within the range', () => {
    const min = 1
    const max = 10
    const number = useRandomIntInRange(min, max)
    expect(Number.isInteger(number.value)).toBe(true)
    expect(number.value).toBeGreaterThanOrEqual(min)
    expect(number.value).toBeLessThanOrEqual(max)
  })
})
