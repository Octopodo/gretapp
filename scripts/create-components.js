import fs from 'fs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import process from 'process'
import { program } from 'commander'
import {
  componentTemplate,
  composableStyleTemplate,
  composableTemplate
} from './utils/fileTemplates/vueTemplates.js'

import { vitestTemplate } from './utils/fileTemplates/vitestTemplates.js'
import { GitCommander } from './utils/git.js'
import { capitalize } from './utils/string.js'
import {
  findIndexFile,
  appendExportToIndexFile,
  appendExportComponentToIndexFile,
  removeImportFromIndexFile
} from './utils/modules.js'
import { deleteFolderAndContents } from './utils/fs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(dirname(__filename), '..')
const git = new GitCommander()

const COMPONENTS_STATIC_PATH = 'src/components'
const COMPOSABLES_STATIC_PATH = 'src/composables'
const COMPONENTS_PATH = path.join(__dirname, COMPONENTS_STATIC_PATH)
const COMPOSABLES_PATH = path.join(__dirname, COMPOSABLES_STATIC_PATH)

program
  .version('1.0.0')
  .description('Create Vue components and composables  and index them')

program
  .command('create')
  .argument('<type>', 'Component, composable or style composable')
  .argument('<name>', 'name of the component')
  .option('-d, --dir <dir>', 'directory to create the component in')
  .option('-t, --test', 'Add a test file')
  .option('-at, --add-test', 'Add a test file')
  .option('-c, --commit', 'Commit changes to git')
  .action(function () {
    const fileType = this.args[0]
    const fileName = this.args[1]
    if (fileType === 'component') {
      const dir = this.opts().dir
      const addTest = this.opts().test || this.opts().addTest
      createComponent(fileName, dir, addTest)
    } else if (fileType === 'composable' || fileType === 'style-composable') {
      const dir = this.opts().dir
      const addTest = this.opts().test || this.opts().addTest
      const isStyle = this.args[0] === 'style-composable'
      createComposable(fileName, dir, addTest, isStyle)
    }

    if (this.opts().commit) {
      git.commit('add', `Created ${fileType} ${fileName}`)
    }
  })

program
  .command('remove')
  .argument('<type>', 'Component, composable or style composable')
  .argument('<name>', 'name of the component')
  .option('-d, --dir <dir>', 'directory to create the component in')
  .option('-c, --commit', 'Commit changes to git')
  .action(function () {
    const fileType = this.args[0]
    const fileName = this.args[1]
    if (fileType === 'component') {
      const dir = this.opts().dir
      removeComponent(fileName, dir)
    } else if (fileType === 'composable' || fileType === 'style-composable') {
      const dir = this.opts().dir
      removeComposable(fileName, dir)
    }

    if (this.opts().commit) {
      git.commit('remove', `Removed ${fileType} ${fileName}`)
    }
  })

program.parse(process.argv)

////////////////////////////////////////
//COMPONENTS

function generateComponentPaths(name, dir) {
  const componentName = capitalize(name)
  const componentPath = dir ? path.join(COMPONENTS_PATH, dir) : COMPONENTS_PATH
  const componentStaticPath = `./${componentName}.vue`
  const componentFolder = path.join(componentPath, componentName)
  const componentFilePath = path.join(componentFolder, `${componentName}.vue`)
  const testFilePath = path.join(componentFolder, `${componentName}.spec.ts`)
  const moduleIndexFilePath = findIndexFile(componentPath)

  return {
    componentName,
    componentPath,
    componentStaticPath,
    componentFolder,
    componentFilePath,
    testFilePath,
    moduleIndexFilePath
  }
}

function createComponent(name, dir, addTest) {
  const paths = generateComponentPaths(name, dir)

  if (
    fs.existsSync(paths.componentFolder) &&
    fs.existsSync(paths.componentFilePath)
  ) {
    console.error(`Component ${paths.componentName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(paths.componentFolder, { recursive: true })
  fs.writeFileSync(paths.componentFilePath, paths.componentFileTemplate)

  //Implement component test file creation
  if (addTest) {
    // fs.writeFileSync(paths.testFilePath, vitestTemplate(paths.componentName))
  }

  appendExportComponentToIndexFile(
    paths.componentName,
    paths.componentFolder,
    paths.componentStaticPath
  )
  if (paths.moduleIndexFilePath) {
    appendExportToIndexFile('', paths.componentPath, `./${paths.componentName}`)
    git.add(paths.moduleIndexFilePath)
  }
  git.add(paths.componentFolder)
}

function removeComponent(name, dir) {
  const paths = generateComponentPaths(name, dir)
  removeImportFromIndexFile(paths.componentPath, paths.componentName)
  git.add(paths.componentFolder)
  git.add(paths.moduleIndexFilePath)
}

////////////////////////////////////////
//COMPOSABLES

function generateComposablePaths(name, dir) {
  const composableName = capitalize(name)
  const composableFunctionName = `use${composableName}`
  const composablePath = dir
    ? path.join(COMPOSABLES_PATH, dir)
    : COMPOSABLES_PATH
  const composableFolder = path.join(composablePath, composableFunctionName)
  const composableFilePath = path.join(
    composableFolder,
    `${composableFunctionName}.ts`
  )
  const testFilePath = path.join(
    composableFolder,
    `${composableFunctionName}.spec.ts`
  )
  const moduleIndexFilePath = findIndexFile(composablePath)

  return {
    composableName,
    composableFunctionName,
    composablePath,
    composableFolder,
    composableFilePath,
    testFilePath,
    moduleIndexFilePath
  }
}

function createComposable(name, dir, addTest, isStyle) {
  const paths = generateComposablePaths(name, dir)
  const template = isStyle ? composableStyleTemplate : composableTemplate
  const composableFileTemplate = template(paths.composableName)
  if (
    fs.existsSync(paths.composableFolder) &&
    fs.existsSync(paths.composableFilePath)
  ) {
    console.error(`Composable ${paths.composableName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(paths.composableFolder, { recursive: true })
  fs.writeFileSync(paths.composableFilePath, composableFileTemplate)
  if (addTest) {
    fs.writeFileSync(
      paths.testFilePath,
      vitestTemplate(
        paths.composableFunctionName,
        paths.composableFunctionName,
        paths.composableFolder
      )
    )
  }

  appendExportToIndexFile(
    '',
    paths.composableFolder,
    `./${paths.composableFunctionName}`
  )
  if (paths.moduleIndexFilePath) {
    appendExportToIndexFile(
      '',
      `./${paths.composablePath}`,
      `./${paths.composableFunctionName}`
    )
    git.add(paths.moduleIndexFilePath)
  }
  git.add(paths.composableFolder)
}

function removeComposable(name, dir) {
  const paths = generateComposablePaths(name, dir)
  removeImportFromIndexFile(paths.composablePath, paths.composableFunctionName)
  git.add(paths.composableFolder)
  git.add(paths.moduleIndexFilePath)
}
