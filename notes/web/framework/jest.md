---
title: Jest
tags:
  - Jest
  - Testing
---

# Jest

- [Native support for ES modules](https://github.com/facebook/jest/issues/4842)
- [Issue Comment: ES Modules](https://github.com/facebook/jest/issues/9395#issuecomment-583799300)

```js
    '^.+\\.jsx?$': ['babel-jest', {configFile: './babel.config.jest.js'}],
```

- [Jest Configuration](https://jestjs.io/docs/en/configuration)

默认规则:
`[ "**/**tests**/**/_.[jt]s?(x)", "\*\*/?(_.)+(spec|test).[jt]s?(x)" ]`

- Visual Testing
  - [americanexpress/jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)

```bash
npm i --save-dev jest babel-jest @babel/preset-env
```

```js
transform: {
"^.+\\.jsx?$": "babel-jest"
},
```

```json
{
  "presets": ["@babel/preset-env"]
}
```

```bash
yarn add --dev jest ts-jest @types/jest
```

```ts
/**
 * @jest-environment node
 */
```

### jest.config.js

```js
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      // tsConfig: 'tsconfig.jest.json',
      tsConfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};
```

### jest.setup.js

```bash
require('dotenv').config();
```

## Cannot use import statement outside a module
