import type { JsonValue } from 'type-fest'

import { ruleset } from '../../config/rulesets'
import type {
  ESLintConfig,
  ESLintRules,
  OverrideConfig,
  ParserOptions,
  RuleLevel,
  RuleValue,
  Settings,
} from '../../types/eslint'
import type { Patterns } from '../context/paths'
import type { Scope } from './rulesConfig'
import { getProperty } from './rulesConfig'

interface Parameters {
  projectDependencies: string[]
  ignoredRules: string[]
  patterns: Patterns
  semi: boolean
}

interface Result {
  config: ESLintConfig
  dependencies: string[]
}
export const getConfig = (parameters: Parameters): Result => {
  const { projectDependencies, ignoredRules, patterns, semi } = parameters
  const rules = getRules({
    projectDependencies,
    ignoredRules,
    semi,
  })
  const plugins = getPlugins(projectDependencies)
  const parser = getParser(projectDependencies)
  const parserOptions = getParserOptions(projectDependencies)
  const environments = getEnvironments(projectDependencies)

  return {
    config: {
      root: true,
      env: maybeObject(environments.all),
      plugins: plugins.all.length > 0 ? plugins.all : undefined,
      parserOptions: maybeObject(parserOptions.all),
      parser: parser.all || undefined,
      settings: maybeObject(getSettings(projectDependencies)),
      rules: maybeObject(rules.all),
      overrides: getOverrides({ environments, patterns, plugins, rules, parser, parserOptions }),
    },
    dependencies: getDependencies(projectDependencies),
  }
}

type ByScope<T> = Record<Scope, T>

// eslint-disable-next-line @typescript-eslint/ban-types
const maybeObject = <T extends {}>(object: T): T | undefined =>
  Object.keys(object).length === 0 ? undefined : object

const getPlugins = (projectDependencies: string[]): ByScope<string[]> => {
  const plugins: ByScope<string[]> = { all: [], js: [], ts: [], testJest: [], yaml: [] }
  plugins.all.push('simple-import-sort', 'unicorn', 'sonarjs', 'promise', 'array-func', 'import')
  plugins.yaml.push('yml')

  if (projectDependencies.includes('react')) {
    plugins.all.push('react-hooks', 'react', 'jsx-a11y')
  }
  if (projectDependencies.includes('typescript')) {
    plugins.ts.push('@typescript-eslint')
  }
  if (projectDependencies.includes('jest')) {
    plugins.testJest.push('jest')
  }
  return plugins
}

interface BuildValueParameters {
  options?: JsonValue
  level: RuleLevel
}
const buildValue = ({ options, level }: BuildValueParameters): RuleValue => {
  if (options === null || options === undefined || options === '') {
    return level
  }
  if (Array.isArray(options)) {
    return [level, ...options]
  }
  return [level, options]
}

interface GetRulesParameters {
  projectDependencies: string[]
  ignoredRules: string[]
  semi: boolean
}
const getRules = ({
  projectDependencies,
  ignoredRules,
  semi,
}: GetRulesParameters): ByScope<ESLintRules> => {
  const input = { projectDependencies, semi }
  const result: ByScope<ESLintRules> = { all: {}, js: {}, ts: {}, testJest: {}, yaml: {} }
  Object.keys(ruleset)
    .sort((previous, next) => previous.localeCompare(next))
    .forEach(rulename => {
      if (ignoredRules.includes(rulename)) {
        return
      }
      const rule = ruleset[rulename]
      const enabled = getProperty(rule.enabled, input)
      const options = getProperty(rule.options, input)
      const scope = rule.scope || 'all'
      const level = 'error'

      if (!enabled) {
        return false
      }

      result[scope][rulename] = buildValue({ options, level })
    })
  return result
}

const getSettings = (projectDependencies: string[]) => {
  const settings: Settings = {}
  settings['import/extensions'] = ['.json', '.js', '.jsx']

  if (projectDependencies.includes('typescript')) {
    settings['import/extensions'].push('.ts', '.tsx')
    settings['import/external-module-folders'] = ['node_modules', 'node_modules/@types']
    settings['import/parsers'] = {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    }
    settings['import/resolver'] = {
      node: {
        extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
      },
    }
  }
  if (projectDependencies.includes('react')) {
    settings.react = { version: 'detect' }
  }
  return settings
}

