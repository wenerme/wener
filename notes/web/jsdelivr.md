---
title: jsdelivr
---

# jsdelivr

- [jsdelivr/jsdelivr](https://github.com/jsdelivr/jsdelivr)
  - CDN for NPM & Github Repo
- NPM
  - 添加 .min 可自动 minifiy - 例如 https://cdn.jsdelivr.net/npm/@wener/reaction@1.2.12/lib/esm/index.min.mjs
- 可以合并多个文件 - 构建自定义 bundle
  - `https://cdn.jsdelivr.net/combine/url1,url2,url3`
- https://www.jsdelivr.com/features

## data.jsdelivr.com

- https://data.jsdelivr.com/v1
- 版本
  - /package/npm/:name
  - /package/gh/:user/:repo
- 文件结构
  - /package/npm/:name@:version/:structure?
    - structure=tree,flat
  - /package/gh/:user/:repo@:version/:structure?
    - version 可以是 commit
- 获取版本 - 返回 `{"version":""}`
  - /package/resolve/npm/:name@:range
  - /package/resolve/gh/:user/:repo@:range
- /package/npm/:name@:version/entrypoints

---

- https://github.com/jsdelivr/data.jsdelivr.com
