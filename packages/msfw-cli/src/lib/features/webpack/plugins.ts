import {Configuration, DefinePlugin} from 'webpack'
import WebpackConfig from './webpack-config'
import {getMsfwContext} from '../../context'
import Dotenv from 'dotenv-webpack'
import {resolveProject} from '../../paths'

export default class WpPlugins {
  setup(webpackConfig: WebpackConfig) {
    const ctx = getMsfwContext()
    const buildEnv = ctx.options.env
    const envVars = ctx.envVars
    const defineOptions: Record<string, string | boolean | number> = {...envVars}

    const config: Configuration = {
      plugins: [
        // dotenv
        new Dotenv({
          path: resolveProject(`.env${buildEnv ? '.' + buildEnv : ''}`),
          safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
          allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
          systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
          silent: true, // hide any errors
          defaults: false, // load '.env.defaults' as the default values if empty.
        }),
        // define
        new DefinePlugin(defineOptions),
        // html
      ],
    }
  }
}
