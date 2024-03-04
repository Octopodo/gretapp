import type { ExtraProps } from '@/types'
import { ref, computed, watch, type StyleValue } from 'vue'
import { useImage } from '@vueuse/core'
import { HarmonySprite } from '@/engine/Sprite'

export interface SpritePropsInterface {
  scale: number
  name: string
  direction: number
}

export const SpriteProps = {
  scale: {
    type: Number,
    default: 1
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
  const name = computed(() => props.name)

  //Implement multi file support
  const src = computed(() => `/assets/sprites/${name.value}-1.png`)
  const { state: image } = useImage({ src: src.value })
  const width = computed(() => image.value?.width)
  const height = computed(() => image.value?.height)
  const sprite = ref(new HarmonySprite(name.value))
  const maxHeigth = ref(sprite.value.maxHeight)
  const currentAnimation = computed(() => sprite.value.currentAnimation)
  const currentFrame = computed(() => currentAnimation.value.currentFrame)

  const top = computed(() => (maxHeigth.value - currentFrame.value.height) / 2)

  const frameCenterX = currentFrame.value.width / 2
  const frameCenterY = currentFrame.value.height

  sprite.value.currentAnimation = 'Standing'

  const { state: isLoading } = useImage({ src: src.value })
  const scaleStyle = computed(() => {
    return {
      transform: `scale(${props.scale})`,
      transformOrigin: 'bottom center'
    } as StyleValue
  })

  const containerStyle = computed(() => {
    return {
      position: 'relative',
      width: `${currentFrame.value.width}px`,
      height: `${currentFrame.value.height}px`,
      top: `${top.value}px`,
      transformOrigin: 'bottom center',
      overflow: 'hidden'
    } as StyleValue
  })

  const imgStyle = computed(() => {
    return {
      position: 'absolute',
      top: `${-currentFrame.value.y}px`,
      left: `${-currentFrame.value.x}px`,
      transform: `
        scaleX(${props.direction}) 
        scale(${props.scale})
        `,
      transformOrigin: `${frameCenterX}px ${frameCenterY}px`,

      pointerEvents: 'none'
    } as StyleValue
  })

  function playAnimation() {
    console.log('PLAYING ANIMATION')
    sprite.value.play()
    emit('playing')
  }
  function pauseAnimation() {
    sprite.value.pause()
    emit('paused')
  }
  function stopAnimation() {
    sprite.value.stop()
    emit('stop')
  }
  function playOnceAnimation() {
    sprite.value.playOnce().then(() => {
      emit('playedOnce')
      stopAnimation()
    })
  }
  function setCurrentAnimation(name: string) {
    sprite.value.currentAnimation = name
  }

  return {
    imgStyle,
    containerStyle,
    scaleStyle,
    sprite,
    isLoading,
    play: playAnimation,
    pause: pauseAnimation,
    stop: stopAnimation,
    playOnce: playOnceAnimation,
    setCurrentAnimation
  }
}
