import type { Rule } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  // Possible Errors
  'regexp/no-contradiction-with-assertion': {
    enabled: true,
  },
  'regexp/no-control-character': {
    enabled: true,
  },
  'regexp/no-dupe-disjunctions': {
    enabled: true,
  },
  'regexp/no-empty-alternative': {
    enabled: true,
  },
  'regexp/no-empty-capturing-group': {
    enabled: true,
  },
  'regexp/no-empty-character-class': {
    enabled: true,
  },
  'regexp/no-empty-group': {
    enabled: true,
  },
  'regexp/no-empty-lookarounds-assertion': {
    enabled: true,
  },
  'regexp/no-escape-backspace': {
    enabled: true,
  },
  'regexp/no-invalid-regexp': {
    enabled: true,
  },
  'regexp/no-lazy-ends': {
    enabled: true,
  },
  'regexp/no-misleading-capturing-group': {
    enabled: true,
  },
  'regexp/no-misleading-unicode-character': {
    enabled: true,
    // fixable: true, https://ota-meshi.github.io/eslint-plugin-regexp/rules/no-misleading-unicode-character.html#options
  },
  'regexp/no-missing-g-flag': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-optional-assertion': {
    enabled: true,
  },
  'regexp/no-potentially-useless-backreference': {
    enabled: true,
  },
  'regexp/no-super-linear-backtracking': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-super-linear-move': {
    enabled: true,
  },
  'regexp/no-useless-assertions': {
    enabled: true,
  },
  'regexp/no-useless-backreference': {
    enabled: true,
  },
  'regexp/no-useless-dollar-replacements': {
    enabled: true,
  },
  'regexp/strict': {
    enabled: true,
    fixable: true,
  },

  // Best Practices
  'regexp/confusing-quantifier': {
    enabled: true,
  },
  'regexp/control-character-escape': {
    enabled: true,
    fixable: true,
  },
  'regexp/negation': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-dupe-characters-character-class': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-empty-string-literal': {
    enabled: true, // don't quite understand it though, apols
  },
  'regexp/no-extra-lookaround-assertions': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-invisible-character': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-legacy-features': {
    enabled: true,
  },
  'regexp/no-non-standard-flag': {
    enabled: true,
  },
  'regexp/no-obscure-range': {
    enabled: true,
  },
  'regexp/no-octal': {
    enabled: true,
  },
  'regexp/no-standalone-backslash': {
    enabled: true,
  },
  'regexp/no-trivially-nested-assertion': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-trivially-nested-quantifier': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-unused-capturing-group': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-character-class': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-flag': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-lazy': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-quantifier': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-range': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-set-operand': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-string-literal': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-zero-quantifier': {
    enabled: true,
    fixable: true,
  },
  'regexp/optimal-lookaround-quantifier': {
    enabled: true,
  },
  'regexp/optimal-quantifier-concatenation': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-escape-replacement-dollar-char': {
    enabled: true,
  },
  'regexp/prefer-predefined-assertion': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-quantifier': {
    enabled: true, // opinionated, but as per today it seems more readable to have numbers, especially with autofixes
    fixable: true,
  },
  'regexp/prefer-regexp-exec': {
    enabled: true,
  },
  'regexp/prefer-regexp-test': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-set-operation': {
    enabled: true,
    fixable: true,
  },
  'regexp/require-unicode-regexp': {
    enabled: true, // supercedes require-unicode-regexp
    fixable: true,
  },
  'regexp/require-unicode-sets-regexp': {
    enabled: false, // breaks vitest (https://github.com/vitest-dev/vitest/issues/5220);  works as expected only with regexp/require-unicode-regexp turned on (they even have this: https://github.com/ota-meshi/eslint-plugin-regexp/pull/598/files#diff-b4c4c12d6d85db6f07b5b67c694b10fc77c9d6b33b39a5acf1a47a1e39579bcaR79)
    fixable: true,
  },
  'regexp/simplify-set-operations': {
    enabled: true,
    fixable: true,
  },
  'regexp/sort-alternatives': {
    enabled: true,
    fixable: true,
  },
  'regexp/use-ignore-case': {
    enabled: true,
    fixable: true,
  },

  // Stylistic issues
  'regexp/grapheme-string-literal': {
    enabled: true,
  },
  'regexp/hexadecimal-escape': {
    fixable: true,
    enabled: true,
  },
  'regexp/letter-case': {
    fixable: true,
    enabled: true,
  },
  'regexp/match-any': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-escape': {
    enabled: true,
    fixable: true,
  },
  'regexp/no-useless-non-capturing-group': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-character-class': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-d': {
    enabled: true,
    fixable: true,
    options: {
      insideCharacterClass: 'range',
    },
  },
  'regexp/prefer-lookaround': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-named-backreference': {
    // similar to regexp/prefer-named-replacement
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-named-capture-group': {
    enabled: false, // in practice most regexps don't need it and migration takes ages
  },
  'regexp/prefer-named-replacement': {
    // similar to regexp/prefer-named-backreference
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-plus-quantifier': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-question-quantifier': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-result-array-groups': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-star-quantifier': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-unicode-codepoint-escapes': {
    enabled: true,
    fixable: true,
  },
  'regexp/prefer-w': {
    enabled: true,
    fixable: true,
  },
  'regexp/sort-character-class-elements': {
    enabled: true,
    fixable: true,
  },
  'regexp/sort-flags': {
    enabled: true,
    fixable: true,
  },
  'regexp/unicode-escape': {
    enabled: true,
    fixable: true,
  },
  'regexp/unicode-property': {
    enabled: true,
    fixable: true,
  },
}
