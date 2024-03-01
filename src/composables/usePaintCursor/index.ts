import { gameConfigStore } from "@/stores";
import { computed, ref } from "vue";


function usePaintCursor() {
    const gameConfig = gameConfigStore();
    const color = ref(gameConfig.paintColor);
    const scaleFactor = 2;
    const strokeWidth = computed(() => gameConfig.strokeWidth / scaleFactor);
    const getStyle = (color: string) => computed(() => `fill:${color};stroke:black;stroke-width:${strokeWidth.value};stroke-linecap:round;stroke-linejoin:round`);
    const paths = computed(() => [
        [color.value, "M 20,3 C 17,0 5,11 8,14 l 5,5 11,-12 z"],
        ["white", "m 8,14 10,10 c 3,3 15,-8 12,-11 L 20,3 C 23,6 11,17 8,14 Z"],
        [color.value, "M 14,8 C 9,7 6,10 4,13 c -2,3 -3,8 0,8 4,0 3,-7 7,-8"],
        [color.value, "m 23,6 c 3,3 -9,14 -12,11 l 4,4 c 3,3 15,-8 12,-11 z"],
    ].map((p)=> `<path style='${getStyle(p[0]).value}' d='${p[1]}' />`))
    const cursorWidth = 32;
    const svg = computed(() => `<svg xmlns='http://www.w3.org/2000/svg' width='${cursorWidth * scaleFactor}' height='${cursorWidth * scaleFactor}' viewBox='0 0 ${cursorWidth} ${cursorWidth}'><g>${paths.value.join()}</g></svg>`);
    const cursorCssValue = ref(`url("data:image/svg+xml,${svg.value.replace(/</g, '%3c').replace(/>/g, '%3e').replace(/#/g, '%23')}") ${4 / scaleFactor} ${19 * scaleFactor}, pointer`);
    return ref({
        cursor: cursorCssValue.value
    })
}

export { usePaintCursor }