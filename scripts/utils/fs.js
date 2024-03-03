import fs from 'fs'
import path from 'path'

export function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })

  let entries = fs.readdirSync(src, { withFileTypes: true })

  for (let entry of entries) {
    let srcPath = path.join(src, entry.name)
    let destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

export function copyFiles(srcDir, destDir, callback) {
  fs.mkdirSync(destDir, { recursive: true })

  const files = fs.readdirSync(srcDir)

  files.forEach((file, index) => {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, `${index}_${file}`)

    if (fs.statSync(srcFile).isFile()) {
      fs.copyFileSync(srcFile, destFile)
      if (callback) callback(destFile, index)
    }
  })
}

export function renameFile(oldPath, newName) {
  const oldExtension = path.extname(oldPath)
  const directory = path.dirname(oldPath)
  const newPath = path.join(directory, `${newName}${oldExtension}`)

  fs.renameSync(oldPath, newPath)
  return newPath
}

export function deleteFolderAndContents(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = path.join(folderPath, file)
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderAndContents(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(folderPath)
  }
}
