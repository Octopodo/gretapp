<script setup lang="ts">
import { frameConfigStore } from '..';
import FlatFrame from './FlatFrame.vue';
import { computed } from 'vue';


const props = defineProps({
  width: { type: Number, required: true },
  height: { type: Number, required: true }
});

const frameConfig = frameConfigStore();

const frameWidth = frameConfig.frameWidth;
const color = frameConfig.color;
const goldColor = frameConfig.goldColor;
const texts = [
    "QUE TE VOTE TXAPOTE",
    "EPSTEIN DIDN'T KILL HIMSELF",
    "NOS FUMIGAN CON AVIONES",
    "TENGO MICROPLÁSTICOS EN LOS COJONES",
    "BUSH DID 9/11",
    "JET FUEL CAN'T MELT STEEL BEAMS",
    "I HEAR YIDDISH UNDER MY FLOOR"
];
const text = computed(() => texts[Math.floor(Math.random() * texts.length)])
const widthPx = computed(() => `${props.width}px`)
const heightPx = computed(() => `${props.height}px`)
</script>

<template>
    <FlatFrame
        :width="width"
        :height="height"
        name="text"
    >
        <rect
            id="textBackground"
            :x="0"
            :y="0"
            :width="width"
            :height="height"
            :fill="color"
        />
        <g
            id="textPattern1"
            transformOrigin="center"
        >
            <text
                class="text1"
                :style="{fill: goldColor, fontSize: frameWidth / 2}"
                :x="0"
                :y="frameWidth * 2.1 / 3"
            >
                {{ text }} 
            </text>
        </g>
        <g
            id="textPattern2"
            transformOrigin="center"
        >
            <text
                class="text2"
                :style="{fill: goldColor, fontSize: frameWidth / 2}"
                :x="0"
                :y="frameWidth * 2.1 / 3"
            >
                {{ text }} 
            </text>
        </g>
        <pattern id="text" :width="width" :height="frameWidth" patternUnits="userSpaceOnUse">
            <use href="#textBackground" />
            <use id="horizontalText" href="#textPattern1" />
        </pattern>
        <pattern id="text2" :width="frameWidth" :height="height" patternUnits="userSpaceOnUse">
            <use href="#textBackground" />
            <use id="verticalText" href="#textPattern2" :style="{transform: `rotate(-90deg)`}"/>
        </pattern>
    </FlatFrame>
</template>

<style scoped>
@keyframes marquee1{
    0%{
        transform: translateX(v-bind(widthPx))
    }
    100%{
        transform: translateX(calc( -1 * v-bind(widthPx)))
    }
}
@keyframes marquee2{
    0%{
        transform: translateX(0)
    }
    100%{
        transform: translateX(calc( -2 * v-bind(heightPx)))
    }
}
.text1 {
    white-space:nowrap;
    overflow:hidden;
    position:relative;
    animation: marquee1 10s linear infinite
}
.text2 {
    white-space:nowrap;
    overflow:hidden;
    position:relative;
    animation: marquee2 10s linear infinite 5s
}
</style>
