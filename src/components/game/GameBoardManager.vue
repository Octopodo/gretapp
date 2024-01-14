<script setup lang="ts">
import { computed, ref, watchEffect, type Ref, type PropType } from 'vue'
import { type ImageData } from '@/types'
import BoardLayout from '@/components/board/BoardLayout.vue'
import { useCycleList } from '@vueuse/core'
import { gameConfigStore } from '@/stores/gameConfigStore'
import { useLoadImages } from '@/composables'

const props = defineProps({
  images: { type: Object as PropType<ImageData[]>, required: true }
})

const gameConfig = gameConfigStore()

let cycleList
let next: Function
let prev: Function
let state: Ref<ImageData>
let index: Ref<number>

const { loaded, images } = useLoadImages(props.images)
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
  await new Promise((resolve) =>
    setTimeout(resolve, gameConfig.boardChangeDelay)
  )

  next()
}
</script>

<template>
  <transition name="slide-left">
    <span v-if="!loaded"> <h1>Loading</h1></span>

    <BoardLayout
      v-else
      @board-completed="goToNextBoard()"
      class="game-board-container"
      :key="index"
      :image-data="state"
    />
  </transition>
</template>

<style scoped></style>
