<script setup lang="ts">
import BoardGrid from './BoardGrid.vue'
import BoardImage from './BoardImage.vue'

import { ref, type PropType, type Ref } from 'vue'
import { useSetCanvasSize, type ImageData } from '@/composables'
import { gameConfigStore } from '@/stores/gameConfigStore'

const emit = defineEmits(['board-completed', 'square-touched'])
const props = defineProps({
  imageData: { type: Object as PropType<ImageData>, required: true }
})

const gameConfig = gameConfigStore()

const blockBoard = ref(false)
const { rows, cols, width, height } = useSetCanvasSize({
  width: props.imageData.width,
  height: props.imageData.height,
  maxWidth: gameConfig.playgroundWidth,
  maxHeight: gameConfig.playgroundHeight,
  resolution: gameConfig.squareSize
})
const squareCount = ref(rows.value * cols.value)
const squaresTouched = ref(0)
const progress = ref(0)
const image: Ref<ImageData> = ref(props.imageData)

const touchSquare = () => {
  squaresTouched.value++
  progress.value =
    (squaresTouched.value / squareCount.value) * gameConfig.winGoal * 100
  console.log(squaresTouched.value, squareCount.value)
  if (progress.value >= 100) {
    emit('board-completed')
    emit('square-touched')
    blockBoard.value = true
    init()
  }
}

const init = () => {
  squaresTouched.value = 0
  progress.value = 0
}
</script>

<template>
  <div class="board-layout-containter">
    <BoardImage
      :src="image.url"
      :width="width"
      :height="height"
      :alt="image.alt"
    />
    <BoardGrid
      :cols="cols"
      :rows="rows"
      :squareSize="gameConfig.squareSize"
      @square-touched="touchSquare"
    />
  </div>
</template>

<style scoped>
.board-layout-containter {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
</style>
