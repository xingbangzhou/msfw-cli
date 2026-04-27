import type {UserConfig as ViteConfig} from 'vite'
import {MsfwConfig, MsfwContext} from '../../../types'
import {getCdnDomain, parseCdnConfig} from '../../utils/cdn'

export class ViteProduction {
  private context: MsfwContext
  private msfwConfig: MsfwConfig

  constructor(context: MsfwContext, msfwConfig: MsfwConfig) {
    this.context = context
    this.msfwConfig = msfwConfig
  }

  getConfig(): ViteConfig {
    const {cdn} = this.msfwConfig
    const {domains, strategy} = parseCdnConfig(cdn)
    const cdnDomain = getCdnDomain(domains, strategy)

    return {
      mode: 'production',
      base: cdnDomain ? cdnDomain + '/' : './',
      build: {
        target: 'es2015',
        sourcemap: false,
        minify: 'terser',
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['react', 'react-dom'],
            },
          },
        },
      },
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }
  }
}