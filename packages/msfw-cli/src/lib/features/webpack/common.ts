import type {Configuration} from 'webpack'
import {resolveProject} from '../../paths'
import {WebpackChain} from './webpack-config'

export class WpCommon {
  setup(webpackChain: WebpackChain) {
    const ctx = webpackChain.context
    const options = ctx.options
    const isDev = ctx.isDev
    // target
    const target: Configuration['target'] = ['web', 'es5']
    // cache
    const buildDependenciesConfigs = [__filename]
    const configPath = ctx.configPath
    if (configPath) {
      buildDependenciesConfigs.push(configPath)
    }
    const name = `${isDev ? 'development' : ''}-${ctx.appPackageJson.version}-${options?.env}`
    const cache: Configuration['cache'] = {
      name: name,
      type: 'filesystem',
      cacheDirectory: ctx.cacheDirPath,
      buildDependencies: {
        config: buildDependenciesConfigs,
      },
    }
    // entry
    const entry: Configuration['entry'] = {
      index: ctx.appIndexPath,
    }
    // output
    const assetsDir = ctx.assetsDir
    const output: Configuration['output'] = {
      clean: true,
      path: ctx.appDistPath,
      publicPath: 'auto',
      filename: `${assetsDir}/js/[name].[contenthash:8].js`,
      assetModuleFilename: `${assetsDir}/[name].[contenthash:8][ext][query]`,
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
    const srcPath = ctx.appSrcPath
    const resolve: Configuration['resolve'] = {
      modules: ['node_modules', resolveProject('node_modules'), srcPath],
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
