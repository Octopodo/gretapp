<script setup lang="ts">
import { frameConfigStore } from '..';
import FlatFrame from './FlatFrame.vue';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true }
});

const frameConfig = frameConfigStore();

const frameWidth = frameConfig.frameWidth;
const color = frameConfig.color;
const goldenStrokeStyle = { ...frameConfig.outlineStrokeStyle as Object, stroke: frameConfig.goldColor}
</script>

<template>
    <FlatFrame
        :width="width"
        :height="height"
        name="nazi"
    >
        <g id="naziPattern" transformOrigin="center">
            <rect
                :x="-frameWidth"
                :y="-frameWidth"
                :width="frameWidth * 2 "
                :height="frameWidth * 2"
                :fill="color"
            />
            <path
                id="swastika"
                :d="`
                    M ${frameWidth * 10 / 30},${frameWidth * 1 / 30} ${frameWidth * 6 / 30},${frameWidth * 5 / 30} ${frameWidth * 14 / 30},${frameWidth * 13 / 30} ${frameWidth * 10 / 30},${frameWidth * 17 / 30}
                    M ${frameWidth * 2 / 30},${frameWidth * 9 / 30} ${frameWidth * 6 / 30},${frameWidth * 13 / 30} ${frameWidth * 14 / 30},${frameWidth * 5 / 30} ${frameWidth * 18 / 30},${frameWidth * 9 / 30}
                `"
                :style="goldenStrokeStyle"
            />
        </g>
        <pattern id="nazi" :width="frameWidth * 20 / 30" :height="frameWidth" patternUnits="userSpaceOnUse">
            <use href="#naziPattern" :transform="`translate(0 ${frameWidth / 5})`" />
        </pattern>
        <pattern id="nazi2" :width="frameWidth" :height="frameWidth * 20 / 30" patternUnits="userSpaceOnUse">
            <use href="#naziPattern" :style="{transform: `rotate(-90deg) translate(${-frameWidth *2 / 3}px, ${frameWidth / 5}px)`, transformOrigin: '0 0'}"/>
        </pattern>
    </FlatFrame>
</template>

<style scoped>
</style>
