import type {Configuration as DevServerConfig} from 'webpack-dev-server'
import type {Configuration as WebpackConfig} from 'webpack'
import type {UserConfig as ViteConfig} from 'vite'
import type {MsfwContext} from './context'

export type BuilderType = 'webpack' | 'vite'
export type TranspilerType = 'babel' | 'swc'
export type CdnStrategy = 'first' | 'random' | 'roundrobin'

export interface MsfwCdnConfig {
  domains: string[]
  strategy?: CdnStrategy
}

export type CdnConfig = string[] | MsfwCdnConfig

export type Configure<Config, Context> = Config | ((config: Config, context: Context) => Config)

export type WebpackAlias = {[alias: string]: string}
export type ViteAlias = {[alias: string]: string}

export interface MsfwWebpackConfig {
  alias?: WebpackAlias
  configure?: Configure<Omit<WebpackConfig, 'alias' | 'devServer'>, MsfwContext>
}

export interface MsfwViteConfig {
  alias?: ViteAlias
  configure?: Configure<Omit<ViteConfig, 'plugins'>, MsfwContext>
}

export type MsfwDevServerConfig = DevServerConfig

export interface MsfwConfig {
  builder?: BuilderType
  transpiler?: TranspilerType
  cdn?: CdnConfig
  webpack?: MsfwWebpackConfig
  vite?: MsfwViteConfig
  devServer?: MsfwDevServerConfig
}
