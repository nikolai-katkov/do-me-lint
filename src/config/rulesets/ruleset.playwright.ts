import type { Rule } from '../../lib/eslint/rulesConfig'
import { projectHas } from '../../lib/eslint/rulesConfig'

const yes = projectHas('@playwright/test')

export const ruleset: Record<string, Rule> = {
  'playwright/max-nested-describe': {
    enabled: yes,
  },
  'playwright/missing-playwright-await': {
    enabled: yes,
    fixable: true,
  },
  'playwright/no-conditional-in-test': {
    enabled: false, // may be too disruptive and lacking justificaition // yes,
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
  'playwright/no-force-option': {
    enabled: yes,
  },
  'playwright/no-page-pause': {
    enabled: yes,
  },
  'playwright/no-restricted-matchers': {
    enabled: yes,
  },
  'playwright/no-skipped-test': {
    enabled: yes,
  },
  'playwright/no-useless-not': {
    enabled: yes,
  },
  'playwright/no-wait-for-timeout': {
    enabled: yes,
  },
  'playwright/prefer-lowercase-title': {
    enabled: yes,
  },
  'playwright/prefer-strict-equal': {
    enabled: yes,
  },
  'playwright/prefer-to-be': {
    enabled: yes,
  },
  'playwright/prefer-to-have-length': {
    enabled: yes,
  },
  'playwright/require-soft-assertions': {
    enabled: false, // too opinionated
  },
  'playwright/require-top-level-describe': {
    enabled: false, //  rconsider after
  },
  'playwright/valid-expect': {
    enabled: yes,
  },
}
