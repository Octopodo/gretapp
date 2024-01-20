<script setup lang="ts">
import BoardManager from '@/components/board/BoardManager.vue'
import { computed, ref, watchEffect, type Ref } from 'vue'
import { type ImageData } from '@/types'
import {
  useLoadImages,
  useRandomImagesUnique
} from '@/composables/useLoadImages'

const randomImages = useRandomImagesUnique(10)
const { loaded, images } = useLoadImages(randomImages)
</script>

<template>
  <div class="game">
    <p v-if="!loaded">Loading..</p>
    <BoardManager
      v-else
      :images="images"
    />
  </div>
</template>

<style scoped>
.game {
  width: 100%;
  height: 100%;
}
</style>
