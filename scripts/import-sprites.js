import fs from 'fs'
import path from 'path'
import process from 'process'
import { exec as execCb } from 'child_process'
import { promisify } from 'util'
import {
  copyDir,
  copyFiles,
  renameFile,
  deleteFolderAndContents
} from './utils/fs.js'

import { createIndexFile, appendToIndexFile } from './utils/modules.js'

import { program } from 'commander'

const ANIMATION_XML = 'animation.xml'
const DRAWING_ANIMATION_XML = 'drawingAnimation.xml'
const SKELETON_XML = 'skeleton.xml'
const SPRITE_SHEETS_XML = 'spriteSheets.xml'
const STAGE_XML = 'stage.xml'

const REQUIRED_FILES = [
  ANIMATION_XML,
  DRAWING_ANIMATION_XML,
  SKELETON_XML,
  SPRITE_SHEETS_XML,
  STAGE_XML
]

const __dirname = path.resolve(path.dirname(''))
const REQUIRED_FOLDERS = ['spriteSheets']
const SPRITES_PATH = 'spriteSheets'
const STATIC_SPRITE_PATH = '/public/assets/sprites'
const STATIC_SPRITE_DATA_PATH = '/src/data/sprites'
const SPRITE_COPY_PATH = path.join(__dirname, STATIC_SPRITE_PATH)
const SPRITE_DATA_COPY_PATH = path.join(__dirname, STATIC_SPRITE_DATA_PATH)
const FOLDERS_TO_REMOVE = ['audio', 'spriteSheets']
const PATH_DATA_FILE = 'paths.json'

////////////////////////////////////////
//IMPORT SPRITE

const exec = promisify(execCb)

async function OpenFileDialog() {
  try {
    const { stdout } = await exec(
      'powershell.exe -File ./scripts/power-shell/OpenFileDialog.ps1'
    )
    return stdout.trim()
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

function importSprites(dir) {
  if (isValidSprite(dir)) {
    copySpriteFolder(dir)
  } else {
    const folders = getFolders(dir)
    folders.forEach((entry) => {
      if (isValidSprite(entry)) {
        copySpriteFolder(entry)
      }
    })
  }
}

function copySpriteFolder(dir) {
  const newFiles = []
  const spriteName = path.basename(dir)
  const detinyDataPath = path.join(SPRITE_DATA_COPY_PATH, spriteName)
  const detinySpritePath = SPRITE_COPY_PATH
  const spriteFileDir = path.join(
    SPRITE_DATA_COPY_PATH,
    spriteName,
    SPRITES_PATH
  )

  copyDir(dir, detinyDataPath)

  copyFiles(spriteFileDir, detinySpritePath, (file, index) => {
    const newFile = renameFile(file, `${spriteName}-${index + 1}`)
    const fileName = path.basename(newFile)
    const publicPath = STATIC_SPRITE_PATH.replace('/public', '')
    const filePath = path.join(publicPath, fileName).replace(/\\/g, '/')
    newFiles.push(filePath)
  })

  for (const folder of FOLDERS_TO_REMOVE) {
    const folderPath = path.join(detinyDataPath, folder)
    if (!fs.existsSync(folderPath)) continue
    deleteFolderAndContents(folderPath)
  }
  createStaticPathsDataFile(newFiles, detinyDataPath)
  idnexFiles(detinyDataPath)
}

function idnexFiles(dir) {
  const spriteName = path.basename(dir)

  const exportAnimationsData = `export {default as animations} from './${DRAWING_ANIMATION_XML}'\n`
  const exportSpriteSheetData = `export {default as frames} from './${SPRITE_SHEETS_XML}'\n`
  const importPathsData = `import paths from './paths.json'\n`
  const pathsData = `export {paths}\n`

  const indexFileData = `${importPathsData}${exportSpriteSheetData}${exportAnimationsData}${pathsData}`
  const indexFile = createIndexFile(dir, true)
  appendToIndexFile(indexFile, indexFileData)

  const parentDir = path.dirname(dir)
  const parentIndexFile = createIndexFile(parentDir)
  if (!parentIndexFile) return
  const parentIndexFileData = `export * as ${spriteName} from './${spriteName}'\n`
  appendToIndexFile(parentIndexFile, parentIndexFileData)
}

function createStaticPathsDataFile(newFiles, destPath) {
  const pathData = JSON.stringify(newFiles, null, 2)
  const pathDataFile = path.join(destPath, PATH_DATA_FILE)
  fs.writeFileSync(pathDataFile, pathData, 'utf8')
}

function isValidSprite(dir) {
  const spriteFilesOk = checkSpriteFiles(dir)
  const spritesFoldersOk = checkSpriteFolders(dir)
  return spriteFilesOk && spritesFoldersOk
}

function getFolders(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const folders = entries
    .filter((folder) => folder.isDirectory())
    .map((folder) => path.join(dir, folder.name))
  return folders
}

function checkSpriteFiles(dir) {
  const files = fs.readdirSync(dir)
  const requiredFilesOk = REQUIRED_FILES.every((file) => files.includes(file))
  return requiredFilesOk
}

function checkSpriteFolders(dir) {
  const folders = fs.readdirSync(dir)
  const requiredFoldersOk = REQUIRED_FOLDERS.every((folder) =>
    folders.includes(folder)
  )
  return requiredFoldersOk
}

////////////////////////////////////////
//DELETE SPRITE

function deleteSprite(spriteName) {
  const spriteDataPath = path.join(SPRITE_DATA_COPY_PATH, spriteName)
  const spriteFilesPath = path.join(SPRITE_COPY_PATH, spriteName)

  if (fs.existsSync(spriteDataPath)) {
    deleteFolderAndContents(spriteDataPath)
  }

  fs.readdirSync(SPRITE_COPY_PATH).forEach((file) => {
    if (file.startsWith(spriteName)) {
      fs.unlinkSync(path.join(SPRITE_COPY_PATH, file))
    }
  })

  removeFromIndexFile(SPRITE_DATA_COPY_PATH, spriteName)
}

function removeFromIndexFile(dir, spriteName) {
  const indexFilePath = path.join(dir, 'index.ts')
  if (!fs.existsSync(indexFilePath)) {
    console.error(`Index file not found at ${indexFilePath}`)
    return
  }

  let fileContents = fs.readFileSync(indexFilePath, 'utf8')
  const importLine = `export * as ${spriteName} from './${spriteName}'\n`
  fileContents = fileContents.replace(importLine, '')
  fs.writeFileSync(indexFilePath, fileContents, 'utf8')
}

const spriteName = process.argv[2]
if (!spriteName) {
  console.log('Please provide a sprite name')
  process.exit(1)
}

function importSpritesFromDialog() {
  const dir = OpenFileDialog()
  dir.then((result) => {
    if (!result) return console.log('No directory selected')
    const dir = path.dirname(result)
    importSprites(dir)
  })
}

////////////////////////////////////////
//COMMAND LINE INTERFACE
program.version('1.0.0').description('Sprite management tool for Gretapp')

program
  .command('import')
  .description('Import a sprite')
  .action(() => {
    importSpritesFromDialog()
  })

program
  .command('delete [sprites...]')
  .description('Delete sprites')
  .action((sprites) => {
    if (Array.isArray(sprites)) {
      sprites.forEach((spriteName) => {
        deleteSprite(spriteName)
      })
    } else if (typeof sprites === 'string') {
      deleteSprite(sprites)
    }
  })
program.parse(process.argv)
