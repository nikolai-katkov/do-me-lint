import { generateSettings } from '../lib/vscode/generateSettings'
import { getExistingSettings } from '../lib/vscode/getExistingSettings'
import { saveSettings } from '../lib/vscode/saveSettings'
import * as log from '../util/log'
import type { Context } from './getMeContext'

export const doMeVSCode = (context: Context): void => {
  log.info('Reading your current VS Code settings')
  const existingSettings = getExistingSettings(context.monorepoRoot ?? context.projectDirectory)

  log.info('Updating VS Code settings')
  const newSettings = generateSettings({
    existingSettings,
    monorepoRoot: context.monorepoRoot,
    projectDirectory: context.projectDirectory,
  })

  log.info('Saving VS Code settings')
  saveSettings({
    settings: newSettings,
    directory: context.monorepoRoot ?? context.projectDirectory,
  })

  // maybe install extensions ['dbaeumer.vscode-eslint', 'esbenp.prettier-vscode']
}
