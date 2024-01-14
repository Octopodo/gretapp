import { defineStore } from 'pinia'
import { type ImageData } from '@/types'

export const gameConfigStore = defineStore('gameConfigStore', {
  state: () => {
    return {
      gameSpeed: 1000,
      timeLimit: 60,
      imageCount: 10,
      playgroundHeight: 700,
      playgroundWidth: 700,
      squareSize: 20,
      winGoal: 10,
      images: [] as ImageData[],
      paintColor: '#000000',
      baseColor: '#ffffff'
    }
  }
})
