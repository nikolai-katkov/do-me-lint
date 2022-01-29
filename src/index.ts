import { doMeESLint } from './controllers/doMeESLint'
import { doMePrettier } from './controllers/doMePrettier'
import { doMeVSCode } from './controllers/doMeVSCode'
import { getMeContext } from './controllers/getMeContext'
import * as log from './util/log'

const run = async () => {
  const context = getMeContext()
  await doMeESLint(context)
  await doMePrettier(context)
  doMeVSCode(context)
}

run().catch((error: Error) => {
  log.error(`\n${error.stack ?? error.message}`)
})
