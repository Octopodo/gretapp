import imagesDB from '@/data/images.json'
import { ref, watch } from 'vue'
import { useRandomIntInRange } from '..'
import { useImage } from '@vueuse/core'

interface ImageData {
  name: string
  author: string
  url: string
  alt: string
  width?: number
  height?: number
}

function useRandomImages(count: number) {
  const i = imagesDB
  const len = imagesDB.length - 1

  const images: ImageData[] = Array.from(Array(count), (item) => {
    const random = useRandomIntInRange(0, len)
    return imagesDB[random]
  })
  return images
}

function useRandomImagesUnique(count: number) {
  const len = imagesDB.length - 1
  const availableIndexes = Array.from(Array(len), (item, index) => index)
  if (count > len) return imagesDB

  const images: ImageData[] = Array.from(Array(count), (item) => {
    const random = useRandomIntInRange(0, len)
    availableIndexes.splice(random, 1)
    return imagesDB[random]
  })
  return images
}

function useLoadImages(imagesData: ImageData[]) {
  const loaded = ref(false)
  const images = ref<ImageData[]>([])

  const loadImages = imagesData.map((imageData) => {
    return new Promise((resolve) => {
      const { isLoading, state } = useImage({ src: imageData.url })
      watch(isLoading, (loading) => {
        if (!loading) {
          imageData.width = state.value?.width
          imageData.height = state.value?.height
          images.value.push(imageData)
          resolve(null)
        }
      })
    })
  })

  Promise.all(loadImages).then(() => {
    loaded.value = true
  })

  return { loaded, images }
}

export { useRandomImages, useRandomImagesUnique, useLoadImages, type ImageData }
