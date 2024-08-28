import {Configuration, RuleSetUseItem} from 'webpack'
import WebpackConfig from './webpack-config'
import {getMsfwContext} from '../../context'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/

export default class WpStyle {
  protected localIdentName = ''
  protected isDev = false

  setup(webpackConfig: WebpackConfig) {
    const ctx = getMsfwContext()
    const isDev = (this.isDev = ctx.isDev)
    const assetsDir = ctx.assetsDir

    this.localIdentName = isDev ? '[path][name]-[local]-[hash:base64:5]' : '[local]-[hash:base64:5]'

    const config: Configuration = {
      module: {
        rules: [
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            use: [...this.getLoaders()],
          },
          {
            test: cssModuleRegex,
            use: [...this.getLoaders(true)],
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              ...this.getLoaders(false, [
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    implementation: require('sass'),
                    sourceMap: isDev,
                  },
                },
              ]),
            ],
          },
          {
            test: sassModuleRegex,
            use: [
              ...this.getLoaders(true, [
                {
                  loader: require.resolve('sass-loader'),
                  options: {
                    implementation: require('sass'),
                    sourceMap: isDev,
                  },
                },
              ]),
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

    webpackConfig.merge(config)
  }

  private getLoaders(modules = false, rules?: RuleSetUseItem[]) {
    const localIdentName = this.localIdentName

    return [
      {
        loader: this.isDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
        options: {},
      },
      {
        loader: require.resolve('css-loader'),
        options: {
          modules: modules ? {localIdentName} : modules,
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
      ...(rules || []),
    ]
  }
}
