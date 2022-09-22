---
title: NodeJS
---

# NodeJS

| flag                               | for                 | seealso                                                                       |
| ---------------------------------- | ------------------- | ----------------------------------------------------------------------------- |
| --experimental-vm-modules          | ESM                 |
| --experimental-import-meta-resolve | import.meta.resolve | ponyfill [import-meta-resolve](https://github.com/wooorm/import-meta-resolve) |

## NPM 镜像

```bash
alias cnpm="npm --registry=https://registry.npm.taobao.org --disturl=https://npm.taobao.org/dist"
```

- [CNPM](https://npm.taobao.org/)
- [npm star](https://www.npmjs.com/browse/star)

```bash
node -r ts-node/register -r tsconfig-paths/register
```
