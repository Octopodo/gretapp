import { defineStore } from 'pinia';
import { activistConfigStore } from '@/components/character';
import { gameConfigStore } from '@/stores';
import { useRandomColor } from '@/composables';


export const sceneConfigStore = defineStore('sceneConfigStore', {
  state: () => {
    return {
    }
  },
  actions: {
    boardBeforeEnter() {
      activistConfigStore().startRunning();
    },
    boardAfterEnter() {
      activistConfigStore().stopRunning();
    },
    boardBeforeLeave() {
      activistConfigStore().startRunning();
    },
    boardCompleted() {
      activistConfigStore().glue();
    },
    activistFinishedGluing() {
      const gameConfig = gameConfigStore();
      gameConfig.boardCount++;
      gameConfig.paintColor = useRandomColor().value;
    }
  }
})
