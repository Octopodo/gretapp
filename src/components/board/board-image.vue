<template>
  <div class="art-piece">
    <img
      alt=""
      ref="srcImage"
      :src="src"
      :style="sizeStyle"
    />
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

const sizeStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`
}))
</script>

<style scoped></style>
