#!/usr/bin/env node

import {program} from 'commander'
import msfw from '..'
import {MsfwVersion} from '../lib/constants'

program.version(MsfwVersion, '-v, --version').usage('<command> [options]')

program
  .command('dev')
  .description('Dev 模式')
  .option('-e, --env <env>', '部署环境 dev|test|prod', 'dev')
  .option('-p, --progress', '显示进度', true)
  .option('-c, --config <config>', '配置文件', '')
  .action(options => {
    msfw('dev', options)
  })

program
  .command('build')
  .description('构建项目')
  .option('-e, --env <env>', '部署环境 dev|test|prod', 'prod')
  .option('-p, --progress', '显示进度', false)
  .option('-c, --config <config>', '配置文件', '')
  .option('-a, --analyze', '生成分析报告', false)
  .action(options => {
    msfw('build', options)
  })

program
  .command('serve')
  .description('正式环境调试')
  .action(() => {
    msfw('serve', {})
  })

program.parse(process.argv)
