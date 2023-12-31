import anime from 'animejs/lib/anime.es.js';

export function useAnimateSquare (element: Node, toColor: string) {
  const min = 5
  const max = 10
  const scale = (Math.random() * (max - min + 1)) + min
  anime({
    targets: element,
    backgroundColor: toColor,
    scale: [0, scale],
    opacity: 100
  })
}
