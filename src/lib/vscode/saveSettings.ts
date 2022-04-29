import fs from 'fs'
import path from 'path'
import type { JsonObject } from 'type-fest'

import { makeJSON } from '../../util/file'

interface Parameters {
  settings: JsonObject
  directory: string
}
export const saveSettings = ({ settings, directory }: Parameters): void => {
  const fullDirectory = path.resolve(directory, '.vscode')
  fs.mkdirSync(fullDirectory, { recursive: true })
  fs.writeFileSync(path.join(fullDirectory, 'settings.json'), makeJSON(settings))
}
