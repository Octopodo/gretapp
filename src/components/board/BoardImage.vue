<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'A piece of  art' },
  width: { type: Number, required: true },
  height: { type: Number, required: true }
})

const width = computed(() => `${props.width}px`)
const height = computed(() => `${props.height}px`)
</script>

<template>
  <img
    class="art-piece"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
  />
</template>

<style scoped>
.art-piece {
  position: absolute;
  width: v-bind('width');
  height: v-bind('height');
}
</style>
