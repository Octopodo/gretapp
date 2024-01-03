import { ref, provide, type Ref } from 'vue'
import { configStore } from '@/stores/configStore'
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
  const images = useRandomImagesUnique({ count: options.count })
}

export { useBoardSettingsProvider, type BoardSettingsOptions }
