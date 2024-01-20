import { useLoadImages, type ImageData } from './index'
import { describe, expect, it } from 'vitest'
import { ref, watch, onUnmounted } from 'vue'
import imagesDB from '@/data/images.json'

describe('useLoadImages', () => {
  it('should load images and set loaded to true', async () => {
    const imagesData = [
      { url: imagesDB[0].url },
      { url: imagesDB[1].url },
      { url: imagesDB[2].url }
    ]
    const { loaded, images } = useLoadImages(imagesData)

    expect(loaded.value).toBe(false)
    expect(images.value).toEqual([])

    // Simulate image loading completion
    await Promise.all(imagesData.map(() => Promise.resolve()))

    expect(loaded.value).toBe(true)
    expect(images.value).toEqual(imagesData)
  })

  it('should handle empty imagesData', async () => {
    const imagesData: ImageData[] = []
    const { loaded, images } = useLoadImages(imagesData)

    expect(loaded.value).toBe(true)
    expect(images.value).toEqual([])
  })

  it('should handle loading errors', async () => {
    const imagesData = [
      { url: imagesDB[0].url },
      { url: imagesDB[1].url },
      { url: imagesDB[2].url }
    ]
    const { loaded, images } = useLoadImages(imagesData)

    expect(loaded.value).toBe(false)
    expect(images.value).toEqual([])

    // Simulate image loading errors
    await Promise.all(imagesData.map(() => Promise.reject()))

    expect(loaded.value).toBe(true)
    expect(images.value).toEqual([])
  })
})

//print 'testeando'
