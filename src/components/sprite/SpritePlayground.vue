<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePathStore } from '@/stores/'
import { Sprite } from '@/components/'
import { SpriteSelector } from '@/components/'

interface SpritePropsInterface {
  src: string
  play: boolean
  playOnce: boolean
  pause: boolean
  stop: boolean
}

const pathStore = usePathStore()
const spriteSelector = ref<HTMLElement | null>(null) as any
const currentSprite = ref(spriteSelector.value?.currentSprite)
const sprites = computed(() => spriteSelector.value?.sprites)

const assetPath = computed(() => '/sprites/characters/activist')
const play = ref(false)
const playOnce = ref(false)
const pause = ref(false)
const stop = ref(false)

const playAnimation = () => {
  play.value = true
  playOnce.value = false
  pause.value = false
  stop.value = false
}

const playOnceAnimation = () => {
  play.value = false
  playOnce.value = true
  pause.value = false
  stop.value = false
}
const pauseAnimation = () => {
  play.value = false
  playOnce.value = false
  pause.value = true
  stop.value = false
}
const stopAnimation = () => {
  play.value = false
  playOnce.value = false
  pause.value = false
  stop.value = true
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
        @click="playAnimation"
      >
        Play
      </button>
      <button
        class="control"
        @click="playOnceAnimation"
      >
        Play Once
      </button>
      <button
        class="control"
        @click="pauseAnimation"
      >
        Pause
      </button>
      <button
        class="control"
        @click="stopAnimation"
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
    <SpriteSelector
      ref="spriteSelector"
      :src="assetPath"
      :play="play"
      :playOnce="playOnce"
      :pause="pause"
      :stop="stop"
    />
  </div>
</template>

<style scoped>
.control {
  width: 100px;
  height: 50px;
  font-size: 1.2rem;
}
</style>
