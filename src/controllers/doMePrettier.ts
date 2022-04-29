import { saveIgnore } from '../lib/ignore/saveIgnore'
import { deleteConflictingConfigurations } from '../lib/prettier/deleteConflictingConfigurations'
import { fixProject } from '../lib/prettier/fixProject'
import { getConfig } from '../lib/prettier/getConfig'
import { saveConfig } from '../lib/prettier/saveConfig'
import * as log from '../util/log'
import type { Context } from './getMeContext'

export const doMePrettier = async (context: Context): Promise<void> => {
  log.info('Generating Prettier config')
  const config = getConfig({ semi: context.semi })

  log.info('Searching for conflicting Prettier configurations')
  deleteConflictingConfigurations({
    directory: context.projectDirectory,
  })

  log.info('Saving Prettier config (.prettierrc.yml)')
  saveConfig({ config, projectDirectory: context.projectDirectory })

  log.info('Saving Prettier ignore file (.prettierignore)')
  saveIgnore({
    ignoreFileName: '.prettierignore',
    projectDirectory: context.projectDirectory,
    gitignore: context.gitignore,
  })

  log.info('Fixing your codebase (Prettier)')
  await fixProject({
    pattern: context.patterns.all,
    projectDirectory: context.projectDirectory,
  })
}
