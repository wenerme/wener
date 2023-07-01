---
title: eslint
---

# eslint

```bash
npx eslint "src/**" --ext .ts --ext .tsx

TIMING=1 npx eslint src # 输出时间，排查慢的插件

# fix single rule
# eslint --fix --rule 'quotes: [2, double]' .
eslint --no-eslintrc --parser @typescript-eslint/parser --fix --rule 'prefer-const: 1' src/**/*.ts

eslint --env-info
```

- eslint-plugin-import
- eslint-plugin-react
- eslint-plugin-jsx-a11y
- react/react-in-jsx-scope
  - 不要求 `import React from 'react'`
  - ESBuild 还不支持 jsx - 因此需要 `import React` - [esbuild#334](https://github.com/evanw/esbuild/issues/334)
- 参考
  - [eslint.org](https://eslint.org)
    - [rules](https://eslint.org/docs/latest/rules/)
  - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
    - [rules](https://typescript-eslint.io/rules/)
  - https://github.com/vercel/next.js/tree/canary/packages/eslint-config-next
    - NextJS
  - [xojs/eslint-config-xo-typescript](https://github.com/xojs/eslint-config-xo-typescript)
  - [standard/eslint-config-standard-with-typescript](https://github.com/standard/eslint-config-standard-with-typescript)
    - https://github.com/standard/eslint-config-standard-with-typescript/blob/master/src/index.ts

## 配置

- .eslintrc.{js,yml,json,cjs}
- eslint.config.js
  - ESM
- 参考
  - https://eslint.org/docs/latest/use/configure/configuration-files
  - https://eslint.org/docs/latest/use/configure/configuration-files-new
- ESLINT_USE_FLAT_CONFIG=true 不搜索 eslint.config.js

```js
module.exports = {
  root: true,
  // 扩展现有配置 - 可以是绝对路径，可以是包/模块
  // 缩写逻辑:
  //   custom -> eslint-config-custom
  //   @wener -> @wener/eslint-config
  extends: ['@wener/eslint-config-custom'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
};
```

## disable/false positive

```js
// 忽略单个规则
/*eslint eqeqeq:0*/

// 忽略单行
// eslint-disable-next-line

// 忽略范围
/*eslint-disable */
alert('foo');
/*eslint-enable */

// 忽略当前
a == a; // eslint-disable-line
```

## tslint

- @typescript-eslint/no-redeclare
  - ignoreDeclarationMerge
    - interface + interface
    - namespace + namespace
    - class + interface
    - class + namespace
    - class + interface + namespace
    - function + namespace
    - enum + namespace
    - 没有 const + interface - utils 合集
- @typescript-eslint/no-extraneous-class
  - allowStaticOnly
    - 方便暴露 utils 合集

# FAQ

## The file does not match your project config

```js title=".eslintrc.js"
module.exports = {
  ignorePatterns: ['.eslintrc.js'],
};
```

## eslint decorators consistent-type-imports

- tsconfig.json emitDecoratorMetadata=true

## The keyword 'import' is reserved

```json
{
  "parserOptions": {
    "sourceType": "module"
  }
}
```
