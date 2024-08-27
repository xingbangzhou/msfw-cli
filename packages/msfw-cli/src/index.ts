import {loadConfig} from './lib/config'
import {MsfwContext, MsfwOptions} from './types'

const msfw = async (cmd: string, options: MsfwOptions) => {
  const context: MsfwContext = {
    options,
  }

  loadConfig(context)
}

export default msfw
