import chalk from 'chalk'
import {MSFWNAME, MSFWVERSION} from './constants'
import {toUpperCase} from './utils'

export function log(...params: any[]) {
  console.log(...params)
}

export function logError(...params: any[]) {
  console.error(...params)
}

export function logTitle(title: string) {
  console.log(
    `${chalk.cyan.bgHex('#FFA500').bold(` ${toUpperCase(MSFWNAME)} v${MSFWVERSION} `)} ${chalk.bgHex('#0969da')(` ${title} `)} \n`,
  )
}
