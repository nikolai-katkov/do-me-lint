import fs from 'fs'
import { sync as glob } from 'glob'

import log from '../../util/log'

interface Parameters {
  directory: string
}
const deleteConflictingConfigurations = ({ directory }: Parameters) => {
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

export default deleteConflictingConfigurations
