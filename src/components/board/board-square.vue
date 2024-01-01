<template>
  <div class="board-square-container" :class="{ inactive: touched }">
    <div ref="square" class="board-square"></div>
  </div>
  <!-- <div class="main-board-square">Hola square</div> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAnimateSquare } from '../../composables'
import { configStore } from '@/stores/configStore'

const config = configStore()

const props = defineProps({
  size: { type: [Number, String], required: true },
  color: { type: String, default: '#99ff55' },
  borderColor: { type: String, default: '#ff5510' }
})

const square = ref()
const touched = ref(false)

const size = computed(() => `${props.size}px`)
const color = computed(() => props.color)
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

.board-square {
  background-color: v-bind('color');
  width: 10px;
  height: 10px;
  border-radius: 50%;
  /* filter: blur(01px); */
  opacity: v-bind('gridOpacity');
}

.inactive {
  pointer-events: none;
}
</style>
