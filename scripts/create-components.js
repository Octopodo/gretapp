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
  removeImportFromIndexFile,
  removeExportFromIndexFile
} from './utils/modules.js'
import { deleteFolderAndContents } from './utils/fs.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.join(dirname(__filename), '..')
const git = new GitCommander()

const COMPONENTS_STATIC_PATH = 'src/components'
const COMPOSABLES_STATIC_PATH = 'src/composables'
const COMPONENTS_PATH = path.join(__dirname, COMPONENTS_STATIC_PATH)
const COMPOSABLES_PATH = path.join(__dirname, COMPOSABLES_STATIC_PATH)

const VALID_ACTIONS = ['create', 'remove']
const VALID_TYPES = ['component', 'composable', 'style-composable']
program
  .version('1.0.0')
  .description('Create Vue components and composables  and index them')

program
  .command('kt')
  .argument('<action>', 'create or remove')
  .argument('<type>', 'Component, composable or style composable')
  .argument('<name>', 'name of the component')
  .option('-d, --dir <dir>', 'directory to create the component in')
  .option('-t, --test', 'Add a test file')
  .option('-at, --add-test', 'Add a test file')
  .option('-c, --commit', 'Commit changes to git')
  .action(function (action, type, name, opts) {
    if (!VALID_ACTIONS.includes(action)) {
      console.error(`Invalid action: ${action}`)
      process.exit(1)
    }
    if (!VALID_TYPES.includes(type)) {
      console.error(`Invalid type: ${type}`)
      process.exit(1)
    }

    if (!name) {
      console.error('Name is required')
      process.exit(1)
    }

    const dir = this.opts().dir
    const addTest = this.opts().test || this.opts().addTest
    if (action === 'create') {
      create(name, dir, type, addTest)
    } else if (action === 'remove') {
      remove(name, dir, type)
    }

    if (this.opts().commit) {
      git.commit('add', `Created ${type} ${name}`)
    }
  })

program.parse(process.argv)

////////////////////////////////////////
//ACTIONS

function create(name, dir, type, addTest) {
  const actions = getActions(type)
  if (!actions.export || !actions.paths) {
    console.error('Invalid type')
    process.exit(1)
  }
  const paths = actions.paths(name, dir)
  const itemFileTemplate = actions.template(paths.itemName)
  if (fs.existsSync(paths.itemFolder) && fs.existsSync(paths.itemFilePath)) {
    console.error(`${capitalize(type)} ${paths.itemName} already exists`)
    process.exit(1)
  }

  fs.mkdirSync(paths.itemFolder, { recursive: true })
  fs.writeFileSync(paths.itemFilePath, itemFileTemplate)

  //Implement component test file creation
  if (addTest) {
    actions.test(paths)
  }

  actions.export(paths)
  git.add(paths.itemFolder)
}

function generateComponentPaths(name, dir) {
  const itemName = capitalize(name)
  const itemPath = dir ? path.join(COMPONENTS_PATH, dir) : COMPONENTS_PATH
  const itemStaticPath = `./${itemName}.vue`
  const itemFolder = path.join(itemPath, itemName)
  const itemFilePath = path.join(itemFolder, `${itemName}.vue`)
  const testFilePath = path.join(itemFolder, `${itemName}.spec.ts`)
  const moduleIndexFilePath = findIndexFile(itemPath)

  return {
    itemName,
    itemPath,
    itemStaticPath,
    itemFolder,
    itemFilePath,
    testFilePath,
    moduleIndexFilePath
  }
}

function generateComposablePaths(name, dir) {
  const itemName = capitalize(name)
  const itemFunctionName = `use${itemName}`
  const itemPath = dir ? path.join(COMPOSABLES_PATH, dir) : COMPOSABLES_PATH
  const itemFolder = path.join(itemPath, itemFunctionName)
  const itemFilePath = path.join(itemFolder, `${itemFunctionName}.ts`)
  const testFilePath = path.join(itemFolder, `${itemFunctionName}.spec.ts`)
  const moduleIndexFilePath = findIndexFile(itemPath)

  return {
    itemName,
    itemFunctionName,
    itemPath,
    itemFolder,
    itemFilePath,
    testFilePath,
    moduleIndexFilePath
  }
}

