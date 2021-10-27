---
title: preact
---

# preact

- [preactjs/preact](https://github.com/preactjs/preact)
  - React 替代
    - preact - 10 kb
    - preact-compat - 13 kb
    - react - 7 kb
    - react-dom - 121 kb
  - 适用于 微前端 bundle 场景
- 参考
  - [preactjs/preact-compat](https://github.com/preactjs/preact-compat)

## rollup 替代 react

```js
export default {
  plugins: [
    alias({
      entries: [
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react', replacement: 'preact/compat' },
      ],
    }),
  ],
};
```
