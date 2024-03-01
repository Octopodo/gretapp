<script setup lang="ts">
import { gameConfigStore } from '@/stores';
import { frameConfigStore } from '..';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true }
});

const frameConfig = frameConfigStore();

const frameWidth = frameConfig.frameWidth;
const strokeWidth = gameConfigStore().strokeWidth;
const outlineStrokeStyle = frameConfig.outlineStrokeStyle;
const detailStrokeStyle = frameConfig.detailStrokeStyle;
const color = frameConfig.color;
</script>

<template>
    <defs>
        <pattern id="circledBorder" :width="frameWidth / 2" :height="frameWidth" patternUnits="userSpaceOnUse">
            <circle
                :cx="frameWidth / 4"
                :cy="frameWidth / 2"
                :r="frameWidth / 4"
                :style="{...outlineStrokeStyle as Object, fill: color}"
            />
        </pattern>
        <pattern id="circledBorder2" :width="frameWidth" :height="frameWidth / 2" patternUnits="userSpaceOnUse">
            <circle
                :cx="frameWidth / 2"
                :cy="frameWidth / 4"
                :r="frameWidth / 4"
                :style="{...outlineStrokeStyle as Object, fill: color}"
            />
        </pattern>
    </defs>
    <rect
        :x="frameWidth / 2"
        :y="0"
        :width="width - frameWidth"
        :height="frameWidth / 2 + strokeWidth"
        fill="url(#circledBorder)"
        id="circledTopCircles"
    />
    <rect
        :x="0"
        :y="frameWidth / 2"
        :width="frameWidth / 2 + strokeWidth"
        :height="height - frameWidth"
        fill="url(#circledBorder2)"
        id="circledLeftCircles"
    />
    <use
        href="#circledTopCircles"
        :x="0"
        :y="0"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <use
        href="#circledLeftCircles"
        :x="0"
        :y="0"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <rect
        :x="frameWidth / 2 + strokeWidth"
        :y="frameWidth / 2  + strokeWidth"
        :width="width - frameWidth - strokeWidth * 2"
        :height="height - frameWidth - strokeWidth * 2"
        :style="{ ...outlineStrokeStyle as Object, fill: color }"
    />
    <g
        id="circledTopLeft"
    >
        <rect
            :x="strokeWidth / 2"
            :y="strokeWidth / 2"
            :width="frameWidth * 1.5"
            :height="frameWidth * 1.5"
            :style="{ ...outlineStrokeStyle as Object, fill: color }"
        />
        <path
            :d="`
                M ${frameWidth * .25} ${frameWidth * .25} L ${frameWidth} ${frameWidth}
                M ${frameWidth * .75} ${frameWidth * .25} L ${frameWidth * 1.25} ${frameWidth}
                M ${frameWidth * .25} ${frameWidth * .75} L ${frameWidth} ${frameWidth * 1.25}
                M ${frameWidth * .3} ${frameWidth * 1.2} L ${frameWidth} ${frameWidth * 1.4}
                M ${frameWidth * 1.2} ${frameWidth * .3} L ${frameWidth * 1.4} ${frameWidth}
            `"
            :style="detailStrokeStyle"
        />
    </g>
    <use
        href="#circledTopLeft"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <g
        transformOrigin="center"
        id="circledTopRight"
    >
        <use
            href="#circledTopLeft"
            :style="{ transform: `rotate(90deg) translate(0px, -${width}px)` }"
        />
    </g>
    <use
        href="#circledTopRight"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
</template>

<style scoped>
</style>
