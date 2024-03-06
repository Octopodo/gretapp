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
    if (!findText(currentContent, exportText)) {
      fs.appendFileSync(indexFilePath, exportText + '\n')
    }
  }
}

function createImportText(asName, importPath) {
  asName = asName ? ` as ${asName}` : ''
  return `import *${asName} from '${importPath}'`
}

function createExportComponentText(componentName, componentPath) {
  return `export { default as ${componentName} } from '${componentPath}'`
}

function createExportText(asName, exportPath) {
  asName = asName ? ` as ${asName}` : ''
  return `export *${asName} from '${exportPath}'`
}

function appendTextToIndexFile(
  imortOrExportType,
  asName,
  indexFileDir,
  staticPath
) {
  let appendText = ''
  if (imortOrExportType === 'import') {
    appendText = createImportText(asName, staticPath)
  } else if (imortOrExportType === 'exportComponent') {
    appendText = createExportComponentText(asName, staticPath)
  } else if (imortOrExportType === 'export') {
    appendText = createExportText(asName, staticPath)
  }
  const indexFile = findIndexFile(indexFileDir) || createIndexFile(indexFileDir)
  appendToIndexFile(indexFile, appendText)
  return indexFile
}

function removeTextFromIndexFile(
  imortOrExportType,
  asName,
  indexFileDir,
  staticPath
) {
  let removeText = ''
  if (imortOrExportType === 'import') {
    removeText = createImportText(asName, staticPath)
  } else if (imortOrExportType === 'exportComponent') {
    removeText = createExportComponentText(asName, staticPath)
  } else if (imortOrExportType === 'export') {
    removeText = createExportText(asName, staticPath)
  }
  const indexFile = findIndexFile(indexFileDir)
  if (!indexFile) return
  removeFromFile(indexFile, removeText)
}

export function appendImportToIndexFile(asName, indexFileDir, importPath) {
  return appendTextToIndexFile('import', asName, indexFileDir, importPath)
}

export function appendExportToIndexFile(asName, indexFileDir, exportPath) {
  return appendTextToIndexFile('export', asName, indexFileDir, exportPath)
}

export function appendExportComponentToIndexFile(
  componentName,
  indexFileDir,
  componentPath
) {
  return appendTextToIndexFile(
    'exportComponent',
    componentName,
    indexFileDir,
    componentPath
  )
}

export function removeImportFromIndexFile(asName, indexFileDir, importPath) {
  removeTextFromIndexFile('import', asName, indexFileDir, importPath)
}

export function removeExportFromIndexFile(asName, indexFileDir, exportPath) {
  removeTextFromIndexFile('export', asName, indexFileDir, exportPath)
}

export function removeExportComponentFromIndexFile(
  componentName,
  indexFileDir,
  componentPath
) {
  removeTextFromIndexFile(
    'exportComponent',
    componentName,
    indexFileDir,
    componentPath
  )
}

export function removeFromFile(filePath, text) {
  if (fs.existsSync(filePath)) {
    let fileContents = fs.readFileSync(filePath, 'utf8')
    const oldContents = fileContents
    const textToRemove = createMatchText(text)
    if (!findText(fileContents, text)) return
    fileContents = fileContents.replace(textToRemove, '')
    if (oldContents === fileContents) return
    fs.writeFileSync(filePath, fileContents, 'utf8')
  }
}

function findText(originalText, textToFind) {
  const text = originalText
  const textToFindRegex = createMatchText(textToFind)
  return text.match(textToFindRegex)?.length
}

function createMatchText(text) {
  const escapedText = text.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  return new RegExp(`${escapedText}\r?\n?`, 'g')
}
