<script setup lang="ts">
import { gameConfigStore } from '@/stores';
import { frameConfigStore } from './frameConfigStore';
import { useGetFrame } from './useGetFrame';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true }
});

const frameConfig = frameConfigStore();

const frameWidth = frameConfig.frameWidth;
const strokeWidth = gameConfigStore().strokeWidth;
const outlineStrokeStyle = frameConfig.outlineStrokeStyle;
const goldColor = frameConfig.goldColor;
const frame = useGetFrame();
</script>

<template>
    <svg
        :width="width"
        :height="height"
        :view-box="`0 0 ${width} ${height}`"
        class="frame"
    >
        <component
            :is="frame"
            :width="width"
            :height="height"
        />
        <rect
            :x="frameWidth - strokeWidth / 2"
            :y="frameWidth - strokeWidth / 2"
            :width="width + strokeWidth - frameWidth * 2"
            :height="height + strokeWidth - frameWidth * 2"
            :style="outlineStrokeStyle"
        />
        <rect
            :x="width / 2 - frameWidth"
            :y="height - frameWidth * .75"
            :width="frameWidth * 2"
            :height="frameWidth / 3"
            :style="{ ...outlineStrokeStyle as Object, fill: goldColor }"
        />
    </svg>
</template>

<style scoped>
.frame {
    position: absolute;
}
</style>
