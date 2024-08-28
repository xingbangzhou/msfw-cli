export interface Options {
  env?: 'dev' | 'test' | 'prod'
  progress?: boolean
  config?: string
  analyze?: boolean
}

export interface MsfwContext {
  options: Options
  // 开发模式
  isDev: boolean

  // 环境变量
  envVars: {
    __PROD__: boolean
    __TEST__: boolean
    __DEV__: boolean
  }

  appPackageJson: Record<string, any>

  configPath: string

  cacheDirPath: string

  defaultIndexPath: string

  defaultDistPath: string

  assetsDir: string
}
