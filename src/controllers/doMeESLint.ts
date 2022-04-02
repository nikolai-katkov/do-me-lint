import { deleteConflictingConfigurations } from '../lib/eslint/deleteConflictingConfigurations'
import { fixProject } from '../lib/eslint/fixProject'
import { getConfig } from '../lib/eslint/getConfig'
import { installDependencies } from '../lib/eslint/installDependencies'
import { getReport, outputReport } from '../lib/eslint/report'
import { saveConfig } from '../lib/eslint/saveConfig'
import { saveIgnore } from '../lib/ignore/saveIgnore'
import * as log from '../util/log'
import type { Context } from './getMeContext'

export const doMeESLint = async (context: Context): Promise<void> => {
  log.info('Generating ESLint config based on your project dependencies')
  const { config, dependencies } = getConfig({
    projectDependencies: context.installedPackages.map(installedPackage => installedPackage.name),
    patterns: context.patterns,
    ignoredRules: context.ignoredRules,
    semi: context.semi,
  })

  log.info('Checking required NPM dependencies for ESLint')
  installDependencies({
    dependencyManager: context.dependencyManager,
    dependencies,
    installedPackages: context.installedPackages,
    cwd: context.projectDirectory,
    debug: context.debug,
  })

  log.info('Searching for conflicting ESLint configurations')
  deleteConflictingConfigurations({
    projectDirectory: context.projectDirectory,
  })

  log.info('Saving ESLint config (.eslintrc.yml)')
  saveConfig({
    config,
    projectDirectory: context.projectDirectory,
  })

  log.info('Saving ESLint ignore file (.eslintignore)')
  saveIgnore({
    ignoreFileName: '.eslintignore',
    projectDirectory: context.projectDirectory,
    gitignore: context.gitignore,
  })

  log.info('Fixing your codebase (ESLint)')
  const results = await fixProject({
    pattern: context.patterns.lintAll,
    cwd: context.projectDirectory,
  })

  const { report, errors } = getReport(results, context.projectDirectory)
  if (errors) {
    log.warn(`You still need to fix ${errors} problems`)
    outputReport(report)
  } else {
    log.debug(`no ESLint problems`)
  }
}
