import {webpack} from 'webpack'
import {loadMsfwConfig} from '../lib/config'
import {createMsfwContext} from '../lib/context'
import {overrideWebpackDev} from '../lib/features/webpack'
import type {Options} from '../types'
import WebpackDevServer from 'webpack-dev-server'

export default function dev(options: Options) {
  const msfwContext = createMsfwContext(options, 'development')
  const msfwConfig = loadMsfwConfig(msfwContext)

  const webpackConfig = overrideWebpackDev(msfwContext, msfwConfig)

  const compiler = webpack(webpackConfig)

  const server = new WebpackDevServer(webpackConfig.devServer, compiler)
  server.start()
}
