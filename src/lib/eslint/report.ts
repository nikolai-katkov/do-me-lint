import type { ESLint } from 'eslint'
import path from 'path'

import log from '../../util/log'

type Report = Map<string, [number, Set<string>]>

export const getReport = (results: ESLint.LintResult[], projectDirectory: string) => {
  let errors = 0
  const report = results.reduce<Report>((previous, next) => {
    if (next.messages.length === 0) {
      return previous
    }

    const file = path.relative(projectDirectory, next.filePath)
    for (const error of next.messages) {
      errors++
      const rule = String(error.ruleId)
      const entry = previous.get(rule)

      if (entry) {
        const [count, files] = entry
        previous.set(rule, [count + 1, files.add(file)])
      } else {
        previous.set(rule, [1, new Set([file])])
      }
    }

    return previous
  }, new Map())
  return { report, errors }
}

export const outputReport = (report: Report): void => {
  const sortedReport = new Map(Array.from(report.entries()).sort((a, b) => b[1][0] - a[1][0]))
  for (const [rule, [count, files]] of sortedReport) {
    log.debug(`${rule}: ${count}`)
    for (const file of files) {
      log.debug(`  ${file}`)
    }
    log.debug('')
  }
}
