<script setup lang="ts">
// import { BoardController } from '../../composables'
// import BoardInfo from './BoardInfo.vue'
import BoardGrid from './BoardGrid.vue'
// import BoardImage from './BoardImage.vue'

import { ref, watch, type PropType, type Ref } from 'vue'
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

watch(squaresTouched, (value) => {
  emit('square-touched')
  progress.value = (value / squareCount.value) * gameConfig.winGoal

  if (progress.value >= 100) {
    emit('board-completed')
    blockBoard.value = true
  }
})
</script>

<template>
  <div>
    <BoardInfo
      :progerss="progress"
      :title="image.name"
      :author="image.author"
    />
    <BoardImage
      :imageData="image.url"
      :width="width"
      :height="height"
      :alt="image.alt"
    />
    <BoardGrid
      :cols="cols"
      :rows="rows"
      :squareSize="gameConfig.squareSize"
      @square-touched="squaresTouched++"
    />
  </div>
</template>
