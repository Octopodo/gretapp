<template>
  <div
    class="board-square-container"
    :class="{ inactive: touched }"
  >
    <div
      ref="square"
      class="board-square"
    ></div>
  </div>
  <!-- <div class="main-board-square">Hola square</div> -->
</template>

<script setup lang="ts">
import { computed, ref, inject, type Ref } from 'vue'
import { devConfigStore } from '@/stores/devConfigStore'

const config = devConfigStore()

const bubbleColor = inject<Ref<string>>('bubbleColor', ref(''))
const squareSize = inject<Ref<number>>('squareSize', ref(0))

const square = ref()
const touched = ref(false)

const size = computed(() => `${squareSize.value}px`)
const gridOpacity = computed(() => config.gridOpacity + '%')
</script>

<style scoped>
.board-square-container {
  display: grid;
  place-content: center;
  width: v-bind('size');
  height: v-bind('size');
  box-sizing: border-box;
  cursor: pointer;
}



.inactive {
  pointer-events: none;
}
</style>
