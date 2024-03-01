<script setup lang="ts">
import characters from '@/characters.json';
import { computed, ref } from 'vue';
import { gameConfigStore } from '@/stores';
import { useCharacterSize } from '../useCharacterSize';
import { SpriteSelector } from '@/components/sprite';


const gameConfig = gameConfigStore();
const heightPx = computed(() => `${useCharacterSize(characters.activist.height)}px`);
const widthPx = computed(() => `${useCharacterSize(characters.activist.width)}px`);

const spriteSelector = ref<HTMLElement | null>(null) as any;

const changeSpeed = computed(() => `${gameConfig.gameSpeed}ms`);

const outsidePosition = computed(() => `calc(-1 * ${widthPx.value})`);
const play = ref(false);
const playOnce = ref(false);
const pause = ref(false);
const stop = ref(false);


</script>

<template>
    <transition
        name="move"
        appear
    >
        <SpriteSelector
            ref="spriteSelector"
            src="/sprites/characters/activist"
            :play="play"
            :playOnce="playOnce"
            :pause="pause"
            :stop="stop"
        />
    </transition>
</template>

<style scoped>
.move-enter-active{
    transition: left v-bind(changeSpeed) ease-in-out;
}

.move-enter-from {
    left: v-bind(outsidePosition);
}
</style>
