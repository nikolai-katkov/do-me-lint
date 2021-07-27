import fs from 'fs'
import { outdent } from 'outdent'
import path from 'path'

import type { ESLintConfig } from '../../types/eslint'
import { makeYAML } from '../../util/file'

interface Parameters {
  config: ESLintConfig
  projectDirectory: string
  spreadsheet: string
}
const saveConfig = ({ config, projectDirectory, spreadsheet }: Parameters): void => {
  const disclaimer = outdent`
    # this file was auto-generated with do-me-lint
    # and this spreadsheet: ${spreadsheet}
    # 
    # You can modify it to your needs
    
    # eslint-disable yml/key-name-casing
    

  `
  fs.writeFileSync(path.join(projectDirectory, '.eslintrc.yml'), disclaimer + makeYAML(config))
}

export default saveConfig
