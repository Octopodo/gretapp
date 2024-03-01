import { sceneConfigStore } from '@/components/scene/sceneConfigStore';
import { defineStore } from 'pinia'

export const activistConfigStore = defineStore('activistConfigStore', {
  state: () => {
    return {
      running: false,
      glued: false
    }
  },
  getters: {
    gluingTime(){
        return 2000;
    }
  },
  actions: {
    startRunning() {
        this.running = true;
        this.glued = false;
    },
    stopRunning() {
        this.running = false;
    },
    glue() {
        this.running = false;
        this.glued = true;
        setTimeout(() => {
            this.glued = false;
            sceneConfigStore().activistFinishedGluing();
        }, this.gluingTime);
    }
  }
})
