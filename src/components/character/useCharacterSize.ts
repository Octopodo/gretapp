import { gameConfigStore } from "@/stores";

function useCharacterSize(originalSize: number) {
    return (originalSize * gameConfigStore().characterManagerHeight) / 2000;
}

export { useCharacterSize }