import type { Rule } from '../lib/eslint/rulesConfig'
import { projectHas } from '../lib/eslint/rulesConfig'

const ruleset: Record<string, Rule> = {
  'react-hooks/rules-of-hooks': {
    enabled: projectHas('react'),
  },
  'react-hooks/exhaustive-deps': {
    enabled: projectHas('react'), // I haven't tested it
    fixable: true,
  },
}

export default ruleset
