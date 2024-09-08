import type {MsfwConfig, MsfwContext} from '@msfw/cli/dist/types'

export default (context: MsfwContext): MsfwConfig => {
  return {
    devServer: {
      port: 3001,
    },
  }
}
