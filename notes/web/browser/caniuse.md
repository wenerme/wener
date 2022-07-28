---
title: 浏览器兼容
---

# 浏览器兼容

| spec             | version                  |
| ---------------- | ------------------------ |
| BroadcastChannel | Chrome 54+, Safari 15.4+ |
| Proxy+Reflect    | Chrome 49+, Safari 10+   |
| `<dialog>`       | Chrome 37+, Safari 15.4+ |

- Reflect.getMetadata - 需要额外 import
  - [@abraham/reflection](https://github.com/abraham/reflection)
  - [reflect-metadata](https://github.com/rbuckton/reflect-metadata)
  - Spec https://rbuckton.github.io/reflect-metadata/

---

- interop-2022 - 主流浏览器 CSS 新特性同步
  - https://web.dev/interop-2022
  - https://wpt.fyi/interop-2022
- 参考
  - [browserslist/caniuse-lite](https://github.com/browserslist/caniuse-lite)
  - [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data)
