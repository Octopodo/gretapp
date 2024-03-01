<script setup lang="ts">
import Activist from './activist/Activist.vue';
import { gameConfigStore } from '@/stores';

const height = gameConfigStore().characterManagerHeight;
const cssHeight = `${height}px`;
</script>

<template>
    <div class="character-manager">
        <Activist />
    </div>
</template>

<style scoped>
.character-manager {
  height: v-bind(cssHeight);
  width: 100%;
  position: relative;
  display: flex;
  align-items: end;
  overflow: hidden;
}
</style>
