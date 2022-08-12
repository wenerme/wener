---
title: eta.js
---

# eta

轻量模板引擎。

- [eta-dev/eta](https://github.com/eta-dev/eta)
  - 5.7kB/2.4kB
- `<%`, `%>`
- `<%~ val %>` 避免 escape
- `<%= val %>` 插值
- `-` 移除 1 空行
- `_` 移除 所有空白
- 数据名默认为 `it`
- 内置
  - `include(name,options)`
  - `includeFile(path,options)`
- used by
  - Docusaurus v2
    - 生成 SSR Build
