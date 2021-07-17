import deleteConflictingConfigurations from '../lib/prettier/deleteConflictingConfigurations'
import fixProject from '../lib/prettier/fixProject'
import getConfig from '../lib/prettier/getConfig'
import saveConfig from '../lib/prettier/saveConfig'
import log from '../util/log'
import type { Context } from './getMeContext'

const doMePrettier = async (context: Context): Promise<void> => {
  log.info('Generating Prettier config')
  const config = getConfig()

  log.info('Searching for conflicting Prettier configurations')
  deleteConflictingConfigurations({
    directory: context.projectDirectory,
    ignorePattern: context.patterns.ignored,
  })

  log.info('Saving Prettier config (.prettierrc.yml)')
  saveConfig({ config, projectDirectory: context.projectDirectory })

  log.info('Fixing your codebase (Prettier)')
  await fixProject({
    pattern: context.patterns.all,
    ignorePattern: context.patterns.ignored,
    projectDirectory: context.projectDirectory,
  })
}

export default doMePrettier
