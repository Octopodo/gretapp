import path from 'path'

export function vitestTemplate(name, functions, testPath) {
  functions = functions.join(',\n')
  testPath = path.basename(testPath)

  const tests = functions.map((func) => {
    return `
    it('It should ', () => {
      const result = ${func}()
      expect(result).toBe()
    })
    `
  })

  const template = `
  import {describe, it expect} from 'vitest'
  import{
    ${functions}
  } from './${testPath}'

  describe('${name}', () => {
    ${tests}
  })
`
  return template
}
