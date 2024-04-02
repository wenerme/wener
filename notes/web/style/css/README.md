---
title: CSS
---

# CSS

## Spec

- [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)

## Topics

### Print

- [CSS Generated Content for Paged Media Module](https://www.w3.org/TR/css-gcpm-3)
- CSS Paged Media Module Level 3 https://drafts.csswg.org/css-page-3
- [page-break@css-tricks](https://css-tricks.com/almanac/properties/p/page-break/)
- https://www.smashingmagazine.com/2015/01/designing-for-print-with-css/
- https://developer.mozilla.org/en-US/docs/Web/CSS/@page
- http://papersizes.io/a/
- https://www.print-css.rocks/

```css
/*  页眉 */
@page {
  @top-center {
    content: element(pageHeader);
  }
}
#pageHeader {
  position: running(pageHeader);
}
```

### CSS 滤镜

- https://css-tricks.com/almanac/properties/f/filter/
- http://codepen.io/akademy/pen/FlkzB
  - 使用 :before 做背景并添加滤镜

```css
/* 对滤镜使用渐变 */
.active {
  transition: 1s filter linear;
  -webkit-transition: 1s -webkit-filter linear;
  -moz-transition: 1s -moz-filter linear;
  -ms-transition: 1s -ms-filter linear;
  -o-transition: 1s -o-filter linear;
}
```

### 在 CSS 中使用 FontAwesome

- [A list of Font Awesome icons and their CSS content values](http://astronautweb.co/snippet/font-awesome/)

```css
.mytextwithicon {
  position: relative;
}
.mytextwithicon:before {
  content: '\25AE'; /* 修改为需要的值 */
  font-family: FontAwesome;
  left: -5px;
  position: absolute;
  top: 0;
}
```

### flex

- [caniuse](http://caniuse.com/#feat=flexbox)
- [flexbugs](https://github.com/philipwalton/flexbugs) 由社区维护的 flex 在各个浏览器中的 BUG 和解决方法
- float, clear 和 vertical-align 不影响 flex 元素
- [A guide to flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [滚动内容](http://stackoverflow.com/a/14964944/1870054)

```css
/* 针对容器的属性 */
.container{
  display: flex;
  /* 排序方向 */
  flex-direction: row;
  /*flex-direction: row | row-reverse | column | column-reverse;*/

  /* 换行控制 */
  flex-wrap: nowrap
  /*flex-wrap: nowrap | wrap | wrap-reverse;*/

  /* flex-direction 和 flex-wrap 的缩写 */
  flex-flow: row nowrap;
  /*flex-flow: <‘flex-direction’> || <‘flex-wrap’>*/

  /* 内容间隔控制 */
  justify-content: flex-start;
  /*justify-content: flex-start | flex-end | center | space-between | space-around;*/

  /* 内容对齐控制 */
  align-items: flex-start;
  /*align-items: flex-start | flex-end | center | baseline | stretch;*/

  /* 控制内容有多行时的行间距 */
  align-content: flex-start;
  /*align-content: flex-start | flex-end | center | space-between | space-around | stretch;*/
}
/* 针对自身的属性 */
.item{
  /* 顺序控制 */
  /*order: <integer>;*/

  /* 宽度增长控制 */
  flex-grow: 0;
  /*flex-grow: <number>;*/

  /* 宽度收缩控制 */
  flex-shrink: 0;
  /*flex-shrink: <number>;*/

  /* 基础尺寸控制 */
  flex-basis: auto;
  /*flex-basis: <length> | auto;*/

  /* 参数缩写 */
  flex: 0 0 auto;
  /*flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]*/

  /* 元素对齐控制 */
  align-self: flex-start;
  /*align-self: auto | flex-start | flex-end | center | baseline | stretch;*/
}
```

### 文本溢出显示省略号

```css
.over-test {
  width: 300px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

### 避免点击高亮

- [Remove Gray Highlight When Tapping Links in Mobile Safari](https://css-tricks.com/snippets/css/remove-gray-highlight-when-tapping-links-in-mobile-safari/)

```css
.button {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
}
```

```js
// 允许 css 中的 :active 样式在移动端 safari 生效
document.addEventListener('touchstart', function () {}, true);
```

### visibility 在动画中的问题

- 在动画中如果结束 `visibility: hidden`, 那会导致直接不进行动画

```css
.target {
  /* 将 visibility 也加入转换, 时间等同 */
  transition: opacity 250ms ease-out, visibility 250ms linear;
}
```

### 避免 div 处理点击事件

- 当两个 div 重叠的时候, 不希望第一个透明的 div 处理事件
- 当 `opacity:0` 的时候, 不希望处理事件
- [pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events)
- [touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action)
  - 可用于手势控制
  - 支持的较好的只有 `manipulation`, 等同于 `pan-x pan-y pinch-zoom`
  - 左右滑,上下滑,缩放

```css
.overlay {
  pointer-events: none;
}
.container .button {
  pointer-events: auto;
}
```

### 比例宽高

- 可以用宽百分比+padding
- 可以用 vh/vw
- [Maintain the aspect ratio of a div with CSS](http://stackoverflow.com/questions/1495407)
- [Scaling Responsive Animations](https://css-tricks.com/scaling-responsive-animations/)

```css
.container {
  width: 100%;
  /* 4:3 */
  padding-bottom: 75%;
}

/* 保证绝对的 9/16, 并且在屏幕居中 */
.container {
  width: 100vw;
  height: calc(100vw * 16 / 9);
  transform: translateY(calc((100vw * 16 / 9 - 100vh) / -2));
}
```

| aspect ratio | padding-bottom value |
| ------------ | -------------------- |
| 16:9         | 56.25%               |
| 4:3          | 75%                  |
| 3:2          | 66.66%               |
| 8:5          | 62.5%                |
