import {webpack} from 'webpack'
import {loadMsfwConfig} from '../lib/config'
import {createMsfwContext} from '../lib/context'
import {overrideWebpackProd} from '../lib/features/webpack'
import {overrideViteProd} from '../lib/features/vite'
import {Options} from '../types'
import {build as viteBuild} from 'vite'

export default function build(options: Options) {
  const msfwContext = createMsfwContext(options, 'production')
  const msfwConfig = loadMsfwConfig(msfwContext)

  const builder = msfwConfig.builder || 'webpack'

  if (builder === 'vite') {
    runViteBuild(msfwContext, msfwConfig)
  } else {
    runWebpackBuild(msfwContext, msfwConfig)
  }
}

function runWebpackBuild(msfwContext: ReturnType<typeof createMsfwContext>, msfwConfig: ReturnType<typeof loadMsfwConfig>) {
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

async function runViteBuild(msfwContext: ReturnType<typeof createMsfwContext>, msfwConfig: ReturnType<typeof loadMsfwConfig>) {
  const viteConfig = overrideViteProd(msfwContext, msfwConfig)
  await viteBuild(viteConfig)
}
