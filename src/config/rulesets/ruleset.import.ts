import type { Rule } from '../../lib/eslint/rulesConfig'

export const ruleset: Record<string, Rule> = {
  'import/default': {
    enabled: true,
    scope: 'js', // ts(2613), ts(1192), and I couldn't make it work in TS
  },
  'import/dynamic-import-chunkname': {
    enabled: false, // nerdy
  },
  'import/export': {
    enabled: false, // covered by both ts(2528) and eslint
  },
  'import/exports-last': {
    enabled: false, // too much line movement when switching exports
  },
  'import/extensions': {
    enabled: false, // too individual
  },
  'import/first': {
    enabled: true,
    fixable: true,
  },
  'import/group-exports': {
    enabled: false, // too much work for complex files. Maybe later.
  },
  'import/max-dependencies': {
    enabled: false, // too strict
  },
  'import/named': {
    enabled: true,
    scope: 'js', // ts(2305)
  },
  'import/namespace': {
    enabled: true,
    scope: 'js', // ts(2339)
  },
  'import/newline-after-import': {
    enabled: true,
    fixable: true,
  },
  'import/no-absolute-path': {
    enabled: true,
  },
  'import/no-amd': {
    enabled: false, // intended for temporary use when migrating to pure ES6 modules.
  },
  'import/no-anonymous-default-export': {
    enabled: true,
  },
  'import/no-commonjs': {
    enabled: false, // intended for temporary use when migrating to pure ES6 modules.
  },
  'import/no-cycle': {
    enabled: false, // too computationally expensive to use in such a big rule list
    // fixable: true,
  },
  'import/no-default-export': {
    enabled: true, // big bang rule, be careful; see also import/no-named-export and import/prefer-default-export
  },
  'import/no-deprecated': {
    enabled: true,
    scope: 'js', // ts(6387)
  },
  'import/no-duplicates': {
    enabled: true,
    fixable: true,
  },
  'import/no-dynamic-require': {
    enabled: true,
  },
  'import/no-extraneous-dependencies': {
    enabled: true,
  },
  'import/no-import-module-exports': {
    enabled: false, // too rare (if not made up) case
  },
  'import/no-internal-modules': {
    enabled: false, // too strict policy
  },
  'import/no-mutable-exports': {
    enabled: true,
  },
  'import/no-named-as-default': {
    enabled: true,
  },
  'import/no-named-as-default-member': {
    enabled: true, // not sure about this, but it's recommended
  },
  'import/no-named-default': {
    enabled: true,
  },
  'import/no-named-export': {
    enabled: false, // because import/no-default-export is on
  },
  'import/no-namespace': {
    enabled: false, // too restrictive, especially with import/no-default-export being on
    fixable: true,
  },
  'import/no-nodejs-modules': {
    enabled: false, // aha, sure
  },
  'import/no-relative-packages': {
    enabled: false, // not everything is Lerna yet
    fixable: true,
  },
  'import/no-relative-parent-imports': {
    enabled: false, // too specific and invasive
  },
  'import/no-restricted-paths': {
    enabled: false, // too specific and invasive
  },
  'import/no-self-import': {
    enabled: true,
  },
  'import/no-unassigned-import': {
    enabled: false, // quite common in style libs
  },
  'import/no-unresolved': {
    enabled: false, // beware: If you're using a module bundler other than Node or Webpack, you may end up with a lot of false positive reports of missing dependencies.
  },
  'import/no-unused-modules': {
    enabled: false, // sloooow, have to restart eslint server every time to test it
    options: {
      missingExports: true,
      unusedExports: true,
    },
  },
  'import/no-useless-path-segments': {
    enabled: true,
    options: { noUselessIndex: true, commonjs: true },
    fixable: true,
  },
  'import/no-webpack-loader-syntax': {
    enabled: true, // may sound too strict, but webpack config is a better place indeed
  },
  'import/order': {
    enabled: false, // see also simple-import-sort/imports (prefer that)
  },
  'import/prefer-default-export': {
    enabled: false, // too conventional, and import/no-default-export makes it useless
  },
  'import/unambiguous': {
    enabled: false, // we already take control over module sourceType and files to lint
  },
}
