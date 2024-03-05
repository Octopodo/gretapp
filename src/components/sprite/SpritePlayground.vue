<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import anime from 'animejs'

import { Sprite } from '@/components/'

const sprite = ref<HTMLElement | null>(null) as any
const animations = computed(() => sprite.value?.sprite.animations)

const playing = ref(false)
const stopped = ref(true)

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
  if (playing.value) {
    return
  }
  // sprite.value.setCurrentAnimation('Walk')
  playing.value = true
  stopped.value = false
  sprite.value.playOnce().then(() => {
    playing.value = false
    stopped.value = true
  })
}

const fps = 1000 / 12
const keyFrames = [0, -100, -300, -330, 0]

const pause = (duration: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, duration))

const doJump = async () => {
  if (playing.value) {
    return
  }
  sprite.value.setCurrentAnimation('Jump')
  let promise: Promise<void> = Promise.resolve()
  keyFrames.forEach((frame) => {
    promise = promise.then(() => {
      anime.set('.sprite', { translateY: frame })
      return pause(fps)
    })
  })
  doPlayOnce()
}

const doPause = () => {
  sprite.value.pause()
}

const buttons = ref({
  play: doPlay,
  stop: doStop,
  playOnce: doPlayOnce,
  pause: doPause,
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
  window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
      doJump()
    }
  })

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
    </div>

    <Sprite
      ref="sprite"
      class="sprite"
      :scale="0.4"
      @stop="doStop"
      @keydown.space="doJump"
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
  position: absolute;
  top: -200px;
  left: 100px;
}

.line {
  width: 100%;
  height: 4px;
  background-color: black;
  position: absolute;
  top: 62%;
  top: 430px;
  left: 0;
}
</style>
