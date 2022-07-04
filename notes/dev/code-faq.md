---
title: Code FAQ
tags:
  - FAQ
---

# Code FAQ

## 二分

```js
// 可能溢出
mid = (min + max) / 2;
// 避免溢出
mid = (max - min) / 2 + min;
```
