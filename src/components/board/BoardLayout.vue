<script setup lang="ts">
// import { BoardController } from '../../composables'
// import BoardInfo from './BoardInfo.vue'
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
const squresTouched = ref(0)
const progress = ref(0)
const image: Ref<ImageData> = ref(props.imageData)

const touchSquare = () => {
  squresTouched.value++
  progress.value =
    (squresTouched.value / squareCount.value) * gameConfig.winGoal

  if (progress.value >= 100) {
    emit('board-completed')
    emit('square-touched')
    blockBoard.value = true
  }
}
</script>

<template>
  <div>
    <BoardInfo
      :progerss="progress"
      :title="image.name"
      :author="image.author"
    />
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
