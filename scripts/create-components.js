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
  .option('-t, --test,  --add-test', 'Add a test file')
  .option('-c, --commit', 'Commit changes to git')
  .action(function () {
    if (this.args[0] === 'component') {
      createComponent(this.args[1], this.opts().dir)
    } else if (
      this.args[0] === 'composable' ||
      this.args[0] === 'style-composable'
    ) {
      createComposable(this.args[1], this.opts().dir)
    }

    if (this.opts().commit) {
      gitCommit('add', modifiedFiles, `Created ${this.args[0]} ${this.args[1]}`)
    }
  })

program.parse(process.argv)

function createComponent(name, dir) {
  const componentName = capitalize(name)
  const componentPath = dir ? path.join(COMPONENTS_PATH, dir) : COMPONENTS_PATH
  const componentStaticPath = `./${componentName}.vue`
  const componentFolder = path.join(componentPath, componentName)
  const componentFilePath = path.join(componentFolder, `${componentName}.vue`)
  const testFilePath = path.join(componentFolder, `${componentName}.spec.ts`)
  const moduleIndexFilePath = findIndexFile(componentPath)
  const componentFileTemplate = componentTemplate(componentName)

  if (fs.existsSync(componentFolder)) {
    console.error(`Component ${componentName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(componentFolder, { recursive: true })
  fs.writeFileSync(componentFilePath, componentFileTemplate)
  if (program.opts().test) {
    fs.writeFileSync(testFilePath, vitestTemplate(componentName))
  }

  appendExportComponentToIndexFile(
    componentName,
    componentFolder,
    componentStaticPath
  )
  if (moduleIndexFilePath) {
    appendExportComponentToIndexFile(
      componentName,
      componentPath,
      `./${componentName}`
    )
    modifiedFiles.push(moduleIndexFilePath)
  }
  modifiedFiles.push(componentFolder)
}

function createComposable(name, dir) {
  const composableName = capitalize(name)
  const composablePath = dir
    ? path.join(COMPOSABLES_PATH, dir)
    : COMPOSABLES_PATH
  const composableFolder = path.join(composablePath, name.toLowerCase())
  const composableFilePath = path.join(composableFolder, `${composableName}.ts`)
  const testFilePath = path.join(composableFolder, `${composableName}.spec.ts`)
  const moduleIndexFilePath = findIndexFile(composablePath)
  const composableFileTemplate =
    program.opts().type === 'style-composable'
      ? composableStyleTemplate(composableName)
      : composableTemplate(composableName)

  if (fs.existsSync(composableFolder)) {
    console.error(`Composable ${composableName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(composableFolder, { recursive: true })
  fs.writeFileSync(composableFilePath, composableFileTemplate)
  if (program.opts().test) {
    fs.writeFileSync(testFilePath, vitestTemplate(composableName))
  }

  appendExportToIndexFile(composableName, composableFolder)
  if (moduleIndexFilePath) {
    appendExportToIndexFile(composableName, `./${composablePath}`)
    modifiedFiles.push(moduleIndexFilePath)
  }
  modifiedFiles.push(composableFolder)
}
