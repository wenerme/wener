---
title: Typescript
---

# Typescript

- https://www.typescriptlang.org/
- [declaration-files introduction](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
  - http://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html
- [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [中文手册](https://zhongsp.gitbooks.io/typescript-handbook)
- [typings](https://github.com/typings/typings)
- [Playground](https://www.typescriptlang.org/play)
- NOTES
  - 接口不能做反射
  - `export default` 不能有类型定义 [#13626](https://github.com/Microsoft/TypeScript/issues/13626)
- [json2ts](http://json2ts.com/)
  - JSON 转接口定义
  - 也可以自己写代码转, 参考[这里](https://stackoverflow.com/a/41071619/1870054)
- [Advanced Types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)
  - 辅助定义类型的类型定义
  - Partial
    - 所有字段可为 null
  - Readonly
    - 所有字段只读
  - Pick
    - 从一个类型中选择部分字段
  - Record
    - `Record<'prop1' | 'prop2' | 'prop3', string>`
      - 定义有三个 string 类型字段的类型
- https://tsdoc.org/
- 参考
  - https://github.com/typescript-cheatsheets/react-typescript-cheatsheet
- 注意
  - `abstract` 方法不会在 prototype 里，不会生成任何内容，只是类型校验

```bash
npm add -D typescript@latest

tsc --noEmit          # check syntax
tsc --pretty --noEmit # pretty output

npx typesync # 自动添加 @types/ 依赖

# 使用 typing 类型
# typings install dt~node dt~express dt~body-parser dt~serve-static dt~express-serve-static-core dt~mime --global
# 使用模块定义类型
# npm add @types/{node,express,body-parser,serve-static,express-serve-static-core,mime}

# 单个文件
npx tsc --out test.js ./src/test.ts --module system
```

## NPM 模块开发

- 生成配置文件

```bash
yarn init -y
yarn add typescript -D
yarn run tsc -- --init
```

- 修改 `tsconfig.json` 的输出目录为 `dist`
- 在 `package.json` 中添加相关信息即可

```
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "prepublish": "npm run build",
    "build": "tsc"
  },
```

## ts-node

## FAQ

### 引用全局对象

```typescript
const AMap = (window as any)['AMap'];
```

## Dec

https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4
https://itnext.io/extracting-decorated-properties-from-classes-in-typescript-caf24aabcb59

Request: Class Decorator Mutation
https://github.com/Microsoft/TypeScript/issues/4881

https://www.typescriptlang.org/docs/handbook/decorators.html
