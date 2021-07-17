import csvParse from 'csv-parse/lib/sync'
import fetch from 'node-fetch'

import type { SpreadsheetRule } from '../../types/spreadsheet'
import log from '../../util/log'

const getSpreadsheetRules = async (spreadsheetCsv: string): Promise<SpreadsheetRule[]> => {
  const fetchResult = await fetch(spreadsheetCsv)

  if (!fetchResult.ok) {
    log.debug(await fetchResult.text())
    throw new Error(
      `"${fetchResult.status} ${fetchResult.statusText}" \nwhen trying to fetch ${spreadsheetCsv}`
    )
  }

  const spreadsheetRaw = await fetchResult.text()

  return csvParse(spreadsheetRaw, { columns: true }) as SpreadsheetRule[]
}

export default getSpreadsheetRules
