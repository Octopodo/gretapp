<script setup lang="ts">
import { Sprite } from "@/components/";
import {
  useSpriteSelector,
  SpriteSelectorProps,
  type SpriteSelectorPropsInterface,
} from "@/composables";

const props = defineProps(SpriteSelectorProps);

const { sprites, spriteNames, currentSprite, selectSprite } = useSpriteSelector(
  props as SpriteSelectorPropsInterface
);

defineExpose({ sprites, spriteNames, currentSprite, selectSprite });
</script>

<template>
  <template v-for="sprite in sprites" :key="sprite.name">
    <Sprite
      v-show="currentSprite.name === sprite.name"
      v-bind="props"
      :src="sprite.src"
      :class="currentSprite.name"
    />
  </template>
</template>

<style scoped></style>
