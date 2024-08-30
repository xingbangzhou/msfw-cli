import path from 'path'
import type {MsfwContext, Options} from '../types'
import {getConfigPath} from './config'
import {isProjectFileExist, resolveProject} from './paths'
import fs from 'fs'

function getIndexPath() {
  let indexPath = ''
  if (isProjectFileExist('src/index.ts')) {
    indexPath = resolveProject('src/index.ts')
  } else if (isProjectFileExist('src/index.tsx')) {
    indexPath = resolveProject('src/index.tsx')
  } else {
    indexPath = resolveProject('src/index.js')
  }
  return indexPath
}

export function createMsfwContext(options: Options, mode: 'development' | 'production' | '' = '') {
  // 开发模式
  const isDev = mode === 'development' ? true : false
  // 环境参数
  const envVars = {
    __PROD__: options.env === 'prod' ? true : false,
    __TEST__: options.env === 'test' ? true : false,
    __DEV__: options.env === 'dev' ? true : false,
  }
  // 项目PackageJson
  let appPackageJson = {}
  const appPackageFile = resolveProject('package.json')
  if (fs.existsSync(appPackageFile)) {
    appPackageJson = require(appPackageFile)
  }
  // 项目配置文件
  const configPath = getConfigPath(options.config)
  // 默认缓存目录
  const cacheDirPath = resolveProject('node_modules/.msfw-cache')
  // 默认入口文件
  const appIndexPath = getIndexPath()
  // 默认输出目录
  const appDistPath = resolveProject('dist')
  // 默认src目录
  const appSrcPath = resolveProject('src')
  // 默认模板文件
  const publicPath = resolveProject('public')
  let appFaviconPath = path.join(publicPath, 'favicon.ico')
  appFaviconPath = fs.existsSync(appFaviconPath)
    ? appFaviconPath
    : path.join(__dirname, '../../template/public/favicon.ico')
  let appTemplatePath = path.join(publicPath, 'index.html')
  appTemplatePath = fs.existsSync(appTemplatePath)
    ? appTemplatePath
    : path.join(__dirname, '../../template/public/index.html')
  // tsconfig文件
  const appTsconfigPath = resolveProject('tsconfig.json')

  const context: MsfwContext = {
    options: options,
    isDev,
    envVars,
    appPackageJson,
    configPath,
    cacheDirPath,
    assetsDir: 'assets',
    appIndexPath,
    appDistPath,
    appSrcPath,
    appFaviconPath,
    appTemplatePath,
    appTsconfigPath,
  }

  return context
}
