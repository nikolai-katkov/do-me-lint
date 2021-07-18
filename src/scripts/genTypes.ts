import csvParse from 'csv-parse/lib/sync'
import fs from 'fs'
import fetch from 'node-fetch'
import outdent from 'outdent'
import path from 'path'

import { getSettings } from '../lib/context/settings'
import log from '../util/log'

interface KnownColumn {
  spreadsheetColumn: string
  typeAlias: string
  typeValue: string
}

const updateSpreadsheetTypes = async () => {
  log.info('Generating spreadsheet types')

  const knownColumns: KnownColumn[] = []
  const projectDirectory = process.env.INIT_CWD ?? process.cwd()
  const spreadsheet = getSettings(projectDirectory).spreadsheetCsv
  const csv = await fetch(spreadsheet).then(async result => result.text())
  const spreadsheetRules = csvParse(csv, { columns: true }) as Array<Record<string, string>>
  const columns = Object.keys(spreadsheetRules[0])

  for (const column of columns) {
    const allValues = spreadsheetRules.map(rule => rule[column])
    const uniqueValues = new Set(Array.from(allValues))
    if (uniqueValues.size < 10) {
      knownColumns.push({
        spreadsheetColumn: column,
        typeAlias: column.charAt(0).toUpperCase() + column.slice(1),
        typeValue:
          uniqueValues.has('TRUE') && uniqueValues.has('FALSE') && uniqueValues.size === 2
            ? 'boolean'
            : Array.from(uniqueValues, value => `'${value}'`)
                .sort((a, b) => a.localeCompare(b))
                .join(' | '),
      })
    }
  }
  const stringContent = outdent`
    // prettier-ignore

    ${knownColumns
      .map(column => `export type ${column.typeAlias} = ${column.typeValue}`)
      .join('\n')}

    export interface SpreadsheetRule {
      ${columns
        .map(column => {
          const property = /^\w+$/u.test(column) ? column : `'${column}'`
          const value =
            knownColumns.find(knownColumn => knownColumn.spreadsheetColumn === column)?.typeAlias ??
            'string'

          return `${property}: ${value}`
        })
        .join('\n  ')}
    }

  `

  fs.writeFileSync(path.resolve(__dirname, '../types/spreadsheet.d.ts'), stringContent)
}

const runDirectly = require.main?.filename === __filename

if (runDirectly) {
  updateSpreadsheetTypes()
}

export { updateSpreadsheetTypes }
