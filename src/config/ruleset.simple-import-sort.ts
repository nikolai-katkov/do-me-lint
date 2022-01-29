import type { Rule } from '../lib/eslint/rulesConfig'

const ruleset: Record<string, Rule> = {
  'simple-import-sort/imports': {
    enabled: true, // see also import/order (prefer this)
    fixable: true,
  },
  'simple-import-sort/exports': {
    enabled: true,
    fixable: true,
  },
}

export default ruleset
