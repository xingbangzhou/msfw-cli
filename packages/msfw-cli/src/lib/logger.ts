import chalk from 'chalk'
import {MsfwBigName, MsfwVersion} from './constants'

export function log(...params: any[]) {
  console.log(...params)
}

export function logError(...params: any[]) {
  console.error(...params)
}

export function logTitle(title: string) {
  console.log(
    `${chalk.cyan.bgHex('#FFA500').bold(` ${MsfwBigName} v${MsfwVersion} `)} ${chalk.bgHex('#0969da')(` ${title} `)} \n`,
  )
}
