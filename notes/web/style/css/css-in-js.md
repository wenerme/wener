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

- vanilla-extract
  - Zero-runtime Stylesheets-in-TypeScript
- styled 现在是主要支持的形式，早期由 styled-components 实现，现在大多都以 styled 为标准接口。
- emotion
  - [@swc/plugin-emotion](https://www.npmjs.com/package/@swc/plugin-emotion)
- styled-components 现在使用 emotion
- [facebook/stylex](https://github.com/facebook/stylex)
  - MIT, Flow
  - 静态生成
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
  - [Compiled](https://compiledcssinjs.com/)
  - [vanilla-extract](https://vanilla-extract.style/)
  - [Linaria](https://linaria.dev/)
- [wix/stylable](https://github.com/wix/stylable)
- [Why We're Breaking Up with CSS-in-JS](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b)
- [CSS Evolution](https://medium.com/@perezpriego7/css-evolution-from-css-sass-bem-css-modules-to-styled-components-d4c1da3a659b)
- [Styled Components: To Use or Not to Use?](https://medium.com/building-crowdriff/styled-components-to-use-or-not-to-use-a6bb4a7ffc21)
- [CSS Modules vs Styled Components](https://hashnode.com/post/css-modules-vs-styled-components-ciz2g9dt7000h7c535j35rbfu)
- css 预处理: [stylis.js](https://github.com/thysultan/stylis.js)
- native 转换逻辑: [css-to-react-native](https://github.com/styled-components/css-to-react-native)
- 传入 css 推荐: [MDN: CSS.escape](https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape)
- [babel-plugin-styled-components](https://github.com/styled-components/babel-plugin-styled-components): 解决 SSR 时的 HTML attribute mismatch 问题。

## Styled Snippets

```js
// 两个 && 优先级更高，覆盖全局
const Thing = styled.div`
  && {
    color: blue;
  }
`

const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`

// @keyframes 不会被限定在单个组件 - 可以通过 keyframes
// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;


// 通过 props 访问主题
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;
// 默认主题
Button.defaultProps = {
  theme: {
    main: "palevioletred"
  }
}
// 定义主题
const theme = {
  main: "mediumseagreen"，

  fg: "palevioletred",
  bg: "white",
};

// 使用函数调整主题
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});

// 使用主题
render(
  <div>
    <Button>Normal</Button>
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>

      <ThemeProvider theme={invertTheme}>
        <Button>Inverted Theme</Button>
      </ThemeProvider>
    </ThemeProvider>
  </div>
);
```
