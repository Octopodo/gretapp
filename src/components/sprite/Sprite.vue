<script setup lang="ts">
import {
  useSprite,
  SpriteProps,
  type SpritePropsInterface
} from '@/composables'

const props = defineProps(SpriteProps)
const emit = defineEmits(['play', 'pause', 'stop', 'playedOnce'])
const { style, scaleStyle, isLoading, sprite } = useSprite(props, emit)
defineExpose({ sprite })
</script>

<template>
  <div
    class="sprite-container"
    :style="scaleStyle"
  >
    <div
      class="sprite"
      :style="style"
    ></div>
  </div>
</template>

<style scoped></style>
