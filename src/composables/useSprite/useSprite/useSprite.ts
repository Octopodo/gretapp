import type { ExtraProps } from '@/types'
import { ref, computed, watch, type Ref, type StyleValue } from 'vue'
import { useImage } from '@vueuse/core'
import { useAnimateSprite } from '@/composables/useSprite'
import { useExtractSpriteSheetData } from '@/composables/useSprite'
import { useGenerateSpriteSheetOffset } from '@/composables/useSprite'
import { useLoadSpriteData } from '@/composables/useSprite'
export interface SpritePropsInterface {
  src: string
  scale?: number
  play?: boolean
  playOnce?: boolean
  pause?: boolean
  stop?: boolean
}

export const SpriteProps = {
  src: {
    type: String,
    required: true
  },
  scale: {
    type: Number,
    default: 0.2
  },
  play: {
    type: Boolean,
    default: false
  },
  playOnce: {
    type: Boolean,
    default: false
  },
  pause: {
    type: Boolean,
    default: false
  },
  stop: {
    type: Boolean,
    default: false
  }
}

export function useSprite(props: SpritePropsInterface & ExtraProps, emit: any) {
  useLoadSpriteData()
  const { state: image, isLoading } = useImage({ src: props.src })
  const { frameCount } = useExtractSpriteSheetData(props.src)

  const frames = ref<number[]>([])
  const width = ref(0)
  let xOffset: Ref<number>
  let state
  let play = () => {}
  let playOnce = () => {}
  let stop = () => {}
  let prev = () => {}
  let next = () => {}
  let go = (frame: number) => {}
  let  animatedStyle; 
  let offsetPlaceholder = computed(() => {
    return { left: `0px` }
  })
  const offsetStyle = computed(() => offsetPlaceholder.value)
  //Crear transformador de tamaño de imagen
  const style = computed(() => {
    let backgroundPosition = `0px 0`
    if (xOffset) {
      backgroundPosition = `${-xOffset.value}px 0`
    }
    return {
      position: 'absolute',
      width: `${width.value}px`,
      height: `${image.value?.height}px`,
      objectFit: 'cover',
      backgroundImage: `url(${props.src})`,
      backgroundPosition: backgroundPosition,
      backgroundRepeat: 'no-repeat'
    } as StyleValue
  })
  const scaleStyle = computed(() => {
    return {
      transform: `scale(${props.scale})`
    } as StyleValue
  })
  watch(isLoading, (loading) => {
    if (loading === false) {
      const { frameList, frameWidth } = useGenerateSpriteSheetOffset(
        image as Ref<HTMLImageElement>,
        frameCount
      )
      const animation = useAnimateSprite(frameList.value)
      width.value = frameWidth.value
      xOffset = animation.state
      play = animation.play
      playOnce = animation.playOnce
      stop = animation.stop
      prev = animation.prev
      next = animation.next
      go = animation.go
      offsetPlaceholder = animation.style
    }
  })

  watch(
    () => props.pause,
    (pause) => {
      if (pause) {
        stop()
        emit('paused')
      }
    }
  )

  watch(
    () => props.play,
    (playAnimation) => {
      if (playAnimation) {
        play()
        emit('playing')
      }
    }
  )

  watch(
    () => props.stop,
    (stopAnimation) => {
      if (stopAnimation) {
        stop()
        go(0)
        emit('stopped')
      }
    }
  )

  watch(
    () => props.playOnce,
    (playOnceAnimation) => {
      if (playOnceAnimation) {
        playOnce()
        emit('paused')
      }
    }
  )

  return {
    currentFrame: state,
    go,
    isLoading,
    next,
    offsetStyle,
    play,
    playOnce,
    prev,
    stop,
    style,
    scaleStyle
  }
}
