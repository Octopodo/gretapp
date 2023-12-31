<template>
  <div>
    <div class="board-content">
      <board-square
        v-for="(square, index) in squareCount"
        :key="index"
        :index="index"
        :color="squareColor"
        :size="squareSize"
        :block="blockBoard"
        @touched="squareTouched($event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import BoardSquare from './board-square.vue'

const emit = defineEmits(['board-completed', 'square-touched'])

const props = defineProps({
  cols: { type: Number, default: 30 },
  rows: { type: Number, default: 18 },
  squareCount: { type: Number, required: true },
  src: { type: String, required: true },
  victory: { type: Number, default: 15 },
  squareColor: { type: String, reuired: true },
  blockBoard: { type: Boolean, default: true }
})

const squareSize = computed(() => 30)
const cols = computed(() => Number(props.cols))
const rows = computed(() => Number(props.rows))
const boardWidth = computed(() => `${squareSize.value * cols.value}px`)
const boardHeight = computed(() => `${squareSize.value * rows.value}px`)

const gridTemplateColumns = computed(() => `repeat(${cols.value}, 1fr)`)
const gridTemplateRows = computed(() => `repeat(${rows.value}, 1fr)`)

function squareTouched(event: number) {
  emit('square-touched', event)
}
</script>

<style scoped>
.board-content {
  position: absolute;
  display: grid;
  width: v-bind('boardWidth');
  grid-template-columns: v-bind('gridTemplateColumns');
  grid-template-rows: v-bind('gridTemplateRows');
  /* z-index: 50; */
}
</style>
