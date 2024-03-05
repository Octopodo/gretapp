import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import process from 'process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const args = process.argv.slice(2)

const type = args[0]
const name = args[1]
const filePath = args[2] || ''

const composablesPath = path.join(__dirname, '..', 'src', 'composables')
const componentsPath = path.join(__dirname, '..', 'src', 'components')

if (!name || !type) {
  console.error('Please provide a name and type')
  process.exit(1)
}

const componentTemplate = `
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  prop: {
    type: String,
    required: true
  }
})
</script>
<template>
  <div></div>
</template>

<style scoped></style>
`

function createComposable(name, dir) {
  name = 'use' + name.charAt(0).toUpperCase() + name.slice(1)
  const dirPath = path.join(composablesPath, dir, name)
  const filePath = path.join(dirPath, `${name}.ts`)
  const indexFilePath = path.join(dirPath, 'index.ts')
  const exportText = `export * from './${name}';`
  const composablesIndexPath = path.join(composablesPath, dir, 'index.ts')
  if (fs.existsSync(filePath)) return

  fs.mkdirSync(dirPath, { recursive: true })

  fs.writeFileSync(filePath, `export function ${name} (){}`)
  fs.writeFileSync(indexFilePath, exportText)

  if (fs.existsSync(composablesIndexPath)) {
    fs.appendFileSync(composablesIndexPath, exportText)
  }
}

function createComponent(name, dir) {
  const dirPath = path.join(componentsPath, dir)
  const filePath = path.join(dirPath, `${name}.vue`)
  const indexFilePath = path.join(dirPath, 'index.ts')
  const exportText = `export { default as ${name} } from './${name}.vue';`
  console.log('Indexpath', indexFilePath)

  if (fs.existsSync(filePath)) return
  fs.mkdirSync(dirPath, { recursive: true })

  fs.writeFileSync(filePath, componentTemplate)

  if (fs.existsSync(indexFilePath)) {
    fs.appendFileSync(indexFilePath, exportText)
  }
}

if (type === 'composable') {
  createComposable(name, filePath)
} else if (type === 'component') {
  createComponent(name, filePath)
}
