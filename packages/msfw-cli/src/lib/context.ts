import type {MsfwContext, Options} from '../types'
import {getConfigPath} from './config'
import {isProjectFileExist, resolveProject} from './paths'
import fs from 'fs'

const _msfwcontext: MsfwContext = {
  options: {},

  isDev: false,

  envVars: {
    __PROD__: false,
    __TEST__: false,
    __DEV__: false,
  },

  appPackageJson: {},

  configPath: '',

  cacheDirPath: '',

  defaultIndexPath: '',

  defaultDistPath: '',

  assetsDir: 'assets',
}

export function getMsfwContext() {
  return _msfwcontext
}

function getDefaultIndexPath() {
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

export function initMsfwContext(mode: 'development' | 'production', options: Options) {
  _msfwcontext.options = options
  // 开发模式
  _msfwcontext.isDev = mode === 'development' ? true : false
  // 环境参数
  const envVars = _msfwcontext.envVars
  switch (options.env) {
    case 'prod':
      envVars.__PROD__ = true
      break
    case 'test':
      envVars.__TEST__ = true
      break
    case 'dev':
      envVars.__DEV__ = true
      break
    default:
      break
  }
  // 项目Package
  const appPackageFile = resolveProject('package.json')
  if (fs.existsSync(appPackageFile)) {
    _msfwcontext.appPackageJson = require(appPackageFile)
  }
  // 配置文件
  _msfwcontext.configPath = getConfigPath(_msfwcontext)
  // 默认缓存目录
  _msfwcontext.cacheDirPath = resolveProject('node_modules/.msfw-cache')
  // 默认入口文件
  _msfwcontext.defaultIndexPath = getDefaultIndexPath()
  // 默认输出目录
  _msfwcontext.defaultDistPath = resolveProject('dist')

  return _msfwcontext
}
