---
title: favicon
---

# favicon

- 建议一个大的 png + svg 即可
  - png 推荐 128+
- favicon.ico 是未压缩 bitmap - 比较大 - 建议做 16x16
- 参考
  - [real favicon generator](https://realfavicongenerator.net/)
    - 生成工具
  - [Favicon Standard - 2021 - svg, ico, png and dimensions?](https://stackoverflow.com/questions/48956465)
  - wikipedia [favicon](https://en.wikipedia.org/wiki/Favicon)
  - [favicon-cheat-sheet](https://gist.github.com/leommoore/6415005)
  - We analyzed 425k favicons [HN](https://news.ycombinator.com/item?id=28933391)

```html
<link rel="icon" href="favicon.ico" type="image/ico" />
<link rel="icon" href="favicon.svg" type="image/svg+xml" />

<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
<link rel="shortcut icon" href="/icons/favicon.ico" />
```

```bash
#convert favicon.svg -resize 64 favicon.png
convert favicon.svg -define icon:auto-resize=64,48,32,16 favicon.ico

brew install librsvg
rsvg-convert -h 128 -w 128 --keep-aspect-ratio --background-color=none favicon.svg > favicon.png
cp favicon.png in.png
convert in.png -gravity center -background transparent -extent 128x128 favicon.png
oxipng -o max -i 0 --strip safe *.png
```

## dark

1. svg style 控制

```xml
<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
  <style>
    rect {
      fill: green;
    }
    @media (prefers-color-scheme: dark) {
      rect {
        fill: red;
      }
    }
  </style>
  <rect width="50" height="50" rx="5" />
</svg>
```

2. js 控制

```html
<head>
  <link rel="icon" href="a.png" id="light-scheme-icon" />
  <link rel="icon" href="b.png" id="dark-scheme-icon" />
</head>
<script>
  matcher = window.matchMedia('(prefers-color-scheme: dark)');
  matcher.addListener(onUpdate);
  onUpdate();

  lightSchemeIcon = document.querySelector('link#light-scheme-icon');
  darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

  function onUpdate() {
    if (matcher.matches) {
      lightSchemeIcon.remove();
      document.head.append(darkSchemeIcon);
    } else {
      document.head.append(lightSchemeIcon);
      darkSchemeIcon.remove();
    }
  }
</script>
```

---

- https://catalin.red/svg-favicon-light-dark-theme/

## favicon

```
https://www.google.com/s2/favicons?domain=wener.me&sz=256
https://icons.duckduckgo.com/ip3/wener.me.ico
https://icon.horse/icon/wener.me
https://favicongrabber.com/api/grab/wener.me
```

- `https://favicongrabber.com/api/grab/wener.me`
  - https://github.com/antongunov/favicongrabber.com
- [pomdtr/fetch-favicon](https://github.com/pomdtr/fetch-favicon)
- [BlackGlory/parse-favicon](https://github.com/BlackGlory/parse-favicon)
  - Parse HTML to get icon
- [mat/besticon](https://github.com/mat/besticon)
