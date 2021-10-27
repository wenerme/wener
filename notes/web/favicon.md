---
title: favicon
---

# favicon

- 建议一个大的 png + svg 即可
  - png 推荐 128+
- ico 是未压缩 bitmap - 比较大
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
