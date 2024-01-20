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
  <div class="board-manager">
    <transition name="slide-left">
      <span v-if="!loaded"> <h1>Loading</h1></span>

      <div
        v-else
        class="board-layout"
      >
        <BoardLayout
          @board-completed="goToNextBoard()"
          :key="index"
          :image-data="state"
        />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.board-layout {
  position: relative;
  display: block;
}
.board-manager {
  width: 100%;
  height: 100%;
  position: relative;
  /* background-color: #fff; */
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  transform: translateX(0);
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform v-bind('gameConfig.gameSpeed') ease-in-out;
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
