import fs from 'fs'
import yaml from 'js-yaml'
import type { JsonObject } from 'type-fest'

export const makeYAML = (object: JsonObject) => yaml.dump(object, { indent: 2 })

export const makeJSON = (object: JsonObject) => `${JSON.stringify(object, null, '  ')}\n`

export const fileExists = (file: string): boolean => {
  try {
    fs.accessSync(file, fs.constants.R_OK | fs.constants.W_OK)
    return true
  } catch (error: unknown) {
    return false
  }
}
