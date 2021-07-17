import { ESLint } from 'eslint'
import { sync as glob } from 'glob'

interface Parameters {
  pattern: string
  cwd: string
  ignorePattern: string
}
const fixProject = async (parameters: Parameters): Promise<ESLint.LintResult[]> => {
  // unlike Prettier, ESLint throws an error when it can't find files to lint
  if (!hasFilesToLint(parameters)) {
    return []
  }

  const { pattern } = parameters

  const eslint = new ESLint({ fix: true })

  // don't need to ignore node_modules, it's ignored by default
  const results = await eslint.lintFiles(pattern)
  await ESLint.outputFixes(results)
  return results
}

const hasFilesToLint = (parameters: Parameters): boolean => {
  const { pattern, cwd, ignorePattern } = parameters
  const files: string[] = glob(pattern, {
    cwd,
    ignore: ignorePattern,
    nodir: true,
  })
  return files.length > 0
}

export default fixProject
