<template>
  <div class="board">
    <board-image :src="src" />
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
import { ref, computed, watch } from "vue";
import { useRandomColor } from "@/composables";
import { configStore } from "@/stores/configStore";
import BoardGrid from "./board-grid.vue";
import BoardImage from "./board-image.vue";

const config = configStore();




const props = defineProps({
  rows: { type: Number, default: 18 },
  cols: { type: Number, default: 30 },
  src: { type: String, required: true },
  victory: { type: Number, default: 15 },
});

const cols = ref(0);
const rows  =  ref(0)
const squareColor = useRandomColor();
const completed = ref(false);
const squaresTouched = ref(0);

const squareCount = computed(() => props.rows * props.cols);
const progress = computed(() => {
  const prog = (squaresTouched.value / squareCount.value) * 100;
  return Number(prog.toFixed(1));
});
const blockBoard = computed(() => false);

function squareTouched(event: number) {
  squaresTouched.value++;
}

function boardCompleted() {
  completed.value = true;
}

watch(progress, (value) => {
  if (value >= props.victory) {
    completed.value = true;
  }
});
</script>

<style scoped>
.board {
  position: relative;
}
</style>
