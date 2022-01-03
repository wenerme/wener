---
title: CSS 常见问题
tags:
  - FAQ
---

# 常见问题

:::tip

- 布局谨记三个上下文:
  - containing block - 位置 - 影响 paint, relayout
  - stacking context - z-index
  - block formatting context - flow, float

:::

- [CSS](http://help.dottoro.com/lcsdaoxj.php) Reference

## Optimize

- [contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
  - 声明包含关系，渲染不受 dom tree 影响，提效
  - strict -> size layout paint
  - content -> layout paint
  - size
    - 不依赖子节点 size
    - 容器不会被子元素撑开
    - 子元素可以被渲染到容器外
  - layout
    - 内外元素布局互不影响
    - 例如 z-index
  - style
    - 样式隔离 - 例如 counter-increment, counter-set
    - 该规范 可能会 被移除
  - paint
    - 内容不会渲染到容器之外 - 类似 overflow: hidden
    - 影响上下文
      - 新的 [containing block] - position = absolute/fixed
      - 新的 stacking context
      - 新的 block formatting context
  - 参考
    - [caniuse](https://caniuse.com/css-containment)
      - Chrome 52+
      - iOS/Saferi 不支持
    - [Let’s Take a Deep Dive Into the CSS Contain Property](https://css-tricks.com/lets-take-a-deep-dive-into-the-css-contain-property/)
- [content-visibility](https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility) - 配合 contain 使用
  - visible
  - hidden
    - 隐藏，但保留渲染状态
    - display: none - 销毁渲染状态，再次显示重新渲染
    - visibility: hidden - 会保留在 DOM
    - 例如 用于多窗口 SPA，隐藏窗口用，再次显示不需要从新渲染
  - auto
    - 简单易用
    - 允许 user-agent 操作，例如 find-in-page, tab order navigation
    - contain 为 layout, style, paint
  - contain-intrinsic-size - 控制看不见时的 size
  - 参考
    - Chrome 85+
    - https://web.dev/content-visibility/
- [will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
  - 当真的有性能问题时在用
- background-color 为透明时影响 scroll 性能 - 因为需要计算后面
- 参考
  - DevTool Rendering 面板支持显示 Layer borders
    - https://developer.chrome.com/docs/devtools/evaluate-performance/reference/#layer-borders
  - https://csstriggers.com/
  - [What forces layout / reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a)
  - [尽可能减少浏览器重排](https://developers.google.com/speed/docs/insights/browser-reflow)

[containing block]: https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block

## visibility vs display

## Containing Block

- [Containing Block] 组成
  1. Content area
  1. Padding area
  1. Border area
  1. Margin area
- 基于 Containing Block 计算的属性
  - 百分比 width, height, padding, margin
  - 位置偏移 - 当 position 为 absolute 或 fixed 时
- html 为 initial containing block
- 形成 Containing Block 的场景
  - 受 positon 影响
  - position 为 absolute 或 fixed

## stacking context

- [The stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)
- 影响 z-index
- 形成场景
  - position = absolute or relative 且 z-index != auto
  - position = fixed or sticky
  - child of flex 且 z-index != auto
  - child of grid 且 z-index != auto
  - opacity < 1
  - mix-blend-mode != normal
  - isolate
  - contain = layout or paint

## block formatting context

- [Block formatting context]
- 影响 float, flow 布局
- 形成场景
  - float != none
  - position = absolute or relative
  - display: inline-block
  - display: table-cell
  - display: table-caption
  - overflow != visible or clip
  - contain: layout, content, or paint
  - flex items
  - grid items

[block formatting context]: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context

## Layout mode

- [Layout mode]
  - Normal flow
  - Table
  - Positioned
  - Multi-column - 内容多列 - 类似 报纸
  - Flexible
  - Grid

[layout mode]: https://developer.mozilla.org/en-US/docs/Web/CSS/Layout_mode

## Boxing

| Box type    | Composition                         |
| ----------- | ----------------------------------- |
| Margin box  | margin + border + padding + content |
| Border box  | border + padding + content          |
| Padding box | padding + content                   |
| Content box | content                             |

- https://github.com/alexreardon/css-box-model

## 元素直接支持 resize

```css
.container {
  overflow: hidden; /* required by resize:both */
  resize: both;
}
```

## 重置元素所有属性

```css
.container {
  /* 重置除了 unicode-bidi 和 direction 之外的所有属性 */
  all: initial;
}
```

## 只有键盘控制时才添加焦点外边框，鼠标点击无外边框

- :focus-visible - 键盘控制产生的 focus

```css
button:not(:focus-visible) {
  outline: none;
}
```

## 子节点有焦点时父节点添加样式

- :focus-within

## 匹配空节点

- :empty

## 避免 flex 容器溢出

- 添加 min-width: 0
- [Why](https://stackoverflow.com/a/66689926/1870054)
  - 默认 `min-width: auto` 允许元素占用更多空间

## 播放 png 精灵图

- https://codepen.io/zjun/pen/dGPqzQ

## display: table 不支持 max-height 和 overflow

- 建议使用 flex 模拟 table
  - thead 和 tbody 可能不同步
    - `overflow-x: hidden` 确保两个同步
  - `width: 100%` 可能显示不完整 - 滚动出的内容背景不完整
    - max-content 显示完整
    - 如果 width 不够会导致右侧滚动条看不到
- [CSS3 display:table, overflow-y:scroll doesn't work](https://stackoverflow.com/a/29156151/1870054)

## 父节点 min-heigh, 子节点百分比 heigh 无效

- Fix
  1. parent 添加 `height:1px;`
  2. parent flex flex-col, child flex-1
  3. 如果 parent 的 min-heigh 是数值而非百分比，child 使用 `min-height: inherit;` 也可以

```html
<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-css -->

html, body { height: 100%; margin: 0; } #parent { min-height: 100%; background: pink; } #child { height: 100%;
background: aqua; }

<!-- language: lang-html -->

<div id="parent">
  <div id="child">Hello World!</div>
</div>

<!-- end snippet -->
```

## 默认字体

```css
body {
  /* font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
```

## 字体单位如何选择

- 考虑因素
  - 支持缩放
  - 支持不同设备 - 缩放
  - 响应式样式 - 缩放+断点
  - 设计图
- 单位
  - rem - 基于 `<html>` font-size 的相对单位
- 数值
  - 375 / 16 = 23.4375
- 参考
  - [Is text sizing dead?](https://alastairc.ac/2017/11/is-text-sizing-dead/)
    - Myth: Pixels units for text are bad for accessibility
    - Myth: Don’t use pixels in media queries
      - 实际不影响
  - [vitalets/react-native-extended-stylesheet#19](https://github.com/vitalets/react-native-extended-stylesheet/issues/19)
  - [移动端长度适配方案](https://github.com/wscj/blog/issues/14)
  - [Taro 设计稿及尺寸单位](https://nervjs.github.io/taro/docs/size.html)

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

```js
let rem = 14;

if (width > 768) {
  rem = 45;
} else if (width > 414) {
  rem = 26;
} else if (width > 375) {
  rem = 18;
} else if (width > 320) {
  rem = 16;
}
```

```css
html {
  font-size: 16px;

  @media screen and (min-width: 900px) {
    font-size: 18px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 20px;
  }
}
```

## Scroll Snap

https://web.dev/snap-after-layout/

https://caniuse.com/#feat=css-snappoints
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Scroll_Snap

https://codepen.io/argyleink/pen/RwPWqKe

```css
@supports (scroll-snap-type: y mandatory) {
  .scroll-container {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }

  section {
    height: 100vh;
    scroll-snap-align: center;
  }
}
```

## webkit-scrollbar

- https://developer.mozilla.org/en-US/docs/Web/CSS/::-webkit-scrollbar

## iPhone X 页面内容 padding

- [“The Notch” and CSS](https://css-tricks.com/the-notch-and-css/)

1. CSS 控制

```css
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

2. viewport-fit=cover

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
/>
```

## font size 适应容器

1. SVG

```xml
<svg viewBox="0 0 56 18">
  <text x="0" y="15">Fit Me</text>
</svg>
```

2. 外部依赖

- [STRML/textFit](https://github.com/STRML/textFit)
- [rikschennink/fitty](https://github.com/rikschennink/fitty)
- https://github.com/kennethormandy/react-fittext/blob/master/src/FitText.js
- 参考
  - [fitting-text-to-a-container](https://css-tricks.com/fitting-text-to-a-container/)

## 性能

- [contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
  - strict

## Print size

- https://github.com/cognitom/paper-css/blob/master/paper.css
