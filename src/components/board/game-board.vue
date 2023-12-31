<template>
  <div class="board">
    <board-image :src="src" :width="width" :height="height" />
    <div class="board">
      <board-grid
        :cols="cols"
        :rows="rows"
        :src="src"
        :victory="victory"
        :squareColor="squareColor"
        :square-count="squareCount"
        :blockBoard="blockBoard"
        @board-completed="boardCompleted"
        @square-touched="squareTouched"
      />
    </div>
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

const props = defineProps({
  image: { type: Object as PropType<ImageData>, required: true },
  src: { type: String, required: true },
  victory: { type: Number, default: 15 }
})

const squareColor = useRandomColor()
const completed = ref(false)
const squaresTouched = ref(0)
const { width, height, cols, rows } = useSetCanvasSize({
  width: props.image.width,
  height: props.image.height,
  maxWidth: config.playgroundWidth,
  maxHeight: config.playgroundHeight,
  resolution: config.gridResolution
})
const squareCount = computed(() => rows.value * cols.value)
const progress = computed(() => {
  const prog = (squaresTouched.value / squareCount.value) * 100
  return Number(prog.toFixed(1))
})
const blockBoard = computed(() => false)

function squareTouched(event: number) {
  squaresTouched.value++
}

function boardCompleted() {
  completed.value = true
}

watch(progress, (value) => {
  if (value >= props.victory) {
    completed.value = true
  }
})
</script>

<style scoped>
.board {
  position: relative;
}
</style>
