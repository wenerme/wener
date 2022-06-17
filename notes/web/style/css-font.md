---
title: CSS Font
---

# CSS Font

- font-display - auto, block, swap, fallback, optional
  - 优化字体还未加载时的显示
- Saferi 12+
  - 停止支持 @font-face local - 白名单制
  - font-family 白名单制
  - 字体会内置回滚 - 例如 微软雅黑 -> PingFang SC
- 参考
  - https://web.dev/optimize-webfont-loading/
  - https://www.fontsquirrel.com/fonts/list/popular

## 默认字体

```css
body {
  /* 优先系统默认 */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

body {
  /* Sans-Serif */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji';

  /* Serif */
  font-family: Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif,
    Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;

  /* Monospace */
  font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
}
```

**中文**

```css
body {
  /* mac 优先 苹方 windows 优先 雅黑 */
  font-family: 'PingFang SC', 'Helvetica Neue', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Helvetica, Arial,
    Verdana, sans-serif;
}
```

## font-face

```css
@font-face {
  font-family: 'OpenSans';
  /* full name, postscript name, fallback */
  src: local('Open Sans'), local('Open Sans'), url('/fonts/OpenSans.woff');
}

@font-face {
  font-family: 'Montserrat';
  src: local('Montserrat'), url('/assets/fonts/Montserrat.ttf');
  /* 字体支持多种 weight */
  font-weight: 100 900;
}
```

## 字体 子集

- unicode-range
- [fonttools/fonttools](https://github.com/fonttools/fonttools) 可用于生成子集
- https://web.dev/reduce-webfont-size/#unicode

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
