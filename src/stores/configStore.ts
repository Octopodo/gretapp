import { defineStore } from 'pinia'

export const configStore = defineStore('configStore', {
  state: () => {
    return {
      devMode: true,
      artPlaceholderUrl: 'https://omnesmag.com/wp-content/uploads/2016/05/vangogh.jpg',
      imageCount: 10,
      gridResolution: 20,
      playgroundWidth: 700,
      playgroundHeight: 700,
      victoryCondition: 8
    }
  }
})
