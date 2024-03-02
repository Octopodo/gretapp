<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePathStore } from '@/stores/'

import { Sprite } from '@/components/'

const spriteSelector = ref<HTMLElement | null>(null) as any
const currentSprite = ref(spriteSelector.value?.currentSprite)
const sprites = computed(() => spriteSelector.value?.sprites)

const assetPath = computed(() => '/sprites/characters/activist')

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

function selectSprite(name: string) {
  spriteSelector.value?.selectSprite(name)
}
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
        v-model="currentSprite"
        @change="selectSprite(currentSprite.name)"
      >
        <option
          v-for="sprite in sprites"
          :key="sprite.name"
          :value="sprite"
        >
          {{ sprite.name }}
        </option>
      </select>
    </div>
    <Sprite
      ref="spriteSelector"
      class="sprite"
      :src="assetPath"
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
