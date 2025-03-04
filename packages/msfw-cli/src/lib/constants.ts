import path from 'path'

const msfwPackageJson = require(`${path.resolve(__dirname, '../../')}/package.json`)

export const MSFWNAME = 'msfw'

export const MSFWVERSION = msfwPackageJson.version
