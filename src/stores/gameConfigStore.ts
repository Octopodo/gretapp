import { defineStore } from "pinia";
import { type ImageData } from "@/types";

export const gameConfigStore = defineStore("gameConfigStore", {
  state: () => {
    return {
      frameRate: 12,
      gameSpeed: 1000,
      timeLimit: 60,
      imageCount: 10,
      playgroundHeight: 500,
      playgroundWidth: 500,
      squareSize: 20,
      winGoal: 10,
      images: [] as ImageData[],
      paintColor: "#12f829",
      squaresTouched: 0,
      boardCompleted: false,
      boardChangeDelay: 200,
      boardCount: 0,
    };
  },
  getters: {
    characterManagerHeight() {
      return 300;
    },
    strokeWidth() {
      return 3.25;
    },
  },
});
