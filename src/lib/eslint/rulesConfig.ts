import type { JsonValue } from 'type-fest'

export type Scope = 'all' | 'js' | 'testJest' | 'ts' | 'yaml'

export interface RuleInput {
  projectDependencies: string[]
  semi: boolean
}

export interface Rule {
  enabled: boolean | ((parameters: RuleInput) => boolean)
  scope?: Scope
  fixable?: true
  options?: JsonValue | ((parameters: RuleInput) => JsonValue)
}

export const projectHas =
  (dependency: string) =>
  ({ projectDependencies }: RuleInput) =>
    projectDependencies.includes(dependency)

export const getProperty = <T, P>(
  property: T extends (input: RuleInput) => P ? (input: RuleInput) => P : T,
  input: RuleInput
): T extends (parameters: RuleInput) => P ? P : T =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  typeof property === 'function' ? property(input) : property
