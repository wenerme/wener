---
tags:
  - API
---

# URLPattern

- [URLPattern](https://developer.mozilla.org/en-US/docs/Web/API/URLPattern)
  - wicg [urlpattern](https://wicg.github.io/urlpattern)
  - 语法基于 [path-to-regexp](https://github.com/pillarjs/path-to-regexp)
    - `/posts/*`
    - `/books/:id`,
    - `/books/:id?`
    - `/books/:id+`
    - `/books/:id*`
    - `/books{/old}?`,
    - `/books/(^\d)`
    - `/books/:id(\\d+)`
    - `/blog/:id(\\d+){-:title}?`
    - `'data\\:foo*'` - data url
    - `/*.:filetype(jpg|png)`
  - Chrome 95+
- polyfill [kenchris/urlpattern-polyfill](https://github.com/kenchris/urlpattern-polyfill)

```js
new URLPattern({ pathname: '/books/:id' }).exec('https://example.com/books/123').pathname.groups;
```
