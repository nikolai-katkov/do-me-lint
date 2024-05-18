import type { Rule } from '../../lib/eslint/rulesConfig'
import { projectDoesntHave } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'for-direction': {
    enabled: true,
  },
  'getter-return': {
    enabled: true,
    scope: 'js', // ts(2378)
  },
  'no-async-promise-executor': {
    enabled: true,
  },
  'no-await-in-loop': {
    enabled: false, // you do want sometimes not to parallelize promises
  },
  'no-compare-neg-zero': {
    enabled: true,
  },
  'no-cond-assign': {
    enabled: true,
  },
  'no-console': {
    enabled: false,
  },
  'no-constant-condition': {
    enabled: true,
  },
  'no-control-regex': {
    enabled: true,
  },
  'no-debugger': {
    enabled: true,
  },
  'no-dupe-args': {
    enabled: true,
    scope: 'js', // ts(2300)
    fixable: true,
  },
  'no-dupe-else-if': {
    enabled: true,
  },
  'no-dupe-keys': {
    enabled: true,
    scope: 'js', // ts(1117)
  },
  'no-duplicate-case': {
    enabled: true,
  },
  'no-empty': {
    enabled: true,
    options: { allowEmptyCatch: true },
  },
  'no-empty-character-class': {
    enabled: true,
  },
  'no-ex-assign': {
    enabled: true,
  },
  'no-extra-boolean-cast': {
    enabled: true,
    fixable: true,
  },
  'no-extra-parens': {
    enabled: false, // covered by Prettier
    options: ['all', { nestedBinaryExpressions: false }],
    scope: 'js', // @typescript-eslint/no-extra-parens
    fixable: true,
  },
  'no-extra-semi': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/no-extra-semi
    fixable: true,
  },
  'no-func-assign': {
    enabled: true,
    scope: 'js', // ts(2539)
  },
  'no-import-assign': {
    enabled: true,
    scope: 'js', // ts(2539) & ts(2540)
  },
  'no-inner-declarations': {
    enabled: true,
  },
  'no-invalid-regexp': {
    enabled: true,
  },
  'no-irregular-whitespace': {
    enabled: true,
  },
  'no-loss-of-precision': {
    enabled: true,
  },
  'no-misleading-character-class': {
    enabled: true,
  },
  'no-obj-calls': {
    enabled: true,
    scope: 'js', // ts(2349)
  },
  'no-promise-executor-return': {
    enabled: true,
  },
  'no-prototype-builtins': {
    enabled: true,
  },
  'no-regex-spaces': {
    enabled: true,
    fixable: true,
  },
  'no-setter-return': {
    enabled: true,
    scope: 'js', // ts(2408)
  },
  'no-sparse-arrays': {
    enabled: true,
  },
  'no-template-curly-in-string': {
    enabled: true,
  },
  'no-unexpected-multiline': {
    enabled: false, // conflicts with Prettier
  },
  'no-unreachable': {
    enabled: true,
    scope: 'js', // ts(7027)
  },
  'no-unreachable-loop': {
    enabled: true,
  },
  'no-unsafe-finally': {
    enabled: true,
  },
  'no-unsafe-negation': {
    enabled: true,
    scope: 'js', // ts(2365) & ts(2360) & ts(2358)
  },
  'no-unsafe-optional-chaining': {
    enabled: true,
  },
  'no-useless-backreference': {
    enabled: true,
  },
  'require-atomic-updates': {
    enabled: true,
  },
  'use-isnan': {
    enabled: true,
  },
  'valid-typeof': {
    enabled: true,
    scope: 'js', // ts(2367)
  },
  'accessor-pairs': {
    enabled: true,
  },
  'array-callback-return': {
    enabled: true,
  },
  'block-scoped-var': {
    enabled: true,
  },
  'class-methods-use-this': {
    enabled: true,
    scope: 'js', // @typescript-eslint/class-methods-use-this
  },
  'complexity': {
    enabled: true, // may be false positive
    options: 10,
  },
  'consistent-return': {
    enabled: true,
    scope: 'js', // ts will take care of it
  },
  'curly': {
    enabled: true, // If you use the "multi-line" or "multi-or-nest" option, the rule can conflict with Prettier.
    fixable: true,
  },
  'default-case': {
    enabled: false, // too cumbersome to comply
  },
  'default-case-last': {
    enabled: true,
  },
  'default-param-last': {
    enabled: true,
    scope: 'js', // @typescript-eslint/default-param-last
  },
  'dot-location': {
    enabled: false, // covered by Prettier
    options: 'property',
    fixable: true,
  },
  'dot-notation': {
    enabled: true,
    scope: 'js', // @typescript-eslint/dot-notation
    fixable: true,
  },
  'eqeqeq': {
    enabled: true,
    fixable: true,
  },
  'grouped-accessor-pairs': {
    enabled: true,
  },
  'guard-for-in': {
    enabled: true,
  },
  'logical-assignment-operators': {
    enabled: false, // too fancy imo
  },
  'max-classes-per-file': {
    enabled: true,
  },
  'no-alert': {
    enabled: true,
  },
  'no-caller': {
    enabled: true,
  },
  'no-case-declarations': {
    enabled: true,
  },
  'no-constructor-return': {
    enabled: true,
  },
  'no-div-regex': {
    enabled: false, // I don't understand it
    fixable: true,
  },
  'no-else-return': {
    enabled: false, // covered by the wider no-useless-return
    fixable: true,
  },
  'no-empty-function': {
    enabled: true,
    options: { allow: ['arrowFunctions'] },
    scope: 'js', // @typescript-eslint/no-empty-function
  },
  'no-empty-pattern': {
    enabled: projectDoesntHave('@playwright/test'), // https://github.com/microsoft/playwright/issues/8798
  },
  'no-empty-static-block': {
    enabled: true,
  },
  'no-eq-null': {
    enabled: false, // covered by eqeqeq
  },
  'no-eval': {
    enabled: true,
  },
  'no-extend-native': {
    enabled: true,
  },
  'no-extra-bind': {
    enabled: true,
    fixable: true,
  },
  'no-extra-label': {
    enabled: false, // covered by no-labels
    fixable: true,
  },
  'no-fallthrough': {
    enabled: true,
  },
  'no-floating-decimal': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'no-global-assign': {
    enabled: true,
  },
  'no-implicit-coercion': {
    enabled: true,
    options: { allow: ['!!'] },
    fixable: true,
  },
  'no-implicit-globals': {
    enabled: false, // doesn't make sense in ES6 world
  },
  'no-implied-eval': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-implied-eval
  },
  'no-invalid-this': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-invalid-this
  },
  'no-iterator': {
    enabled: true,
  },
  'no-labels': {
    enabled: true,
  },
  'no-lone-blocks': {
    enabled: true,
  },
  'no-loop-func': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-loop-func
  },
  'no-magic-numbers': {
    enabled: false, // no one wants to suffer that much
    scope: 'js', // @typescript-eslint/no-loss-of-precision
  },
  'no-multi-spaces': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'no-multi-str': {
    enabled: true,
  },
  'no-new': {
    enabled: projectDoesntHave('aws-cdk-lib'), // CDK is all about side effects via constructors
  },
  'no-new-func': {
    enabled: true,
  },
  'no-new-native-nonconstructor': {
    enabled: true,
    fixable: true,
  },
  'no-new-wrappers': {
    enabled: true,
  },
  'no-nonoctal-decimal-escape': {
    enabled: true,
  },
  'no-octal': {
    enabled: true,
  },
  'no-octal-escape': {
    enabled: true,
  },
  'no-param-reassign': {
    enabled: true,
    options: { props: false },
  },
  'no-proto': {
    enabled: true,
  },
  'no-redeclare': {
    enabled: true,
    scope: 'js', // ts(2451), @typescript-eslint/no-redeclare
  },
  'no-restricted-properties': {
    enabled: false, // too specific use-case
  },
  'no-return-assign': {
    enabled: false, // use case is a bit made up
    options: 'always',
  },
  'no-script-url': {
    enabled: true,
  },
  'no-self-assign': {
    enabled: true,
  },
  'no-self-compare': {
    enabled: true,
  },
  'no-sequences': {
    enabled: true,
  },
  'no-throw-literal': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-throw-literal
  },
  'no-unmodified-loop-condition': {
    enabled: true,
  },
  'no-unused-expressions': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-unused-expressions
  },
  'no-unused-labels': {
    enabled: true,
    fixable: true,
  },
  'no-useless-call': {
    enabled: true,
  },
  'no-useless-catch': {
    enabled: true,
  },
  'no-useless-concat': {
    enabled: true,
  },
  'no-useless-escape': {
    enabled: true,
  },
  'no-useless-return': {
    enabled: true,
    fixable: true,
  },
  'no-void': {
    enabled: true,
  },
  'no-warning-comments': {
    enabled: false, // covered by unicorn/expiring-todo-comments
  },
  'no-with': {
    enabled: true,
  },
  'prefer-named-capture-group': {
    enabled: false, // in practice most regexps don't need it and migration takes ages; also there is better regexp/prefer-named-capture-group
  },
  'prefer-object-has-own': {
    enabled: false, // until Object.hasOwn stops being experimental: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn#browser_compatibility
  },
  'prefer-promise-reject-errors': {
    enabled: true,
    options: { allowEmptyReject: true },
  },
  'prefer-regex-literals': {
    enabled: true,
  },
  'radix': {
    enabled: true,
  },
  'require-await': {
    enabled: true,
    scope: 'js', // @typescript-eslint/require-await
  },
  'require-unicode-regexp': {
    enabled: false, // superceded by regexp/require-unicode-regexp and regexp/require-unicode-sets-regexp
  },
  'vars-on-top': {
    enabled: false, // doesn't make sense in ES6 world
  },
  'wrap-iife': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'yoda': {
    enabled: true,
    fixable: true,
  },
  'strict': {
    enabled: false, // we don't have strict and non-strict code
    fixable: true,
  },
  'init-declarations': {
    enabled: false, // too harsh, we should have freedom to init undefined vars
    scope: 'js', // @typescript-eslint/init-declarations
  },
  'no-constant-binary-expression': {
    enabled: true,
  },
  'no-delete-var': {
    enabled: true,
  },
  'no-label-var': {
    enabled: false, // covered by no-labels
  },
  'no-restricted-globals': {
    enabled: false, // requires too specific use-case
  },
  'no-shadow': {
    enabled: true,
    options: { builtinGlobals: false, hoist: 'functions', ignoreOnInitialization: true },
    scope: 'js', // @typescript-eslint/no-shadow
  },
  'no-shadow-restricted-names': {
    enabled: true,
  },
  'no-undef': {
    enabled: true,
    scope: 'js', // ts(2304)
  },
  'no-undef-init': {
    enabled: true,
    fixable: true,
  },
  'no-undefined': {
    enabled: false, // only in ES3
  },
  'no-unused-vars': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-unused-vars
  },
  'no-use-before-define': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-use-before-define
  },
  'array-bracket-newline': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'array-bracket-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'array-element-newline': {
    enabled: false, // covered by Prettier
    options: 'consistent',
    fixable: true,
  },
  'block-spacing': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/comma-spacing
    fixable: true,
  },
  'brace-style': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/brace-style
    fixable: true,
  },
  'camelcase': {
    enabled: true,
    options: {
      properties: 'always',
      ignoreDestructuring: false,
      ignoreImports: false,
      ignoreGlobals: false,
    },
    scope: 'js', // conflicts and covered by @typescript-eslint/naming-convention
    fixable: true,
  },
  'capitalized-comments': {
    enabled: false, // don't see much malue
    fixable: true,
  },
  'comma-dangle': {
    enabled: false, // covered by Prettier
    options: 'always-multiline',
    fixable: true,
  },
  'comma-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'comma-style': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'computed-property-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'consistent-this': {
    enabled: false, // not gonna use without jQuery I think
  },
  'eol-last': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'func-call-spacing': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/func-call-spacing
    fixable: true,
  },
  'func-name-matching': {
    enabled: true,
  },
  'func-names': {
    enabled: true,
    options: 'as-needed',
  },
  'func-style': {
    enabled: true,
    options: ['declaration', { allowArrowFunctions: true }],
  },
  'function-call-argument-newline': {
    enabled: false, // covered by Prettier
    options: 'consistent',
    fixable: true,
  },
  'function-paren-newline': {
    enabled: false, // covered by Prettier
    options: 'multiline',
    fixable: true,
  },
  'id-denylist': {
    enabled: false, // too opinionated
  },
  'id-length': {
    enabled: true, // maybe too opinionated and we know when to use long names?
    options: { min: 1, max: 35 },
  },
  'id-match': {
    enabled: false, // don't have a good policy in hand
  },
  'implicit-arrow-linebreak': {
    enabled: false, // I'd like to have freedom to decide it, covered by Prettier
    fixable: true,
  },
  'indent': {
    enabled: false, // covered by Prettier
    options: 2,
    scope: 'js', // @typescript-eslint/indent
    fixable: true,
  },
  'jsx-quotes': {
    enabled: false, // covered by Prettier // projectHas('react')
    scope: 'ts',
    fixable: true,
  },
  'key-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'keyword-spacing': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/keyword-spacing
    fixable: true,
  },
  'line-comment-position': {
    enabled: false, // we want freedom there
    fixable: true,
  },
  'linebreak-style': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'lines-around-comment': {
    enabled: false, // conflicts with padded-blocks (prefer this), eslint-plugin-simple-import-sort#sort-order (prefer that), conflicts with prettier
    options: { beforeBlockComment: true, beforeLineComment: true },
    fixable: true,
  },
  'lines-between-class-members': {
    enabled: true,
    scope: 'js', // @typescript-eslint/lines-between-class-members
    fixable: true,
  },
  'max-depth': {
    enabled: true, // May be an issue for React
    options: { max: 4 },
  },
  'max-len': {
    enabled: false, // covered by Prettier
    options: {
      code: 120,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    },
  },
  'max-lines': {
    enabled: false, // we keep an eye on it by ourselves
  },
  'max-lines-per-function': {
    enabled: false, // too invasive, consider warn
    options: { max: 60 },
  },
  'max-nested-callbacks': {
    enabled: true,
  },
  'max-params': {
    enabled: true,
  },
  'max-statements': {
    enabled: false, // no one liked it
  },
  'max-statements-per-line': {
    enabled: true,
  },
  'multiline-comment-style': {
    enabled: false, // annoys me
    fixable: true,
  },
  'multiline-ternary': {
    enabled: false, // covered by Prettier
    options: 'always-multiline',
    fixable: true,
  },
  'new-cap': {
    enabled: false, // conflicts with standard libs, like @nestjs
  },
  'new-parens': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'newline-per-chained-call': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'no-array-constructor': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-array-constructor
  },
  'no-bitwise': {
    enabled: false, // bitwise ops are still used in NodeJS APIs, e.g. https://nodejs.org/api/fs.html#fs_fs_accesssync_path_mode
  },
  'no-continue': {
    enabled: false, // if..else conditions also hurt readability
  },
  'no-inline-comments': {
    enabled: false, // Too strict
  },
  'no-lonely-if': {
    enabled: true,
    fixable: true,
  },
  'no-mixed-operators': {
    enabled: false, // beware relation with no-extra-parens, conflicts with Prettier
  },
  'no-mixed-spaces-and-tabs': {
    enabled: false, // covered by Prettier
  },
  'no-multi-assign': {
    enabled: true,
  },
  'no-multiple-empty-lines': {
    enabled: false,
    options: { max: 1, maxBOF: 0, maxEOF: 0 },
    fixable: true, // covered by Prettier
  },
  'no-negated-condition': {
    enabled: false, // covered by unicorn/no-negated-condition
  },
  'no-nested-ternary': {
    enabled: false, // covered by unicorn/no-nested-ternary
  },
  'no-object-constructor': {
    enabled: true,
  },
  'no-plusplus': {
    enabled: false, // we use them and it's all fine
  },
  'no-restricted-syntax': {
    enabled: false, // too complicated and restrictive
  },
  'no-tabs': {
    enabled: false, // covered by Prettier
  },
  'no-ternary': {
    enabled: false, // we use it and it's all fine
  },
  'no-trailing-spaces': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'no-underscore-dangle': {
    enabled: false, // I believe that we know where to use them
  },
  'no-unneeded-ternary': {
    enabled: true,
    fixable: true,
  },
  'no-whitespace-before-property': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'nonblock-statement-body-position': {
    enabled: false, // Covered by curly, covered by Prettier
    fixable: true,
  },
  'object-curly-newline': {
    enabled: false, // covered by Prettier
    options: { multiline: true },
    fixable: true,
  },
  'object-curly-spacing': {
    enabled: false, // covered by Prettier
    options: 'always',
    scope: 'js', // @typescript-eslint/object-curly-spacing
    fixable: true,
  },
  'object-property-newline': {
    enabled: false, // tl;dr, covered by Prettier
    fixable: true,
  },
  'one-var': {
    enabled: true, // we voted against, but I'm curious
    options: 'never',
    fixable: true,
  },
  'one-var-declaration-per-line': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'operator-assignment': {
    enabled: false, // both ways seem fine
    fixable: true,
  },
  'operator-linebreak': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'padded-blocks': {
    enabled: false, // conflicts with lines-around-comment (prefer that)
    options: { classes: 'always', blocks: 'never', switches: 'never' },
    fixable: true,
  },
  'padding-line-between-statements': {
    enabled: false, // good one, but hard to set up
    fixable: true,
  },
  'prefer-exponentiation-operator': {
    enabled: true,
    fixable: true,
  },
  'prefer-object-spread': {
    enabled: true,
    fixable: true,
  },
  'quote-props': {
    enabled: false, // covered by Prettier
    options: 'consistent-as-needed',
    fixable: true,
  },
  'quotes': {
    enabled: false, // covered by Prettier
    options: ['single', { avoidEscape: true, allowTemplateLiterals: false }],
    scope: 'js', // @typescript-eslint/quotes
    fixable: true,
  },
  'semi': {
    enabled: false, // covered by Prettier
    options: ({ semi }) => (semi ? 'always' : 'never'),
    fixable: true,
  },
  'semi-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'semi-style': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'sort-keys': {
    enabled: false, // painful
  },
  'sort-vars': {
    enabled: false, // don't see much value
    fixable: true,
  },
  'space-before-blocks': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'space-before-function-paren': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/space-before-function-paren
    fixable: true,
  },
  'space-in-parens': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'space-infix-ops': {
    enabled: false, // covered by Prettier
    scope: 'js', // @typescript-eslint/space-infix-ops
    fixable: true,
  },
  'space-unary-ops': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'spaced-comment': {
    enabled: true, // beware of ///  <reference types="cypress" />
    options: ['always', { markers: ['/'] }],
    fixable: true,
  },
  'switch-colon-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'template-tag-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'unicode-bom': {
    enabled: false, // we voted against, but let's see, covered by Prettier
    fixable: true,
  },
  'wrap-regex': {
    enabled: false, // not gonna wraps regexp literals into parens, covered by Prettier
    fixable: true,
  },
  'arrow-body-style': {
    enabled: true,
    fixable: true,
  },
  'arrow-parens': {
    enabled: false, // covered by Prettier, maybe keep the default "always" for TS?
    options: 'as-needed',
    fixable: true,
  },
  'arrow-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'constructor-super': {
    enabled: true,
    scope: 'js', // ts(2335) & ts(2377)
  },
  'generator-star-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'no-class-assign': {
    enabled: true,
  },
  'no-confusing-arrow': {
    enabled: false, // Conflicts with Prettier
    fixable: true,
  },
  'no-const-assign': {
    enabled: true,
    scope: 'js', // ts(2588)
  },
  'no-dupe-class-members': {
    enabled: true,
    scope: 'js', // ts(2393) & ts(2300), @typescript-eslint/no-dupe-class-members
  },
  'no-duplicate-imports': {
    enabled: true, // not including includeExports option to allow re-export external library's stuff along with ours
    scope: 'js', // conflicts with @typescript-eslint/consistent-type-imports (prefer that), covered by @typescript-eslint/no-duplicate-imports
  },
  'no-new-symbol': {
    enabled: true,
    scope: 'js', // ts(2588)
  },
  'no-restricted-exports': {
    enabled: false, // too specific, yagni
  },
  'no-restricted-imports': {
    enabled: false, // too specific, yagni
  },
  'no-this-before-super': {
    enabled: true,
    scope: 'js', // ts(2376)
  },
  'no-useless-computed-key': {
    enabled: true,
    options: { enforceForClassMembers: true },
    fixable: true,
  },
  'no-useless-constructor': {
    enabled: true,
    scope: 'js', // @typescript-eslint/no-useless-constructor
  },
  'no-useless-rename': {
    enabled: true,
    fixable: true,
  },
  'no-var': {
    enabled: true, // ts transpiles let/const to var, so no need for vars any more
    fixable: true,
  },
  'object-shorthand': {
    enabled: true,
    fixable: true,
  },
  'prefer-arrow-callback': {
    enabled: true,
    fixable: true,
  },
  'prefer-const': {
    enabled: true,
    fixable: true,
  },
  'prefer-destructuring': {
    enabled: false, // does not work well with `let` and variables in the outer context
    fixable: true,
  },
  'prefer-numeric-literals': {
    enabled: false,
    fixable: true,
  },
  'prefer-rest-params': {
    enabled: true,
    scope: 'js',
  },
  'prefer-spread': {
    enabled: true,
  },
  'prefer-template': {
    enabled: true,
    fixable: true,
  },
  'require-yield': {
    enabled: true,
  },
  'rest-spread-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'sort-imports': {
    enabled: false, // covered by simpleSort
    fixable: true,
  },
  'symbol-description': {
    enabled: true,
    fixable: true,
  },
  'template-curly-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'yield-star-spacing': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
}
