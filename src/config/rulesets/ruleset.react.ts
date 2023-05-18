import type { Rule } from '../../lib/eslint/rulesConfig'
import { projectHas } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'react/boolean-prop-naming': {
    enabled: false, // too nerdy // projectHas('react')
  },
  'react/button-has-type': {
    enabled: projectHas('react'),
  },
  'react/default-props-match-prop-types': {
    enabled: projectHas('react'),
  },
  'react/destructuring-assignment': {
    enabled: false, // this can hinder readability // projectHas('react')
  },
  'react/display-name': {
    enabled: projectHas('react'),
  },
  'react/forbid-component-props': {
    enabled: projectHas('react'),
  },
  'react/forbid-dom-props': {
    enabled: false, // no use cases // projectHas('react')
  },
  'react/forbid-elements': {
    enabled: false, // no use cases // projectHas('react')
  },
  'react/forbid-foreign-prop-types': {
    enabled: false, // too specific use case // projectHas('react')
  },
  'react/forbid-prop-types': {
    enabled: projectHas('react'),
  },
  'react/function-component-definition': {
    enabled: false, // too opinionated // projectHas('react')
    fixable: true,
  },
  'react/hook-use-state': {
    enabled: false, // no use cases in my mind
    fixable: true,
  },
  'react/no-access-state-in-setstate': {
    enabled: projectHas('react'),
  },
  'react/no-adjacent-inline-elements': {
    enabled: projectHas('react'),
  },
  'react/no-array-index-key': {
    enabled: projectHas('react'),
  },
  'react/no-children-prop': {
    enabled: projectHas('react'),
  },
  'react/no-danger': {
    enabled: false, // the prop is already ugly enough // projectHas('react')
  },
  'react/no-danger-with-children': {
    enabled: projectHas('react'),
  },
  'react/no-deprecated': {
    enabled: projectHas('react'),
  },
  'react/no-did-mount-set-state': {
    enabled: projectHas('react'),
  },
  'react/no-did-update-set-state': {
    enabled: projectHas('react'),
  },
  'react/no-direct-mutation-state': {
    enabled: projectHas('react'),
  },
  'react/no-find-dom-node': {
    enabled: projectHas('react'),
  },
  'react/no-is-mounted': {
    enabled: projectHas('react'),
  },
  'react/no-multi-comp': {
    enabled: false, // too strict, I see cases where I'd like to define several components // projectHas('react')
  },
  'react/no-object-type-as-default-prop': {
    enabled: projectHas('react'), // wow, til
  },
  'react/no-redundant-should-component-update': {
    enabled: projectHas('react'),
  },
  'react/no-render-return-value': {
    enabled: projectHas('react'),
  },
  'react/no-set-state': {
    enabled: false, // makes sense only with external state manegement, if any at all // projectHas('react')
  },
  'react/no-string-refs': {
    enabled: projectHas('react'),
  },
  'react/no-this-in-sfc': {
    enabled: projectHas('react'),
  },
  'react/no-typos': {
    enabled: projectHas('react'),
  },
  'react/no-unescaped-entities': {
    enabled: projectHas('react'),
  },
  'react/no-unknown-property': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/no-unsafe': {
    enabled: projectHas('react'),
  },
  'react/no-unstable-nested-components': {
    enabled: projectHas('react'),
  },
  'react/no-unused-prop-types': {
    enabled: projectHas('react'),
  },
  'react/no-unused-state': {
    enabled: projectHas('react'),
  },
  'react/no-will-update-set-state': {
    enabled: projectHas('react'),
  },
  'react/prefer-es6-class': {
    enabled: projectHas('react'),
  },
  'react/prefer-read-only-props': {
    enabled: false, // ugly syntax // projectHas('react')
    fixable: true,
  },
  'react/prefer-stateless-function': {
    enabled: projectHas('react'),
    options: { ignorePureComponents: true },
  },
  'react/prop-types': {
    enabled: projectHas('react'),
    scope: 'js', // with TS types you don't need PropTypes
  },
  'react/react-in-jsx-scope': {
    enabled: false, // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
  },
  'react/require-default-props': {
    enabled: projectHas('react'), // need to check if it's playing well in real codebases
    options: {
      functions: 'defaultArguments', // not sure, maybe default option will work better
    },
    scope: 'js', // with TS types you wont do mistakes with defaultProps
  },
  'react/require-optimization': {
    enabled: projectHas('react'), // probably noisy, but maybe useful
  },
  'react/require-render-return': {
    enabled: projectHas('react'),
  },
  'react/self-closing-comp': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/sort-comp': {
    enabled: projectHas('react'),
  },
  'react/sort-default-props': {
    enabled: false, // I may want to group props to some logic // projectHas('react')
  },
  'react/sort-prop-types': {
    enabled: false, // I may want to group them by some logic // projectHas('react')
  },
  'react/state-in-constructor': {
    enabled: projectHas('react'), // too opinionated
    options: 'never',
  },
  'react/static-property-placement': {
    enabled: projectHas('react'),
  },
  'react/style-prop-object': {
    enabled: projectHas('react'),
  },
  'react/void-dom-elements-no-children': {
    enabled: projectHas('react'),
  },
  'react/iframe-missing-sandbox': {
    enabled: projectHas('react'),
  },

  'react/jsx-boolean-value': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/jsx-child-element-spacing': {
    enabled: false, // may be too tedious, covered by Prettier // projectHas('react')
  },
  'react/jsx-closing-bracket-location': {
    enabled: false, // covered by Prettier // projectHas('react')
    fixable: true,
  },
  'react/jsx-closing-tag-location': {
    enabled: false, // covered by Prettier // projectHas('react'),
    fixable: true,
  },
  'react/jsx-curly-brace-presence': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/jsx-curly-newline': {
    enabled: false, // covered by Prettier // projectHas('react')
    fixable: true,
  },
  'react/jsx-curly-spacing': {
    enabled: false, // covered by Prettier // projectHas('react')
    options: { when: 'never', children: true },
    fixable: true,
  },
  'react/jsx-equals-spacing': {
    enabled: false, // covered by Prettier // projectHas('react'
    fixable: true,
  },
  'react/jsx-filename-extension': {
    enabled: false, // don't quite like file naming conventions // projectHas('react')
  },
  'react/jsx-first-prop-new-line': {
    enabled: false, // covered by Prettier // projectHas('react')
    fixable: true,
  },
  'react/jsx-fragments': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/jsx-handler-names': {
    enabled: false, // super opinionated // projectHas('react')
  },
  'react/jsx-indent': {
    enabled: false, // covered by Prettier // projectHas('react')
    options: [2, { checkAttributes: true, indentLogicalExpressions: true }],
    fixable: true,
  },
  'react/jsx-indent-props': {
    enabled: false, // covered by Prettier // projectHas('react')
    options: 2,
    fixable: true,
  },
  'react/jsx-key': {
    enabled: projectHas('react'),
    options: { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true },
  },
  'react/jsx-max-depth': {
    enabled: false, // I rely on other signs of over-engineered components, not nesting // projectHas('react')
  },
  'react/jsx-max-props-per-line': {
    enabled: false, // covered by Prettier // projectHas('react')
    options: { when: 'multiline' },
    fixable: true,
  },
  'react/jsx-newline': {
    enabled: false, // mix of spaces/no-spaces may be more readable, covered by Prettier // projectHas('react')
    fixable: true,
  },
  'react/jsx-no-bind': {
    enabled: projectHas('react'),
  },
  'react/jsx-no-comment-textnodes': {
    enabled: projectHas('react'),
  },
  'react/jsx-no-constructed-context-values': {
    enabled: projectHas('react'), // hmm, okay, TIL
  },
  'react/jsx-no-duplicate-props': {
    enabled: projectHas('react'),
  },
  'react/jsx-no-literals': {
    enabled: false, // just a bad rule // projectHas('react')
  },
  'react/jsx-no-script-url': {
    enabled: projectHas('react'),
  },
  'react/jsx-no-target-blank': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/jsx-no-undef': {
    enabled: projectHas('react'), // didn't test it
  },
  'react/jsx-no-leaked-render': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/jsx-no-useless-fragment': {
    enabled: projectHas('react'),
    fixable: true,
  },
  'react/jsx-one-expression-per-line': {
    enabled: false, // covered by Prettier // projectHas('react')
    options: { allow: 'literal' },
    fixable: true,
  },
  'react/jsx-pascal-case': {
    enabled: projectHas('react'),
    options: { allowAllCaps: true },
  },
  'react/jsx-props-no-multi-spaces': {
    enabled: false, // covered by Prettier // projectHas('react')
    fixable: true,
  },
  'react/jsx-props-no-spreading': {
    enabled: false, // turning off assuming that TSX works fine with spread, need to test // projectHas('react')
  },
  'react/jsx-sort-props': {
    enabled: false, // I may want to group props to some logic // projectHas('react')
    fixable: true,
  },
  'react/jsx-space-before-closing': {
    enabled: false, // deprecated in favor of react/jsx-tag-spacing // projectHas('react')
    fixable: true,
  },
  'react/jsx-tag-spacing': {
    enabled: false, // how is it different to react/jsx-space-before-closing? covered by Prettier // projectHas('react')
    options: {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    },
    fixable: true,
  },
  'react/jsx-uses-react': {
    enabled: false, // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
  },
  'react/jsx-uses-vars': {
    enabled: projectHas('react'),
  },
  'react/jsx-wrap-multilines': {
    enabled: false, // covered by Prettier // projectHas('react')
    options: {
      declaration: 'ignore',
      assignment: 'ignore',
      return: 'parens-new-line',
      arrow: 'ignore',
      condition: 'ignore',
      logical: 'ignore',
      prop: 'ignore',
    },
    fixable: true,
  },
}
