import chalk from 'chalk'

const format = (message: unknown): unknown =>
  typeof message === 'object' ? JSON.stringify(message, null, '  ') : message

const error = (message: unknown): void => {
  console.log(chalk.red(format(message)))
}

const warn = (message: unknown): void => {
  console.warn(chalk.yellow(format(message)))
}

const info = (message: unknown, newLine = true): void => {
  if (newLine) {
    console.error(chalk.white(format(message)))
  } else {
    process.stdout.write(chalk.white(format(message)))
  }
}

const debug = (message: unknown, newLine = true): void => {
  if (newLine) {
    console.error(chalk.gray(`  ${String(format(message))}`))
  } else {
    process.stdout.write(chalk.gray(`  ${String(format(message))}`))
  }
}

const tickStart = (message: unknown): void => {
  process.stdout.write(chalk.blueBright(`${String(message)}...`))
}

const tick = (): void => {
  process.stdout.write(chalk.blueBright('.'))
}

const tickEnd = (): void => {
  console.log('')
}

export default {
  error,
  warn,
  info,
  debug,
  tickStart,
  tick,
  tickEnd,
}
