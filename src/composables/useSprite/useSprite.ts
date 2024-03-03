import type { ExtraProps } from '@/types'
import { ref, computed, watch, type StyleValue } from 'vue'
import { useImage } from '@vueuse/core'
import { HarmonySprite } from '@/engine/Sprite'
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
  //Implement multi file support
  const src = computed(() => `/assets/sprites/${name.value}-1.png`)
  const sprite = ref(new HarmonySprite(name.value))
  const currentAnimation = computed(() => sprite.value.currentAnimation)
  const currentFrame = computed(() => currentAnimation.value.currentFrame)

  sprite.value.currentAnimation = 'Standing'

  const { state: isLoading } = useImage({ src: src.value })
  const scaleStyle = computed(() => {
    return {
      transform: `scale(${props.scale})`
    } as StyleValue
  })
  const style = computed(() => {
    const x = currentFrame.value.x

    const y = currentFrame.value.y

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

  watch(
    () => props.pause,
    (pause) => {
      if (pause) {
        sprite.value.pause()
        emit('paused')
      }
    },
    { immediate: true }
  )

  watch(
    () => props.play,
    (play) => {
      if (play) {
        sprite.value.play()
        emit('playing')
      }
    },
    { immediate: true }
  )

  watch(
    () => props.stop,
    (stop) => {
      if (stop) {
        sprite.value.stop()
        sprite.value.go(0)
        emit('stopped')
      }
    },
    { immediate: true }
  )

  watch(
    () => props.playOnce,
    (playOnce) => {
      if (playOnce) {
        sprite.value.playOnce()
        emit('paused')
      }
    },
    { immediate: true }
  )
  return {
    style,
    scaleStyle,
    sprite,
    isLoading
  }
}
