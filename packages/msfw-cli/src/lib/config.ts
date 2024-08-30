import {cosmiconfigSync} from 'cosmiconfig'
import {TypeScriptLoader} from 'cosmiconfig-typescript-loader'
import {MsfwContext} from '../types'
import {deepMergeWidthArray, isFunction, isString} from './utils'
import path from 'path'
import {projectRoot} from './paths'
import {log} from './logger'
import type {MsfwConfig} from '../types/config'
import {MsfwName, MsfwBigName} from './constants'

const DEFAULT_CONFIG: MsfwConfig = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hot: true,
  },
}

const explorer = cosmiconfigSync(MsfwName, {
  searchPlaces: [`${MsfwName}.config.ts`, `${MsfwName}.config.js`, `${MsfwName}.config.cjs`],
  loaders: {
    '.ts': TypeScriptLoader(),
  },
})

export function getConfigPath(config?: string) {
  if (config && isString(config)) {
    return path.resolve(projectRoot, config)
  } else {
    const result = explorer.search(projectRoot)
    if (result === null) {
      log(
        `${MsfwBigName}: Config file not found. check if file exists at root (${MsfwName}.config.ts, ${MsfwName}.config.js)`,
      )
      return ''
    }

    return result.filepath
  }
}

function getConfigAsObject(context: MsfwContext): MsfwConfig {
  const configFilePath = context.configPath
  const result = explorer.load(configFilePath)

  const config = isFunction(result?.config) ? result.config(context) : result?.config

  if (!config) {
    return {}
  }

  return config
}

export function loadMsfwConfig(context: MsfwContext): MsfwConfig {
  const configAsObject = getConfigAsObject(context)

  const msfwConfig = deepMergeWidthArray({}, DEFAULT_CONFIG, configAsObject)

  return msfwConfig
}
