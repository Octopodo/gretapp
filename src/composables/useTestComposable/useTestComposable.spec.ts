
  import {describe, test, expect} from 'vitest'
  import{
    useTestComposable
  } from './useTestComposable'

  describe('useTestComposable', () => {
    
    test('It should ', () => {
      const props = {}
      const result = useTestComposable(props)
      expect(result).toBe(0)
    })
    
  })
