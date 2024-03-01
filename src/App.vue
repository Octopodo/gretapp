<script setup lang="ts">
import { SpritePlayground } from './components'
</script>

<template>
  <div
    @touchmove.prevent
    class="app"
  >
    <SpritePlayground />
  </div>
</template>

<style>
* {
  margin: 0;
}

.app {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-color: #848484;
  overflow: hidden;
}
</style>
