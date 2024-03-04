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

  const sprite = ref(new HarmonySprite(name.value))
  const maxHeigth = ref(sprite.value.maxHeight)
  const maxWidth = ref(sprite.value.maxWidth)
  const currentAnimation = computed(() => sprite.value.currentAnimation)
  const currentFrame = computed(() => currentAnimation.value.currentFrame)

  const top = computed(() => (maxHeigth.value - currentFrame.value.height) / 2)
  const scale = computed(() => props.scale)
  const frameCenterX = currentFrame.value.width
  const frameCenterY = currentFrame.value.height

  sprite.value.currentAnimation = 'Stand'

  const { isLoading } = useImage({ src: src.value })

  const spriteBox = computed(() => {
    return {
      position: 'absolute',
      width: `${maxWidth.value}px`,
      height: `${maxHeigth.value}px`,
      transformOrigin: `${frameCenterX}px ${frameCenterY}px`,
      transform: `scale(${scale.value})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    } as StyleValue
  })
  const containerStyle = computed(() => {
    return {
      position: 'relative',
      width: `${currentFrame.value.width}px`,
      height: `${currentFrame.value.height}px`,
      top: `${top.value}px`,
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
        
        `,

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
    sprite,
    isLoading,
    play: playAnimation,
    pause: pauseAnimation,
    stop: stopAnimation,
    playOnce: playOnceAnimation,
    setCurrentAnimation,
    spriteBox
  }
}
