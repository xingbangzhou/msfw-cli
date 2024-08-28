import type {Options} from './types'
import {loadConfig} from './lib/config'
import {initMsfwContext} from './lib/context'
import {loadWebpackConfig} from './lib/features/webpack'

const msfw = async (cmd: string, options: Options) => {
  const mode = cmd === 'dev' ? 'development' : 'production'

  const context = initMsfwContext(mode, options)

  const msfwConfig = loadConfig(context)
  console.log('msfwconfig: ', msfwConfig)

  loadWebpackConfig()
}

export default msfw
