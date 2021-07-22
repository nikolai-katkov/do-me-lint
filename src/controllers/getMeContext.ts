import fs from 'fs'
import path from 'path'

import type { DependencyManager, InstalledPackage } from '../lib/context/dependencies'
import {
  getDependencyManager,
  getInstalledPackages,
  getPackageJson,
} from '../lib/context/dependencies'
import type { Patterns } from '../lib/context/paths'
import { getMonorepoRoot, getPatterns } from '../lib/context/paths'
import { getSettings } from '../lib/context/settings'
import { fileExists } from '../util/file'
import log from '../util/log'

const getGitignore = (projectDirectory: string): string[] => {
  const gitignoreFile = path.resolve(projectDirectory, '.gitignore')

  if (!fileExists(gitignoreFile)) {
    return []
  }
  const fileContent = fs.readFileSync(gitignoreFile, 'utf-8')
  return fileContent
    .split('\n')
    .filter(Boolean)
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'))
}

export interface Context {
  installedPackages: InstalledPackage[]
  spreadsheet: string
  spreadsheetCsv: string
  projectDirectory: string
  monorepoRoot?: string
  patterns: Patterns
  ignoredRules: string[]
  dependencyManager?: DependencyManager
  semi: boolean
  gitignore: string[]
}
const getMeContext = (): Context => {
  log.info('Gathering execution context')

  const projectDirectory = process.env.INIT_CWD ?? process.cwd()
  log.debug(`projectDirectory:\t${projectDirectory}`)

  const settings = getSettings(projectDirectory)

  const monorepoRoot = getMonorepoRoot(projectDirectory)
  if (monorepoRoot !== undefined) {
    log.debug(`monorepo root:\t${monorepoRoot}`)
  }

  const { spreadsheet, spreadsheetCsv, ignoredRules, semi } = settings

  log.debug(`rules CSV:\t\t${spreadsheetCsv}`)

  const patterns = getPatterns(settings)
  const packageJson = getPackageJson(projectDirectory)
  const dependencyManager = packageJson && getDependencyManager(projectDirectory)
  log.debug(`project type:\t\t${dependencyManager ?? 'start from scratch'}`)

  const installedPackages: InstalledPackage[] =
    packageJson && dependencyManager
      ? getInstalledPackages({ packageJson, dependencyManager, projectDirectory })
      : []

  const gitignore = getGitignore(projectDirectory)

  return {
    dependencyManager,
    installedPackages,
    spreadsheet,
    spreadsheetCsv,
    projectDirectory,
    monorepoRoot,
    patterns,
    ignoredRules,
    semi,
    gitignore,
  }
}
export default getMeContext
