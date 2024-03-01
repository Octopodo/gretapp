import { ref, type Ref } from 'vue'

export function useGenerateSpriteSheetOffset(
  spriteSheet: Ref<HTMLImageElement>,
  frameCount: number
) {
  const frameList = ref([0])
  const frameWidth = ref(0)

  frameWidth.value =
    frameCount > 1
      ? spriteSheet.value.width / frameCount
      : spriteSheet.value.width
  for (let i = 1; i < frameCount; i++) {
    const frame = frameList.value[i - 1] + frameWidth.value
    frameList.value.push(frame)
  }

  return { frameList, frameWidth }
}
