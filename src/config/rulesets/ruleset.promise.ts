import type { Rule } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'promise/always-return': {
    enabled: false, // maybe make a bit of sense in a non-TS world, but introduces a too strict policy
  },
  'promise/avoid-new': {
    enabled: false, // no documentation on the rule
  },
  'promise/catch-or-return': {
    enabled: false, // I would rely on the outer-scope catch
  },
  'promise/no-callback-in-promise': {
    enabled: false, // no documentation on the rule
  },
  'promise/no-multiple-resolved': {
    enabled: true,
  },
  'promise/no-native': {
    enabled: false, // don't do much of es5 these days
  },
  'promise/no-nesting': {
    enabled: true,
  },
  'promise/no-new-statics': {
    enabled: true,
    fixable: true,
  },
  'promise/no-promise-in-callback': {
    enabled: false, // no documentation on the rule
  },
  'promise/no-return-in-finally': {
    enabled: true,
    scope: 'js', // covered by ts(2345)
  },
  'promise/no-return-wrap': {
    enabled: true,
  },
  'promise/param-names': {
    enabled: true,
  },
  'promise/prefer-await-to-callbacks': {
    enabled: false, // no documentation on the rule
  },
  'promise/prefer-await-to-then': {
    enabled: false, // matter of style, conflicts with Cypress style
  },
  'promise/valid-params': {
    enabled: true,
  },
}
