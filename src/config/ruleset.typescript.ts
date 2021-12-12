/* eslint-disable id-length */

import type { Rule } from '../lib/eslint/rulesConfig'
import { projectHas } from '../lib/eslint/rulesConfig'

const ruleset: Record<string, Rule> = {
  '@typescript-eslint/adjacent-overload-signatures': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/array-type': {
    enabled: projectHas('typescript'),
    options: { default: 'array-simple', readonly: 'generic' },
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/await-thenable': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/ban-ts-comment': {
    enabled: false, // I'd like to have freedom for it // projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/ban-tslint-comment': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/ban-types': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/class-literal-property-style': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/consistent-indexed-object-style': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/consistent-type-assertions': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/consistent-type-definitions': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/consistent-type-exports': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/consistent-type-imports': {
    enabled: projectHas('typescript'), // TIL - new TS syntax!, but conflicts with no-duplicate-imports (prefer this)
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/explicit-function-return-type': {
    enabled: false, // too annoying and type is inferred anyway // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/explicit-member-accessibility': {
    enabled: false, // too wordy // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/explicit-module-boundary-types': {
    enabled: false, // inferring works just fine // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/member-delimiter-style': {
    enabled: false, // if semi, then semi; covered by Prettier // projectHas('typescript')
    options: ({ semi }) => ({
      multiline: { delimiter: semi ? 'semi' : 'none' },
      singleline: { delimiter: 'comma' },
    }),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/member-ordering': {
    enabled: false, // too nerdy, don't see benefit // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/method-signature-style': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/naming-convention': {
    enabled: projectHas('typescript'),
    options: [
      {
        selector: 'memberLike',
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
      },
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow',
        trailingUnderscore: 'forbid',
      },
      { selector: 'typeLike', format: ['PascalCase'] },
    ],
    scope: 'ts',
  },
  '@typescript-eslint/no-base-to-string': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-confusing-non-null-assertion': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-confusing-void-expression': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-dynamic-delete': {
    enabled: false, // hard when editing a json object // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-empty-interface': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-explicit-any': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-extra-non-null-assertion': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-extraneous-class': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-floating-promises': {
    enabled: false, // sometimes I want to throw it further // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/no-for-in-array': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-implicit-any-catch': {
    enabled: projectHas('typescript'), // lots of boilerplate
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-inferrable-types': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-invalid-void-type': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-meaningless-void-operator': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-misused-new': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-misused-promises': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-namespace': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-non-null-asserted-optional-chain': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-non-null-assertion': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-parameter-properties': {
    enabled: false, // Tedious // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/no-require-imports': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-this-alias': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-type-alias': {
    enabled: false, // I'd like to use types // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/no-unnecessary-boolean-literal-compare': {
    enabled: projectHas('typescript'),
    options: {
      allowComparingNullableBooleansToTrue: false,
      allowComparingNullableBooleansToFalse: false,
    },
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-unnecessary-condition': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-unnecessary-qualifier': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-unnecessary-type-arguments': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-unnecessary-type-assertion': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-unnecessary-type-constraint': {
    enabled: false, // https://github.com/typescript-eslint/typescript-eslint/issues/3509 // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-unsafe-argument': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-unsafe-assignment': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-unsafe-call': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-unsafe-member-access': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-unsafe-return': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-var-requires': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/non-nullable-type-assertion-style': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/padding-line-between-statements': {
    enabled: false, // same as native padding-line-between-statements // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/prefer-as-const': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-enum-initializers': {
    enabled: false, // I trust myself to know (and not to care) about impmlicit values // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/prefer-for-of': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/prefer-function-type': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-includes': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-literal-enum-member': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/prefer-namespace-keyword': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-nullish-coalescing': {
    enabled: false, // it's deceiving // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/prefer-optional-chain': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/prefer-readonly': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-readonly-parameter-types': {
    enabled: false, // too much boilerplate // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/prefer-reduce-type-parameter': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-regexp-exec': {
    enabled: false, // Aimed for constistency, will still result in different approaches // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-string-starts-ends-with': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/prefer-ts-expect-error': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/promise-function-async': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/require-array-sort-compare': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/restrict-plus-operands': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/restrict-template-expressions': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/sort-type-union-intersection-members': {
    enabled: projectHas('typescript'), // Weird, but autofixable
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/strict-boolean-expressions': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/switch-exhaustiveness-check': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/triple-slash-reference': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/type-annotation-spacing': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/typedef': {
    enabled: false, // Covered by --strict // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/unbound-method': {
    enabled: false, // didn't work well with react-hook-forms // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/unified-signatures': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/brace-style': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/comma-dangle': {
    enabled: false, // covered by Prettier
    options: 'always-multiline', // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/comma-spacing': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/default-param-last': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/dot-notation': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/func-call-spacing': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/indent': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    options: 2,
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/init-declarations': {
    enabled: false, // too harsh, we should have freedom to init undefined vars // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/keyword-spacing': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/lines-between-class-members': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-array-constructor': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-dupe-class-members': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-duplicate-imports': {
    enabled: projectHas('typescript'),
    options: { includeExports: true },
    scope: 'ts',
  },
  '@typescript-eslint/no-empty-function': {
    enabled: projectHas('typescript'),
    options: { allow: ['arrowFunctions'] },
    scope: 'ts',
  },
  '@typescript-eslint/no-extra-parens': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    options: ['all', { nestedBinaryExpressions: false }],
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-extra-semi': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/no-implied-eval': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-invalid-this': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-loop-func': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-loss-of-precision': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-magic-numbers': {
    enabled: false, // no one wants to suffer that much // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/no-non-null-asserted-nullish-coalescing': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-redeclare': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-restricted-imports': {
    enabled: false, // follow native no-restricted-imports // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/no-shadow': {
    enabled: projectHas('typescript'),
    options: { builtinGlobals: false, hoist: 'functions' },
    scope: 'ts',
  },
  '@typescript-eslint/no-throw-literal': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-unused-expressions': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/no-unused-vars': {
    enabled: false, // covered by ts itself // projectHas('typescript')
    scope: 'ts', // ts(6133)
  },
  '@typescript-eslint/no-use-before-define': {
    enabled: false, // problems with scope (issue 1856) reproduced // projectHas('typescript')
    scope: 'ts',
  },
  '@typescript-eslint/no-useless-constructor': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/object-curly-spacing': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    options: 'always',
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/quotes': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    options: 'single',
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/require-await': {
    enabled: projectHas('typescript'),
    scope: 'ts',
  },
  '@typescript-eslint/return-await': {
    enabled: projectHas('typescript'),
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/semi': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    options: 'never',
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/space-before-function-paren': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
  '@typescript-eslint/space-infix-ops': {
    enabled: false, // covered by Prettier // projectHas('typescript')
    scope: 'ts',
    fixable: true,
  },
}

export default ruleset
