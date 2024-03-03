<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePlayer } from '@/composables'

import { Sprite } from '@/components/'

const spriteRef = ref<HTMLElement | null>(null) as any
const sprite = computed(() => spriteRef.value?.sprite)
const animations = computed(() => sprite.value?.animations)

const { state, play, playOnce, pause, stop } = usePlayer()

function selectSprite(payload: Event) {
  if (!sprite.value) return
  const target = payload.target as HTMLInputElement
  const oldName = sprite.value.currentAnimation.name
  sprite.value.currentAnimation = target?.value
  if (sprite.value.currentAnimation.name !== oldName) {
    stop()
  }
}

onMounted(() => {
  const stop = 0
})
</script>
<template>
  <div>
    <div class="controls">
      <button
        class="control"
        @click="play"
      >
        Play
      </button>
      <button
        class="control"
        @click="playOnce"
      >
        Play Once
      </button>
      <button
        class="control"
        @click="pause"
      >
        Pause
      </button>
      <button
        class="control"
        @click="stop"
      >
        Stop
      </button>
      <select
        class="control"
        @change="selectSprite"
      >
        <option
          v-for="(animation, index) in animations"
          :key="index"
          :value="animation"
          :selected="animation === sprite.currentAnimation.name"
        >
          {{ animation }}
        </option>
      </select>
    </div>
    <Sprite
      ref="spriteRef"
      class="sprite"
      v-bind="state"
    />
  </div>
</template>

<style scoped>
.control {
  width: 100px;
  height: 50px;
  font-size: 1.2rem;
}

.sprite {
  position: relative;
  top: 100px;
  left: 100px;
}
</style>
