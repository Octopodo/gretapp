import { defineStore } from "pinia";

export const usePathStore = defineStore("pathStore", {
  getters: {
    sprites: () => "/jso/assets/sprites",
    characters: () => "/jso/assets/sprites/characters",
  },
});
