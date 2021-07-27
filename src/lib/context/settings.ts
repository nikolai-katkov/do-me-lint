import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'
import type { JsonObject } from 'type-fest'

import { fileExists } from '../../util/file'
import log from '../../util/log'

const getRcSettings = (projectDirectory: string): JsonObject => {
  const userSettingsFile = path.resolve(projectDirectory, '.domelintrc.yml')

  if (!fileExists(userSettingsFile)) {
    return {}
  }
  const fileContent = fs.readFileSync(userSettingsFile, 'utf-8')
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
  spreadsheet: string
  spreadsheetCsv: string
  ignoredRules: string[]
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

  let semi: boolean
  if (process.env.DML_SEMI !== undefined) {
    semi = process.env.DML_SEMI === '1'
  } else if (typeof rcSettings.semi === 'boolean') {
    // eslint-disable-next-line prefer-destructuring
    semi = rcSettings.semi
  } else {
    semi = false
  }

  return {
    jestFiles:
      process.env.DML_JEST_FILES ??
      rcSettings.jestFiles?.toString() ??
      'src/**/{__tests__/*,*.{spec,test}}.{js,ts,jsx,tsx}',
    spreadsheet:
      process.env.DML_SPREADSHEET ??
      rcSettings.spreadsheet?.toString() ??
      'https://docs.google.com/spreadsheets/d/149ecBpNj1mfgTKlCcVwxdKbi5VDNeJdsVW-c2Y62z9k/edit#gid=1499443148',
    spreadsheetCsv:
      process.env.DML_SPREADSHEET_CSV ??
      rcSettings.spreadsheetCsv?.toString() ??
      'https://docs.google.com/spreadsheets/d/e/2PACX-1vS0YEIZpNgczI9Y0J6r59onLdrhOXLv866Oz9CkhNByDiz5tl-dAABu5edZPlTchTeG4m6Gg-lJmYPX/pub?gid=1499443148&single=true&output=csv',
    ignoredRules,
    semi,
    debug: process.env.DML_DEBUG === '1',
  }
}
