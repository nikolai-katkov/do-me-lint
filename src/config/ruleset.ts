import type { Rule } from '../lib/eslint/rulesConfig'
import { ruleset as arrayFunction } from './ruleset.array-func'
import { ruleset as eslint } from './ruleset.eslint'
import { ruleset as importPlugin } from './ruleset.import'
import { ruleset as jest } from './ruleset.jest'
import { ruleset as jsxA11y } from './ruleset.jsx-a11y'
import { ruleset as promise } from './ruleset.promise'
import { ruleset as react } from './ruleset.react'
import { ruleset as reactHooks } from './ruleset.react-hooks'
import { ruleset as simpleSort } from './ruleset.simple-import-sort'
import { ruleset as sonarjs } from './ruleset.sonarjs'
import { ruleset as typescript } from './ruleset.typescript'
import { ruleset as unicorn } from './ruleset.unicorn'
import { ruleset as yml } from './ruleset.yml'

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
}
