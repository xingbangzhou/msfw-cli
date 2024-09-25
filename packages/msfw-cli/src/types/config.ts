import type {Configuration as DevServerConfig} from 'webpack-dev-server'
import type {Configuration as WebpackConfig} from 'webpack'
import type {MsfwContext} from './context'

export type Configure<Config, Context> = Config | ((config: Config, context: Context) => Config)

export type WebpackAlias = {[alias: string]: string}

export interface MsfwWebpackConfig {
  alias?: WebpackAlias
  configure?: Configure<Omit<WebpackConfig, 'alias' | 'devServer'>, MsfwContext>
}

export type MsfwDevServerConfig = DevServerConfig

export interface MsfwConfig {
  webpack?: MsfwWebpackConfig
  devServer?: MsfwDevServerConfig
}
