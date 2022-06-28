---
title: chi
---

# chi

- [go-chi/chi](https://github.com/go-chi/chi)
  - 提供方法更适合用于 REST 接口
  - 核心 < 1000 LOC
  - 0 外部依赖 - 自己实现 pattern 匹配逻辑
    - 基于 Patricia Radix trie - 性能优于遍历

:::caution

- 额外的 HTTP 方法需要先提前注册,否则不会路由
  - chi.RegisterMethod

:::

```go
// 通配 所有
r.Method("GET","/admin/*", func(w,r){
  // 获取通配参数
  chi.URLParam(r, "*")
})
```
