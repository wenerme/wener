---
title: chi
---

# chi

- [go-chi/chi](https://github.com/go-chi/chi)
  - 提供方法更适合用于 REST 接口
  - 核心 < 1000 LOC
  - 0 外部依赖 - 自己实现 pattern 匹配逻辑
    - 基于 Patricia Radix trie - 性能优于遍历

```go
// 通配 所有
r.Method("GET","/admin/*", func(w,r){
  // 获取通配参数
  chi.URLParam(r, "*")
})
```

# FAQ

## vs mux

- 提供 interface - 更易于模块化
- 方法更加直观清晰
- 开发更活跃
