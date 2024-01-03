import imagesDB from '@/data/images.json'
import { ref, watch, toValue, type Ref } from 'vue'
import { useRandomIntInRange } from '..'
import { useImage } from '@vueuse/core'

interface ImageData {
  url: string
  name?: string
  author?: string
  alt?: string
  width?: number
  height?: number
}

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

function useLoadImages(imagesData: ImageData[] | Ref<ImageData[]>) {
  const loaded = ref(false)
  const images = ref<ImageData[]>([])
  const imageValues = toValue(imagesData)
  const loadImages = imageValues.map((imageData) => {
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
