<script setup lang="ts">
import BoardManager from '@/components/board/BoardManager.vue'
import { useLoadImages, useRandomImagesUnique } from '@/composables'
import { CharacterManager } from '@/components/character'


const randomImages = useRandomImagesUnique(10);
const { loaded, images } = useLoadImages(randomImages)
</script>

<template>
  <p v-if="!loaded">Loading..</p>
  <template v-else>
    <BoardManager
      :images="images"
    />
    <CharacterManager />
  </template>
</template>

<style scoped>
</style>
