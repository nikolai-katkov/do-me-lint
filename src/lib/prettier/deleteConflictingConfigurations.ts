import fs from 'fs'
import { sync as glob } from 'glob'

import * as log from '../../util/log'

interface Parameters {
  directory: string
}
export const deleteConflictingConfigurations = ({ directory }: Parameters) => {
  const files: string[] = glob('.prettierrc*', {
    cwd: directory,
    nodir: true,
  })

  files
    .filter(file => file !== '.prettierrc.yml') // will be just overwritten, no need to report as conflict
    .forEach(file => {
      log.debug(`deleting ${file}`)
      fs.rmSync(file)
    })
}
