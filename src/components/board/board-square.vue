<template>
  <div
    class="board-square-container"
    :class="{ inactive: touched }"
    @mouseover="touch"
    @pointerdown="(e) => touch(e)"
  >
    <div ref="square" class="board-square"></div>
  </div>
  <!-- <div class="main-board-square">Hola square</div> -->
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useAnimateSquare } from '../../composables'

const emit = defineEmits(['touched'])

const props = defineProps({
  size: { type: [Number, String], required: true },
  index: { type: Number, required: true },
  color: { type: String, default: '#99ff55' },
  borderColor: { type: String, default: '#ff5510' },
  block: { type: Boolean, default: false }
})

const square = ref()
const touched = ref(false)

const size = computed(() => `${props.size}px`)
const color = computed(() => props.color)

function touch(event: MouseEvent | PointerEvent) {
  if (props.block || touched.value) return
  touched.value = true
  useAnimateSquare(square.value, props.color)
  emit('touched', props.index)
}
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
  opacity: 0;
}

.inactive {
  pointer-events: none;
}
</style>
