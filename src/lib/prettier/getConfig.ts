import type { JsonObject } from 'type-fest'

interface Parameters {
  semi: boolean
}
export const getConfig = ({ semi }: Parameters): JsonObject => ({
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi,
  singleQuote: true,
  quoteProps: 'consistent',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
})
