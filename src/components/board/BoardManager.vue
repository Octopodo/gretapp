<script setup lang="ts">
import {
  computed,
  watchEffect,
  type PropType,
} from "vue";
import { type ImageData } from "@/types";
import BoardLayout from "@/components/board/BoardLayout.vue";
import { gameConfigStore } from "@/stores";
import { useCycleList } from "@vueuse/core";
import { sceneConfigStore } from "@/components/scene/sceneConfigStore"


const gameConfig = gameConfigStore();
const sceneConfig = sceneConfigStore();

const props = defineProps({
  images: { type: Object as PropType<ImageData[]>, required: true }
});

const cycleList = useCycleList(props.images);
const next = cycleList.next;
const image = cycleList.state;

const changeSpeed = computed(() => `${gameConfig.gameSpeed}ms`);

sceneConfig.$onAction(({name, after}) => {
  if(name === "activistFinishedGluing") {
    after(() => next());
  }
})
</script>

<template>
  <div class="board-manager-container">
    <div class="board-manager">
      <transition
        name="slide-left"
        @before-enter="sceneConfig.boardBeforeEnter"
        @after-enter="sceneConfig.boardAfterEnter"
        @before-leave="sceneConfig.boardBeforeLeave"
        appear
      >
        <BoardLayout
          :key="`board${gameConfig.boardCount}`"
          :image-data="image"
        />
      </transition>
    </div>
  </div>
</template>

<style scoped>
.board-manager-container {
  height: 600px;
  width: 100%;
}
.board-manager {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform v-bind("changeSpeed");
}

.slide-left-enter-from {
  transform: translateX(300%);
}
.slide-left-leave-to {
  transform: translateX(-300%);
}
.slide-right-enter-from {
  transform: translateX(-300%);
}
.slide-right-leave-to {
  transform: translateX(300%);
}
</style>
