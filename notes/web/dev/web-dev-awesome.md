---
tags:
  - Awesome
---

# Web Dev Awesome

- bundle size
  - https://bundlejs.com/
  - https://bundlephobia.com/
    - [pastelsky/bundlephobia](https://github.com/pastelsky/bundlephobia)
- [privatenumber/minification-benchmarks](https://github.com/privatenumber/minification-benchmarks)
- [JamieMason/syncpack](https://github.com/JamieMason/syncpack)
  - Consistent dependency versions in large JavaScript Monorepos.
- [vercel/nft](https://github.com/vercel/nft)
  - Node.js dependency tracing utility
- bundle
  - [unjs/unbuild](https://github.com/unjs/unbuild)
    - unified javascript build system
    - rollup
  - tsup
- [tclindner/npm-package-json-lint](https://github.com/tclindner/npm-package-json-lint)
- [webpro/knip](https://github.com/webpro/knip)
  - Find unused files, dependencies and exports
- [facebook/memlab](https://github.com/facebook/memlab)
  - 内存泄露检测
- .browserslistrc
  - https://github.com/browserslist/browserslist
- [antfu/node-modules-inspector](https://github.com/antfu/node-modules-inspector)

```bash
npx typesync          # 同步 @types/ 依赖
npx depcheck          # 检测缺少和无用依赖
npx sort-package-json # 对 package.json 排序 - prettier 也可以

# 格式化所有 package.json
npm exec --workspaces sort-package-json@latest
npm exec --workspaces -- prettier -w package.json

# 查看 native 模块
# npx native-modules
find node_modules -type f -name "*.node" 2> /dev/null | grep -v "obj\.target"
find node_modules -type f -name "*.node" 2> /dev/null | grep -v "obj\.target" | xargs ldd


# 依赖分析
pnpx node-modules-inspector
```
