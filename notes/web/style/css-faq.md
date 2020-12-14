---
title: CSS 常见问题
---

## 父节点 min-heigh, 子节点百分比 heigh 无效
* Fix
  1. parent 添加 `height:1px;`
  2. parent flex flex-col, child flex-1
  3. 如果 parent 的 min-heigh 是数值而非百分比，child 使用 `min-height: inherit;` 也可以

```html
<!-- begin snippet: js hide: false console: true babel: false -->

<!-- language: lang-css -->

    html, body {
      height: 100%;
      margin: 0;
    }

    #parent {
      min-height: 100%;
      background: pink;
    }

    #child {
      height: 100%;
      background: aqua;
    }

<!-- language: lang-html -->

    <div id="parent">
      <div id="child">
        Hello World!
      </div>
    </div>

<!-- end snippet -->
```

## 默认字体

font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir, Helvetica, sans-serif;

## 字体单位如何选择
* 考虑因素
  * 支持缩放
  * 支持不同设备 - 缩放
  * 响应式样式 - 缩放+断点
  * 设计图
* 单位
  * rem - 基于 `<html>` font-size 的相对单位
* 数值
  * 375 / 16 = 23.4375
* 参考
  * [Is text sizing dead?](https://alastairc.ac/2017/11/is-text-sizing-dead/)
    * Myth: Pixels units for text are bad for accessibility
    * Myth: Don’t use pixels in media queries
      * 实际不影响
  * [vitalets/react-native-extended-stylesheet#19](https://github.com/vitalets/react-native-extended-stylesheet/issues/19)
  * [移动端长度适配方案](https://github.com/wscj/blog/issues/14)
  * [Taro 设计稿及尺寸单位](https://nervjs.github.io/taro/docs/size.html)


```html
<meta name="viewport" content="width=device-width, initial-scale=1">
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
