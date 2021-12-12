import type { Rule } from '../lib/eslint/rulesConfig'

const ruleset: Record<string, Rule> = {
  // Bug Detection 🐛
  'sonarjs/no-all-duplicated-branches': {
    enabled: true,
  },
  'sonarjs/no-element-overwrite': {
    enabled: true, // don't quite understand
  },
  'sonarjs/no-empty-collection': {
    enabled: true,
  },
  'sonarjs/no-extra-arguments': {
    enabled: true,
    scope: 'js', // ts already takes care of it
  },
  'sonarjs/no-identical-conditions': {
    enabled: true,
  },
  'sonarjs/no-identical-expressions': {
    enabled: true,
    scope: 'js', // covered by @typescript-eslint/no-unnecessary-condition
  },
  'sonarjs/no-ignored-return': {
    enabled: true,
  },
  'sonarjs/no-one-iteration-loop': {
    enabled: false, // covered by no-unreachable-loop
  },
  'sonarjs/no-use-of-empty-return-value': {
    enabled: true,
    scope: 'js', // covered by @typescript-eslint/no-confusing-void-expression
  },
  'sonarjs/non-existent-operator': {
    enabled: true,
  },
  // Code Smell Detection 🐷
  'sonarjs/cognitive-complexity': {
    enabled: true, // potentially problematic
  },
  'sonarjs/elseif-without-else': {
    enabled: false, // too strict and nerdy
  },
  'sonarjs/max-switch-cases': {
    enabled: true,
  },
  'sonarjs/no-collapsible-if': {
    enabled: false, // covered by fixable unicorn/no-lonely-if
  },
  'sonarjs/no-collection-size-mischeck': {
    enabled: true,
  },
  'sonarjs/no-duplicate-string': {
    enabled: true, // may be problematic
    options: 5,
  },
  'sonarjs/no-duplicated-branches': {
    enabled: true,
  },
  'sonarjs/no-gratuitous-expressions': {
    enabled: true,
  },
  'sonarjs/no-identical-functions': {
    enabled: true,
  },
  'sonarjs/no-inverted-boolean-check': {
    enabled: true,
    fixable: true,
  },
  'sonarjs/no-nested-switch': {
    enabled: true,
  },
  'sonarjs/no-nested-template-literals': {
    enabled: true, // reasonable rule, but need to see in practice
  },
  'sonarjs/no-redundant-boolean': {
    enabled: true,
    scope: 'js', // covered by @typescript-eslint/no-unnecessary-boolean-literal-compare
  },
  'sonarjs/no-redundant-jump': {
    enabled: false, // covered by no-useless-return
  },
  'sonarjs/no-same-line-conditional': {
    enabled: false, // covered by Prettier
  },
  'sonarjs/no-small-switch': {
    enabled: true,
  },
  'sonarjs/no-unused-collection': {
    enabled: true,
  },
  'sonarjs/no-useless-catch': {
    enabled: false, // covered by no-useless-catch
  },
  'sonarjs/prefer-immediate-return': {
    enabled: true,
    fixable: true,
  },
  'sonarjs/prefer-object-literal': {
    enabled: true,
  },
  'sonarjs/prefer-single-boolean-return': {
    enabled: false, // covered by unicorn/prefer-ternary
  },
  'sonarjs/prefer-while': {
    enabled: true,
    fixable: true,
  },
}

export default ruleset
