import {cosmiconfigSync} from 'cosmiconfig'
import {TypeScriptLoader} from 'cosmiconfig-typescript-loader'
import {MsfwContext} from '../types'
import {deepMergeWidthArray, isFunction, isString, toUpperCase} from './utils'
import {appDirectory, resolveApp} from './paths'
import {log} from './logger'
import type {MsfwConfig} from '../types/config'
import {MSFWNAME} from './constants'

const DEFAULT_CONFIG: MsfwConfig = {
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    hot: true,
  },
}

const explorer = cosmiconfigSync(MSFWNAME, {
  searchPlaces: [`${MSFWNAME}.config.ts`, `${MSFWNAME}.config.js`, `${MSFWNAME}.config.cjs`],
  loaders: {
    '.ts': TypeScriptLoader(),
  },
})

export function getConfigPath(config?: string) {
  if (config && isString(config)) {
    return resolveApp(config)
  } else {
    const result = explorer.search(appDirectory)
    if (result === null) {
      log(
        `${toUpperCase(MSFWNAME)}: Config file not found. check if file exists at root (${MSFWNAME}.config.ts, ${MSFWNAME}.config.js)`,
      )
      return ''
    }

    return result.filepath
  }
}

function getConfigAsObject(context: MsfwContext): MsfwConfig {
  const configFilePath = context.appConfig
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
