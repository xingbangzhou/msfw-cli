import type {UserConfig as ViteConfig} from 'vite'
import {MsfwConfig} from '../../../types'

export class ViteDevelopment {
  private msfwConfig: MsfwConfig

  constructor(_context: any, msfwConfig: MsfwConfig) {
    this.msfwConfig = msfwConfig
  }

  getConfig(): ViteConfig {
    const devServerConfig = this.msfwConfig.devServer || {}

    return {
      mode: 'development',
      server: {
        host: devServerConfig.host || '0.0.0.0',
        port: Number(devServerConfig.port) || 3000,
        open: devServerConfig.open !== undefined ? Boolean(devServerConfig.open) : true,
        hmr: devServerConfig.hot !== false,
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('development'),
      },
      esbuild: {
        jsx: 'automatic',
      },
    }
  }
}