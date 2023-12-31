<template>
  <div class="art-piece">
    <img ref="srcImage" :src="src" alt="" :width="width" :height="height" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'A piece of  art' },
  width: { type: Number, required: true },
  height: { type: Number, required: true }
})
</script>

<style scoped>
.art-piece {
  position: absolute;
}
</style>
