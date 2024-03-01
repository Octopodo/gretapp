// generate-assets.js
import fs from 'fs'
import path from 'path'

import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function generateAssetsObject(dirPath, basePath) {
  let entries = fs.readdirSync(dirPath, { withFileTypes: true })

  let files = entries
    .filter((file) => !file.isDirectory())
    .map((file) =>
      path
        .join('/assets', path.relative(basePath, dirPath), file.name)
        .replace(/\\/g, '/')
    ) // Devuelve rutas relativas a basePath

  let directories = entries.filter((folder) => folder.isDirectory())

  let directoryFiles = {}
  for (let directory of directories) {
    directoryFiles[directory.name] = generateAssetsObject(
      path.join(dirPath, directory.name),
      basePath
    )
  }

  return Object.keys(directoryFiles).length > 0 ? directoryFiles : files
}

const directoryPath = path.join(__dirname, '..', 'public/assets')
const assets = generateAssetsObject(directoryPath, directoryPath)
// const assetsPath = path.join(__dirname, '..', 'src', 'assets.json')

fs.writeFileSync('src/data/assets.json', JSON.stringify(assets, null, 2))
