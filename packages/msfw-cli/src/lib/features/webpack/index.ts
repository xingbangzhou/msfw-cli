import WpAssetModules from './asset-modules'
import {WpCommon} from './common'
import WpStyle from './style'
import WebpackConfig from './webpack-config'

export function loadWebpackConfig() {
  const webpackConfig = new WebpackConfig()

  new WpCommon().setup(webpackConfig)
  new WpStyle().setup(webpackConfig)
  new WpAssetModules().setup(webpackConfig)
}
