import {Configuration} from 'webpack'
import {WebpackChain} from './webpack-config'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import {resolveProject} from '../../paths'

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

export default class WpStyle {
  setup(webpackChain: WebpackChain) {
    const ctx = webpackChain.context
    const isDev = ctx.isDev
    const assetsDir = ctx.assetsDir

    const localIdentName = isDev ? '[path][name]-[local]-[hash:base64:5]' : '[local]-[hash:base64:5]'

    const loaders = this.getLoaders(isDev, localIdentName)
    const moduleLoaders = this.getLoaders(isDev, localIdentName, true)

    const config: Configuration = {
      module: {
        rules: [
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [...loaders],
          },
          {
            test: cssModuleRegex,
            use: [...moduleLoaders],
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              ...loaders,
              {
                loader: require.resolve('sass-loader'),
                options: {
                  implementation: require('sass'),
                  sourceMap: isDev,
                },
              },
            ],
          },
          {
            test: sassModuleRegex,
            use: [
              ...moduleLoaders,
              {
                loader: require.resolve('sass-loader'),
                options: {
                  implementation: require('sass'),
                  sourceMap: isDev,
                },
              },
            ],
          },
        ],
      },
    }

    if (!isDev) {
      config.optimization = {
        minimizer: [
          new CssMinimizerPlugin({
            parallel: true,
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: {removeAll: true},
                },
              ],
            },
          }),
        ],
      }

      config.plugins = [
        new MiniCssExtractPlugin({
          ignoreOrder: true,
          filename: `${assetsDir}/css/[name].[contenthash:8].css`,
          chunkFilename: `${assetsDir}/css/[name].[contenthash:8].chunk.css`,
        }),
      ]
    }

    webpackChain.merge(config)
  }

  private getLoaders(isDev: boolean, localIdentName: string, modules = false) {
    return [
      {
        loader: isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        options: {},
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: modules
            ? {
                // mode: 'local',
                // auto: true,
                // exportGlobals: true,
                localIdentName,
                // localIdentContext: resolveProject('src'),
                // localIdentHashSalt: 'my-custom-hash',
                // namedExport: false,
                // getJSON: ({
                //   resourcePath,
                //   imports,
                //   exports,
                //   replacements,
                // }: {
                //   resourcePath: string
                //   imports: object[]
                //   exports: object[]
                //   replacements: object[]
                // }) => {
                //   console.log('ffffffffffff')
                //   console.log({resourcePath, imports, exports, replacements})
                // },
              }
            : modules,
        },
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          postcssOptions: {
            hideNothingWarning: true,
          },
        },
      },
    ]
  }
}
