import path from 'path'

export const MSFWNAME = 'msfw'

const msfwPackageJson = require(`${path.resolve(__dirname, '../../')}/package.json`)

export const MSFWVERSION = msfwPackageJson.version
