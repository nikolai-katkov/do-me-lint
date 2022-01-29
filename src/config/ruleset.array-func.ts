import type { Rule } from '../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'array-func/from-map': {
    enabled: true,
    fixable: true,
  },
  'array-func/no-unnecessary-this-arg': {
    enabled: true,
    scope: 'js', // covered by @typescript-eslint/no-invalid-this
    fixable: true,
  },
  'array-func/prefer-array-from': {
    enabled: true, // conficts with unicorn/prefer-spread - prefer this
    fixable: true,
  },
  'array-func/avoid-reverse': {
    enabled: true,
    fixable: true,
  },
  'array-func/prefer-flat-map': {
    enabled: true,
    fixable: true,
  },
  'array-func/prefer-flat': {
    enabled: true,
    fixable: true,
  },
}
