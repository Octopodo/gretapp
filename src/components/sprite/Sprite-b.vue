<script setup lang="ts">
import { computed, ref } from 'vue'
import { useImage } from '@vueuse/core'
import {
  useSprite,
  SpriteProps,
  type SpritePropsInterface
} from '@/composables'

const props = defineProps(SpriteProps)
const emit = defineEmits(['play', 'pause', 'stop', 'playedOnce'])
const name = computed(() => props.name)
const src = computed(() => `/assets/sprites/${name.value}-1.png`)

const {
  imgStyle,
  containerStyle,
  isLoading,
  sprite,
  play,
  pause,
  stop,
  playOnce,
  setCurrentAnimation
} = useSprite(props, emit)
defineExpose({ sprite, play, pause, stop, playOnce, setCurrentAnimation })
</script>

<template>
  <div
    class="sprite-container"
    :style="containerStyle"
  >
    <img
      class="sprite"
      :src="src"
      :style="imgStyle"
    />
  </div>
</template>

<style scoped></style>
