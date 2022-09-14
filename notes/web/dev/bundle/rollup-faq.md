---
title: Rollup FAQ
tags:
  - FAQ
---

# Rollup FAQ

## `this` has been rewritten to `undefined`

- 配合 typescript 会出现，不影响使用，但很烦

**忽略该错误**

```js
{
  onwarn(warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') {
        return;
      }
      console.warn('THIS_IS_UNDEFINED', warning.message);
    },
}
```

- [this-is-undefined](https://rollupjs.org/guide/en/#error-this-is-undefined)

## Rollup requires that your Babel configuration keeps ES6 module syntax intact.

```js
{
  plugins: [
    babel({
      babelHelpers: 'bundled',
      babelrc: false,
    }),
    terser({ ecma: 6, module: true }),
  ],
}
```

## SyntaxError: Unexpected token: punc (.)

- [Optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
- 调整 transpile 或者 ts 的 target

## Missing class properties transform.

- `@babel/plugin-proposal-class-properties`

## 'default' is not exported by

- 导入方式的问题
- commonjs 问题
  - 加插件 @rollup/plugin-commonjs
- 出现问题的包
  - classnames

```ts
// 这样不会使用 default
// TS 中的 allowSyntheticDefaultImports 参数
import * as Abc from './abc';
```

## xxx.default is not a function

- 一般是 commonjs 的问题

可以手动添加命名导出

```js
commonjs({
  include: 'node_modules/**',
  // 新版本插件会自带处理，没有了该参数
  namedExports: {
    'node_modules/@emotion/memoize/dist/memoize.cjs.js': ['memoize'],
  },
});
```

## lodash 没能 剔除/tree shake

使用 lodash-es，不要使用 lodash

- lodash 是 cjs
- lodash-es 是 esm

## angularCompilerOptions

- https://angular.io/guide/angular-compiler-options

```json
{
  "fullTemplateTypeCheck": true,
  "preserveWhitespaces": true
}
```

## rollup.config.ts

1. 使用插件

```json title="tsconfig.json"
{
  "include": ["src", "rollup.config.ts"]
}
```

```bash
rollup --config rollup.config.ts --configPlugin @rollup/plugin-typescript
# 等同于
rollup --config rollup.config.ts --configPlugin typescript
```

2. 使用 cjs 转

```js title="rollup.config.js"
require('ts-node').register({
  compilerOptions: {
    esModuleInterop: true,
  },
});

module.exports = require('./rollup.config.ts');
```
