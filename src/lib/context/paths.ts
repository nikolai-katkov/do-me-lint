import findUp from 'find-up'
import path from 'path'

import type { Settings } from './settings'

export const getMonorepoRoot = (projectDirectory: string): string | undefined => {
  const gitRoot = findUp.sync(
    directory => {
      const isGitRoot = findUp.sync.exists(path.join(directory, '.git'))
      return isGitRoot && directory ? directory : undefined
    },
    { type: 'directory', cwd: projectDirectory }
  )

  if (gitRoot === undefined || gitRoot === projectDirectory) {
    return undefined
  }
  return gitRoot
}

export interface Patterns {
  lintAll: string
  eslintJS: string
  eslintTS: string
  jestFiles: string[] | string
  yaml: string
  all: string
}
export const getPatterns = (settings: Settings): Patterns => ({
  lintAll: '**/*.{ts,tsx,js,jsx}',
  eslintTS: '**/*.{ts,tsx}',
  eslintJS: '**/*.{js,jsx}',
  jestFiles: settings.jestFiles,
  yaml: '**/*.{yaml,yml}',
  all: '**/*',
})
