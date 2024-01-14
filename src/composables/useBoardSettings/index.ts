import { ref, provide, type Ref } from 'vue'
import { configStore } from '@/stores/devConfigStore'
import {
  useSetCanvasSize,
  useRandomColor,
  useRandomImagesUnique,
  type CanvasSizeOptions
} from '@/composables'

interface BoardSettingsOptions extends CanvasSizeOptions {
  count: number | Ref<number>
}

function useBoardSettingsProvider(options: BoardSettingsOptions) {
  const gameConfig = configStore()

  const { width, height, cols, rows } = useSetCanvasSize(options)
  const color = useRandomColor()
  const images = useRandomImagesUnique(options.count)

  const canvas = (image) => {}

  return { color, loadedImages, canvas }
}

export { useBoardSettingsProvider, type BoardSettingsOptions }
