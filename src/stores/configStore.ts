import { defineStore } from 'pinia'

export const configStore = defineStore('configStore', {
  state: () => {
    return {
      artPlaceholderUrl: 'https://omnesmag.com/wp-content/uploads/2016/05/vangogh.jpg',
      devMode: true,
      gameSpeed: 1000,
      gridResolution: 20,
      imageCount: 10,
      maxScale: 9,
      minScale: 3,
      playgroundHeight: 700,
      playgroundWidth: 700,
      victoryCondition: 10,
      gridOpacity: 0,
      pictureChangeDelay: 200
    }
  }
})
