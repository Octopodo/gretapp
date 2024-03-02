import type { ExtraProps } from '@/types'
import { ref, computed, watch, onMounted, type Ref, type StyleValue } from 'vue'
import { useImage } from '@vueuse/core'
import { HarmonySprite } from '../HarmonySprite/HarmonySprite'
export interface SpritePropsInterface {
  scale: number
  play?: boolean
  playOnce?: boolean
  pause?: boolean
  stop?: boolean
  type: string
  name: string
}

export const SpriteProps = {
  scale: {
    type: Number,
    default: 1
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
  },
  type: {
    type: String,
    default: 'Characters'
  },
  name: {
    type: String,
    default: 'radfem'
  },
  direction: {
    type: Number,
    default: 1
  }
}

export const useSprite = (
  props: SpritePropsInterface & ExtraProps,
  emit: any
) => {
  const type = computed(() => props.type)
  const name = computed(() => props.name)
  const src = computed(
    () => `/assets/sprites/${type.value.toLowerCase()}/${name.value}.png`
  )
  const sprite = new HarmonySprite(type.value, name.value)
  const { state: isLoading } = useImage({ src: src.value })
  const currentFrame = sprite.currentAnimation.value.currentFrame
  sprite.currentAnimation = 'Walk'
  const scaleStyle = computed(() => {
    return {
      transform: `scale(${props.scale})`
    } as StyleValue
  })
  const style = computed(() => {
    const x = currentFrame.value.x - currentFrame.value.offsetX

    const y = currentFrame.value.y + currentFrame.value.offsetY / 4

    return {
      position: 'relative',
      width: `${currentFrame.value.width}px`,
      height: `${currentFrame.value.height}px`,
      objectFit: 'cover',
      backgroundImage: `url(${src.value})`,
      backgroundPosition: `${-x}px ${-y}px`,
      backgroundRepeat: 'no-repeat',
      transform: `scaleX(${props.direction})`
    } as StyleValue
  })

  // onMounted(() => {
  //   sprite.play()
  // })

  watch(
    () => props.pause,
    (pause) => {
      if (pause) {
        sprite.stop()
        emit('paused')
      }
    }
  )

  watch(
    () => props.play,
    (playAnimation) => {
      if (playAnimation) {
        sprite.play()
        emit('playing')
      }
    }
  )

  watch(
    () => props.stop,
    (stopAnimation) => {
      if (stopAnimation) {
        stop()
        sprite.go(0)
        emit('stopped')
      }
    }
  )

  watch(
    () => props.playOnce,
    (playOnceAnimation) => {
      if (playOnceAnimation) {
        sprite.playOnce()
        emit('paused')
      }
    }
  )
  return {
    style,
    scaleStyle,
    currentAnimation: sprite.currentAnimation,
    isLoading
  }
}

// export function useSprite(props: SpritePropsInterface & ExtraProps, emit: any) {
//   const harmonySprite = new HarmonySprite('Characters', 'radfem')
//   const { state: image, isLoading } = useImage({ src: props.src })

//   const path =
//   let xOffset: Ref<number>
//   let state
//   let play = () => {}
//   let playOnce = () => {}
//   let stop = () => {}
//   let prev = () => {}
//   let next = () => {}
//   let go = (frame: number) => {}
//   let animatedStyle
//   const offsetPlaceholder = computed(() => {
//     return { left: `0px` }
//   })
//   const offsetStyle = computed(() => offsetPlaceholder.value)
//   //Crear transformador de tamaño de imagen
//   const style = computed(() => {
//     let backgroundPosition = `0px 0`
//     if (xOffset) {
//       backgroundPosition = `${-xOffset.value}px 0`
//     }
//     return {
//       position: 'absolute',
//       width: `${width.value}px`,
//       height: `${image.value?.height}px`,
//       objectFit: 'cover',
//       backgroundImage: `url(${props.src})`,
//       backgroundPosition: backgroundPosition,
//       backgroundRepeat: 'no-repeat'
//     } as StyleValue
//   })
//   const scaleStyle = computed(() => {
//     return {
//       transform: `scale(${props.scale})`
//     } as StyleValue
//   })
//   watch(isLoading, (loading) => {
//     if (loading === false) {
//       const { frameList, frameWidth } = useGenerateSpriteSheetOffset(
//         image as Ref<HTMLImageElement>,
//         frameCount
//       )
//       const animation = useAnimateSprite(frameList.value)
//       width.value = frameWidth.value
//       xOffset = animation.state
//       play = animation.play
//       playOnce = animation.playOnce
//       stop = animation.stop
//       prev = animation.prev
//       next = animation.next
//       go = animation.go
//       offsetPlaceholder.value = animation.style
//     }
//   })

//   watch(
//     () => props.pause,
//     (pause) => {
//       if (pause) {
//         stop()
//         emit('paused')
//       }
//     }
//   )

//   watch(
//     () => props.play,
//     (playAnimation) => {
//       if (playAnimation) {
//         play()
//         emit('playing')
//       }
//     }
//   )

//   watch(
//     () => props.stop,
//     (stopAnimation) => {
//       if (stopAnimation) {
//         stop()
//         go(0)
//         emit('stopped')
//       }
//     }
//   )

//   watch(
//     () => props.playOnce,
//     (playOnceAnimation) => {
//       if (playOnceAnimation) {
//         playOnce()
//         emit('paused')
//       }
//     }
//   )

//   return {
//     currentFrame: state,
//     go,
//     isLoading,
//     next,
//     offsetStyle,
//     play,
//     playOnce,
//     prev,
//     stop,
//     style,
//     scaleStyle
//   }
// }
