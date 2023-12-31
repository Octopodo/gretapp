import anime from 'animejs/lib/anime.es.js'

let zIndex = 100
const boxShadow = ' 1px 2px 5px 0px rgba(0,0,0,0.04) '

export function useAnimateSquare(element: HTMLElement, toColor: string) {
  const min = 2
  const max = 10
  const scale = Math.random() * (max - min + 1) + min
  element.style.zIndex = zIndex.toString()
  // element.style.boxShadow = boxShadow
  zIndex++
  anime({
    targets: element,
    backgroundColor: toColor,
    scale: [0, scale],
    opacity: 100,
    // webkitBoxShadow: boxShadow,
    boxShadow: boxShadow
  })
}
