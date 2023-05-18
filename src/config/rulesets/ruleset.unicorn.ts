import type { Rule } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'unicorn/better-regex': {
    enabled: true,
    fixable: true,
  },
  'unicorn/catch-error-name': {
    enabled: true,
    fixable: true,
  },
  'unicorn/consistent-destructuring': {
    enabled: true,
    fixable: true,
  },
  'unicorn/consistent-function-scoping': {
    enabled: true,
  },
  'unicorn/custom-error-definition': {
    enabled: true,
    fixable: true,
  },
  'unicorn/empty-brace-spaces': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'unicorn/error-message': {
    enabled: true,
  },
  'unicorn/escape-case': {
    enabled: true,
    fixable: true,
  },
  'unicorn/expiring-todo-comments': {
    enabled: true,
    options: { allowWarningComments: false },
  },
  'unicorn/explicit-length-check': {
    enabled: true, // not that it's important, but luckily autofixable; recommended to use with unicorn/no-useless-length-check
    fixable: true,
  },
  'unicorn/filename-case': {
    enabled: false, // will bring more headache than profit
  },
  'unicorn/import-style': {
    enabled: true,
  },
  'unicorn/new-for-builtins': {
    enabled: false, // covered by TS and no-new-wrappers. Fixable, but not worth the effort
    fixable: true,
  },
  'unicorn/no-abusive-eslint-disable': {
    enabled: true,
  },
  'unicorn/no-array-callback-reference': {
    enabled: false, // a bit made-up case, bloated resulted syntax
  },
  'unicorn/no-array-for-each': {
    enabled: false, // I like forEach and its early returns
    fixable: true,
  },
  'unicorn/no-array-method-this-argument': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-array-push-push': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-array-reduce': {
    enabled: false, // never heard that reduce is an anti-pattern
  },
  'unicorn/no-await-expression-member': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-console-spaces': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-document-cookie': {
    enabled: true,
  },
  'unicorn/no-empty-file': {
    enabled: true, // need to test
  },
  'unicorn/no-for-loop': {
    enabled: true, // harsh but cool
    fixable: true,
  },
  'unicorn/no-hex-escape': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-instanceof-array': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-invalid-remove-event-listener': {
    enabled: true,
  },
  'unicorn/no-keyword-prefix': {
    enabled: false, // paranoidal rule
  },
  'unicorn/no-lonely-if': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-nested-ternary': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'unicorn/no-new-array': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-new-buffer': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-null': {
    enabled: false, // doesn't play well with existing Maybe<T> types
    fixable: true,
  },
  'unicorn/no-object-as-default-parameter': {
    enabled: true,
  },
  'unicorn/no-process-exit': {
    enabled: false, // doubts: the base eslint rule was deprecated, why?
  },
  'unicorn/no-static-only-class': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-thenable': {
    enabled: true,
  },
  'unicorn/no-this-assignment': {
    enabled: true,
  },
  'unicorn/no-unreadable-array-destructuring': {
    enabled: false, // just not sure
    fixable: true,
  },
  'unicorn/no-unreadable-iife': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-unsafe-regex': {
    enabled: false, // false positives, like /^(?:[A-Z][a-z]+)+$/u
  },
  'unicorn/no-unused-properties': {
    enabled: true, // something scary and powerful
  },
  'unicorn/no-useless-fallback-in-spread': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-useless-length-check': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-useless-promise-resolve-reject': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-useless-spread': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-useless-switch-case': {
    enabled: true,
    fixable: true,
  },
  'unicorn/no-useless-undefined': {
    enabled: true,
    scope: 'js', // conflicts with void return type in TS
    fixable: true,
  },
  'unicorn/no-zero-fractions': {
    enabled: true,
    fixable: true,
  },
  'unicorn/number-literal-case': {
    enabled: false, // covered by Prettier
    fixable: true,
  },
  'unicorn/numeric-separators-style': {
    enabled: false, // ugly
    fixable: true,
  },
  'unicorn/prefer-add-event-listener': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-array-find': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-array-flat': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-array-flat-map': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-array-index-of': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-array-some': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-at': {
    enabled: false, // not yet live in the current v33.0.1, change to confident yes in a few days
    fixable: true,
  },
  'unicorn/prefer-code-point': {
    enabled: true,
  },
  'unicorn/prefer-date-now': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-default-parameters': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-dom-node-append': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-dom-node-dataset': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-dom-node-remove': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-dom-node-text-content': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-export-from': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-event-target': {
    enabled: true, // Node 16+ only
    fixable: true,
  },
  'unicorn/prefer-includes': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-json-parse-buffer': {
    enabled: false, // exotic
    fixable: true,
  },
  'unicorn/prefer-keyboard-event-key': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-logical-operator-over-ternary': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-math-trunc': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-modern-dom-apis': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-modern-math-apis': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-module': {
    enabled: false, // there are other motivators to use one or another
    fixable: true,
  },
  'unicorn/prefer-native-coercion-functions': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-negative-index': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-node-protocol': {
    enabled: false, // boomer change, buggy
    fixable: true,
  },
  'unicorn/prefer-number-properties': {
    enabled: true,
    options: { checkInfinity: false },
    fixable: true,
  },
  'unicorn/prefer-object-from-entries': {
    enabled: true, // need to try
    fixable: true,
  },
  'unicorn/prefer-object-has-own': {
    enabled: false, // buggy
    fixable: true,
  },
  'unicorn/prefer-optional-catch-binding': {
    enabled: false, // conflicts with eslint (unexpected identifier) and ts(1003)
    fixable: true,
  },
  'unicorn/prefer-prototype-methods': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-query-selector': {
    enabled: true, // aren't old ones faster?
    fixable: true,
  },
  'unicorn/prefer-reflect-apply': {
    enabled: false, // don't feel comfortable to transfer to Reflect
    fixable: true,
  },
  'unicorn/prefer-regexp-test': {
    enabled: true, // boomer, need to try it
    fixable: true,
  },
  'unicorn/prefer-set-has': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-spread': {
    enabled: false, // conflicts with array-func/prefer-array-from - prefer that
    fixable: true,
  },
  'unicorn/prefer-string-replace-all': {
    enabled: false, // don't like auto-fixing with Math.max
    fixable: true,
  },
  'unicorn/prefer-string-slice': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-string-starts-ends-with': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-string-trim-start-end': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-switch': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prefer-ternary': {
    enabled: true, // hope it doesn't uglify the code
    options: 'only-single-line',
    fixable: true,
  },
  'unicorn/prefer-top-level-await': {
    enabled: false, // not all files support this
  },
  'unicorn/prefer-type-error': {
    enabled: true,
    fixable: true,
  },
  'unicorn/prevent-abbreviations': {
    enabled: false, // in some cases adds underscores that may conflict with other naming convention rules.
    options: {
      checkFilenames: false,
      replacements: {
        dir: false,
        e: false,
        i: false,
        j: false,
        param: false,
        params: false,
        pkg: false,
        prop: false,
        props: false,
        ref: false,
        req: false,
        res: false,
        tmp: false,
        cfg: { config: true },
        lang: { language: true },
        langs: { languages: true },
      },
    },
    fixable: true,
  },
  'unicorn/relative-url-style': {
    enabled: false, // too specific, and I believe humans know better
    fixable: true,
  },
  'unicorn/require-array-join-separator': {
    enabled: true,
    fixable: true,
  },
  'unicorn/require-number-to-fixed-digits-argument': {
    enabled: true,
    fixable: true,
  },
  'unicorn/require-post-message-target-origin': {
    enabled: false, // whatever, not yet live in the current v33.0.1, change to confident yes in a few days
  },
  'unicorn/string-content': {
    enabled: false, // made-up use case
    fixable: true,
  },
  'unicorn/template-indent': {
    enabled: true, // wow, need to test
    fixable: true,
  },
  'unicorn/text-encoding-identifier-case': {
    enabled: true,
    fixable: true,
  },
  'unicorn/throw-new-error': {
    enabled: true,
    fixable: true,
  },
}
