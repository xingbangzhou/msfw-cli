import fs from 'fs'
import {log} from './logger'
import path from 'path'

export const projectRoot = fs.realpathSync(process.cwd())
log('Project root path resolved to: ', projectRoot)

export function resolveProject(relativePath: string) {
  return path.resolve(projectRoot, relativePath)
}

export function isProjectFileExist(relativePath: string) {
  return fs.existsSync(resolveProject(relativePath))
}
