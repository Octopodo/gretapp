<template>
  <div class="board-loader">
    <transition name="slide-left">
      <span v-if="!loaded"> <h1>Loading</h1></span>

      <game-board
        v-else
        @board-completed="goToNextBoard()"
        class="game-board-container"
        :key="index"
        :image-data="state"
        :victory="config.victoryCondition"
      />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, type Ref } from 'vue'
import { useLoadImages, useRandomImagesUnique, type ImageData } from '@/composables'
import { configStore } from '@/stores/configStore'
import { useCycleList } from '@vueuse/core'

import GameBoard from '@/components/board/game-board.vue'

let cycleList
let next: Function
let prev: Function
let state: Ref<ImageData>
let index: Ref<number>

const config = configStore()
const imageData = useRandomImagesUnique(config.imageCount)
const { loaded, images } = useLoadImages(imageData)

const currentProgress = ref(0)
const gameSpeed = computed(() => config.gameSpeed + 'ms')

watchEffect(() => {
  if (loaded.value) {
    cycleList = useCycleList(images.value)
    next = cycleList.next
    prev = cycleList.prev
    state = cycleList.state
    index = cycleList.index
  }
})

async function goToNextBoard() {
  await new Promise((resolve) => setTimeout(resolve, config.pictureChangeDelay))
  next()
}
</script>

<style scoped>
.board-loader {
  display: grid;
  /* align-items: center; */
  justify-content: center;
}
.game-board-container {
  position: absolute;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform v-bind('gameSpeed') ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
