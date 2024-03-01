<script setup lang="ts">
import characters from '@/characters.json';
import { computed } from 'vue';
import { gameConfigStore } from '@/stores';
import { activistConfigStore } from '..'
import { useCharacterSize } from '../useCharacterSize';

const gameConfig = gameConfigStore();
const activistConfig = activistConfigStore();
const heightPx = computed(() => `${useCharacterSize(characters.activist.height)}px`);
const widthPx = computed(() => `${useCharacterSize(characters.activist.width)}px`);
const runPositions: any = {};
const gluePositions: any = {};
characters.activist.frames.map((v, i) => {
    if(v.startsWith("running_")) {
        runPositions[parseInt(v.split("_")[1])] = `calc(-1 *${i} * ${widthPx.value}) 0`;
    }
    if(v.startsWith("stick_")) {
        gluePositions[parseInt(v.split("_")[1])] = `calc(-1 *${i} * ${widthPx.value}) 0`;
    }
})

const changeSpeed = computed(() => `${gameConfig.gameSpeed}ms`);

const outsidePosition = computed(() => `calc(-1 * ${widthPx.value})`);

const centerPosition = computed(() => `calc(50% - (${widthPx.value} / 2))`);

const run = computed(() =>  activistConfig.running ? "run" : "");
const glue = computed(() =>  activistConfig.glued ? "glue" : "");
const glueTime = computed(() => `${activistConfig.gluingTime}ms`);

</script>

<template>
    <transition
        name="move"
        appear
    >
        <img
            :class="[run, glue]"
            src="/assets/activist.png"
        />
    </transition>
</template>

<style scoped>
img {
    height: v-bind(heightPx);
    width: v-bind(widthPx);
    object-fit: cover;
    object-position: 0 0;
    position: absolute;
    left: v-bind(centerPosition);
}
.run {
    animation: run .5s steps(1) infinite;
}
.glue {
    animation: glue v-bind(glueTime) steps(1) infinite;
}
.move-enter-active{
    transition: left v-bind(changeSpeed) ease-in-out;
}

.move-enter-from {
    left: v-bind(outsidePosition);
}

@keyframes run {
    0% {
        object-position: v-bind("runPositions[0]");
    }
    16.67% {
        object-position: v-bind("runPositions[1]");
    }
    33.33% {
        object-position: v-bind("runPositions[2]");
    }
    50% {
        object-position: v-bind("runPositions[3]");
    }
    66.67% {
        object-position: v-bind("runPositions[4]");
    }
    83.33% {
        object-position: v-bind("runPositions[5]");
    }
    100% {
        object-position: v-bind("runPositions[0]");
    }
}

@keyframes glue {
    0% {
        object-position: v-bind("gluePositions[0]");
    }
    10% {
        object-position: v-bind("gluePositions[1]");
    }
    20% {
        object-position: v-bind("gluePositions[2]");
    }
    30% {
        object-position: v-bind("gluePositions[3]");
    }
    40% {
        object-position: v-bind("gluePositions[4]");
    }
    60%{
        object-position: v-bind("gluePositions[5]");
    }
    65% {
        object-position: v-bind("gluePositions[4]");
    }
    70% {
        object-position: v-bind("gluePositions[5]");
    }
    75% {
        object-position: v-bind("gluePositions[4]");
    }
    80% {
        object-position: v-bind("gluePositions[5]");
    }
    85% {
        object-position: v-bind("gluePositions[4]");
    }
    90% {
        object-position: v-bind("gluePositions[5]");
    }
    95% {
        object-position: v-bind("gluePositions[4]");
    }
    100% {
        object-position: v-bind("gluePositions[5]");
    }
}
</style>
