<template>
  <div class="art-piece">
    <img ref="srcImage" :src="src" alt="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: "A piece of  art" },
});

</script>

<style scoped>
.art-piece {
  position: absolute;
}
</style>
