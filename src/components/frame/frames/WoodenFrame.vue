<script setup lang="ts">
import { frameConfigStore } from '..';
import FlatFrame from './FlatFrame.vue';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true }
});

const frameConfig = frameConfigStore();

const frameWidth = frameConfig.frameWidth;
const detailStrokeStyle = frameConfig.detailStrokeStyle;
const color = frameConfig.color;
</script>

<template>
    <FlatFrame
        :width="width"
        :height="height"
        name="wooden"
    >
        <g id="woodPattern">
            <rect
                x="0"
                y="0"
                :width="frameWidth * 6" :height="frameWidth"
                :style="{fill: color}"
            />
            <path
                :d="`M -5 ${frameWidth / 3} L ${frameWidth * 3} ${frameWidth / 3}`"
                :style="detailStrokeStyle"
            />
            <path
                :d="`M ${frameWidth * 5} ${frameWidth / 3} L ${frameWidth * 6 + 5} ${frameWidth / 3}`"
                :style="detailStrokeStyle"
            />
            <path
                :d="`M ${frameWidth * 2} ${frameWidth * 1.8 / 3} L ${frameWidth * 4} ${frameWidth * 1.8 / 3}`"
                :style="detailStrokeStyle"
            />
            <path
                :d="`M ${frameWidth *.1} ${frameWidth * 2.2 / 3} L ${frameWidth} ${frameWidth * 2.2 / 3}`"
                :style="detailStrokeStyle"
            />
        </g>
        <pattern id="wooden" :width="frameWidth * 6" :height="frameWidth" patternUnits="userSpaceOnUse">
            <use href="#woodPattern" />
        </pattern>
        <pattern id="wooden2" :width="frameWidth" :height="frameWidth * 6" patternUnits="userSpaceOnUse">
            <use href="#woodPattern" :style="{transform: 'rotate(-90deg)', transformOrigin: `${frameWidth *3 }px ${frameWidth * 3}px`}"/>
        </pattern>
    </FlatFrame>
</template>

<style scoped>
</style>
