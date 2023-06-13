---
title: Ant Design
---

# Ant Design
- [ant-design/ant-design](https://github.com/ant-design/ant-design) - 不建议产品使用
  - 丰富强大的组件库

:::tip

- 非常适用于快速出原型和结果
- 非常适用于内部系统

:::

:::wanring 选型考虑

- **过于** 高度封装
  - 做出来的东西都差不多，一眼能看出来是 AntD 组件
  - 难自定义
  - 想把什么都做掉做好 - 但结果并不理想
- **大量依赖** 外部组件
  - 43 个依赖 - npm [dependencies](https://www.npmjs.com/package/antd?activeTab=dependencies)
  - 大量 `rc-xxx` - 外部组件用于实现单一功能 - 功能非常复杂
  - 但单一功能却都又比不上 react-table、react-hook-form 之类的专门组件 - 食之无味，弃之可惜
  - 且导致版本变化可能组件直接不兼容 - 例如 3->4 Form 和 Table
  - 大多 `rc-xxx` 的类型定义缺失，对 TS 也不友好，难看得到有什么属性 - 需要的时候得翻 `rc-xxx` 源码，但质量堪忧
- icon 组件现在不允许使用字符串，需要引入具体组件
  - 用开发便捷性换取 bundle size - 觉得不值得 - 因为 antd 一般用于后台系统，bundle size 次要
  - icon 难以直接配置使用
- 版本变化样式各方面变化较大 - 即便是小版本变化
  - 导致基本不可能自定义 antd 内部组件样式 - 维护成本高

> v3 -> v4 过后放弃使用 antd，转而尝试 [blueprintjs](./blueprint.md)，再之后选择了 [tailwindcss](../style/tailwindcss.md)。

:::

# Versions

| version             | date       |
| ------------------- | ---------- |
| [antd v5](#antd-v5) | 2022-11-18 |
| [antd v4](#antd-v4) | 2020-03    |

## antd v5

- React 18
- CSS In JS
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

## andt v4

- Form 变化很大
- Icon 变化很大
