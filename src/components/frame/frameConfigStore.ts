import { gameConfigStore } from '@/stores';
import { defineStore } from 'pinia'
import type { StyleValue } from 'vue';


export const frameConfigStore = defineStore('frameConfigStore',{
  state: () => {
    return {
    }
  },
  getters: {
    frameWidth() {
      return 30;
    },
    outlineStrokeStyle() {
      return { stroke: 'black', strokeWidth: `${gameConfigStore().strokeWidth}px`, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none' } as unknown as StyleValue;
    },
    detailStrokeStyle() {
      return { ...this.outlineStrokeStyle, stroke: this.detailColor } as unknown as StyleValue;
    },
    color() {
      return '#885500';
    },
    detailColor() {
      return '#553300';
    },
    goldColor() {
      return '#FAC212';
    }
  }
})
