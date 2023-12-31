<template>
  <div>
    <span v-if="!loaded"> <h1>Loading</h1></span>
    <board v-else v-for="(image, index) in images" :key="index" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  useLoadImages,
  useRandomImagesUnique,
  useSetCanvasSize,
  type ImageData
} from '@/composables'
import { configStore } from '@/stores/configStore'

import Board from '@/components/board/board.vue'

const config = configStore()

const imageData = useRandomImagesUnique(config.imageCount)
const { loaded, images } = useLoadImages(imageData)
const boardCols = ref(0)
const boardRows = ref(0)

// watch(loaded, (value) => {
//   if (value) {
//     const { cols, rows, width, height } = useSetCanvasSize(
//       images.value[0].width,
//       images.value[0].height
//     )
//   }
// })
</script>

<style scoped></style>
