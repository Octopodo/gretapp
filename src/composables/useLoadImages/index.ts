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

// function useRandomImagesUnique(count: number) {
//   const len = imagesDB.length - 1
//   const availableIndexes = Array.from(Array(len), (item, index) => index)
//   if (count > len) return imagesDB

//   const images: ImageData[] = Array.from(Array(count), (item) => {
//     const random = useRandomIntInRange(0, len)
//     availableIndexes.splice(random, 1)
//     return imagesDB[random]
//   })
//   return images
// }

function useRandomImagesUnique(count: number): ImageData[] {
  // Hacer una copia del array original
  const copy = [...imagesDB]

  // Crear un array vacío para almacenar las imágenes seleccionadas
  const selectedImages: ImageData[] = []

  // Mientras la copia del array tenga elementos y no se haya alcanzado el número deseado de imágenes
  while (copy.length > 0 && selectedImages.length < count) {
    // Seleccionar un índice aleatorio
    const randomIndex = Math.floor(Math.random() * copy.length)

    // Extraer la imagen en el índice aleatorio y agregarla al array de imágenes seleccionadas
    selectedImages.push(copy.splice(randomIndex, 1)[0])
  }

  // Devolver el array de imágenes seleccionadas
  return selectedImages
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
