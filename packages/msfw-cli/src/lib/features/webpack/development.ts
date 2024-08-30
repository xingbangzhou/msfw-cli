import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import type {Configuration} from 'webpack'
import {WebpackChain} from './webpack-config'
import {resolveProject} from '../../paths'

export default class WpDevelopment {
  setup(webpackChain: WebpackChain) {
    const devServer: DevServerConfiguration = {
      host: '0.0.0.0',
      allowedHosts: ['all'],
      historyApiFallback: true,
      // compress: true,
      static: [
        // 输出静态文件
        {
          directory: resolveProject('public'),
          publicPath: '/',
        },
      ],
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      client: {
        overlay: {
          errors: true,
          warnings: true,
        },
      },
    }

    const config: Configuration = {
      mode: 'development',
      devtool: 'inline-source-map',
      devServer,
      optimization: {
        chunkIds: 'deterministic',
      },
    }

    webpackChain.merge(config)
  }
}
