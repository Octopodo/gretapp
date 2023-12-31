<template>
  <div class="board-loader">
    <span v-if="!loaded"> <h1>Loading</h1></span>
    <game-board
      v-else
      v-for="(image, index) in images"
      :key="index"
      :image="image"
      :src="image.url"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLoadImages, useRandomImagesUnique, useSetCanvasSize } from '@/composables'
import { configStore } from '@/stores/configStore'

import GameBoard from '@/components/board/game-board.vue'

const config = configStore()

const imageData = useRandomImagesUnique(config.imageCount)
const { loaded, images } = useLoadImages(imageData)
</script>

<style scoped></style>
