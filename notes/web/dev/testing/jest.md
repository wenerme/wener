---
title: jest
---

# jest

- [facebook/jest](https://github.com/facebook/jest)
- 参考
  - [kulshekhar/ts-jest](https://github.com/kulshekhar/ts-jest)

```bash
# typescript
npm i -D jest ts-node ts-jest @types/jest
npx ts-jest config:init

# js
npx jest --init
```

## 配置

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

```js
require('dotenv').config();
```

### jest.config.ts

```ts
import { InitialOptionsTsJest } from 'ts-jest/dist/types';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
} as InitialOptionsTsJest;
```

## majestic

- [Raathigesh/majestic](https://github.com/Raathigesh/majestic)
  - Zero config GUI for Jest

```bash
npx majestic
```

# FAQ

## Cannot use import statement outside a module

## Node 环境执行

```ts
/**
 * @jest-environment node
 */
```

## ReferenceError: self is not defined

- 可能需 dom 环境执行

1. 修改单个

```js
/**
 * @jest-environment jsdom
 */
```

2. 修改默认

```js title="jest.config.js"
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
};
```
