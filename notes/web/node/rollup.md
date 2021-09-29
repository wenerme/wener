---
title: Rollup
---

# Rollup

- [rollupjs](https://rollupjs.org/)
- [Repl](https://rollupjs.org/repl/)
- 注意
  - `d.ts` 需要使用 tsc 生成
- 问题
  - [#287](https://github.com/rollup/plugins/issues/287) - typescript 插件无效
  - [#2671](https://github.com/rollup/rollup/issues/2671) - 不支持 `export *` commonjs
  - [#470](https://github.com/rollup/rollup/issues/470#issuecomment-177594250) 不支持 index.js
    1. 直接 `import {abc} from 'abc/index'`
    2. 使用 [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
  - [#1906](https://github.com/rollup/rollup/issues/1906) - Mark dependency as internal?
  - CommonJS 多了一层 default 问题
    - [Babel 6 changes how it exports default](https://stackoverflow.com/questions/33505992)
    - [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports)
      - 使其恢复原有的方式
    - 类似问题
      - [faastjs/faast.js#36](https://github.com/faastjs/faast.js/issues/36) - Can't use default import with Babel
- 参考
  - [rollup/awesome](https://github.com/rollup/awesome)

```bash
npm install --global rollup

# 常用插件
yarn add -D rollup @babel/core @rollup/plugin-babel rollup-plugin-terser @rollup/plugin-node-resolve
# Babel + Typescript
yarn add -D @babel/preset-env @babel/preset-typescript
# + React
yarn add -D @babel/preset-react

# yarn add -D rollup @rollup/plugin-commonjs  @rollup/plugin-node-resolve @rollup/plugin-babel
# yarn add -D @babel/core @babel/preset-typescript @babel/preset-react @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties

# TS - 但目前不好用
yarn add -D typescript tslib @rollup/plugin-typescript
```

| Format           | Fullname                       | When                         | package.json |
| ---------------- | ------------------------------ | ---------------------------- | ------------ |
| amd              | Asynchronous Module Definition | RequireJS                    |
| cjs,commonjs     | CommonJS                       | Node                         | `main`       |
| es,esm,module    |                                | `<script type=module>`       | `module`     |
| iife             | self-executing function        | `<script>` <br/> Application |
| umd              | Universal Module Definition    | amd, cjs, iife               | `browser`    |
| system，systemjs | SystemJS                       | SystemJS                     |

## 配置

```bash
yarn add -D @babel/core @rollup/plugin-babel rollup-plugin-terser @rollup/plugin-node-resolve
```

## rollup ts

```ts
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './src/standalone.ts',
    output: {
      file: `dist/standalone.umd.js`,
      sourcemap: true,
      format: 'umd',
      name: 'Standalone',
    },
    external: [],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
    ],
  },
];
```

## rollup commonjs

```ts
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

function createConfig(format) {
  return {
    input: 'src/index.ts',
    output: {
      file: `dist/console-feed.${format}.js`,
      sourcemap: true,
      format,
    },
    external: ['react'],
    plugins: [
      nodeResolve({ browser: true, extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
      babel({
        babelHelpers: 'bundled',
        babelrc: false,
        presets: [['@babel/preset-typescript', { allowNamespaces: true }], '@babel/preset-react'],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    ],
  };
}

export default [createConfig('system'), createConfig('umd')];
```

## babel

- https://github.com/rollup/plugins/tree/master/packages/babel

# FAQ

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
  'node_modules/@emotion/memoize/dist/memoize.cjs.js':['memoize']
  },
})
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
