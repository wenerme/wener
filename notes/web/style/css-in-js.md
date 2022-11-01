---
title: CSS in JS
---

# CSS in JS

:::tip

CSS in JS 本身是非常麻烦的事情，需要考虑的问题

- 什么环境使用？
  - React, Vue, Next.js, Babel
- 什么场景使用？
  - 主题、应用、组件库
- 是否需要支持上下文？
- 怎么基于状态进行样式控制？
- 使用 css in js 怎么与 postcss 集成？
  - 例如: styled-jsx, styled 怎么使用 tailwindcss
    - 通常使用 babel 抽取，但目前 babel 已经被逐渐替代
  - 大多 css in js 都不易与 postcss 集成，如果确定需要支持 postcss，可以筛选掉大半
- Build time or Runtime css processing ?
- 是否需要 parse css ?
  - 对象还是字符串？

总不会错的选择

- 是基于 pesudo 或 `data-*` 控制状态样式
- 尽量使用 css module
- 避免使用 scss, less 等 flavor
- stick to tailwindcss
- stick to postcss

:::

:::caution

- emotion, styled 依赖环境支持 - 注入 Root Registry
- css module 需要 bundler 支持 - 应用一般没问题，作为库会有问题

:::

| name                                        | size/gzip   | postcss   | ZeroRT |
| ------------------------------------------- | ----------- | --------- | ------ |
| [@emotion/styled](./emotion.md)             | 11kB,5kB    |
| [styled-components](./styled-components.md) |             |
| [styled-jsx](../react/styled-jsx.md)        |             | ✅(babel) |
| [@vanilla-extract/css]                      | 72kB,24kB   |           | ✅     |
| @linaria/core                               | 698B,434B   |           | ✅     |
| @linaria/react                              | 5.6kB,2.8kB |
| [goober]                                    | 2.5kB,1.3kB | ❌        |

[@vanilla-extract/css]: https://github.com/vanilla-extract-css/vanilla-extract
[goober]: https://github.com/cristianbote/goober

- styled 现在是主要支持的形式，早期由 styled-components 实现，现在大多都以 styled 为标准接口。
- styled-components 现在使用 emotion
- goober
  - 调用 setup 设置环境 - `setup(React.createElement,/*prefixer,theme,forwardProps*/)`
- [React: CSS in JS techniques comparison](https://github.com/MicheleBertoli/css-in-js)
- [callstack/linaria](https://github.com/callstack/linaria)
  - Zero-runtime CSS in JS library
  - 依赖 babel
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
