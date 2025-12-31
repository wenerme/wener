---
tags:
  - Reference
---

# CSS Reference

- [white-space](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
  - 空白 collapse/合并, lines wrap/换行
  - = white-space-collapse + text-wrap
    - white-space-collapse - 控制空白符合并
      - **collapse**
  - 控制 world 本事 break - overflow-wrap, word-break, hyphens

## Nesting

- `&`
  - Chrome 120+. Safari 17.2+
- [CSS Nesting Module](https://www.w3.org/TR/css-nesting-1/)
- [CSS Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting)
- caniuse [css-nesting](https://caniuse.com/css-nesting)

## Media Queries

```css
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) { ... }

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) { ... }

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) { ... }

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) { ... }
```
