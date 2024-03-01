import { ref, reactive, computed } from 'vue'
import type { ExtraProps } from '@/types'
import { getSpritePaths } from '@/composables/useSprite/getSpritePaths'
import { SpriteProps, useExtractSpriteSheetData } from '@/composables/useSprite'
import { type SpritePropsInterface } from '@/composables/useSprite'

export interface SpriteSelectorPropsInterface extends SpritePropsInterface {}

export const SpriteSelectorProps = {
  ...SpriteProps
}

export function useSpriteSelector(
  props: SpriteSelectorPropsInterface & ExtraProps
) {
  const srcs = getSpritePaths(props.src)
  const sprites: any = ref([])
  const spriteNames = reactive([] as Array<string | undefined>)
  srcs.forEach((src: string) => {
    const { pose } = useExtractSpriteSheetData(src)
    const sprite = {
      name: pose,
      src: src
    }
    sprites.value.push(sprite)
    spriteNames.push(sprite.name)
  })

  const current = ref(sprites.value[0])

  const currentSprite = computed(() => current.value)
  function selectSprite(name: string) {
    const foundSprite = sprites.value.find(
      (sprite: any) => sprite.name === name
    )
    if (foundSprite) {
      current.value = foundSprite
    }
  }

  return { sprites, spriteNames, currentSprite, selectSprite }
}
