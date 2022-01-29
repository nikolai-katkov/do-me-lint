import fs from 'fs'
import { sync as glob } from 'glob'
import path from 'path'
import { check, format, getFileInfo, resolveConfig } from 'prettier'

import * as log from '../../util/log'

interface Parameters {
  pattern: string
  projectDirectory: string
}
export const fixProject = async (parameters: Parameters): Promise<void> => {
  const { pattern, projectDirectory } = parameters
  const files: string[] = glob(pattern, {
    cwd: projectDirectory,
    nodir: true,
  })

  for (const filePath of files) {
    await makeFilePrettier(path.join(projectDirectory, filePath), projectDirectory)
  }
}

const makeFilePrettier = async (filePath: string, cwd: string): Promise<void> => {
  const fileInfo = await getFileInfo(filePath, {
    ignorePath: `${cwd}/.prettierignore`,
  })

  if (fileInfo.ignored) {
    return
  }

  const config = await resolveConfig(filePath)

  if (!config || fileInfo.inferredParser === null) {
    return
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const isValid = check(fileContent, { ...config, filepath: filePath })

  if (isValid) {
    return
  }

  log.debug(`formatting with Prettier ${filePath}`)
  const fileContentFormatted = format(fileContent, { ...config, filepath: filePath })
  fs.writeFileSync(filePath, fileContentFormatted, { encoding: 'utf-8' })
}
