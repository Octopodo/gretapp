<script setup lang="ts">
import {
  useSprite,
  SpriteProps,
  type SpritePropsInterface,
} from "@/composables";

const props = defineProps(SpriteProps);
const emit = defineEmits([""]);
const { isLoading, style, offsetStyle, scaleStyle } = useSprite(
  props as SpritePropsInterface,
  emit
);
const stops = 0;
</script>
<template>
  <div :style="[scaleStyle]">
    <div v-if="!isLoading" class="sprite" :src="src" :style="[style]"></div>
  </div>
</template>

<style scoped></style>
