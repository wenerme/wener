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
- [#3799](https://github.com/rollup/rollup/issues/3799) 不支持 assert
  - [rollup-plugin-import-assert](https://github.com/calebdwilliams/rollup-plugin-import-assert)
    - 不支持 dynamic
    - 对应的 acorn 插件 [xtuc/acorn-import-assertions](https://github.com/xtuc/acorn-import-assertions)
  - acron 只添加 stage4 特性 [acorn#1111](https://github.com/acornjs/acorn/issues/1111)

:::

:::info

-  不支持 index.js [#470](https://github.com/rollup/rollup/issues/470#issuecomment-177594250)
  1. 直接 `import {abc} from 'abc/index'`
  2. 使用 [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve)
- Mark dependency as internal? [#1906](https://github.com/rollup/rollup/issues/1906)
- CommonJS 多了一层 default 问题
  - [Babel 6 changes how it exports default](https://stackoverflow.com/questions/33505992)
  - [babel-plugin-add-module-exports](https://www.npmjs.com/package/babel-plugin-add-module-exports)
    - 使其恢复原有的方式
  - 类似问题
    - [faastjs/faast.js#36](https://github.com/faastjs/faast.js/issues/36) - Can't use default import with Babel

:::

```bash
# 也可以全局安装 - 但是没必要，因为通常依赖其他插件
# npm install --global rollup

# 常用插件
# monorepo 推荐安装在 root 项目
npm add -D rollup @rollup/plugin-{commonjs,node-resolve,replace,typescript,teser}

# 不推荐 Babel
# Babel + Typescript
# yarn add -D @babel/preset-env @babel/preset-typescript
# + React
# yarn add -D @babel/preset-react

# TS
yarn add -D typescript tslib @rollup/plugin-typescript

# rollup
# -f amd, cjs, es, iife, umd, system
rollup -i in.js -f es -p node-resolve -o out.js
```

| Format          | Fullname                       | When                         | package.json |
| --------------- | ------------------------------ | ---------------------------- | ------------ |
| amd             | Asynchronous Module Definition | RequireJS                    |
| cjs,commonjs    | CommonJS                       | Node                         | `main`       |
| es,esm,module   |                                | `<script type=module>`       | `module`     |
| iife            | self-executing function        | `<script>` <br/> Application |
| umd             | Universal Module Definition    | amd, cjs, iife               | `browser`    |
| system,systemjs | SystemJS                       | SystemJS                     |

## Options

```ts
interface Options {
  // 判断是否为 外部 依赖
  external:
    | (string | RegExp)[]
    | RegExp
    // string 为 module id
    | string
    // isResolved - id 是否由 插件 resolve
    // 可能请求两次 - resolved=false, resolved=true
    | ((id: string, parentId: string, isResolved: boolean) => boolean);
}
```

- https://rollupjs.org/guide/en/#big-list-of-options

## 配置

### babel+ts

```bash
npm add -D @babel/core @rollup/plugin-babel rollup-plugin-terser @rollup/plugin-node-resolve
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

### rollup ts

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

### rollup commonjs

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
