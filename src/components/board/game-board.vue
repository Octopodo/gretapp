<template>
  <div class="board-container">
    <board-image class="board-element" :src="imageData.url" :width="width" :height="height" />

    <board-grid
      class="board-element"
      :cols="cols"
      :rows="rows"
      :victory="victory"
      :squareColor="squareColor"
      :square-count="squareCount"
      :blockBoard="blockBoard"
      @board-completed="boardCompleted"
      @square-touched="squareTouched"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, type PropType } from 'vue'
import { useSetCanvasSize, type ImageData } from '@/composables'
import { useRandomColor } from '@/composables'
import { configStore } from '@/stores/configStore'
import BoardGrid from './board-grid.vue'
import BoardImage from './board-image.vue'

const config = configStore()

const emit = defineEmits(['board-completed', 'square-touched'])
const props = defineProps({
  imageData: { type: Object as PropType<ImageData>, required: true },
  victory: { type: Number, default: 15 }
})
const progress = computed(() => {
  const prog = (squaresTouched.value / squaresToWin.value) * 100
  return Number(prog.toFixed(1))
})
const squareColor = useRandomColor()
const completed = ref(false)
const squaresTouched = ref(0)
const { width, height, cols, rows } = useSetCanvasSize({
  width: props.imageData.width,
  height: props.imageData.height,
  maxWidth: config.playgroundWidth,
  maxHeight: config.playgroundHeight,
  resolution: config.gridResolution
})
const squareCount = computed(() => rows.value * cols.value)
const squaresToWin = computed(() => {
  return Math.ceil((props.victory / 100) * squareCount.value)
})

const rawProgress = computed(() => {
  const prog = (squaresTouched.value / squareCount.value) * 100
  return Number(prog.toFixed(1))
})
const blockBoard = ref(false)

function squareTouched(event: number) {
  squaresTouched.value++
}

function boardCompleted() {
  completed.value = true
}

watch(progress, (value) => {
  if (value >= 100) {
    blockBoard.value = true
    completed.value = true
    emit('board-completed')
  }
})
</script>

<style scoped>
.board-container {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}
.board-element {
  position: absolute;
}
</style>
