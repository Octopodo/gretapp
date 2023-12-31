// HTMLImageElement
import { ref } from 'vue'
interface CanvasSizeOptions {
  width: number | undefined
  height: number | undefined
  maxWidth: number
  maxHeight: number
  resolution: number
}

export function useSetCanvasSize(options: CanvasSizeOptions) {
  // Handle negative numbers
  options.width = options.width !== undefined && options.width > 0 ? options.width : 0
  options.height = options.height !== undefined && options.height > 0 ? options.height : 0
  options.maxWidth = options.maxWidth > 0 ? options.maxWidth : 0
  options.maxHeight = options.maxHeight > 0 ? options.maxHeight : 0
  options.resolution = options.resolution > 0 ? options.resolution : 0

  // Determine the larger side of the image and the corresponding max dimension
  const largerSide = options.width > options.height ? 'width' : 'height'
  const maxDimension = largerSide === 'width' ? options.maxWidth : options.maxHeight

  // Calculate the ratio based on the larger side
  const ratio = maxDimension / (options[largerSide] || 1)

  const newWidth = ref(Math.round((options.width || 0) * ratio))
  const newHeight = ref(Math.round((options.height || 0) * ratio))

  const cols = ref(options.resolution > 0 ? Math.floor(newWidth.value / options.resolution) : 0)
  const rows = ref(options.resolution > 0 ? Math.floor(newHeight.value / options.resolution) : 0)

  return { width: newWidth, height: newHeight, cols, rows }
}
