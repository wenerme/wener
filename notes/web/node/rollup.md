---
title: Rollup
---

# Rollup

- [rollupjs](https://rollupjs.org/)
- [Repl](https://rollupjs.org/repl/)
- 注意
  - `d.ts` 需要使用 tsc 生成
- 参考
  - [rollup/awesome](https://github.com/rollup/awesome)
  - https://rollupjs.org/repl/

:::caution

- [#2182](https://github.com/rollup/rollup/issues/2182) 不支持缓存
- [#2072](https://github.com/rollup/rollup/issues/2072) UMD/IIFE 不支持 code splitting

:::

:::info

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

:::

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

```ts
export default {
  output: {
    // 默认 chunk 包含名字
    // 支持 [format] 替换
    // [name] 为 manualChunks 结果或 this.emitFile 结果
    chunkFileNames: '[name]-[hash].js',
    entryFileNames: '[name].js', // 入口 - 支持相同的替代逻辑

    // 自定义 chunk - 多页分 chunk 加载
    manualChunks: {
      lodash: ['lodash'], // alias: include 的字符
    },
    // id 为完整路径
    // 例如 将相同语言翻译合并 foo.strings.en.js,bar.strings.en.js -> shared.en.js
    manualChunks(id, { getModuleInfo, getModuleIds }) {
      if (id.includes('@blueprintjs/')) {
        return 'blueprintjs';
      }
      if (id.includes('node_modules')) {
        return 'vendor';
      }
      return undefined;
    },

    // 控制生成代码
    generatedCode: 'es5', // 默认 es5
    generatedCode: {
      preset: 'es2015',
      arrowFunctions: true,
      constBindings: true,
      objectShorthand: true,
      reservedNamesAsProps: false,
    },

    // stric, allow-extension, exports-only, false
    // false - 不 export
    preserveEntrySignatures: 'strict',
  },
};
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
