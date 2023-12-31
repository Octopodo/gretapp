import { useSetCanvasSize } from './index'
import { describe, expect, it } from 'vitest'

describe('useSetCanvasSize', () => {
  it('should return correct width and height for square image', () => {
    const { width, height } = useSetCanvasSize(500, 500, 800, 10)
    expect(width.value).toBe(800)
    expect(height.value).toBe(800)
  })

  it('should return correct width and height for rectangular image', () => {
    const { width, height } = useSetCanvasSize(500, 1000, 800, 10)
    expect(width.value).toBe(400)
    expect(height.value).toBe(800)
  })

  it('should return correct cols and rows for square image', () => {
    const { cols, rows } = useSetCanvasSize(500, 500, 800, 10)
    expect(cols.value).toBe(80)
    expect(rows.value).toBe(80)
  })

  it('should return correct cols and rows for rectangular image', () => {
    const { cols, rows } = useSetCanvasSize(500, 1000, 800, 10)
    expect(cols.value).toBe(40)
    expect(rows.value).toBe(80)
  })
})
