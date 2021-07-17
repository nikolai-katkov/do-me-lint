import fs from 'fs'
import { sync as glob } from 'glob'

import log from '../../util/log'

interface Parameters {
  directory: string
  ignorePattern: string
}
const deleteConflictingConfigurations = ({ directory, ignorePattern }: Parameters) => {
  // todo [2021-07-17] make it one-level only
  const files: string[] = glob('**/.prettierrc*', {
    cwd: directory,
    ignore: ignorePattern,
    nodir: true,
  })

  files
    .filter(file => file !== '.prettierrc.yml') // will be just overwritten, no need to report as conflict
    .forEach(file => {
      log.debug(`deleting ${file}`)
      fs.rmSync(file)
    })
}

export default deleteConflictingConfigurations
