import type { Rule, RuleInput } from '../../lib/eslint/rulesConfig'
import { projectHas } from '../../lib/eslint/rulesConfig'

const forAllPlaywrightUsage = ({ projectDependencies }: RuleInput) =>
  projectDependencies.includes('@playwright/test') || projectDependencies.includes('playwright')

const forTestsOnly = projectHas('@playwright/test')

export const ruleset: Record<string, Rule> = {
  'playwright/max-nested-describe': {
    enabled: forTestsOnly,
  },
  'playwright/missing-playwright-await': {
    enabled: forTestsOnly,
    fixable: true,
  },
  'playwright/no-conditional-in-test': {
    enabled: false, // may be too disruptive and lacking justificaition // forTestsOnly,
  },
  'playwright/no-element-handle': {
    enabled: forAllPlaywrightUsage,
  },
  'playwright/no-eval': {
    enabled: forAllPlaywrightUsage,
  },
  'playwright/no-focused-test': {
    enabled: forTestsOnly,
  },
  'playwright/no-force-option': {
    enabled: forAllPlaywrightUsage,
  },
  'playwright/no-page-pause': {
    enabled: forAllPlaywrightUsage,
  },
  'playwright/no-restricted-matchers': {
    enabled: forTestsOnly,
  },
  'playwright/no-skipped-test': {
    enabled: forTestsOnly,
  },
  'playwright/no-useless-not': {
    enabled: forTestsOnly,
  },
  'playwright/no-wait-for-timeout': {
    enabled: forAllPlaywrightUsage,
  },
  'playwright/prefer-lowercase-title': {
    enabled: forTestsOnly,
  },
  'playwright/prefer-strict-equal': {
    enabled: forAllPlaywrightUsage,
  },
  'playwright/prefer-to-be': {
    enabled: forTestsOnly,
  },
  'playwright/prefer-to-have-length': {
    enabled: forTestsOnly,
  },
  'playwright/prefer-web-first-assertions': {
    enabled: forTestsOnly,
  },
  'playwright/require-soft-assertions': {
    enabled: false, // too opinionated // forTestsOnly
  },
  'playwright/require-top-level-describe': {
    enabled: false, //  rconsider after // forTestsOnly
  },
  'playwright/valid-expect': {
    enabled: forTestsOnly,
  },
}
