import type {Plugin} from 'vite'
import {MsfwContext} from '../../../types'
import {htmlEntryPlugin} from './html-entry-plugin'

export class VitePlugins {
  private context: MsfwContext

  constructor(context: MsfwContext) {
    this.context = context
  }

  getPlugins(): Plugin[] {
    const plugins: Plugin[] = []

    // 处理 public/index.html 作为入口
    plugins.push(htmlEntryPlugin(this.context))

    return plugins
  }
}