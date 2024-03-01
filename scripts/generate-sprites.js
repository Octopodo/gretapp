import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const spritesPath = path.join(__dirname, '..', 'public/assets/sprites')
function generateSpritesObject() {
  let entries = fs.readdirSync(spritesPath, { withFileTypes: true })
  let files = entries
    .filter((file) => !file.isDirectory())
    .map((file) => path.join('/assets/sprites', file.name).replace(/\\/g, '/'))

  let spritesObject = files.reduce((acc, file) => {
    const name = file.split('/').slice(-1)[0].split('.').slice(0, -1).join('')
    acc[name] = file
    return acc
  }, {})

  return spritesObject
}

const sprites = generateSpritesObject()
fs.writeFileSync('src/data/sprites.json', JSON.stringify(sprites, null, 2))
