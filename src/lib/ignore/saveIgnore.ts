import fs from 'fs'
import { outdent } from 'outdent'
import path from 'path'

import { fileExists } from '../../util/file'

interface Parameters {
  ignoreFileName: string
  projectDirectory: string
  gitignore: string[]
}
export const saveIgnore = ({ ignoreFileName, projectDirectory, gitignore }: Parameters): void => {
  const filename = path.join(projectDirectory, ignoreFileName)
  const patterns = gitignore.filter(line => !line.startsWith('node_modules'))
  if (patterns.length === 0) {
    return
  }
  const newInset = outdent`
    # >>> domelint-start
    # this block was auto-generated with do-me-lint
    ${patterns.join('\n')}
    # <<< domelint-end
  `

  let newContent = ''

  if (fileExists(filename)) {
    const oldContent = fs.readFileSync(filename, 'utf8')
    const match = /# >>> domelint-start.*# <<< domelint-end/su.exec(oldContent)
    if (match) {
      const [oldInset] = match
      newContent = oldContent.replace(oldInset, newInset)
    } else {
      newContent = `${oldContent}\n${newInset}`
    }
  } else {
    newContent = newInset
  }
  fs.writeFileSync(filename, newContent)
}
