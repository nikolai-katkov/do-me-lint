import fs from 'fs'
import { parse as jsoncParse } from 'jsonc-parser'
import path from 'path'
import type { JsonObject } from 'type-fest'

export const getExistingSettings = (directory: string): JsonObject => {
  try {
    const fullDirectory = path.resolve(directory, '.vscode', 'settings.json')
    const settingsRaw = fs.readFileSync(fullDirectory, 'utf8')
    const settings = jsoncParse(settingsRaw) as JsonObject | undefined
    return settings === undefined ? {} : settings
  } catch {
    return {}
  }
}
