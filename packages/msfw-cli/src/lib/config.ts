import {cosmiconfigSync} from 'cosmiconfig'
import {TypeScriptLoader} from 'cosmiconfig-typescript-loader'
import {MsfwContext} from '../types'
import {isFunction, isString} from './utils'
import path from 'path'
import {projectRoot} from './paths'
import {log} from './logger'
import type {MsfwConfig} from '../types/config'
import {LowercaseName, UppercaseName} from './constants'

const explorer = cosmiconfigSync(LowercaseName, {
  searchPlaces: [`${LowercaseName}.config.ts`, `${LowercaseName}.config.js`, `${LowercaseName}.config.cjs`],
  loaders: {
    '.ts': TypeScriptLoader(),
  },
})

export function getConfigPath(context: MsfwContext) {
  const config = context.options.config
  if (config && isString(config)) {
    return path.resolve(projectRoot, config)
  } else {
    const pkMsfwConfig = context.appPackageJson.msfwConfig
    if (pkMsfwConfig && isString(pkMsfwConfig)) {
      return path.resolve(projectRoot, pkMsfwConfig)
    } else {
      const result = explorer.search(projectRoot)

      if (result === null) {
        log(
          `${UppercaseName}: Config file not found. check if file exists at root (${LowercaseName}.config.ts, ${LowercaseName}.config.js)`,
        )
        return ''
      }

      return result.filepath
    }
  }
}

export function loadConfig(context: MsfwContext): MsfwConfig {
  const configFilePath = context.configPath
  const result = explorer.load(configFilePath)

  const config = isFunction(result?.config) ? result.config(context) : result?.config

  if (!config) {
    log(`${UppercaseName}: Config function didn't return a config object.`)
    return {}
  }

  return config
}
