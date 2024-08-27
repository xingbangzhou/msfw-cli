export type BuildEnv = 'dev' | 'test' | 'prod'

export interface MsfwOptions {
  env?: BuildEnv
  progress?: boolean
  config?: string
  analyze?: boolean
}

export interface MsfwContext {
  options: MsfwOptions
}
