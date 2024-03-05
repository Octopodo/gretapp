import { exec as execCb } from 'child_process'
import { promisify } from 'util'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const exec = promisify(execCb)

export async function gitCommit(action, files, message) {
  if (!files.length) return console.log('No files to commit')

  files = toGitPaths(files.join(' '))
  action = action === 'remove' ? 'add -u' : 'add'
  const command = `git ${action} ${files} && git commit -m "${message}"`
  try {
    const { stdout } = await exec(command)
    console.log(stdout)
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

export function toGitPaths(paths) {
  paths = Array.isArray(paths) ? paths : [paths]
  const gitPaths = paths.map((file) => {
    const rootDir = path.resolve(__dirname, '..')
    let relativePath = path.relative(rootDir, file)
    relativePath = relativePath.replace(/\\/g, '/')
    const pathComponents = relativePath.split('/')
    const newPathComponents = pathComponents.slice(1)
    return newPathComponents.join('/')
  })
  return gitPaths
}
