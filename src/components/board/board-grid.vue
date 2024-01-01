<template>
  <div>
    <div class="board-content" @pointermove.prevent="handlePoinerMove">
      <board-square
        v-for="(square, index) in squareCount"
        :key="index"
        ref="squares"
        :color="squareColor"
        :size="squareSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { configStore } from '@/stores/configStore'
import { useAnimateSquare } from '@/composables'
import BoardSquare from './board-square.vue'

const emit = defineEmits(['square-touched'])

const config = configStore()
const props = defineProps({
  cols: { type: Number, default: 30 },
  rows: { type: Number, default: 18 },
  squareCount: { type: Number, required: true },
  victory: { type: Number, default: 15 },
  squareColor: { type: String, default: '#99ff55' },
  blockBoard: { type: Boolean, default: true }
})

const squareSize = computed(() => config.gridResolution)
const cols = computed(() => Number(props.cols))
const rows = computed(() => Number(props.rows))
const boardWidth = computed(() => `${squareSize.value * cols.value}px`)
// const boardHeight = computed(() => `${squareSize.value * rows.value}px`)

const squares = ref<InstanceType<typeof BoardSquare>[]>([])
const squaresTouched = ref(Array(rows.value * cols.value).fill(false))
const gridTemplateColumns = computed(() => `repeat(${cols.value}, 1fr)`)
const gridTemplateRows = computed(() => `repeat(${rows.value}, 1fr)`)

const handlePoinerMove = (event: PointerEvent) => {
  const target = event.currentTarget as Element
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const squareSize = rect.width / cols.value
  const col = Math.floor(x / squareSize)
  const row = Math.floor(y / squareSize)

  const index = row * cols.value + col
  if (squaresTouched.value[index] === false && !props.blockBoard) {
    squaresTouched.value[index] = true
    const square = squares.value[index].$refs.square as HTMLElement
    useAnimateSquare(square, props.squareColor)
    emit('square-touched')
  }
}
</script>

<style scoped>
.board-content {
  /* position: absolute; */
  display: grid;
  width: v-bind('boardWidth');
  grid-template-columns: v-bind('gridTemplateColumns');
  grid-template-rows: v-bind('gridTemplateRows');
  /* z-index: 50; */
}
</style>
