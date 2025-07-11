import type {Configuration as WebpackConfig} from 'webpack'
import merge from 'webpack-merge'
import type {Configure, MsfwConfig, MsfwContext, WebpackAlias} from '../../../types'
import {log} from '../../logger'
import {isFunction} from '../../utils'

function addAlias(webpackConfig: WebpackConfig, webpackAlias: WebpackAlias) {
  if (webpackConfig.resolve) {
    // TODO: ensure is a plain object, if not, log an error.
    webpackConfig.resolve.alias = Object.assign(webpackConfig.resolve.alias || {}, webpackAlias)
  }

  log('Added webpack alias.')
}

function giveTotalControl(
  webpackConfig: WebpackConfig,
  configureWebpack: Configure<WebpackConfig, MsfwContext>,
  context: MsfwContext,
) {
  if (isFunction(configureWebpack)) {
    webpackConfig = configureWebpack(webpackConfig, context)

    if (!webpackConfig) {
      throw new Error("msfw-cli: 'webpack.configure' function didn't returned a webpack config object.")
    }
  } else {
    webpackConfig = merge(webpackConfig, configureWebpack)
  }

  log("Merged webpack config with 'webpack.configure'.")

  return webpackConfig
}

export function mergeWebpackConfig(msfwConfig: MsfwConfig, webpackConfig: WebpackConfig, context: MsfwContext) {
  let resultingWebpackConfig = webpackConfig

  if (msfwConfig.webpack) {
    const {alias, configure} = msfwConfig.webpack

    if (alias) {
      addAlias(resultingWebpackConfig, alias)
    }

    if (configure) {
      resultingWebpackConfig = giveTotalControl(resultingWebpackConfig, configure, context)
    }
  }

  return resultingWebpackConfig
}
