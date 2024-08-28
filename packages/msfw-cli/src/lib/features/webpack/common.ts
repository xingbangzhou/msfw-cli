import type {Configuration} from 'webpack'
import {getMsfwContext} from '../../context'
import {resolveProject} from '../../paths'
import WebpackConfig from './webpack-config'

export class WpCommon {
  setup(webpackConfig: WebpackConfig) {
    const {target, cache, entry, output, resolve, experiments, stats} = this

    webpackConfig.merge({
      target,
      cache,
      entry,
      output,
      resolve,
      experiments,
      stats,
    })
  }

  protected get target(): Configuration['target'] {
    return ['web', 'es5']
  }

  protected get cache(): Configuration['cache'] {
    const ctx = getMsfwContext()

    const buildDependenciesConfigs = [__filename]

    const configPath = ctx.configPath
    if (configPath) {
      buildDependenciesConfigs.push(configPath)
    }

    const name = `${ctx.isDev ? 'development' : ''}-${ctx.appPackageJson.version}-${ctx.options?.env}`

    return {
      name: name,
      type: 'filesystem',
      cacheDirectory: ctx.cacheDirPath,
      buildDependencies: {
        config: buildDependenciesConfigs,
      },
    }
  }

  protected get entry(): Configuration['entry'] {
    return {
      index: getMsfwContext().defaultIndexPath,
    }
  }

  protected get output(): Configuration['output'] {
    const ctx = getMsfwContext()

    const environment = {
      arrowFunction: false,
      bigIntLiteral: false,
      const: false,
      destructuring: false,
      forOf: false,
      dynamicImport: false,
      module: false,
    }

    const assetsDir = ctx.assetsDir

    return {
      clean: true,
      path: ctx.defaultDistPath,
      publicPath: 'auto',
      filename: `${assetsDir}/js/[name].[contenthash:8].js`,
      assetModuleFilename: `${assetsDir}/[name].[contenthash:8][ext][query]`,
      environment,
    }
  }

  protected get resolve(): Configuration['resolve'] {
    const srcPath = resolveProject('src')
    return {
      modules: ['node_modules', resolveProject('node_modules'), srcPath],
      alias: {
        src: srcPath,
      },
      extensions: [
        '.js',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.css',
        '.less',
        '.scss',
        '.sass',
        '.json',
        '.wasm',
        '.vue',
        '.svg',
        '.svga',
      ],
    }
  }

  protected get experiments(): Configuration['experiments'] {
    return {
      topLevelAwait: true,
      backCompat: true,
      asyncWebAssembly: true,
      syncWebAssembly: true,
    }
  }

  protected get stats(): Configuration['stats'] {
    return {
      preset: 'errors-warnings',
    }
  }
}
