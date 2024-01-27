import { getPatterns } from './paths'
import type { Settings } from './settings'

test('should return values from settings', () => {
  const settings: Settings = {
    jestFiles: 'foo',
    semi: true,
    debug: false,
    ignoredRules: ['fizz', 'buzz'],
    relaxedRules: ['fizz1', 'buzz1'],
  }
  expect(getPatterns(settings)).toHaveProperty('jestFiles', 'foo')
})
