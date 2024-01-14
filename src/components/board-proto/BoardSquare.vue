<script setup lang="ts">
import { ref, computed } from 'vue'

import { gameConfigStore, devConfigStore } from '@/stores'

const gameConfig = gameConfigStore()
const devConfig = devConfigStore()

const color = computed(() => `${gameConfig.baseColor}px`)
const size = computed(() => `${gameConfig.squareSize}px`)
const opacity = computed(() => `${devConfig.gridOpacity}%`)
const square = ref(null)
</script>

<template>
  <div class="board-square-container">
    <div
      ref="square"
      class="board-square"
    ></div>
  </div>
</template>

<style scoped>
.board-square-container {
  display: grid;
  place-content: center;
  width: v-bind('size');
  height: v-bind('size');
  box-sizing: border-box;
}

.board-square {
  background-color: v-bind('color');
  width: 10px;
  height: 10px;
  border-radius: 50%;
  opacity: v-bind('opacity');
}
</style>
