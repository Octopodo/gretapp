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

export function appendImportToIndexFile(asName, indexFileDir, importPath) {
  asName = asName ? ` as ${asName}` : ''
  const indexFile = findIndexFile(indexFileDir) || createIndexFile(indexFileDir)
  const importText = `import *${asName} from '${importPath}'\n`
  appendToIndexFile(indexFile, importText)
  return indexFile
}

export function appendExportToIndexFile(asName, indexFileDir, exportPath) {
  asName = asName ? ` as ${asName}` : ''
  const indexFile = findIndexFile(indexFileDir) || createIndexFile(indexFileDir)
  const exportText = `export *${asName} from '${exportPath}'\n`
  appendToIndexFile(indexFile, exportText)
  return indexFile
}

export function appendExportComponentToIndexFile(
  componentName,
  indexFileDir,
  componentPath
) {
  const indexFile = findIndexFile(indexFileDir) || createIndexFile(indexFileDir)
  const exportText = `export { default as ${componentName} } from '${componentPath}'\n`
  appendToIndexFile(indexFile, exportText)
  return indexFile
}
