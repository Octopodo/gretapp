<script setup lang="ts">
import BoardGrid from "./BoardGrid.vue";
import BoardImage from "./BoardImage.vue";
import { Frame, frameConfigStore } from "@/components/frame";

import { ref, type PropType, type Ref, computed, onMounted } from "vue";
import { useSetCanvasSize, type ImageData, usePaintCursor } from "@/composables";
import { gameConfigStore } from "@/stores";
import { sceneConfigStore } from "@/components/scene/sceneConfigStore";

const emit = defineEmits(["square-touched"]);
const props = defineProps({
  imageData: { type: Object as PropType<ImageData>, required: true },
});

const gameConfig = gameConfigStore();
const frameConfig = frameConfigStore();
const sceneConfig = sceneConfigStore();

const blockBoard = ref(false);
const { rows, cols, width, height } = useSetCanvasSize({
  width: props.imageData.width,
  height: props.imageData.height,
  maxWidth: gameConfig.playgroundWidth,
  maxHeight: gameConfig.playgroundHeight,
  resolution: gameConfig.squareSize
})
const squareCount = ref(rows.value * cols.value);
const squaresTouched = ref(0);
const progress = ref(0);
const image: Ref<ImageData> = ref(props.imageData);

const touchSquare = () => {
  if (blockBoard.value) {
    return;
  }
  squaresTouched.value++;
  progress.value =
    (squaresTouched.value / squareCount.value) * gameConfig.winGoal * 100;
  emit("square-touched");
  if (progress.value >= 100) {
    sceneConfig.boardCompleted();
    blockBoard.value = true;
  }
};

const init = () => {
  squaresTouched.value = 0;
  progress.value = 0;
};

const frameWidth = frameConfig.frameWidth;

const frameStructureWidth = computed(() => width.value + frameWidth * 2);
const frameStructureHeigth = computed(() => height.value + frameWidth * 2);

const containerWidthPx = computed(() => `${frameStructureWidth.value}px`);
const containerHeightPx = computed(() => `${frameStructureHeigth.value}px`);

const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
const cursor = usePaintCursor();

</script>

<template>
  <div
    class="board-layout-container"
  >
    <div
      class="board-layout"
      :style="cursor"
    >
      <Frame
        :width="frameStructureWidth"
        :height="frameStructureHeigth"
      />
      <BoardImage
        :src="image.url"
        :width="width"
        :height="height"
        :alt="image.alt"
      />
      <BoardGrid
        :cols="cols"
        :rows="rows"
        :block="blockBoard"
        :squareSize="gameConfig.squareSize"
        @square-touched="touchSquare"
        :color="color"
      />
    </div>
  </div>
</template>

<style scoped>
.board-layout-container {
  position: absolute;
}
.board-layout {
  position: relative;
  width: v-bind("containerWidthPx");
  height: v-bind("containerHeightPx");
}
</style>
