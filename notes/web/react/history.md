---
title: history
---

# history

- [remix-run/history](https://github.com/remix-run/history)
  - 实现 router 的基础
  - 对应 window.[history](https://developer.mozilla.org/en-US/docs/Web/API/History)
- [api-reference](https://github.com/remix-run/history/blob/main/docs/api-reference.md)
  - createPath,parsePath - url <-> location
  - createBrowserHistory, createHashHistory, createMemoryHistory
    - 三种不同的状态管理方式
  - history
    - createHref - browser 会考虑 `<base/>`
    - back,go
    - forward - `go(1)`
    - location - 当前 location
    - `listen(({ action, location })=>{})`
    - push, replace
    - block
  - location - pathname,search,hash,state,key
    - key - 唯一标识符，自动生成
- 配合 [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern) 可实现简单的路由功能
  - Chrome 95+
