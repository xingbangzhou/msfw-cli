import {MsfwBigName, MsfwVersion} from './lib/constants'
import type {Options} from './types'

const msfw = async (cmd: string, options: Options) => {
  console.log(`${MsfwBigName} v${MsfwVersion} begin with command: ${cmd}\n`)

  // 执行脚本
  switch (cmd) {
    case 'dev':
      {
        const {default: dev} = await import('./scripts/dev')
        dev(options)
      }
      break
    case 'build':
      {
        const {default: build} = await import('./scripts/build')
        build(options)
      }
      break
    case 'serve':
      {
        const {default: serve} = await import('./scripts/serve')
        serve(options)
      }
      break
    default:
      break
  }
}

export default msfw