const getParserOptions = (projectDependencies: string[]): ByScope<ParserOptions> => {
  const parserOptions: ByScope<ParserOptions> = { all: {}, js: {}, ts: {}, testJest: {}, yaml: {} }
  parserOptions.all.sourceType = 'module'
  parserOptions.all.ecmaVersion = 2021

  if (projectDependencies.includes('babel')) {
    parserOptions.all.allowImportExportEverywhere = true
  }

  if (projectDependencies.includes('typescript')) {
    // parserOptions.ts.project = '/Users/nikolai.katkov/git/dazn/goat-design-system/tsconfig.json'
    parserOptions.ts.project = 'tsconfig.json'
  }
  if (projectDependencies.includes('react')) {
    parserOptions.all.ecmaFeatures = { jsx: true }
  }

  return parserOptions
}

const getParser = (projectDependencies: string[]): ByScope<string> => {
  const parser: ByScope<string> = {
    all: '',
    js: '',
    ts: '',
    testJest: '',
    yaml: 'yaml-eslint-parser',
  }
  if (projectDependencies.includes('babel')) {
    parser.all = '@babel/eslint-parser'
  }
  if (projectDependencies.includes('typescript')) {
    parser.ts = '@typescript-eslint/parser'
  }
  return parser
}

const getEnvironments = (projectDependencies: string[]): ByScope<Record<string, true>> => {
  const environments: ByScope<Record<string, true>> = {
    all: {},
    js: {},
    ts: {},
    testJest: {},
    yaml: {},
  }
  environments.all.es2021 = true
  environments.all.node = true
  environments.all.browser = true

  if (projectDependencies.includes('jest')) {
    environments.testJest['jest/globals'] = true
  }
  return environments
}

const getDependencies = (projectDependencies: string[]): string[] => {
  const dependencies: string[] = []
  dependencies.push(
    'eslint',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-simple-import-sort',
    'eslint-plugin-unicorn',
    'eslint-plugin-sonarjs',
    'eslint-plugin-promise',
    'eslint-plugin-yml',
    'eslint-plugin-array-func',
    'eslint-plugin-import'
  )

  if (projectDependencies.includes('babel')) {
    dependencies.push('@babel/core', '@babel/eslint-parser')
  }
  if (projectDependencies.includes('typescript')) {
    dependencies.push(
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      'eslint-import-resolver-typescript'
    )
  }
  if (projectDependencies.includes('react')) {
    dependencies.push('eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-jsx-a11y')
  }
  if (projectDependencies.includes('jest')) {
    dependencies.push('eslint-plugin-jest')
  }
  return dependencies
}

const getOverrides = (parameters: {
  environments: ByScope<Record<string, true>>
  patterns: Patterns
  plugins: ByScope<string[]>
  rules: ByScope<ESLintRules>
  parser: ByScope<string>
  parserOptions: ByScope<ParserOptions>
}) => {
  const { environments, patterns, plugins, rules, parser, parserOptions } = parameters

  const overrides: OverrideConfig[] = []

  const config: Array<[Scope, keyof Patterns]> = [
    ['js', 'eslintJS'],
    ['ts', 'eslintTS'],
    ['testJest', 'jestFiles'],
    ['yaml', 'yaml'],
  ]

  config.forEach(([scope, pattern]) => {
    if (
      plugins[scope].length > 0 ||
      maybeObject(rules[scope]) ||
      parser[scope] ||
      maybeObject(parserOptions[scope])
    ) {
      const files = patterns[pattern]
      overrides.push({
        files: typeof files === 'string' ? [files] : files,
        env: maybeObject(environments[scope]),
        parser: parser[scope] || undefined,
        plugins: plugins[scope].length > 0 ? plugins[scope] : undefined,
        parserOptions: maybeObject(parserOptions[scope]),
        rules: maybeObject(rules[scope]),
      })
    }
  })

  return overrides.length > 0 ? overrides : undefined
}
