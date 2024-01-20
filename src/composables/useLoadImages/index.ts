import imagesDB from '@/data/images.json'
import { ref, watch, toValue, type Ref } from 'vue'
import { useRandomIntInRange } from '..'
import { useImage } from '@vueuse/core'
import { type ImageData } from '@/types'

function useRandomImages(count: number | Ref<number>) {
  const iCount = toValue(count)
  const i = imagesDB
  const len = imagesDB.length - 1

  const images: ImageData[] = Array.from(Array(iCount), () => {
    const random = useRandomIntInRange(0, len)
    return imagesDB[random.value]
  })
  return images
}

function useRandomImagesUnique(count: number | Ref<number>): ImageData[] {
  const copy = [...imagesDB]
  const iCount = toValue(count)
  const selectedImages: ImageData[] = []

  while (copy.length > 0 && selectedImages.length < iCount) {
    const randomIndex = Math.floor(Math.random() * copy.length)

    selectedImages.push(copy.splice(randomIndex, 1)[0])
  }
  return selectedImages
}

import { onUnmounted } from 'vue'

function useLoadImages(imagesData: ImageData[] | Ref<ImageData[]>) {
  const loaded = ref(false)
  const images = ref<ImageData[]>([])
  const imageValues = toValue(imagesData)
  const loadImages = imageValues.map((imageData) => {
    return new Promise((resolve, reject) => {
      const { isLoading, state, error } = useImage({ src: imageData.url })
      const stopWatch = watch(isLoading, (loading) => {
        if (error.value) {
          stopWatch()
          reject(error.value)
        } else if (!loading) {
          imageData.width = state.value?.width
          imageData.height = state.value?.height
          images.value.push(imageData)
          stopWatch()
          resolve(null)
        }
      })
      onUnmounted(stopWatch)
    })
  })

  Promise.all(loadImages)
    .then(() => {
      loaded.value = true
    })
    .catch((error) => {
      console.error('Failed to load an image:', error)
    })

  return { loaded, images }
}

export { useRandomImages, useRandomImagesUnique, useLoadImages, type ImageData }
