import { exec as execCb } from 'child_process'
import { promisify } from 'util'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const exec = promisify(execCb)

export class GitCommander {
  _trackedFiles = []
  constructor() {
    this._trackedFiles = []
  }

  add(file) {
    file = this._formatPath(file)
    this._trackedFiles.push(file)
  }

  async commit(action, message) {
    if (!this._trackedFiles.length) return console.log('No files to commit')

    const files = this._trackedFiles.join(' ')
    action = action === 'remove' ? 'add -u' : 'add'
    const command = `git ${action} ${files} && git commit -m "${message}"`
    try {
      const { stdout } = await exec(command)
      console.log(stdout)
    } catch (error) {
      console.error(`Error: ${error}`)
    }
  }

  _formatPath(filePath) {
    const rootDir = path.resolve(__dirname, '..')
    let relativePath = path.relative(rootDir, filePath)
    relativePath = relativePath.replace(/\\/g, '/')
    const pathComponents = relativePath.split('/')
    const newPathComponents = pathComponents.slice(1)
    return newPathComponents.join('/')
  }
}
