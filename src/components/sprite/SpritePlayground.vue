<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import { Sprite } from '@/components/'
import { SpriteB } from '@/components/'

const sprite = ref<HTMLElement | null>(null) as any
const animations = computed(() => sprite.value?.sprite.animations)

const playing = ref(false)
const stopped = ref(true)
function selectSprite(payload: Event) {
  if (!sprite.value) return
  const target = payload.target as HTMLInputElement
  const oldName = sprite.value.currentAnimation.name
  sprite.value.currentAnimation = target?.value
  if (sprite.value.currentAnimation.name !== oldName) {
    stop()
  }
}

function doStop() {
  sprite.value.setCurrentAnimation('Stand')
  stopped.value = true
  playing.value = false
}

function doPlay() {
  sprite.value.setCurrentAnimation('Walk')
  sprite.value.play()
  playing.value = true
  stopped.value = false
}

function doPlayOnce() {
  sprite.value.setCurrentAnimation('Walk')
  sprite.value.playOnce()
}

const doJump = () => {
  sprite.value.setCurrentAnimation('Jump')
  sprite.value.playOnce()
}

const buttons = ref({
  play: doPlay,
  stop: doStop,
  playOnce: doPlayOnce,
  pause: sprite.value?.pause,
  jump: doJump
})
onMounted(() => {
  const handler = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (playing.value) {
        doStop()
      } else if (stopped.value) {
        doPlay()
      }
    }
  }

  window.addEventListener('keydown', handler)

  // onBeforeUnmount(() => {
  //   window.removeEventListener('keydown', handler)
  // })
})
</script>
<template>
  <div>
    <div class="controls">
      <button
        v-for="(action, key) in buttons"
        :key="key"
        class="control"
        @click="action"
      >
        {{ key }}
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
    <SpriteB
      ref="sprite"
      class="sprite"
      @stop="doStop"
    />
    <div class="line"></div>
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

.line {
  width: 100%;
  height: 4px;
  background-color: black;
  position: absolute;
  top: 57%;
  left: 0;
}
</style>
