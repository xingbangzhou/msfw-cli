import type {Configuration} from 'webpack'
import type {MsfwContext} from './context'
import type {Configuration as DevServerConfig} from 'webpack-dev-server'

export type Configure<Config, Context> = Config | ((config: Config, context: Context) => Config)

export type WebpackAlias = {[alias: string]: string}

export interface MsfwWebpackConfig {
  alias?: WebpackAlias
  configure?: Configure<Configuration, MsfwContext>
}

export type MsfwDevServerConfig = DevServerConfig

export interface MsfwConfig {
  webpack?: MsfwWebpackConfig
  devServer?: MsfwDevServerConfig
}
