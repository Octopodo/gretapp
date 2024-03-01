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
const shapeStyle = { ...outlineStrokeStyle as Object, fill: frameConfig.color };
</script>

<template>
    <defs>
    </defs>
    <g
        id="fancyTop"
    >

        <path
            :d="`
                M ${width / 2 - frameWidth * 2} ${frameWidth * 2}
                L ${width / 2} ${strokeWidth}
                L ${width / 2 + frameWidth * 2} ${frameWidth * 2} Z
            `"
            :style="shapeStyle"
        />
        <path
            :d="`
                M ${width * .05},${frameWidth / 2 }
                C ${width * .4},${frameWidth / 2 } ${width * .45},${-frameWidth / 2 } ${width * .5},${frameWidth / 1.5 } ${width * .55},${-frameWidth / 2 } ${width * .6},${frameWidth / 2 } ${width * .95},${frameWidth / 2 }
                L ${width * .95},${frameWidth}
                L ${width * .05},${frameWidth} Z
            `"
            :style="shapeStyle"
        />
        <path
            :d="`
                M ${width * .05},${frameWidth / 1.25}
                C ${width * .4},${frameWidth / 1.25} ${width * .45},${-frameWidth / 3} ${width * .5},${frameWidth / 0.5 } ${width * .55},${-frameWidth / 3} ${width * .6},${frameWidth / 1.25} ${width * .95},${frameWidth / 1.25}
            `"
            :style="detailStrokeStyle"
        />
    </g>
    <g
        id="fancyLeft"
    >
        <path
            :d="`
                M ${frameWidth * 2} ${height / 2 - frameWidth * 2}
                L ${strokeWidth} ${height / 2}
                L ${frameWidth * 2} ${height / 2 + frameWidth * 2} Z
            `"
            :style="shapeStyle"
        />
        <path
            :d="`
                M ${frameWidth / 2 },${height * .05}
                C ${frameWidth / 2 },${height * .4} ${-frameWidth / 2 },${height * .45} ${frameWidth / 1.5 },${height * .5} ${-frameWidth / 2 },${height * .55} ${frameWidth / 2 },${height * .6} ${frameWidth / 2 },${height * .95}
                L ${frameWidth},${height * .95}
                L ${frameWidth},${height * .05} Z
            `"
            :style="shapeStyle"
        />
        <path
            :d="`
                M ${frameWidth / 1.25},${height * .05}
                C ${frameWidth / 1.25},${height * .4} ${-frameWidth / 3},${height * .45} ${frameWidth / 0.5 },${height * .5} ${-frameWidth / 3},${height * .55} ${frameWidth / 1.25},${height * .6} ${frameWidth / 1.25},${height * .95}
            `"
            :style="detailStrokeStyle"
        />
    </g>
    <use
        href="#fancyLeft"
        :style="{transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <use
        href="#fancyTop"
        :style="{transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <g
        id="fancyTopLeft"
    >
        <path
            :d="`
                M ${strokeWidth / 2} ${strokeWidth / 2}
                L ${frameWidth} ${strokeWidth / 2}
                L ${frameWidth * 1.5} ${frameWidth * 1.5}
                L ${strokeWidth / 2} ${frameWidth} Z
    
            `"
            :style="shapeStyle"
        />
        <path
            :d="`
                M ${frameWidth * .35} ${frameWidth * .35} L ${frameWidth} ${frameWidth}
                M ${frameWidth * .75} ${frameWidth * .35} L ${frameWidth * 1.15} ${frameWidth}
                M ${frameWidth * .35} ${frameWidth * .75} L ${frameWidth} ${frameWidth * 1.15}
            `"
            :style="detailStrokeStyle"
        />
    </g>
    <use
        href="#fancyTopLeft"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <g
        transformOrigin="center"
        id="fancyTopRight"
    >
        <use
            href="#fancyTopLeft"
            :style="{ transform: `rotate(90deg) translate(0px, -${width}px)` }"
        />
    </g>
    <use
        href="#fancyTopRight"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
</template>

<style scoped>
</style>
