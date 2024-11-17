---
title: path-to-regexp
tags:
  - Parser
  - Template
---

# path-to-regexp

- [pillarjs/path-to-regexp](https://github.com/pillarjs/path-to-regexp)
  - 8.x 版本不支持自定义 pattern `/user/:page(\d+)`
- 将字符串 template 解析为 TokenData
- 将 TokenData 编译为 regex
  - type: text, parameter, wildcard, group
  - group=optional
- 保留
  - `(`, `)`, `[`, `]`
- 参考
  - https://web.dev/urlpattern/
  - https://pshrmn.github.io/route-tester

```
/foo/:bar
/foo/:"my-name"
/:file{.:ext}
/files{/*path}
Wildcard /:foo/:bar/*baz
Optional /users{/:id}/delete
```
