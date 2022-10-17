---
title: Ant Design
---

# Ant Design

# Versions

## antd v5

- React 18
- 不再支持 IE
- dayjs 替代 moment
- 接口统一
  - open/visible -> open
  - searchValue, onSearch ,showSearch
  - dropdownClassName -> popupClassName
- 更多的数据驱动组件
  - 不使用 React 的 Component 作为语法糖
  - TreeSelect, select, Tree, AutoComplete, Cascader, Dropdown, Menu, Mentions, Table
- 使用 CSS in JS 方案 [ant-design/cssinjs](https://github.com/ant-design/cssinjs)
  - 不再使用 LESS
- 新组件
  - WaterMark, Tour, QrCode, Floating Button
- [#33862](https://github.com/ant-design/ant-design/issues/33862)
- https://kitchen.alipay.com/

## antd mobile v5

- 使用 use-gesture 处理手势
- 使用 react-spring 处理动画
- 使用 CSS 变量
