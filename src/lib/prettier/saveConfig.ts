import fs from 'fs'
import path from 'path'
import type { JsonObject } from 'type-fest'

import { makeYAML } from '../../util/file'

const saveConfig = ({
  config,
  projectDirectory,
}: {
  config: JsonObject
  projectDirectory: string
}): void => {
  fs.writeFileSync(path.join(projectDirectory, '.prettierrc.yml'), makeYAML(config))
}

export default saveConfig
