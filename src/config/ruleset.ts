import type { Rule } from '../lib/eslint/rulesConfig'
import arrayFunction from './ruleset.array-func'
import eslint from './ruleset.eslint'
import jest from './ruleset.jest'
import jsxA11y from './ruleset.jsx-a11y'
import react from './ruleset.react'
import reactHooks from './ruleset.react-hooks'
import simpleSort from './ruleset.simple-import-sort'
import sonarjs from './ruleset.sonarjs'
import typescript from './ruleset.typescript'
import unicorn from './ruleset.unicorn'
import yml from './ruleset.yml'

const ruleset: Record<string, Rule> = {
  ...eslint,
  ...typescript,
  ...simpleSort,
  ...react,
  ...reactHooks,
  ...jsxA11y,
  ...unicorn,
  ...jest,
  ...sonarjs,
  ...yml,
  ...arrayFunction,
}

export default ruleset
