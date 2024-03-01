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
const goldColor = frameConfig.goldColor;
</script>

<template>
    <FlatFrame
        :width="width"
        :height="height"
        name="leafs"
    >
        <g id="leafsPattern" transformOrigin="center">
            <rect
                :x="-frameWidth"
                :y="-frameWidth"
                :width="frameWidth * 2"
                :height="frameWidth * 2"
                :fill="color"
            />
            <path
                id="leaf"
                :d="`M ${frameWidth * 8 / 30 },${frameWidth * 16 / 30 } C ${frameWidth * 15 / 30 },${frameWidth * 9 / 30 } ${frameWidth * 11 / 30 },${frameWidth * 4 / 30 } ${frameWidth * 23 / 30 },${frameWidth * 5 / 30 } l ${frameWidth * 5 / 30 },${frameWidth * -4 / 30 } ${frameWidth * 1 / 30 },${frameWidth * 1 / 30 } ${frameWidth * -5 / 30 },${frameWidth * 4 / 30 } C ${frameWidth * 25 / 30 },${frameWidth * 18 / 30 } ${frameWidth * 15 / 30 },${frameWidth * 17 / 30 } ${frameWidth * 8 / 30 },${frameWidth * 16 / 30 } Z`"
                :style="{fill: goldColor}"
            />
            <use
                id="use"
                href="#leaf"
                :transform="`rotate(180,${frameWidth * 11 / 30},${frameWidth * 9 /30})`"
            />
            <use
                href="#use"
                :transform="`translate(${frameWidth})`"
            />
        </g>
        <pattern id="leafs" :width="frameWidth" :height="frameWidth" patternUnits="userSpaceOnUse">
            <use href="#leafsPattern" :transform="`translate(0 ${frameWidth / 5})`" />
        </pattern>
        <pattern id="leafs2" :width="frameWidth" :height="frameWidth" patternUnits="userSpaceOnUse">
            <use href="#leafsPattern" :style="{transform: `rotate(-90deg) translate(${-frameWidth}px, ${frameWidth / 5}px)`, transformOrigin: '0 0'}"/>
        </pattern>
    </FlatFrame>
</template>

<style scoped>
</style>
