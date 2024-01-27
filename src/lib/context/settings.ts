import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import type { JsonObject } from 'type-fest'

import { fileExists } from '../../util/file'
import * as log from '../../util/log'

const getRcSettings = (projectDirectory: string): JsonObject => {
  const userSettingsFile = path.resolve(projectDirectory, '.domelintrc.yml')

  if (!fileExists(userSettingsFile)) {
    return {}
  }
  const fileContent = fs.readFileSync(userSettingsFile, 'utf8')
  let parseResult: ReturnType<typeof yaml.load>
  try {
    parseResult = yaml.load(fileContent)
  } catch (error: unknown) {
    log.warn(`  can't parse ${userSettingsFile}`)
    log.debug(`${(error as Error).message}\n`)
    return {}
  }

  if (typeof parseResult !== 'object' || parseResult === null) {
    return {}
  }

  return parseResult
}

export interface Settings {
  jestFiles: string[] | string
  ignoredRules: string[]
  relaxedRules: string[]
  semi: boolean
  debug: boolean
}

// eslint-disable-next-line complexity
export const getSettings = (projectDirectory: string): Settings => {
  const rcSettings = getRcSettings(projectDirectory)

  let ignoredRules: string[]
  if (process.env.DML_IGNORED_RULES !== undefined) {
    ignoredRules = process.env.DML_IGNORED_RULES.toString().split(',')
  } else if (
    Array.isArray(rcSettings.ignoredRules) &&
    rcSettings.ignoredRules.every(value => typeof value === 'string')
  ) {
    ignoredRules = rcSettings.ignoredRules as string[]
  } else {
    ignoredRules = []
  }

  let relaxedRules: string[]
  if (process.env.DML_RELAXED_RULES !== undefined) {
    relaxedRules = process.env.DML_RELAXED_RULES.toString().split(',')
  } else if (
    Array.isArray(rcSettings.relaxedRules) &&
    rcSettings.relaxedRules.every(value => typeof value === 'string')
  ) {
    relaxedRules = rcSettings.relaxedRules as string[]
  } else {
    relaxedRules = []
  }

  let semi: boolean
  if (process.env.DML_SEMI !== undefined) {
    semi = process.env.DML_SEMI === '1'
  } else if (typeof rcSettings.semi === 'boolean') {
    semi = rcSettings.semi
  } else {
    semi = false
  }

  return {
    jestFiles:
      process.env.DML_JEST_FILES ??
      rcSettings.jestFiles?.toString() ??
      'src/**/{__tests__/*,*.{spec,test}}.{js,ts,jsx,tsx}',
    ignoredRules,
    relaxedRules,
    semi,
    debug: process.env.DML_DEBUG === '1',
  }
}
