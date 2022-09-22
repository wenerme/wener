---
title: ncc
---

# ncc

- [vercel/ncc](https://github.com/vercel/ncc)
  - Node.js 项目 -> 单文件
  - 使用 webpack bundle
  - 使用 babel 转译
- 参考
  - [acornjs/acorn](https://github.com/acornjs/acorn)
    - 使用的 JS 解析器
  - [@vercel/nft](https://github.com/vercel/nft)
  - [@vercel/webpack-asset-relocator-loader](https://github.com/vercel/webpack-asset-relocator-loader)
    - 静态依赖分析

```bash
npx -y @vercel/ncc build src/server.ts -o dist/ncc --target es2020 -s

# 直接运行 - 可用于测试,生成到临时目录
npx -y @vercel/ncc run src/server.ts --target es2020 -s
```

| flag       | for                                    |
| ---------- | -------------------------------------- |
| -t         | transpile-only ts 只转译，忽略类型错误 |
| -m         | minify                                 |
| -s         | source-map                             |
| -e         | external                               |
| --v8-cache |

## require is not defined

- 因为没有 bundle，导致 esm+cjs 会有问题
- 例如 fastify 是 cjs


```bash
# 如果 external 能避免
ncc build src/index.ts -m -s --target es2020 -e sqlite3 -e sqlite

# 否则只能 bundle
npx esbuild --bundle --outfile=dist/esm/server.js src/server.ts --platform=node --format=esm --charset=utf8 --target=chrome90 --sourcemap --external:{sqlite,pg,pg-hstore}

# rollup
npx rollup -e sqlite3,pg,pg-hstore --format es -m inline -o dist/es/server.js -i src/server.ts -p typescript -p node-resolve
```
