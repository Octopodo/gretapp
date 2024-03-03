import fs from 'fs'
import path from 'path'

export function findIndexFile(dirPath) {
  const indexFilePath = path.join(dirPath, 'index.ts')
  if (fs.existsSync(indexFilePath)) {
    return indexFilePath
  }
}

export function createIndexFile(dirPath, replace = false) {
  const indexFilePath = path.join(dirPath, 'index.ts')
  if (fs.existsSync(indexFilePath) && !replace) {
    return indexFilePath
  } else {
    fs.writeFileSync(indexFilePath, '')
    return indexFilePath
  }
}

export function appendToIndexFile(indexFilePath, exportText) {
  if (fs.existsSync(indexFilePath)) {
    fs.appendFileSync(indexFilePath, exportText)
  }
}
