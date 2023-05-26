---
title: Font
---

# Font

- https://en.wikipedia.org/wiki/Monospaced_font
- https://en.wikipedia.org/wiki/Web_Open_Font_Format
  - 是对 SNFT 类型字体(TrueType,Opentype)的封装
  - 添加了压缩, zlib, 能达到 40% 左右的压缩率
  - 2.0 使用 Brotli 压缩
- [Mac OS X: Font locations and their purposes](https://support.apple.com/en-us/HT201722)
- https://codepen.io/ambarli/pen/mqRErQ
- [Can i use unicode range](https://caniuse.com/#search=unicode%20range)
- [Helvetica](https://en.wikipedia.org/wiki/Helvetica)
  - Regular, Oblique, Bold, Bold Oblique
- Helvetica Neue
  - Condensed Bold, Condensed Black, Ultra-light, Ultra-light Italic, Light, Light Italic, Regular, Italic, Bold, Bold Italic
- [JavaScript/CSS Font Detector](http://www.lalit.org/lab/javascript-css-font-detect/)
- [Js detech font](https://stackoverflow.com/a/3368855/1870054)
- 衬线体 [Serif](https://en.wikipedia.org/wiki/Serif)
- 无衬线体 [Sans-serif](https://en.wikipedia.org/wiki/Sans-serif)
- http://iosfonts.com/

```bash
system_profiler SPFontsDataType
fc-list: file family | grep \/Library
```

cursive

```html
<link href="http://fonts.googleapis.com/css?family=Codystar" rel="stylesheet" type="text/css" />
```

### 安全字体

- [CSS Web Safe Font Combinations](https://www.w3schools.com/cssref/css_websafe_fonts.asp)
- [Fonts included with macOS Sierra](https://support.apple.com/en-us/HT206872)
- [List of typefaces included with macOS](https://en.wikipedia.org/wiki/List_of_typefaces_included_with_macOS)
  - Helvetica
- [List of typefaces included with Microsoft Windows](https://en.wikipedia.org/wiki/List_of_typefaces_included_with_Microsoft_Windows)
  - Microsoft YaHei
- [网页设计中常用的 19 个 Web 安全字体](https://blog.csdn.net/joyous/article/details/51498105)

```css
body {
  font-family: 'Times New Roman', Times, serif;
}
body {
  font-family: 'PingFangSC', 'Microsoft YaHei', Helvetica, sans-serif;
}
```

## Roboto

- Android 默认字体
- https://github.com/google/roboto/
- https://fonts.google.com/specimen/Roboto

## Noto

- WebFont 预览版
  - https://fonts.google.com/earlyaccess
- [Noto Sans+SC Sliced](https://fonts.google.com/earlyaccess#Noto+Sans+SC+Sliced)
  - Unicode Range 版本

## Noto Sans SC Offline

```bash
# NotoSansSC
# 字体下载, 需要使用代理
# http://fonts.googleapis.com/earlyaccess/notosanssc.css
curl -L --remote-name-all fonts.gstatic.com/ea/notosanssc/v1/NotoSansSC-{Thin,Light,Regular,Medium,Bold,Black}.{woff2,woff,otf}

curl -L --remote-name-all -J- fonts.gstatic.com/ea/notosanssc/v1/NotoSansSC-{Thin,Light,Regular,Medium,Bold,Black}.woff2
```

**notosanssc.css**

```css
/*
* Noto Sans SC (Chinese Simplified) http://www.google.com/fonts/earlyaccess
* http://fonts.googleapis.com/earlyaccess/notosanssc.css
*/
@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 100;
  src: url(./NotoSansSC-Thin.woff2) format('woff2'), url(./NotoSansSC-Thin.woff) format('woff'),
    url(./NotoSansSC-Thin.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 300;
  src: url(./NotoSansSC-Light.woff2) format('woff2'), url(./NotoSansSC-Light.woff) format('woff'),
    url(./NotoSansSC-Light.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 400;
  src: url(./NotoSansSC-Regular.woff2) format('woff2'), url(./NotoSansSC-Regular.woff) format('woff'),
    url(./NotoSansSC-Regular.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 500;
  src: url(./NotoSansSC-Medium.woff2) format('woff2'), url(./NotoSansSC-Medium.woff) format('woff'),
    url(./NotoSansSC-Medium.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 700;
  src: url(./NotoSansSC-Bold.woff2) format('woff2'), url(./NotoSansSC-Bold.woff) format('woff'),
    url(./NotoSansSC-Bold.otf) format('opentype');
}

@font-face {
  font-family: 'Noto Sans SC';
  font-style: normal;
  font-weight: 900;
  src: url(./NotoSansSC-Black.woff2) format('woff2'), url(./NotoSansSC-Black.woff) format('woff'),
    url(./NotoSansSC-Black.otf) format('opentype');
}
```

## woff2

- https://github.com/google/woff2

## Builder

- https://birdfont.org/
- https://github.com/jaywcjlove/svgtofont
- https://github.com/adobe-type-tools/opentype-svg
