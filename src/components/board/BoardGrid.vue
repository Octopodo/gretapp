<script setup lang="ts">
import { ref, computed, inject } from 'vue'
import { useAnimateSquare } from '@/composables'
import BoardSquare from './BoardSquare.vue'

const emit = defineEmits(['square-touched'])
const props = defineProps({
  cols: { type: Number, required: true },
  rows: { type: Number, required: true },
  squareSize: { type: Number, required: true }
})

const boardWidth = inject('boardWidth', ref(0))
const color = inject('paintColor', ref(''))
const block = inject('blockBoard', ref(false))

const cols = computed(() => Number(props.cols))
const rows = computed(() => Number(props.rows))
const squareSize = computed(() => Number(props.squareSize))

const viewSquares = ref<InstanceType<typeof BoardSquare>[]>([])
const squaresTouched = ref(Array(rows.value * cols.value).fill(false))

const gridTemplateColumns = computed(() => `repeat(${props.cols}, 1fr)`)
const gridTemplateRows = computed(() => `repeat(${props.rows}, 1fr)`)
const squareCount = computed(() => props.cols * props.rows)

const boardStyle = computed(() => ({
  width: `${boardWidth.value}px`,
  gridTemplateColumns: gridTemplateColumns.value,
  gridTemplateRows: gridTemplateRows.value
}))
const paint = (event: PointerEvent) => {
  const target = event.currentTarget as Element
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const col = Math.floor(x / squareSize.value)
  const row = Math.floor(y / squareSize.value)

  const index = row * props.cols + col
  if (squaresTouched.value[index] === false && !block.value) {
    emit('square-touched')
    squaresTouched.value[index] = true
    const square = viewSquares.value[index].$refs.square as HTMLElement
    useAnimateSquare(square, color.value)
  }
}
</script>

<template>
  <div
    class="board-grid"
    @pointermove="paint"
  >
    <BoardSquare
      v-for="(square, index) in squareCount"
      ref="viewSquares"
      :key="index"
    />
  </div>
</template>

<style scoped>
.board-grid {
  display: grid;
  position: absolute;
  width: v-bind('boardWidth');
  grid-template-columns: v-bind('gridTemplateColumns');
  grid-template-rows: v-bind('gridTemplateRows');
}
</style>
