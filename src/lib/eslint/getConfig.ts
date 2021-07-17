import type { JsonObject } from 'type-fest'

import type {
  ESLintConfig,
  ESLintRules,
  OverrideConfig,
  ParserOptions,
  RuleValue,
  Settings,
} from '../../types/eslint'
import type { Scope, SpreadsheetRule } from '../../types/spreadsheet'
import type { Patterns } from '../context/paths'

interface Parameters {
  projectDependencies: string[]
  spreadsheetRules: SpreadsheetRule[]
  ignoredRules: string[]
  patterns: Patterns
}

interface Result {
  config: ESLintConfig
  dependencies: string[]
}
const getConfig = (parameters: Parameters): Result => {
  const { projectDependencies, spreadsheetRules, ignoredRules, patterns } = parameters
  const rules = getRules({
    spreadsheetRules,
    projectDependencies,
    ignoredRules,
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
      settings: getSettings(projectDependencies),
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
  plugins.all.push('simple-import-sort', 'unicorn', 'sonarjs', 'promise', 'array-func')
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

interface GetRulesParameters {
  spreadsheetRules: SpreadsheetRule[]
  projectDependencies: string[]
  ignoredRules: string[]
}
const getRules = ({
  spreadsheetRules,
  projectDependencies,
  ignoredRules,
}: GetRulesParameters): ByScope<ESLintRules> => {
  const result: ByScope<ESLintRules> = { all: {}, js: {}, ts: {}, testJest: {}, yaml: {} }

  spreadsheetRules
    .sort((previous, next) => previous.rule.localeCompare(next.rule))
    .forEach(ruleRow => {
      try {
        if (/\bno\b/iu.test(ruleRow.preference)) {
          return
        }
        const requiredDependencies = ruleRow.requiresDeps.split(',').filter(Boolean)

        if (ignoredRules.includes(ruleRow.rule)) {
          return
        }

        for (const requiredDenendency of requiredDependencies) {
          if (!projectDependencies.includes(requiredDenendency)) {
            return
          }
        }
        let value: RuleValue = 'error'
        if (ruleRow.options) {
          const parsedOptions = JSON.parse(ruleRow.options) as JsonObject | []
          value = Array.isArray(parsedOptions)
            ? ['error', ...parsedOptions]
            : ['error', parsedOptions]
        } else {
          value = 'error'
        }

        result[ruleRow.scope][ruleRow.rule] = value
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(`Couldn't add ${ruleRow.rule}: ${String(error.message)}`)
        }
      }
    })

  return result
}

const getSettings = (projectDependencies: string[]) => {
  let settings: Settings | undefined
  if (projectDependencies.includes('react')) {
    settings = { react: { version: 'detect' } }
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
    parserOptions.ts.project = 'tsconfig.json'
    if (projectDependencies.includes('react')) {
      parserOptions.ts.ecmaFeatures = { jsx: true }
    }
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

  if (projectDependencies.includes('react')) {
    environments.all.browser = true
  }
  if (projectDependencies.includes('jest')) {
    environments.testJest['jest/globals'] = true
  }
  if (projectDependencies.includes('react')) {
    environments.all.browser = true
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
    'eslint-plugin-array-func'
  )

  if (projectDependencies.includes('babel')) {
    // prettier-ignore
    dependencies.push(
      '@babel/core',
      '@babel/eslint-parser',
      )
  }
  if (projectDependencies.includes('typescript')) {
    // prettier-ignore
    dependencies.push(
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
      )
  }
  if (projectDependencies.includes('react')) {
    // prettier-ignore
    dependencies.push(
      'eslint-plugin-react', 
      'eslint-plugin-react-hooks',
      'eslint-plugin-jsx-a11y',
      )
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

export default getConfig
