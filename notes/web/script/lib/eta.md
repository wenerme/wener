---
title: eta.js
---

# eta

轻量模板引擎。

- [eta-dev/eta](https://github.com/eta-dev/eta)
  - 5.7kB/2.4kB
  - 面向可信代码
- API
  - render{,Async} - 渲染 template，基于 views 进行文件 resolve
  - renderString{,Async} - 渲染字符串
  - loadTemplate - 加载模板
- 通过 `extends Eta` 覆盖 readFile, resolvePath 来实现自定义模板加载

```ts
const eta = new Eta({ views: path.join(__dirname, 'templates') });
const res = eta.render('./simple', { name: 'Ben' });
```

## 语法

- `<%`, `%>` - 支持自定义
- tag - 可以自定义
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
- `@NAMED`
  - 不会尝试 resolve 文件，直接从内存搜索模板
