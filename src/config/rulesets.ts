import type { Rule } from '../lib/eslint/rulesConfig'
import { ruleset as arrayFunction } from './rulesets/ruleset.array-func'
import { ruleset as eslint } from './rulesets/ruleset.eslint'
import { ruleset as importPlugin } from './rulesets/ruleset.import'
import { ruleset as jest } from './rulesets/ruleset.jest'
import { ruleset as jsxA11y } from './rulesets/ruleset.jsx-a11y'
import { ruleset as playwright } from './rulesets/ruleset.playwright'
import { ruleset as promise } from './rulesets/ruleset.promise'
import { ruleset as react } from './rulesets/ruleset.react'
import { ruleset as reactHooks } from './rulesets/ruleset.react-hooks'
import { ruleset as regexp } from './rulesets/ruleset.regexp'
import { ruleset as simpleSort } from './rulesets/ruleset.simple-import-sort'
import { ruleset as sonarjs } from './rulesets/ruleset.sonarjs'
import { ruleset as typescript } from './rulesets/ruleset.typescript'
import { ruleset as unicorn } from './rulesets/ruleset.unicorn'
import { ruleset as yml } from './rulesets/ruleset.yml'

export const ruleset: Record<string, Rule> = {
  ...eslint,
  ...typescript,
  ...simpleSort,
  ...react,
  ...reactHooks,
  ...jsxA11y,
  ...unicorn,
  ...jest,
  ...sonarjs,
  ...promise,
  ...yml,
  ...arrayFunction,
  ...importPlugin,
  ...playwright,
  ...regexp,
}
