export interface Options {
  env?: 'dev' | 'test' | 'prod'
  progress?: boolean
  config?: string
  analyze?: boolean
}

export interface MsfwContext {
  // 命令行选项
  options: Options
  // 开发模式
  isDev: boolean
  // 环境变量
  envVars: {
    __PROD__: boolean
    __TEST__: boolean
    __DEV__: boolean
  }
  // 项目PackageJson
  appPackageJson: Record<string, any>
  // 项目配置文件
  configPath: string
  // 默认缓存目录
  cacheDirPath: string
  // 资源相对目录
  assetsDir: string
  // 默认入口文件
  appIndexPath: string
  // 默认输出目录
  appDistPath: string
  // 默认src目录
  appSrcPath: string
  // 默认favicon文件
  appFaviconPath: string
  // 默认template文件
  appTemplatePath: string
  // tsconfig文件
  appTsconfigPath: string
}
