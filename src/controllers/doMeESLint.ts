import deleteConflictingConfigurations from '../lib/eslint/deleteConflictingConfigurations'
import fixProject from '../lib/eslint/fixProject'
import getConfig from '../lib/eslint/getConfig'
import getSpreadsheetRules from '../lib/eslint/getSpreadsheetRules'
import installDependencies from '../lib/eslint/installDependencies'
import { getReport, outputReport } from '../lib/eslint/report'
import saveConfig from '../lib/eslint/saveConfig'
import log from '../util/log'
import type { Context } from './getMeContext'

const doMeESLint = async (context: Context): Promise<void> => {
  log.info('Fetching spreadsheet')
  const spreadsheetRules = await getSpreadsheetRules(context.spreadsheetCsv)
  log.debug(`loaded ${spreadsheetRules.length} rules`)

  log.info('Generating ESLint config based on your project dependencies')
  const { config, dependencies } = getConfig({
    spreadsheetRules,
    projectDependencies: context.installedPackages.map(installedPackage => installedPackage.name),
    patterns: context.patterns,
    ignoredRules: context.ignoredRules,
    semi: context.semi,
  })

  log.info('Checking required NPM dependencies for ESLint')
  await installDependencies({
    dependencyManager: context.dependencyManager,
    eslintDependencies: dependencies,
    installedPackages: context.installedPackages,
  })

  log.info('Searching for conflicting ESLint configurations')
  deleteConflictingConfigurations({
    projectDirectory: context.projectDirectory,
    ignorePattern: context.patterns.ignored,
  })

  log.info('Saving ESLing config (.eslintrc.yml)')
  saveConfig({
    config,
    projectDirectory: context.projectDirectory,
    spreadsheet: context.spreadsheet,
  })

  log.info('Fixing your codebase (ESLint)')
  const results = await fixProject({
    pattern: context.patterns.lintAll,
    cwd: context.projectDirectory,
    ignorePattern: context.patterns.ignored,
  })

  const { report, errors } = getReport(results, context.projectDirectory)
  if (errors) {
    log.warn(`You still need to fix ${errors} problems`)
    outputReport(report)
  } else {
    log.debug(`no ESLint problems`)
  }
}

export default doMeESLint
