import {webpack} from 'webpack'
import {loadMsfwConfig} from '../lib/config'
import {createMsfwContext} from '../lib/context'
import {overrideWebpackDev} from '../lib/features/webpack'
import {overrideViteDev} from '../lib/features/vite'
import type {Options} from '../types'
import WebpackDevServer from 'webpack-dev-server'
import {createServer} from 'vite'

export default function dev(options: Options) {
  const msfwContext = createMsfwContext(options, 'development')
  const msfwConfig = loadMsfwConfig(msfwContext)

  const builder = msfwConfig.builder || 'webpack'

  if (builder === 'vite') {
    runViteDev(msfwContext, msfwConfig)
  } else {
    runWebpackDev(msfwContext, msfwConfig)
  }
}

function runWebpackDev(msfwContext: ReturnType<typeof createMsfwContext>, msfwConfig: ReturnType<typeof loadMsfwConfig>) {
  const webpackConfig = overrideWebpackDev(msfwContext, msfwConfig)

  const compiler = webpack(webpackConfig, (err, status) => {
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

  const server = new WebpackDevServer(webpackConfig.devServer, compiler)
  server.start()
}

async function runViteDev(msfwContext: ReturnType<typeof createMsfwContext>, msfwConfig: ReturnType<typeof loadMsfwConfig>) {
  const viteConfig = overrideViteDev(msfwContext, msfwConfig)
  const server = await createServer(viteConfig)
  await server.listen()
  server.printUrls()
}
