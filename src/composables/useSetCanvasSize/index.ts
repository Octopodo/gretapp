// HTMLImageElement
import { ref } from 'vue'

export function useSetCanvasSize(
  width: number | undefined,
  height: number | undefined,
  maxSize: number,
  gridSize: number
) {
  const max = Math.max(width || 0, height || 0)
  const ratio = maxSize / max

  const newWidth = ref(Math.round((width || 0) * ratio))
  const newHeight = ref(Math.round((height || 0) * ratio))

  const cols = ref(Math.floor(newWidth.value / gridSize))
  const rows = ref(Math.floor(newHeight.value / gridSize))

  return { width: newWidth, height: newHeight, cols, rows }
}
