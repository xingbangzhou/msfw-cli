import {resolve} from 'path'
import {mergeConfig} from 'vite'
import type {UserConfig as ViteConfig} from 'vite'
import {MsfwConfig, MsfwContext} from '../../../types'
import {isFunction} from '../../utils'
import {ViteCommon} from './common'
import {ViteDevelopment} from './development'
import {ViteProduction} from './production'
import {VitePlugins} from './plugins'

function overrideVite(context: MsfwContext, msfwConfig: MsfwConfig): ViteConfig {
  const common = new ViteCommon(context, msfwConfig)
  const plugins = new VitePlugins(context)

  const config: ViteConfig = {
    root: context.appPath,
    publicDir: context.appPublic,
    build: {
      outDir: context.appBuild,
      rollupOptions: {
        input: context.appHtml, // public/index.html
      },
    },
    resolve: common.getResolveConfig(),
    css: common.getCssConfig(),
    plugins: plugins.getPlugins(),
  }

  return config
}

export function overrideViteDev(context: MsfwContext, msfwConfig: MsfwConfig): ViteConfig {
  const viteConfig = overrideVite(context, msfwConfig)

  const development = new ViteDevelopment(context, msfwConfig)
  const devConfig = development.getConfig()

  const mergedConfig = mergeConfig(viteConfig, devConfig)

  if (msfwConfig.vite?.configure && isFunction(msfwConfig.vite.configure)) {
    return msfwConfig.vite.configure(mergedConfig, context)
  }

  return mergedConfig
}

export function overrideViteProd(context: MsfwContext, msfwConfig: MsfwConfig): ViteConfig {
  const viteConfig = overrideVite(context, msfwConfig)

  const production = new ViteProduction(context, msfwConfig)
  const prodConfig = production.getConfig()

  const mergedConfig = mergeConfig(viteConfig, prodConfig)

  if (msfwConfig.vite?.configure && isFunction(msfwConfig.vite.configure)) {
    return msfwConfig.vite.configure(mergedConfig, context)
  }

  return mergedConfig
}