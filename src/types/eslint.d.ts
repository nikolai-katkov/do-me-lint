import type { JsonArray, JsonValue } from 'type-fest'

export type RuleLevel = 'error' | 'off' | 'warn' | 0 | 1 | 2

type Environment = Record<string, true>

export type RuleValue = RuleLevel | [RuleLevel, ...JsonArray]

export type ESLintRules = Record<string, RuleValue>

export interface Settings {
  react?: {
    version: string
  }
  [key: string]: JsonValue | undefined
}

export interface OverrideConfig {
  files: string[]
  env?: Environment
  plugins?: string[]
  extends?: string[]
  rules?: ESLintRules
  parserOptions?: ParserOptions
  parser?: string
  [key: string]: JsonValue | undefined
}

export type Rules = Record<
  string,
  [
    {
      level?: RuleLevel
      scope?: '*' | 'js' | 'ts'
      if?: boolean
      fixable?: boolean
    }?,
    ...JsonArray
  ]
>

export interface ParserOptions {
  // prettier-ignore
  // eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
  ecmaVersion?: 3 | 5 | 
    6    | 7    | 8    | 9    | 10   | 11   | 12   |
    2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 |
    'latest'

  ecmaFeatures?: {
    jsx?: boolean
  }
  sourceType?: 'module' | 'script'
  project?: string
  allowImportExportEverywhere?: boolean
  [key: string]: JsonValue | undefined
}

export interface ESLintConfig {
  env?: Environment
  plugins?: string[]
  extends?: string[]
  parser?: string
  rules?: ESLintRules
  parserOptions?: ParserOptions
  settings?: Settings
  globals?: Record<string, 'off' | 'readonly' | 'writable'>
  ignorePatterns?: string[]
  overrides?: OverrideConfig[]
  [key: string]: JsonValue | undefined
}
