import type {Configuration as WebpackConfig} from 'webpack'
import {CustomizeRule, mergeWithRules} from 'webpack-merge'
import type {MsfwContext} from '../../../types'

export default class WebpackChain {
  constructor(context: MsfwContext) {
    this.context = context
  }

  readonly context: MsfwContext
  config: WebpackConfig = {}

  merge(cfg: WebpackConfig) {
    this.config = mergeWithRules({
      module: {
        rules: {
          test: CustomizeRule.Match,
          loaders: CustomizeRule.Append,
        },
      },
      plugins: CustomizeRule.Append,
    })(this.config, cfg)
  }
}
