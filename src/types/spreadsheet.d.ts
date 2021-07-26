export type Scope = 'all' | 'js' | 'testJest' | 'ts' | 'yaml'

export interface SpreadsheetRule {
  enabled: string
  rule: string
  options: string
  requiresDeps: string
  scope: Scope
}
