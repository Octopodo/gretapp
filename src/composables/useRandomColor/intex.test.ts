import { useRandomColor } from './index'
import { describe, expect, it } from 'vitest'
import { colorList } from '.'

describe('useRandomColor', () => {
  it('should return a color from colorList', () => {
    const color = useRandomColor()
    expect(colorList).toContain(color.value)
  })

  it('should return a color from colorList', () => {
    const color = useRandomColor()
    expect(colorList).toContain(color.value)
  })
  //Maybe future implementation
  // it('should return a different color on subsequent calls', async () => {
  //   const color1 = useRandomColor()
  //   const color2 = useRandomColor()
  //   expect(color1.value).not.toEqual(color2.value)
  // })
})
