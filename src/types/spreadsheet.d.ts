export type Scope = 'all' | 'js' | 'testJest' | 'ts' | 'yaml'

export interface SpreadsheetRule {
  enabled: boolean
  rule: string
  options: string
  requiresDeps: string
  scope: Scope
}
