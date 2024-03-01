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
        name="dicks"
    >
        <g id="dicksPattern" transformOrigin="center">
            <rect
                :x="-frameWidth"
                :y="-frameWidth"
                :width="frameWidth * 2 "
                :height="frameWidth * 2"
                :fill="color"
            />
            <path
                id="dick"
                :d="`
                    M ${frameWidth * 18 / 30},${frameWidth * 3 / 30} 
                    C ${frameWidth * 18 / 30},0 ${frameWidth * 14 / 30},0 ${frameWidth * 14 / 30},${frameWidth * 3 / 30} V ${frameWidth * 11 / 30} 
                    c ${frameWidth * -1.66 / 30},0 -${frameWidth * 3 / 30},${frameWidth * 1.34 / 30} ${frameWidth * -3 / 30},${frameWidth * 3 / 30} 0,${frameWidth * 1.66 / 30} ${frameWidth * 1.34 / 30},${frameWidth * 3 / 30} ${frameWidth * 3 / 30},${frameWidth * 3 / 30} ${frameWidth * 0.74 / 30},0 ${frameWidth * 1.45 / 30},${frameWidth * -0.27 / 30} ${frameWidth * 2 / 30},${frameWidth * -0.77 / 30} ${frameWidth * 0.55 / 30},${frameWidth * 0.49 / 30} ${frameWidth * 1.26 / 30},${frameWidth * 0.77 / 30} ${frameWidth * 2 / 30},${frameWidth * 0.77 / 30} ${frameWidth * 1.66 / 30},0 ${frameWidth * 3 / 30},${frameWidth * -1.34 / 30} ${frameWidth * 3 / 30},${frameWidth * -3 / 30} 0,${frameWidth * -1.66 / 30} ${frameWidth * -1.34 / 30},${frameWidth * -3 / 30} ${frameWidth * -3 / 30},${frameWidth * -3 / 30} z
                `"
                :style="{fill: goldColor}"
            />
            <use
                href="#dick"
                :transform="`rotate(180,${frameWidth * 11 / 30},${frameWidth * 9 /30})`"
            />
            <use
                href="#dick"
                :transform="`translate(-${frameWidth * 20 / 30})`"
            />
        </g>
        <pattern id="dicks" :width="frameWidth * 20 / 30" :height="frameWidth" patternUnits="userSpaceOnUse">
            <use href="#dicksPattern" :transform="`translate(0 ${frameWidth / 5})`" />
        </pattern>
        <pattern id="dicks2" :width="frameWidth" :height="frameWidth * 20 / 30" patternUnits="userSpaceOnUse">
            <use href="#dicksPattern" :style="{transform: `rotate(-90deg) translate(${-frameWidth / 2}px, ${frameWidth / 5}px)`, transformOrigin: '0 0'}"/>
        </pattern>
    </FlatFrame>
</template>

<style scoped>
</style>
