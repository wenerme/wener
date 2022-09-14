---
title: 盲水印
---

# 盲水印

- LSB
- StegSolve
- R/G/B/A Plane 0/1/2
- 参考
  - [fire-keeper/BlindWatermark](https://github.com/fire-keeper/BlindWatermark)
  - https://stegonline.iculture.cc/
  - 通过 archive 避免 https://archive.ph/

## 知乎水印

```js
Array.from(document.querySelectorAll('#root > div > div')).filter(ele=>getComputedStyle(ele).backgroundImage.startsWith(`url("data:image/svg+xml;`))
Array.from(document.querySelectorAll('[class*="css-"]')).filter(ele=>getComputedStyle(ele).backgroundImage.startsWith(`url("data:image/svg+xml;`))
```
