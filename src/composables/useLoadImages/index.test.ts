import { useLoadImages, type ImageData } from '.'
import { ref, isRef } from 'vue'
import imagesDB from '@/data/images.json'

import { describe, expect, it } from 'vitest'

describe('useLoadImages', () => {
  it('should return reactive references', () => {
    const { loaded, images } = useLoadImages(imagesDB)

    expect(isRef(loaded)).toBe(true)
    expect(isRef(images)).toBe(true)
  })

  it('should initialize loaded as false', () => {
    const { loaded } = useLoadImages(imagesDB)

    expect(loaded.value).toBe(false)
  })

  it('should initialize images with provided data', () => {
    const { images } = useLoadImages(imagesDB)

    expect(images.value).toEqual(
      imagesDB.map((imageData) => ({
        ...imageData,
        width: undefined,
        height: undefined
      }))
    )
  })

  it('should set loaded to true after images have loaded', async () => {
    const { loaded } = useLoadImages(imagesDB)

    // Simulate image loading
    await new Promise((resolve) => setTimeout(resolve, 1000))

    expect(loaded.value).toBe(true)
  })
})
