import {webpack} from 'webpack'
import {loadMsfwConfig} from '../lib/config'
import {createMsfwContext} from '../lib/context'
import {overrideWebpackProd} from '../lib/features/webpack'
import {Options} from '../types'

export default function build(options: Options) {
  const msfwContext = createMsfwContext(options, 'production')
  const msfwConfig = loadMsfwConfig(msfwContext)

  const webpackConfig = overrideWebpackProd(msfwContext, msfwConfig)

  webpack(webpackConfig, (err, status) => {
    if (err) {
      console.error(err.stack || err)
      return
    }
    if (status?.hasWarnings()) {
      console.log(
        status.toString({
          all: false,
          colors: true,
          warnings: true,
        }),
      )
    }
    if (status?.hasErrors()) {
      console.log(
        status.toString({
          all: false,
          colors: true,
          errors: true,
        }),
      )
      process.exit(1)
    }
    console.log(
      status?.toString({
        all: false,
        colors: true,
        assets: true,
      }),
    )
  })
}
