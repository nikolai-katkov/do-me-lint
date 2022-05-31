import type { Rule } from '../../lib/eslint/rulesConfig'
import { projectHas } from '../../lib/eslint/rulesConfig'

const yes = projectHas('@playwright/test')

export const ruleset: Record<string, Rule> = {
  'playwright/missing-playwright-await': {
    enabled: yes,
    fixable: true,
  },
  'playwright/no-page-pause': {
    enabled: yes,
  },
  'playwright/no-element-handle': {
    enabled: yes,
  },
  'playwright/no-eval': {
    enabled: yes,
  },
  'playwright/no-focused-test': {
    enabled: yes,
  },
  'playwright/no-wait-for-timeout': {
    enabled: yes,
  },
  'playwright/no-skipped-test': {
    enabled: yes,
  },
  'playwright/no-force-option': {
    enabled: yes,
  },
}
