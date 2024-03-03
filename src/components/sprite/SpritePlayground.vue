<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePathStore } from '@/stores/'

import { Sprite } from '@/components/'

const spriteRef = ref<HTMLElement | null>(null) as any
const sprite = computed(() => spriteRef.value?.sprite)
const animations = computed(() => sprite.value?.animations)

const reproductionState = ref({
  play: true,
  playOnce: false,
  pause: false,
  stop: false
})

function setReproductionState(wich: string) {
  Object.keys(reproductionState.value).forEach((key) => {
    const k = key as keyof typeof reproductionState.value
    if (key === wich) {
      reproductionState.value[k] = true
    } else {
      reproductionState.value[k] = false
    }
  })
}

function selectSprite(payload: Event) {
  if (!sprite.value) return
  const target = payload.target as HTMLInputElement
  const oldName = sprite.value.currentAnimation.name
  sprite.value.currentAnimation = target?.value
  if (sprite.value.currentAnimation.name !== oldName) {
    setReproductionState('')
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
        @click="setReproductionState('play')"
      >
        Play
      </button>
      <button
        class="control"
        @click="setReproductionState('playOnce')"
      >
        Play Once
      </button>
      <button
        class="control"
        @click="setReproductionState('pause')"
      >
        Pause
      </button>
      <button
        class="control"
        @click="setReproductionState('stop')"
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
      v-bind="reproductionState"
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
