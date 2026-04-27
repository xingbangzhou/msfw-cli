import type {Configuration} from 'webpack'
import {resolveApp} from '../../paths'
import WebpackChain from './webpack-chain'
import {MsfwConfig} from '../../../types'
import {getCdnDomain, parseCdnConfig} from '../../utils/cdn'

export class WpCommon {
  private msfwConfig: MsfwConfig

  constructor(msfwConfig: MsfwConfig) {
    this.msfwConfig = msfwConfig
  }

  setup(webpackChain: WebpackChain) {
    const ctx = webpackChain.context
    const options = ctx.options
    const isDev = ctx.isDev
    // target
    const target: Configuration['target'] = ['web', 'es5']
    // cache
    const buildDependenciesConfigs = [__filename]
    const configPath = ctx.appConfig
    if (configPath) {
      buildDependenciesConfigs.push(configPath)
    }
    const name = `${isDev ? 'development' : ''}-${ctx.appPackageObj?.version}-${options?.env}`
    const cache: Configuration['cache'] = {
      name: name,
      type: 'filesystem',
      cacheDirectory: ctx.appCache,
      buildDependencies: {
        config: buildDependenciesConfigs,
      },
    }
    // entry
    const entry: Configuration['entry'] = {
      index: ctx.appIndexJs,
    }
    // output - CDN 配置
    const assetsDir = 'assets'
    const {cdn} = this.msfwConfig
    const {domains, strategy} = parseCdnConfig(cdn)
    const cdnDomain = getCdnDomain(domains, strategy)

    // 使用 assetModuleFilename 函数动态注入 CDN
    const assetModuleFilename = cdnDomain
      ? (pathData: any) => {
          const filename = `${assetsDir}/[name].[contenthash:8][ext][query]`
          return cdnDomain + '/' + filename
        }
      : `${assetsDir}/[name].[contenthash:8][ext][query]`

    const output: Configuration['output'] = {
      clean: true,
      path: ctx.appBuild,
      publicPath: cdnDomain || 'auto',
      filename: cdnDomain
        ? `${assetsDir}/js/[name].[contenthash:8].js`
        : `${assetsDir}/js/[name].[contenthash:8].js`,
      assetModuleFilename,
      environment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        forOf: false,
        dynamicImport: false,
        module: false,
      },
    }
    // resolve
    const srcPath = ctx.appSrc
    const resolve: Configuration['resolve'] = {
      modules: ['node_modules', resolveApp('node_modules'), srcPath],
      alias: {
        src: srcPath,
      },
      extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.css', '.scss', '.sass', '.json', '.wasm', '.vue', '.svg'],
    }
    // experiments
    const experiments: Configuration['experiments'] = {
      topLevelAwait: true,
      backCompat: true,
      asyncWebAssembly: true,
      syncWebAssembly: true,
    }
    // stats
    const stats: Configuration['stats'] = {
      preset: 'errors-warnings',
    }

    webpackChain.merge({
      target,
      cache,
      entry,
      output,
      resolve,
      experiments,
      stats,
    })
  }
}
