<script setup lang="ts">
import { ref, computed, inject } from "vue";
import { useAnimateSquare } from "@/composables";
import BoardSquare from "./BoardSquare.vue";
import { frameConfigStore } from "@/components/frame";

const emit = defineEmits(["square-touched"]);
const props = defineProps({
  cols: { type: Number, required: true },
  rows: { type: Number, required: true },
  squareSize: { type: Number, required: true },
  block: { type: Boolean, required: true },
});

const boardWidth = inject("boardWidth", ref(0));
const color = inject("paintColor", ref(""));

const block = computed(() => Boolean(props.block));
const cols = computed(() => Number(props.cols));
const rows = computed(() => Number(props.rows));
const squareSize = computed(() => Number(props.squareSize));

const viewSquares = ref<InstanceType<typeof BoardSquare>[]>([]);
const squaresTouched = ref(Array(rows.value * cols.value).fill(false));

const gridTemplateColumns = computed(() => `repeat(${cols.value}, 1fr)`);
const gridTemplateRows = computed(() => `repeat(${rows.value}, 1fr)`);
const squareCount = computed(() => rows.value * cols.value);
const frameWidth = computed(() => `${frameConfigStore().frameWidth}px`)

const paint = (event: PointerEvent) => {
  if (block.value) {
    return;
  }
  const target = event.currentTarget as Element;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const col = Math.floor(x / squareSize.value);
  const row = Math.floor(y / squareSize.value);

  const index = row * props.cols + col;
  if (squaresTouched.value[index] === false && !block.value) {
    emit("square-touched");
    squaresTouched.value[index] = true;
    const square = viewSquares.value[index].$refs.square as HTMLElement;
    useAnimateSquare(square, color.value);
  }
};
</script>

<template>
  <div class="board-grid" @pointermove="paint">
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
  grid-template-columns: v-bind("gridTemplateColumns");
  grid-template-rows: v-bind("gridTemplateRows");
  top: v-bind('frameWidth');
  left: v-bind('frameWidth')
}
</style>
