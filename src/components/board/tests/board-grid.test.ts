import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { configStore } from '@/stores/configStore'
import BoardGrid from '@/components/board/board-grid.vue'

describe('BoardGrid.vue', () => {
  const pinia = createPinia()
  it('renders the correct number of squares', () => {
    const config = configStore(pinia)
    const wrapper = mount(BoardGrid, {
      plugins: [config],
      props: {
        squareCount: 10,
        cols: 5,
        rows: 2
      }
    })

    const square = wrapper.findAllComponents({ name: 'BoardSquare' })
    expect(wrapper.findAllComponents({ name: 'BoardSquare' })).toHaveLength(10)
  })

  it('does not emit "square-touched" event when blockBoard is true', async () => {
    const config = configStore(pinia)
    const wrapper = mount(BoardGrid, {
      plugins: [pinia],
      props: {
        squareCount: 10,
        cols: 5,
        rows: 2,
        blockBoard: true
      }
    })

    await wrapper.findComponent({ name: 'BoardSquare' }).trigger('pointermove')

    expect(wrapper.emitted()).not.toHaveProperty('square-touched')
  })

  it('renders the correct number of squares', () => {
    const config = configStore(pinia)
    const wrapper = mount(BoardGrid, {
      plugins: [pinia],
      props: {
        squareCount: 10,
        cols: 5,
        rows: 2
      }
    })

    expect(wrapper.findAllComponents({ name: 'BoardSquare' })).toHaveLength(10)
  })

  it('emits "square-touched" event when a square is touched', async () => {
    const config = configStore(pinia)

    const wrapper = mount(BoardGrid, {
      plugins: [config],
      props: {
        squareCount: 10,
        cols: 5,
        rows: 2,
        blockBoard: false
      }
    })

    await wrapper.findComponent({ name: 'BoardSquare' }).trigger('pointermove')
    expect(wrapper.emitted()).toHaveProperty('square-touched')
  })

  it('does not emit "square-touched" event when blockBoard is true', async () => {
    const wrapper = mount(BoardGrid, {
      plugins: [pinia],
      props: {
        squareCount: 10,
        cols: 5,
        rows: 2,
        blockBoard: true
      }
    })

    await wrapper.findComponent({ name: 'BoardSquare' }).trigger('pointermove')

    expect(wrapper.emitted()).not.toHaveProperty('square-touched')
  })
})
