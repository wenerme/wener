---
title: ts-node
---

# ts-node

> 推荐使用 [tsx](./tsx.md)

- [TypeStrong/ts-node](https://github.com/TypeStrong/ts-node)
  - node 直接执行 ts

```bash
npx ts-node main.ts # 直接执行 ts

npm i -D tsconfig-paths
npx ts-node -r tsconfig-paths/register main.ts              # tsconfig 里的 path 能生效
node -r ts-node/register -r tsconfig-paths/register main.ts # 使用 node

npx ts-node --showConfig
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

| env                      | demo                                              |
| ------------------------ | ------------------------------------------------- |
| TS_NODE_COMPILER_OPTIONS | `{"module":"commonjs"}`                           |
| TS_NODE_PROJECT          | ./tsconfig.commonjs.json                          |
| NODE_OPTIONS             | --trace-deprecation --abort-on-uncaught-exception |
