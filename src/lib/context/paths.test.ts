import { getPatterns } from './paths'
import type { Settings } from './settings'

test('should return values from settings', () => {
  const settings: Settings = {
    jestFiles: 'foo',
    spreadsheet: 'bar',
    spreadsheetCsv: 'baz',
    semi: true,
    ignoredRules: ['fizz', 'buzz'],
  }
  expect(getPatterns(settings)).toHaveProperty('jestFiles', 'foo')
})
