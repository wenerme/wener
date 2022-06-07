---
title: tsconfig.json
---

# tsconfig.json

typescript 配置文件。

- tslib 会用于 polyfill 特性
- 参考
  - [tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
    - [中文](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/tsconfig.json.html)
  - [tsconfig.json.schema](http://json.schemastore.org/tsconfig)
  - [reference](https://www.typescriptlang.org/tsconfig)
  - [tsconfig/bases](https://github.com/tsconfig/bases) 配置推荐

```bash
# 使用自定义的配置文件
tsc --p tsconfig.page.json
```

## 常用属性

- _target_ - 默认 es3, 推荐至少 es6
  - es3, es5, es6/es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, esnext
  - es6 开始支持 模块
- _module_ - es3,es5 -> commonjs, es6 - 影响生成的 模块 格式
  - none, commonjs, amd, umd, system, es6/es2015, es2020, es2022, esnext, node12, nodenext
- _moduleResolution_ - 影响使用的模块解析方式
  - classic, node, node12, nodenext
  - classic - amd, umd, system, es6/es2015
  - node - CommonJS
  - node12 - ESM
  - node16 - exports
- _lib_ - 控制使用的特性 - https://www.typescriptlang.org/tsconfig#lib
- _strict_
- _outFile_ - 可以用来将多个 ts 输出为一个 js
  - 如果使用了模块, 则只能使用 amd 或 system
  - 如果没有使用到模块是可以编译成单个 js 直接运行的
  - 可以使用 [amdclean](https://github.com/gfranko/amdclean) 将使用 amd 的 js 转换为无 amd 的
    - 不支持 es6 的一些语法
  - 可以考虑将 ts 输出为 es5, 如果使用了 es6 的库, 则直接指定 lib 即可

```json
{
  "compilerOptions": {
    // 导入 tslib 作为工具类
    // yarn add tslib
    "importHelpers": true,

    // 单文件模块 - 确保能够支持 transpileModule
    "isolatedModules": true,

    // 添加更多检测
    "strict": true,

    // 非绝对导入模块的基础路径
    "baseUrl": ".",
    // 从新映射模块路径
    "paths": {
      // 代码
      "src/*": ["src/*"],
      // 模块
      "jquery": ["node_modules/jquery/dist/jquery"]
    },

    // 多个虚拟代码目录 - 针对导入做合并处理
    "rootDirs": ["src/views", "generated/templates/views"],

    // 生成兼容 es 模块
    // 会启用 allowSyntheticDefaultImports
    "esModuleInterop": true,

    // 生成 .map
    "sourceMap": true,
    // 线上调试时 源码 路径
    "sourceRoot": "https://apis.wener.me/debug/sources/",
    // .map 文件路径
    "mapRoot": "https://apis.wener.me/debug/maps/",

    // 源码和 map 在 js 中 - 注释形式
    "inlineSourceMap": false,
    "inlineSources": false,

    // switch 不允许连续 - 除非 // falls through
    "noFallthroughCasesInSwitch": true,

    // 生成修饰器元数据
    "emitDecoratorMetadata": true,
    // 启用修饰器
    "experimentalDecorators": true,

    // 假设变更只影响直接依赖 - 大型项目增量构建有用
    "assumeChangesOnlyAffectDirectDependencies": true,

    // 3.8 - 导入只用于类型的时候移除 import
    // 避免副作用
    "importsNotUsedAsValues": "remove",

    // jsx 生成代码的工厂 - 例如 preact 用 preact.h
    "jsxFactory": "React.createElement",
    // XXX.createElement
    "reactNamespace": "React",

    // 允许导入 JSON
    "resolveJsonModule": true,
    // 错误时不生成文件
    "noEmitOnError": true,

    // 导入文件文件名大小写一致
    "forceConsistentCasingInFileNames": true,

    // 使用 TC39 定义类字段的方式
    "useDefineForClassFields": true
  }
}
```

## 参考配置

### google typescript style

- [tsconfig-google.json](https://github.com/google/gts/blob/master/tsconfig-google.json)

```json
{
  "compilerOptions": {
    // 不允许不可达的代码
    "allowUnreachableCode": false,
    // 不允许未使用的标签
    "allowUnusedLabels": false,
    // 生成 .d.ts
    "declaration": true,

    "forceConsistentCasingInFileNames": true,
    // 同 target
    "lib": ["es2018"],
    "module": "commonjs",
    "noEmitOnError": true,
    "noFallthroughCasesInSwitch": true,
    // 不允许隐性返回
    "noImplicitReturns": true,
    // 异常信息等使用颜色样式
    "pretty": true,
    // 生成 .map.js
    "sourceMap": true,
    "strict": true,
    "target": "es2018"
  },
  "exclude": ["node_modules"]
}
```
