---
title: ts-node
---

# ts-node

> 推荐使用 [tsx](./tsx.md)
>
> ts-node 不支持 watch，默认参数可用性低

- [TypeStrong/ts-node](https://github.com/TypeStrong/ts-node)
  - node 直接执行 ts
- watch
  - nodemon
  - ts-node-dev

```bash
npx ts-node main.ts # 直接执行 ts

npm i -D tsconfig-paths
npx ts-node -r tsconfig-paths/register main.ts              # tsconfig 里的 path 能生效
node -r ts-node/register -r tsconfig-paths/register main.ts # 使用 node

npx ts-node --showConfig
# --swc 隐含 --transpileOnly
npx ts-node --esm --swc --experimentalSpecifierResolution=node \
  run.ts                       # 约等于 tsx run.ts
```

**tsconfig.json#ts-node**

```json title="tsconfig.json"
{
  "extends": "ts-node/node16/tsconfig.json",
  // 针对 ts-node 的配置
  "ts-node": {
    "transpileOnly": true, // 忽略类型检查，更快
    "files": true, // 从 tsconfig.json 读取 files, include, exclude
    "require": ["tsconfig-paths/register"],
    "compilerOptions": {
      "module": "commonjs"
    }
  }
}
```

```json
{
  "ts-node": {
    "transpileOnly": true,
    "swc": true,
    "esm": true,
    "experimentalSpecifierResolution": "node"
  }
}
```

| env                      | demo                                              |
| ------------------------ | ------------------------------------------------- |
| TS_NODE_COMPILER_OPTIONS | `{"module":"commonjs"}`                           |
| TS_NODE_PROJECT          | ./tsconfig.commonjs.json                          |
| NODE_OPTIONS             | --trace-deprecation --abort-on-uncaught-exception |

# FAQ

### Unknown file extension ".ts"

- https://github.com/TypeStrong/ts-node/issues/1062


## 检测在 ts-node 运行

```ts
var detectTSNode = false;

try {
    if (process[Symbol.for("ts-node.register.instance")]) {
        detectTSNode = true;
    }
} catch() {
}
```

- https://github.com/yorickdevries/detect-ts-node/blob/master/index.js
