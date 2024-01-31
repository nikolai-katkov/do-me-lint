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
import * as log from '../util/log'

const getGitignore = (projectDirectory: string): string[] => {
  const gitignoreFile = path.resolve(projectDirectory, '.gitignore')

  if (!fileExists(gitignoreFile)) {
    return []
  }
  const fileContent = fs.readFileSync(gitignoreFile, 'utf8')
  return fileContent
    .split('\n')
    .filter(Boolean)
    .map(line => line.trim())
    .filter(line => !line.startsWith('#'))
}

export interface Context {
  installedPackages: InstalledPackage[]
  hasPnpmWorkspaces: boolean
  projectDirectory: string
  monorepoRoot?: string
  patterns: Patterns
  ignoredRules: string[]
  relaxedRules: string[]
  dependencyManager?: DependencyManager
  semi: boolean
  gitignore: string[]
  debug: boolean
}
export const getMeContext = (): Context => {
  const doMeLintPackageJson = getPackageJson(path.resolve(__dirname, '../..'))
  if (doMeLintPackageJson?.version !== undefined) {
    log.debug(`do-me-lint ${doMeLintPackageJson.version}`)
  }

  log.info('Gathering execution context')

  const projectDirectory = process.env.INIT_CWD ?? process.cwd()
  log.debug(`projectDirectory:\t${projectDirectory}`)

  const settings = getSettings(projectDirectory)

  const monorepoRoot = getMonorepoRoot(projectDirectory)
  if (monorepoRoot !== undefined) {
    log.debug(`monorepo root:\t${monorepoRoot}`)
  }

  const { ignoredRules, relaxedRules, semi, debug } = settings

  const patterns = getPatterns(settings)
  const packageJson = getPackageJson(projectDirectory)

  const dependencyManager = packageJson && getDependencyManager(projectDirectory)
  log.debug(`project type:\t\t${dependencyManager ?? 'start from scratch'}`)

  const hasPnpmWorkspaces =
    dependencyManager === 'pnpm' && fileExists(path.join(projectDirectory, 'pnpm-workspace.yaml'))

  const installedPackages: InstalledPackage[] =
    packageJson && dependencyManager
      ? getInstalledPackages({ packageJson, dependencyManager, projectDirectory })
      : []

  const gitignore = getGitignore(projectDirectory)

  return {
    dependencyManager,
    hasPnpmWorkspaces,
    installedPackages,
    projectDirectory,
    monorepoRoot,
    patterns,
    ignoredRules,
    relaxedRules,
    semi,
    gitignore,
    debug,
  }
}
