import {Configuration} from 'webpack'
import WebpackConfig from './webpack-config'

export default class WpAssetModules {
  setup(webpackConfig: WebpackConfig) {
    const config: Configuration = {
      module: {
        rules: [
          // svg
          {
            test: /\.svg$/,
            use: [
              {
                loader: require.resolve('@svgr/webpack'),
                options: {
                  babel: false,
                },
              },
              {
                loader: 'url-loader', // 解决 ReactComponent 无法获取问题
                options: {
                  esModule: false,
                },
              },
            ],
          },
          // image
          {
            test: /\.(a?png|jpe?g|gif|webp|ico|bmp|avif)$/i,
            type: 'asset/resource',
          },
          // fonts
          {
            test: /\.(|otf|ttf|eot|woff|woff2)$/i,
            type: 'asset/resource',
          },
          // inline
          {
            resourceQuery: /inline/,
            type: 'asset/inline',
          },
        ],
      },
    }

    webpackConfig.merge(config)
  }
}
