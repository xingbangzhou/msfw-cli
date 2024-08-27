# TSConfig

## Install
+ `yarn add @msfw/tsconfig -D`

## Config
+ `tsconfig.json`
```js
module.exports = {
  "extends": "@msfw/tsconfig",
  "compilerOptions": {
    "types": ["node", "react", "@msfw/tsconfig"],
    "rootDir": ".",
    "baseUrl": ".",
    "paths": {
      "src/*": ["src/*"]
    },
  }
}
```
