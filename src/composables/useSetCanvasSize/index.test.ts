import { useSetCanvasSize } from './index'
import { describe, expect, it } from 'vitest'

describe('useSetCanvasSize', () => {
  it('should correctly calculate new width and height', () => {
    const { width, height } = useSetCanvasSize({
      width: 100,
      height: 200,
      maxWidth: 50,
      maxHeight: 50,
      resolution: 10
    })
    expect(width.value).toBe(25)
    expect(height.value).toBe(50)
  })

  it('should correctly calculate cols and rows', () => {
    const { cols, rows } = useSetCanvasSize({
      width: 100,
      height: 200,
      maxWidth: 50,
      maxHeight: 50,
      resolution: 10
    })
    expect(cols.value).toBe(2)
    expect(rows.value).toBe(5)
  })

  it('should handle undefined width and height', () => {
    const { width, height } = useSetCanvasSize({
      width: undefined,
      height: undefined,
      maxWidth: 50,
      maxHeight: 50,
      resolution: 10
    })
    expect(width.value).toBe(0)
    expect(height.value).toBe(0)
  })

  it('should handle negative values', () => {
    const { width, height, cols, rows } = useSetCanvasSize({
      width: -100,
      height: -200,
      maxWidth: -50,
      maxHeight: -50,
      resolution: -10
    })
    expect(width.value).toBe(0)
    expect(height.value).toBe(0)
    expect(cols.value).toBe(0)
    expect(rows.value).toBe(0)
  })

  it('should handle zero resolution', () => {
    const { cols, rows } = useSetCanvasSize({
      width: 100,
      height: 200,
      maxWidth: 50,
      maxHeight: 50,
      resolution: 0
    })
    expect(cols.value).toBe(0)
    expect(rows.value).toBe(0)
  })
})
