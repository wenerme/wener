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
- [border 不支持渐变](#border-gradient)

:::

- `-webkit-user-modify`
- BEM - Block Element Modifier
  - by Yandex 2007
  - `.block` - `.block--mod`
  - `.block__elem` - `.block__elem--mod`
  - 目前已不太推荐，以前全局 CSS 容易冲突，现在很容易用 css module 和控制 scope
- [CSS](http://help.dottoro.com/lcsdaoxj.php) Reference

```css
.style {
  /* 对齐数字 */
  font-variant-numeric: tabular-nums;
}
```

## top layer

- https://developer.mozilla.org/en-US/docs/Glossary/Top_layer
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Stacking_context

## Media Query

- Print
  - @media print {}

## border 渐变 {#border-gradient}

- border 不支持渐变
- https://css-tricks.com/gradient-borders-in-css/
  - wrapper - 额外元素
  - border-image+border-image-slice - 不支持 radius
- https://codepen.io/AlexOverbeck/pen/axGQyv
  - by wrapper
- https://codepen.io/fabianmichael/pen/yLPyRry
  - by svg
  - 不支持 input 因为 input 不支持 `::before`
    - https://stackoverflow.com/a/4660434/1870054

## margin 重叠 {#margin-collapse}

- margin 塌陷
- 上下margin 塌陷后取大值
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing

## pure selector

- 能够被 prefix 的 selector
- 用于 css module

```css
/* 不是 pure selector */
:global(body) {
}
/* 是 pure selector - 会变成 .xyz body */
body {
}
```

## 浏览器兼容问题

- aspect-ratio - Chrom 88, Safari 15
  - 不支持的时候可能导致 height/width 为 0
  - 使用 padding hack
- @supports - Chrome 28, Safari 9
- @supports selector - Chrome 83, Safari 14.1

```css
@supports (aspect-ratio: 1/1) {
  aspect-ratio: 1/1;
}
@supports not (aspect-ratio: 1/1) {
  /* 补偿 */
}

/* 检测 selector 是否支持 */
@supports selector(:nth-child(1n of a, b)) {
}
```

```js
// 当前环境版本信息
navigator.userAgent;

// Chrome 61, Safari 9
CSS.supports('aspect-ratio: 1/1');
CSS.supports('aspect-ratio', '1/1');
```

### backdrop-filter

- Chrome 76+ 正式支持，之前加前缀
  - Chrome 对 backdrop filter 支持不太好
  - 如果页面使用了 mix-blend 会导致 blur 有问题 [#1254774](https://bugs.chromium.org/p/chromium/issues/detail?id=1254774&q=backdrop-filter%20blur&can=2)
- Safari 加前缀支持 - 效果正常
- FF 尚不支持
- tailwindcss backdrop-filter 可能没有 prefix
  - 使用 autoprefixer https://tailwindcss.com/docs/browser-support
  - 确保 browserslist 正确

通过 before 和 after 来补偿

- https://stackoverflow.com/a/65110535/1870054

## Optimize

- [contain](https://developer.mozilla.org/en-US/docs/Web/CSS/contain)
  - 声明包含关系，渲染不受 dom tree 影响，提效
  - strict -> size layout paint
  - content -> layout paint
  - size
    - 不依赖子节点 size
      - 不遍历子节点
      - 子节点变化不需要向上遍历重新布局
      - 需要为元素指定大小
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
    - https://www.w3.org/TR/css-contain-2/
    - https://web.dev/articles/content-visibility
    - [caniuse](https://caniuse.com/css-containment)
      - Chrome 52+
      - iOS/Saferi 不支持
    - [Let’s Take a Deep Dive Into the CSS Contain Property](https://css-tricks.com/lets-take-a-deep-dive-into-the-css-contain-property/)
    - https://css-tricks.com/almanac/properties/c/contain/
    - https://termvader.github.io/css-contain/
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

---

- Compositing and Blending Level 2
  - [isolation](https://drafts.fxtf.org/compositing/#isolation)
    - 强制创建 stacking context
    - 用于配合 mix-blend

### 避免 z-index 混淆

- 建立新的 z-index 栈 - isolation: isolate

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

## inline vs block

影响 Layout

- inline
  - 只能影响 tag 内 - 例如没有 margin
  - 不会影响 layout flow - 不换行
  - 只能包含 数据 和 inline 元素
- block
  - 通常开启新行
  - 可包含 inline 和 block

---

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories
  - Main
    - Meta

## 元素直接支持 resize

```css
.container {
  overflow: hidden; /* required by resize:both */
  resize: both;
}
```

## overflow + absolute

- https://stackoverflow.com/a/5513717/1870054
- https://front-back.com/how-to-make-absolute-positioned-elements-overlap-their-overflow-hidden-parent/

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

## scrollbar

- https://github.com/KingSora/OverlayScrollbars
- webkit-scrollbar
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

## css env

```css
:root {
  --sat: env(safe-area-inset-top);
  --sar: env(safe-area-inset-right);
  --sab: env(safe-area-inset-bottom);
  --sal: env(safe-area-inset-left);
}
```

```js
getComputedStyle(document.documentElement).getPropertyValue('--sat');
```

```css
/* 常见 */
body {
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}
```

- https://benfrain.com/css-environment-variables-iphonex/

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

## margin or not

- 推荐使用 gap
- margin 会影响外部
- https://mxstbr.com/thoughts/margin/

## breakpoint

| Chrome   | Width  |
| -------- | ------ |
| Mobile S | 320px  |
| Mobile M | 375px  |
| Mobile L | 435px  |
| Tablet   | 768px  |
| Laptop   | 1024px |
| Laptop L | 1400px |
| 4k       | 2560px |

- min-width - 移动端优先的设计方式

| breakpoint | tailwind | bootstrap | mui    |
| ---------- | -------- | --------- | ------ |
| sm         | 640px    | 576px     | 600px  |
| md         | 768px    | 768px     | 900px  |
| lg         | 1024px   | 992px     | 1200px |
| xl         | 1280px   | 1200px    | 1536px |
| 2xl,xxl    | 1536px   | 1400px    |

**buma**

| breakpoint | buma      |
| ---------- | --------- |
| mobile     | < 768px   |
| tablet     | >= 768px  |
| desktop    | >= 1024px |
| widescreen | >= 1216px |
| fullhd     | >= 1408px |

**md 2**

| size      | device  | column |
| --------- | ------- | ------ |
| 0-599     | phone   | 4      |
| 600-904   | tablet  | 8      |
| 905-1239  | tablet  | 12     |
| 1240-1439 | labtop  | 12     |
| 1440+     | desktop | 12     |

- material.io/design [Responsive layout grid](https://material.io/design/layout/responsive-layout-grid.html#breakpoints)
- https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints
- https://mui.com/material-ui/customization/breakpoints/
- https://bulma.io/documentation/overview/responsiveness/

## gradient

- https://www.colorzilla.com/gradient-editor/

## scroll shadow

- https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
- https://css-tricks.com/scroll-shadows-with-javascript/

## text-overflow

text-overflow 只有在容器的 overflow 属性为 hidden、scroll 或 auto 且 white-space: nowrap 时才会生效。
文本溢出只会发生在块级元素或 inline-block 元素上，因为元素需要有固定宽度才可能出现溢出。

## Defensive CSS

```css
.flex {
  display: flex;
  flex-wrap: wrap; /* defensive */
}

img {
  object-fit: cover;
}

.long-content {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.spacing {
  margin-right: 1rem;
}

.wrapper {
  --sizing: auto-fit; /* auto-fill */
  display: grid;
  grid-template-columns: repeat(var(--sizing), minmax(100px, 1fr));
  grid-gap: 1rem;
}

.bg {
  background-image: url('..');
  background-repeat: no-repeat; /* defensive */
}

.card__title {
  overflow-wrap: break-word;
  min-width: 0;
}
.modal__body {
  overscroll-behavior-y: contain; /*避免 parent 滚动*/
  overflow-y: auto;
}
.element {
  scrollbar-gutter: stable; /* 避免滚动条出现导致错位 */
}

/* https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover */
@media (hover: hover) {
  .card:hover {
    /* 避免移动设备 hover */
  }
}
```

- width -> min-width
- height -> min-height
- https://defensivecss.dev/

## table pin column

1. 使用 div 重新实现 table
1. `position: sticky`

- 需要计算偏移位置

1. 使用 `border-collapse: separate` + `border-spacing: 0`

- tailwindcss `border-separate border-spacing-0`

---

- https://stackoverflow.com/q/1312236/1870054

## 获取所有 CSS 变量

```js
Array.from(document.styleSheets)
  .filter((sheet) => sheet.href === null || sheet.href.startsWith(window.location.origin))
  .reduce(
    (acc, sheet) =>
      (acc = [
        ...acc,
        ...Array.from(sheet.cssRules).reduce(
          (def, rule) =>
            (def =
              rule.selectorText === ':root'
                ? [...def, ...Array.from(rule.style).filter((name) => name.startsWith('--'))]
                : def),
          [],
        ),
      ]),
    [],
  );
```

## text-stroke

> text outline, text border

- https://stackoverflow.com/a/4919231/1870054

## inline flex + flex warp 导致换行

- 使用 display:contents, 让元素作为 parent 的 children
