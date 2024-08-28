import type {Configuration, WebpackPluginInstance} from 'webpack'
import type {MsfwContext} from './context'

export type Configure<Config, Context> = Config | ((config: Config, context: Context) => Config)

export type WebpackAlias = {[alias: string]: string}

export interface MsfwWebpackConfig {
  alias?: WebpackAlias
  configure?: Configure<Configuration, MsfwContext>
}

export interface MsfwConfig {
  webpack?: MsfwWebpackConfig
}