function isComposable(type) {
  return type === 'composable' || type === 'style-composable'
}

function isComponent(type) {
  return type === 'component'
}

function getActions(type) {
  const generators = {}

  if (isComponent(type)) {
    generators.paths = generateComponentPaths
    generators.export = exportComponent
    generators.template = componentTemplate
    generators.test = createComponentTest
  } else if (isComposable(type)) {
    generators.paths = generateComposablePaths
    generators.export = exportComposable
    generators.template =
      type === 'composable' ? composableTemplate : composableStyleTemplate
    generators.test = createComposableTest
  }
  return generators
}

function createComposableTest(paths) {
  fs.writeFileSync(
    paths.testFilePath,
    vitestTemplate(
      paths.itemFunctionName,
      paths.itemFunctionName,
      paths.itemFolder
    )
  )
}

function createComponentTest(paths) {}

function exportComponent(paths) {
  appendExportComponentToIndexFile(
    paths.itemName,
    paths.itemFolder,
    paths.itemStaticPath
  )
  if (paths.moduleIndexFilePath) {
    appendExportToIndexFile('', paths.itemPath, `./${paths.itemName}`)
    git.add(paths.moduleIndexFilePath)
  }
}

function exportComposable(paths) {
  appendExportToIndexFile(
    '',
    paths.composablePath,
    `./${paths.itemFunctionName}`
  )
  if (paths.moduleIndexFilePath) {
    appendExportToIndexFile('', paths.itemPath, `./${paths.itemFunctionName}`)
    git.add(paths.moduleIndexFilePath)
  }
  git.add(paths.itemFolder)
}

// function removeComponent(name, dir) {
//   const paths = generateComponentPaths(name, dir)
//   removeExportFromIndexFile('', paths.componentPath, paths.componentName)
//   deleteFolderAndContents(paths.componentFolder)
//   git.add(paths.componentFolder)
//   git.add(paths.moduleIndexFilePath)
// }

////////////////////////////////////////
//COMPOSABLES

// function createComposable(name, dir, addTest, isStyle) {
//   const paths = generateComposablePaths(name, dir)
//   const template = isStyle ? composableStyleTemplate : composableTemplate
//   const composableFileTemplate = template(paths.composableName)
//   if (
//     fs.existsSync(paths.composableFolder) &&
//     fs.existsSync(paths.composableFilePath)
//   ) {
//     console.error(`Composable ${paths.composableName} already exists`)
//     process.exit(1)
//   }

//   fs.mkdirSync(paths.composableFolder, { recursive: true })
//   fs.writeFileSync(paths.composableFilePath, composableFileTemplate)
//   if (addTest) {
//     fs.writeFileSync(
//       paths.testFilePath,
//       vitestTemplate(
//         paths.composableFunctionName,
//         paths.composableFunctionName,
//         paths.composableFolder
//       )
//     )
//   }

//   appendExportToIndexFile(
//     '',
//     paths.composableFolder,
//     `./${paths.composableFunctionName}`
//   )
//   if (paths.moduleIndexFilePath) {
//     appendExportToIndexFile(
//       '',
//       `./${paths.composablePath}`,
//       `./${paths.composableFunctionName}`
//     )
//     git.add(paths.moduleIndexFilePath)
//   }
//   git.add(paths.composableFolder)
// }

// function removeComposable(name, dir) {
//   const paths = generateComposablePaths(name, dir)
//   const staticPath = `./${paths.composableFunctionName}`
//   removeExportFromIndexFile('', paths.composablePath, staticPath)
//   deleteFolderAndContents(paths.composableFolder)
//   git.add(paths.composableFolder)
//   git.add(paths.moduleIndexFilePath)
// }

function remove(name, dir, type) {
  const pathGenerator =
    type === 'component' ? generateComponentPaths : generateComposablePaths
  const paths = pathGenerator(name, dir)
  name = isComposable(type) ? paths.itemFunctionName : paths.itemName
  const staticPath = isComposable(type)
    ? `./${paths.itemFunctionName}`
    : `./${paths.itemName}`
  removeExportFromIndexFile('', paths.itemPath, staticPath)
  deleteFolderAndContents(paths.itemFolder)
  git.add(paths.itemFolder)
  git.add(paths.moduleIndexFilePath)
}
