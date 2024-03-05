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
import { gitCommit } from './utils/git.js'
import { capitalize } from './utils/string.js'
import {
  findIndexFile,
  appendExportToIndexFile,
  appendExportComponentToIndexFile
} from './utils/modules.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(dirname(__filename), '..')

const COMPONENTS_STATIC_PATH = 'src/components'
const COMPOSABLES_STATIC_PATH = 'src/composables'
const COMPONENTS_PATH = path.join(__dirname, COMPONENTS_STATIC_PATH)
const COMPOSABLES_PATH = path.join(__dirname, COMPOSABLES_STATIC_PATH)

const modifiedFiles = []

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
    if (this.args[0] === 'component') {
      const name = this.args[1]
      const dir = this.opts().dir
      const addTest = this.opts().test || this.opts().addTest
      createComponent(name, dir, addTest)
    } else if (
      this.args[0] === 'composable' ||
      this.args[0] === 'style-composable'
    ) {
      const name = this.args[1]
      const dir = this.opts().dir
      const addTest = this.opts().test || this.opts().addTest
      const isStyle = this.args[0] === 'style-composable'
      createComposable(name, dir, addTest, isStyle)
    }

    if (this.opts().commit) {
      gitCommit('add', modifiedFiles, `Created ${this.args[0]} ${this.args[1]}`)
    }
  })

program.parse(process.argv)

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
    modifiedFiles.push(paths.moduleIndexFilePath)
  }
  modifiedFiles.push(paths.componentFolder)
}

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
    modifiedFiles.push(paths.moduleIndexFilePath)
  }
  modifiedFiles.push(paths.composableFolder)
}
