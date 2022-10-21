---
title: CSS in JS
---

# CSS in JS

| name                                        | bundle      |
| ------------------------------------------- | ----------- |
| [goober]                                    | 2.5kB/1.3kB |
| [@emotion/styled](./emotion.md)             | 11kb/5kB    |
| [styled-jsx](../react/styled-jsx.md)        |             |
| [styled-components](./styled-components.md) |             |
| [@vanilla-extract/css]                      | 72kB/24kB   |
| @linaria/core                               | 698B, 434B  |
| @linaria/react                              | 5.6kB,2.8kB |

[@vanilla-extract/css]: https://github.com/vanilla-extract-css/vanilla-extract
[goober]: https://github.com/cristianbote/goober

- styled 现在是主要支持的形式，早期由 styled-components 实现，现在大多都以 styled 为标准接口。
- styled-components 现在使用 emotion
- [React: CSS in JS techniques comparison](https://github.com/MicheleBertoli/css-in-js)
- [callstack/linaria](https://github.com/callstack/linaria)
  - @emotion/is-prop-valid
  - @linaria/core
  - @emotion/memoize
- polished
  - CSS in JS 的辅助库
- Compile Time CSS in JS
  - https://compiledcssinjs.com/
  - https://vanilla-extract.style/
  - https://linaria.dev/
- [wix/stylable](https://github.com/wix/stylable)
- [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)
