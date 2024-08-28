import type {Configuration} from 'webpack'
import merge from 'webpack-merge'

export default class WebpackConfig {
  constructor() {}

  config: Configuration = {}

  merge(cfg: Configuration) {
    this.config = merge(this.config, cfg)
  }
}
