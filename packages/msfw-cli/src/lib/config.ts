import {cosmiconfigSync} from 'cosmiconfig'
import {TypeScriptLoader} from 'cosmiconfig-typescript-loader'
import {MsfwContext} from '../types'
import {isFunction, isString} from './utils'
import path from 'path'
import {projectRoot} from './paths'
import {log} from './logger'

const moduleName = 'msfw'
const explorer = cosmiconfigSync(moduleName, {
  searchPlaces: [`${moduleName}.config.ts`, `${moduleName}.config.js`, `${moduleName}.config.cjs`],
  loaders: {
    '.ts': TypeScriptLoader(),
  },
})

function getConfigPath(context: MsfwContext) {
  const config = context.options.config
  if (config && isString(config)) {
    return path.resolve(projectRoot, config)
  } else {
    const packageJsonPath = path.join(projectRoot, 'package.json')
    const packageJson = require(packageJsonPath)

    const pkMsfwConfig = packageJson.msfwConfig
    if (pkMsfwConfig && isString(pkMsfwConfig)) {
      return path.resolve(projectRoot, pkMsfwConfig)
    } else {
      const result = explorer.search(projectRoot)

      if (result === null) {
        throw new Error(
          `${moduleName}: Config file not found. check if file exists at root (${moduleName}.config.ts, ${moduleName}.config.js)`,
        )
      }

      return result.filepath
    }
  }
}

function getConfigAsObject(context: MsfwContext) {
  const configFilePath = getConfigPath(context)
  log('Config file path resolved to: ', configFilePath)
  const result = explorer.load(configFilePath)

  const configAsObject = isFunction(result?.config) ? result.config(context) : result?.config

  if (!configAsObject) {
    throw new Error("msfw: Config function didn't return a config object.")
  }
  return configAsObject
}

export function loadConfig(context: MsfwContext) {
  const configAsObject = getConfigAsObject(context)
}
