---
title: package.json
---

# package.json

- 参考
  - https://nodejs.org/api/packages.html
  - https://github.com/stereobooster/package.json
  - https://unpkg.com/browse/antd/package.json
  - jsnext:main [jsforum/jsforum#5](https://github.com/jsforum/jsforum/issues/5)
  - style,sass [twbs/bootstrap#12441](https://github.com/twbs/bootstrap/pull/12441)
    - used by [postcss/postcss-import](https://github.com/postcss/postcss-import)
  - jspm - shim - https://jspm.org/

```json
{
  // 主要包入口定义
  "main": "lib/cjs/index.js",
  "unpkg": "dist/pkg.development.js",
  "types": "lib/types/index.d.ts",
  "esnext": "lib/esnext/index.d.ts",
  // 由 bundler 使用的 esm 入口
  "module": "lib/esm/index.js",
  // 导入单入口
  // "exports": "./index.js"
  // 导出多个入口
  // 未 export 的为私有
  // https://nodejs.org/api/esm.html#resolver-algorithm
  "exports": {
    // 定义后可自引用
    ".": "./main.mjs",
    // import {} from 'pkg/foo'
    "./foo": "./foo.js",

    // 同时支持 cjs 和 esm
    "import": "./index.mjs",
    "require": "./index.cjs",
    // typescript 4.7+
    // https://github.com/microsoft/TypeScript/issues/33079
    "types": "./index.ts",

    // 指定路径
    ".": {
      "types": "./lib/index.d.ts",
      "default": "./lib/index.js"
    },
    // 替代
    "./*": {
      "types": "./lib/*/index.d.ts",
      "default": "./lib/*/index.js"
    },
    // 允许访问
    "./package.json": "./package.json"
  },
  // Node 条件 resolve
  "node": "",
  "node-addons": "",
  "default": "",
  "import": "",
  "require": "",
  // 社区定义的条件
  "browser": "", // build for browser
  "deno": "", // build for deno

  "development": "", // dev build entrypoint - node --conditions=development main.js
  "production": "", // prod build entrypoint

  // 针对包的 import map
  "imports": {
    "#dep": {
      "node": "dep-node-native",
      "default": "./dep-polyfill.js"
    }
  },
  // 可以 tree shaking
  // /*#__PURE__*/
  "sideEffects": true,
  // 部分文件有 side effetcs
  "sideEffects": ["./src/register.js", "*.css", "!(dist/(components|utils)/**)"]
}
```

- Node.js 12+ 可使用 exports 替代 main
- 现在的 node 可以在 require 时也使用 esm - 实时转译
- types = typings
- [Community Conditions Definitions](https://nodejs.org/api/packages.html#community-conditions-definitions)

```json
{
  "bundlewatch": {
    "files": [
      {
        "path": "dist/*.production.min.js"
      }
    ]
  }
}
```

## exports

- --conditions,-C
  - `node --conditions=development index.js`
  - 运行 node 指定 condition 会根据 condition resolve
- 常见类型
  - import - esm - `import`,`import()` 使用 ECMAScript module loader
  - require - cjs
  - node - cjs/esm
  - node-addons - native C++ addons
  - default - cjs/esm - 优先级低
- 扩展
  - types - 优先级高
  - demo
  - browser - 例如 iife 格式
  - development
  - production
- https://nodejs.org/api/packages.html#conditional-exports
