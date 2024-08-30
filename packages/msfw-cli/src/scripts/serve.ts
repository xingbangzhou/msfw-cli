import {loadMsfwConfig} from '../lib/config'
import {createMsfwContext} from '../lib/context'
import {Options} from '../types'

export default function serve(options: Options) {
  const msfwContext = createMsfwContext(options)
  const msfwConfig = loadMsfwConfig(msfwContext)
}
