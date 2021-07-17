import path from 'path'
import type { JsonObject } from 'type-fest'

interface Parameters {
  existingSettings: JsonObject
  projectDirectory: string
  monorepoRoot?: string
}

const generateSettings = (parameters: Parameters): JsonObject => {
  const { existingSettings, projectDirectory, monorepoRoot } = parameters
  const newSettings = JSON.parse(JSON.stringify(existingSettings)) as JsonObject

  // eslint.validate setting is deprecated in dbaeumer.vscode-eslint
  // but it's the only way I found to make it validate Yaml files
  if (!Array.isArray(newSettings['eslint.validate'])) {
    newSettings['eslint.validate'] = ['yaml']
  } else if (!(newSettings['eslint.validate'] as string[]).includes('yaml')) {
    newSettings['eslint.validate'].push('yaml')
  }
  prettierLanguages.forEach(language => {
    if (newSettings[`[${language}]`] === undefined) {
      newSettings[`[${language}]`] = {}
    }

    const setting = newSettings[`[${language}]`] as JsonObject
    setting['editor.formatOnSave'] = true
    setting['editor.defaultFormatter'] = 'esbenp.prettier-vscode'
  })

  if (monorepoRoot !== undefined) {
    const relativePath = path.relative(monorepoRoot, projectDirectory)
    if (!Array.isArray(newSettings['eslint.workingDirectories'])) {
      newSettings['eslint.workingDirectories'] = [relativePath]
    } else if (!(newSettings['eslint.workingDirectories'] as string[]).includes(relativePath)) {
      newSettings['eslint.workingDirectories'].push(relativePath)
    }
  }

  return newSettings
}

const prettierLanguages = [
  'css',
  'html',
  'javascript',
  'javascriptreact',
  'json',
  'jsx',
  'markdown',
  'sass',
  'scss',
  'typescript',
  'typescriptreact',
  'yaml',
]
// source: https://code.visualstudio.com/docs/languages/identifiers

export default generateSettings
