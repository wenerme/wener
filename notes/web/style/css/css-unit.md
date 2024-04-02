---
title: CSS Unit
---

# CSS Unit

- container query - https://www.w3.org/TR/css-contain-3/#container-lengths
  - `cq{w,h}`
    - 早期为 `q{w,h}`
  - cqi - inline size
  - cqb - block size
  - cqmin - `min(cqi,cqb)`
  - cqmax - `max(cqi,cqb)`
- [CSS Values and Units Level 4](https://drafts.csswg.org/css-values-4/#viewport-relative-lengths)
  - `dv{w,h}` - Large Viewport Units
  - `lv{w,h}` - Small Viewport Units
  - `sv{w,h}` - Dynamic Viewport Units
- https://www.w3.org/TR/css-writing-modes-4
  - writing modes
    - 水平和垂直，影响 block 和 inline 判定
  - block size, logical height
    - physical height, vertical dimension
    - 因为 block 都是占整行，所以 block size 是指代 高
  - inline size, logical width
    - physical width - horizontal dimension
