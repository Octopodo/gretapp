<script setup lang="ts">
import { computed } from 'vue'
import { useSprite, SpriteProps } from '@/composables'

const props = defineProps(SpriteProps)
const emit = defineEmits(['play', 'pause', 'stop', 'playedOnce'])
const name = computed(() => props.name)

const {
  imgStyle,
  containerStyle,
  isLoading,
  spriteBox,
  sprite,
  play,
  pause,
  stop,
  playOnce,
  setCurrentAnimation
} = useSprite(props, emit)
defineExpose({ sprite, play, pause, stop, playOnce, setCurrentAnimation })
const src = computed(() => sprite?.value.src || '')
</script>

<template>
  <div
    v-show="!isLoading"
    :style="spriteBox"
    class="sprite-box"
  >
    <div
      class="sprite-container"
      :style="containerStyle"
    >
      <img
        class="sprite-image"
        :src="src"
        :style="imgStyle"
      />
    </div>
  </div>
</template>

<style scoped></style>
