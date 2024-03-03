import { ref } from 'vue'

export function usePlayer() {
  const state = ref({
    play: false,
    playOnce: false,
    pause: false,
    stop: true
  })

  function setState(wich: string) {
    Object.keys(state.value).forEach((key) => {
      const k = key as keyof typeof state.value
      if (key === wich) {
        state.value[k] = true
      } else {
        state.value[k] = false
      }
    })
  }

  return {
    state,
    play: () => setState('play'),
    playOnce: () => setState('playOnce'),
    pause: () => setState('pause'),
    stop: () => setState('stop')
  }
}
