<script setup lang="ts">
import { gameConfigStore } from '@/stores';
import { frameConfigStore } from '..';



const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  name: { type: String, required: true }
});

const frameConfig = frameConfigStore();

const frameWidth = frameConfig.frameWidth;
const strokeWidth = gameConfigStore().strokeWidth;
const outlineStrokeStyle = frameConfig.outlineStrokeStyle;
const detailStrokeStyle = frameConfig.detailStrokeStyle;
</script>

<template>
    <defs>
        <slot></slot>
    </defs>
    <g
        :id="`${name}Top`"
    >
        <path
            :d="`
                M ${strokeWidth} ${strokeWidth}
                L ${width - strokeWidth} ${strokeWidth}
                L ${width - frameWidth + strokeWidth / 2} ${frameWidth - strokeWidth / 2}
                L ${frameWidth - strokeWidth / 2} ${frameWidth - strokeWidth / 2} Z
            `"
            :fill="`url(#${name})`"
        />
    </g>
    <g
        :id="`${name}Left`"
    >
        <path
            :d="`
                M ${strokeWidth} ${strokeWidth}
                L ${strokeWidth} ${height - strokeWidth}
                L ${frameWidth - strokeWidth / 2} ${height - frameWidth + strokeWidth / 2}
                L ${frameWidth - strokeWidth / 2} ${frameWidth - strokeWidth / 2} Z
            `"
            :fill="`url(#${name}2)`"
        />
    </g>
    <use
        :href="`#${name}Top`"
        :x="0"
        :y="0"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <use
        :href="`#${name}Left`"
        :x="0"
        :y="0"
        :style="{ transform: 'rotate(180deg)', transformOrigin: 'center'}"
    />
    <path
        :d="`
            M ${strokeWidth} ${strokeWidth} L ${frameWidth - strokeWidth / 2} ${frameWidth - strokeWidth / 2}
            M ${width - strokeWidth} ${strokeWidth} L ${width - frameWidth + strokeWidth / 2} ${frameWidth - strokeWidth / 2}
            M ${strokeWidth} ${height - strokeWidth} L ${frameWidth - strokeWidth / 2} ${height - frameWidth + strokeWidth / 2}
            M ${width - strokeWidth} ${height - strokeWidth} L ${width - frameWidth + strokeWidth / 2} ${height - frameWidth + strokeWidth / 2}
        `"
        :style="{ ...detailStrokeStyle as Object, strokeLinecap: 'butt'}"
    />
    <rect
        :x="strokeWidth"
        :y="strokeWidth"
        :width="width - 2 * strokeWidth"
        :height="height - 2 * strokeWidth"
        :style="outlineStrokeStyle"
    />
</template>

<style scoped>
</style>
