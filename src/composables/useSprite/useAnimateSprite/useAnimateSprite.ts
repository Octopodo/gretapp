import { computed } from 'vue'
import { useCycleList } from '@vueuse/core'
import { gameConfigStore } from '@/stores'

interface AnimateSpriteOptions {
  frames: number[]
}

export function useAnimateSprite(frameOffsets: number[]) {
  const gameConfig = gameConfigStore()
  const frameRate = computed(() => gameConfig.frameRate)
  const { state, go, next, prev } = useCycleList(frameOffsets)

  let interval: NodeJS.Timeout
  const framesPerSecond = computed(() => 1000 / frameRate.value)

  const style = computed(() => {
    return {
      left: `${-state.value}px)`
    }
  })

  function play(startFrame = state.value) {
    go(startFrame)
    interval = setInterval(() => {
      next()
    }, framesPerSecond.value)
    return interval
  }

  function playOnce(startFrame = state.value) {
    stop()
    go(startFrame)
    interval = setInterval(() => {
      next()
      if (state.value === frameOffsets[frameOffsets.length - 1]) {
        stop()
      }
    }, framesPerSecond.value)
    return interval
  }

  function stop() {
    clearInterval(interval)
  }
  return { play, playOnce, stop, next, prev, go, state, style }
}
