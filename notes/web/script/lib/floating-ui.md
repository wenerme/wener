---
title: floating-ui
---

# floating-ui

- [floating-ui/floating-ui](https://github.com/floating-ui/floating-ui)
  - 2021 popperjs 更名为 floating-ui
  - 支持 web, React Native, Canvas
- @floating-ui/core
- @floating-ui/react-dom
  - useFloating -> computePosition
- @floating-ui/react-dom-interactions
  - `<Tooltip/>`, `<Popover/>`, `<Select/>`, `<Dropdown/>`
- @floating-ui/react-native
- https://github.com/floating-ui/floating-ui/tree/master/packages/react/test/visual/components
- 浏览器
  - Chrome >= 73
  - Firefox >= 78
  - Edge >= 79
  - Safari >= 12.0
  - iOS >= 12.0
  - Opera >= 53

:::tip

- 建议加一层 wrapper 用于定位
  - 内部的内容可用于 transition
  - 例如 `useTransitionStyles` 的 style 和 floatingStyle 会冲突
- 不建议过度封装
  - 因为 很多功能可能存在特殊情况

:::
