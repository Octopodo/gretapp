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
    const currentContent = fs.readFileSync(indexFilePath, 'utf8')
    if (!currentContent.includes(exportText)) {
      fs.appendFileSync(indexFilePath, exportText)
    }
  }
}
