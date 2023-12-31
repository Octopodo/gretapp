<template>
  <div>
    <!-- <board class="main-board" :src="config.artPlaceholderUrl" /> -->
    <board-loader/>
  </div>
</template>

<script setup lang="ts">
import Board from "./components/board/board.vue";
import BoardLoader from '@/components/board-loader/board-loader.vue'
import { configStore } from "./stores/configStore";

const config = configStore();
config
</script>

<style scoped></style>
