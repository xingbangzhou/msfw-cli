import {MsfwConfig, MsfwContext} from '../../../types'
import WpAssetModules from './asset-modules'
import WpBabel from '../transpiler/babel'
import {WpCommon} from './common'
import WpDevelopment from './development'
import {mergeWebpackConfig} from './merge-config'
import WpPlugins from './plugins'
import WpProduction from './production'
import WpStyle from './style'
import WebpackChain from './webpack-chain'
import SwcTranspiler from '../transpiler/swc'

function overrideWebpack(context: MsfwContext, msfwConfig: MsfwConfig) {
  const webpackChain = new WebpackChain(context)

  new WpCommon(msfwConfig).setup(webpackChain)
  new WpStyle().setup(webpackChain)
  new WpAssetModules().setup(webpackChain)

  if (msfwConfig.transpiler === 'swc') {
    new SwcTranspiler().setup(webpackChain)
  } else {
    new WpBabel().setup(webpackChain)
  }

  new WpPlugins().setup(webpackChain)

  return webpackChain
}

export function overrideWebpackDev(context: MsfwContext, msfwConfig: MsfwConfig) {
  const webpackChain = overrideWebpack(context, msfwConfig)

  new WpDevelopment().setup(webpackChain)

  if (msfwConfig.devServer) {
    webpackChain.merge({
      devServer: msfwConfig.devServer,
    })
  }

  const webpackConfig = webpackChain.config

  return mergeWebpackConfig(msfwConfig, webpackConfig, context)
}

export function overrideWebpackProd(context: MsfwContext, msfwConfig: MsfwConfig) {
  const webpackChain = overrideWebpack(context, msfwConfig)

  new WpProduction().setup(webpackChain)

  const webpackConfig = webpackChain.config

  return mergeWebpackConfig(msfwConfig, webpackConfig, context)
}
