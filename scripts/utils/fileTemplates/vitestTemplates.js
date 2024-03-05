import path from 'path'

export function vitestTemplate(name, functions, testPath) {
  functions = Array.isArray(functions) ? functions : [functions]
  testPath = path.basename(testPath)

  const tests = functions.map((func) => {
    return `
    test('It should ', () => {
      const props = {}
      const result = ${func}(props)
      expect(result).toBe(0)
    })
    `
  })

  const template = `
  import {describe, test, expect} from 'vitest'
  import{
    ${functions}
  } from './${testPath}'

  describe('${name}', () => {
    ${tests}
  })
`
  return template
}
