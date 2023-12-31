import { useRandomIntInRange } from '../useRandom'
import { ref } from 'vue'
const colorList = [
  '#E53935', // RED
  '#EC407A', // PINK
  '#AB47BC', // PURPLE
  '#7E57C2', // DEEP PURPLE
  '#5C6BC0', // INDIGO LIGHTEEN
  '#42A5F5', // BLUE
  '#26C6DA', // CYAN
  '#00897B', // TEAL
  '#66BB6A', // GREEN
  '#00E676', // GREEN ACCENT
  '#689F38', // CACA GREEN
  '#FFFF00', // YELLOW ACCENT
  '#FBC02D', // YELLOW DARKEN
  '#FF6F00', // AMBER DARKEN
  '#FF6D00', // ORANGE LIGHTEN
  '#FF3D00', // DEEP ORANGE
  '#5D4037', // BROWN
  '#424242' // DARKEN

]

export function useRandomColor () {
  console.log('Calling random  color')
  const max = colorList.length - 1
  const randomIndex = useRandomIntInRange(0, max)
  const color = colorList[randomIndex]
  return ref(color)
}
