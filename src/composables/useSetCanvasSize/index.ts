// HTMLImageElement
import { ref, toValue, type Ref } from 'vue'
interface CanvasSizeOptions {
  width: number | Ref<number> | undefined | Ref<undefined>
  height: number | Ref<number> | undefined | Ref<undefined>
  maxWidth: number | Ref<number>
  maxHeight: number | Ref<number>
  resolution: number | Ref<number>
}

function useSetCanvasSize(options: CanvasSizeOptions) {
  let width = toValue(options.width)
  let height = toValue(options.height)
  let maxWidth = toValue(options.maxWidth)
  let maxHeight = toValue(options.maxHeight)
  let resolution = toValue(options.resolution)

  // Handle negative numbers
  width = width !== undefined && width > 0 ? width : 0
  height = height !== undefined && height > 0 ? height : 0
  maxWidth = maxWidth > 0 ? maxWidth : 0
  maxHeight = maxHeight > 0 ? maxHeight : 0
  resolution = resolution > 0 ? resolution : 0

  // Determine the larger side of the image and the corresponding max dimension
  const largerSide = width > height ? width : height
  const maxDimension = largerSide === width ? maxWidth : maxHeight

  // Calculate the ratio based on the larger side
  const ratio = maxDimension / (largerSide || 1)

  const newWidth = ref(Math.round((width || 0) * ratio))
  const newHeight = ref(Math.round((height || 0) * ratio))

  const cols = ref(resolution > 0 ? Math.floor(newWidth.value / resolution) : 0)
  const rows = ref(
    resolution > 0 ? Math.floor(newHeight.value / resolution) : 0
  )

  return { width: newWidth, height: newHeight, cols, rows }
}

export { useSetCanvasSize, type CanvasSizeOptions }
