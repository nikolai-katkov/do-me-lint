import type { JsonValue } from 'type-fest'

import type {
  ESLintConfig,
  ESLintRules,
  OverrideConfig,
  ParserOptions,
  RuleLevel,
  RuleValue,
  Settings,
} from '../../types/eslint'
import type { Scope, SpreadsheetRule } from '../../types/spreadsheet'
import log from '../../util/log'
import type { Patterns } from '../context/paths'

interface Parameters {
  projectDependencies: string[]
  spreadsheetRules: SpreadsheetRule[]
  ignoredRules: string[]
  patterns: Patterns
  semi: boolean
}

interface Result {
  config: ESLintConfig
  dependencies: string[]
}
const getConfig = (parameters: Parameters): Result => {
  const { projectDependencies, spreadsheetRules, ignoredRules, patterns, semi } = parameters
  const rules = getRules({
    spreadsheetRules,
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

const parseOptions = (ruleName: string, rawOptions: string): JsonValue | undefined => {
  try {
    return rawOptions === '' ? undefined : (JSON.parse(rawOptions) as JsonValue)
  } catch (error: unknown) {
    if (error instanceof Error) {
      log.warn(`Can't parse options for ${ruleName}: ${error.message}`)
    }
  }
}

interface ModifyCertainRulesParameters {
  ruleName: string
  options?: JsonValue
  enabled: boolean
  level: RuleLevel
  semi: boolean
}
interface ModifyCertainRulesResult {
  options?: JsonValue
  level: RuleLevel
  enabled: boolean
}
// eslint-disable-next-line complexity
const modifyCertainRules = ({
  ruleName,
  options,
  enabled,
  semi,
  level,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
ModifyCertainRulesParameters): ModifyCertainRulesResult => {
  if (ruleName === 'semi') {
    return {
      enabled: true,
      options: semi ? 'always' : 'never',
      level,
    }
  }

  if (ruleName === '@typescript-eslint/member-delimiter-style') {
    if (typeof options === 'object' && !Array.isArray(options) && options !== null) {
      options.multiline =
        typeof options.multiline === 'object'
          ? { ...options.multiline, delimiter: semi ? 'semi' : 'none' }
          : { delimiter: semi ? 'semi' : 'none' }
    } else {
      // eslint-disable-next-line no-param-reassign
      options = {
        multiline: { delimiter: semi ? 'semi' : 'none' },
        singleline: { delimiter: 'comma' },
      }
    }
    return {
      enabled: true,
      options,
      level,
    }
  }

  return {
    options,
    level,
    enabled,
  }
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
  spreadsheetRules: SpreadsheetRule[]
  projectDependencies: string[]
  ignoredRules: string[]
  semi: boolean
}
const getRules = ({
  spreadsheetRules,
  projectDependencies,
  ignoredRules,
  semi,
}: GetRulesParameters): ByScope<ESLintRules> => {
  const result: ByScope<ESLintRules> = { all: {}, js: {}, ts: {}, testJest: {}, yaml: {} }

  spreadsheetRules
    .sort((previous, next) => previous.rule.localeCompare(next.rule))
    .forEach(ruleRow => {
      try {
        if (ignoredRules.includes(ruleRow.rule)) {
          return
        }

        const requiredDependencies = ruleRow.requiresDeps.split(',').filter(Boolean)
        for (const requiredDenendency of requiredDependencies) {
          if (!projectDependencies.includes(requiredDenendency)) {
            return
          }
        }

        const spreadSheetOptions = parseOptions(ruleRow.rule, ruleRow.options)
        const { options, level, enabled } = modifyCertainRules({
          ruleName: ruleRow.rule,
          semi,
          enabled: ruleRow.enabled === 'TRUE',
          options: spreadSheetOptions,
          level: 'error',
        })
        if (!enabled) {
          return
        }

        result[ruleRow.scope][ruleRow.rule] = buildValue({ options, level })
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
