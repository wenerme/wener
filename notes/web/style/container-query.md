---
title: Container Query
---

# Container Query

- Chrome 105+ - LayoutNG M105
- mdn [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
  - 容器
    - `container: <type> <name>`
    - container-type:
      - size - inline-size + block-size
      - inline-size - 宽
      - block-size - 高
      - style
      - state
    - container-name - 自定义名字
  - 元素
    - `@container (<query>)`
      - min-width - inline-size
- caniuse [CSS Container Queries](https://caniuse.com/css-container-queries)
- Chrome [Feature: Container Queries](https://www.chromestatus.com/feature/6525308435955712)
- [GoogleChromeLabs/container-query-polyfill](https://github.com/GoogleChromeLabs/container-query-polyfill)
  - 重写 现在的 CSS - 不好用
