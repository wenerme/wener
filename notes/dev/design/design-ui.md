---
title: Design UI
tags:
  - UI
---

# Design UI

:::tip

- 尽量是 Headless + Style
- Headless - 无样式，只有逻辑
  - @radix-ui/react
  - @react-aria
  - @react-stately
  - @headlessui/react
- Style
  - tailwindcss
  - daisyui

:::

- Design Token
  - Design Token 是一种在设计和开发中用于定义和管理视觉样式的标准化方式，能够将设计系统中的关键样式信息（如颜色、字体、间距等）抽象为小的、可重用的、跨平台的值。
  - 这些 Token 以通用格式（如 JSON 或 YAML）表示，可以在不同工具和技术栈之间共享和一致地应用。
  - [amzn/style-dictionary](https://github.com/amzn/style-dictionary)
    - Apache-2.0, JS
    - build system for creating cross-platform styles.
    - Playground https://www.style-dictionary-play.dev/
  - [sturobson/Awesome-Design-Tokens](https://github.com/sturobson/Awesome-Design-Tokens)
  - https://m3.material.io/foundations/design-tokens/overview
  - https://spectrum.adobe.com/page/design-tokens/
  - https://atlassian.design/tokens/design-tokens
- Profile
  - banner image
  - avatar/logo
  - title/full name
  - email
  - job title/org
  - website/url
  - location
  - bio/description/tagline/summary
    - atom:subtitle
  - stats
  - contact
- Combobox
  - 输入+选择
  - typeahead、搜索、异步
- HoverCard
  - Profile + Action/Quick Action
  - https://indieweb.org/hovercard
  - https://www.radix-ui.com/primitives/docs/components/hover-card
- Popover
- The Atom Syndication Format [rfc4287](https://datatracker.ietf.org/doc/html/rfc4287)
  - type - text, html, xhtml
  - person
    - atom:name
    - atom:url
    - atom:email
- 参考
  - https://m3.material.io/components
  - https://m2.material.io/components

## Chip

- 类似 badge，但是可以操作
- 快捷的显示关联关系
- 特点
  - 紧凑
    - Chips 是紧凑的组件，代表离散的信息。
  - 相关
    - Chips 应该与它们代表的内容或任务有明确且有帮助的关系。
  - 专注
    - Chips 应该使任务更容易完成，或使内容更容易分类。

**参考**

- https://m3.material.io/components/chips
- https://m2.material.io/components/chips
  - Assist chip
  - Filter chip
  - Input chip
  - Suggestion chip
- https://designsystem.line.me/LDSG/components/inputs/chip-en

# FAQ

## Pick vs Select

> Picker vs Selector

- Pick - 挑选
  - 更加随意 - 选择的内容不一定固定
  - 使用场景：
    - 配色器（Color Picker）：用户可以从调色板中挑选任意颜色。
    - 图标选择器（Icon Picker）：用户可以从图标库中挑选任意图标。
    - 日期选择器（Date Picker）：用户可以从日历中挑选任意日期。
- Select - 选择
  - 更加正式 - 选项固定
  - 使用场景：
    - 下拉菜单（Dropdown）：用户从预定义的选项中选择一个。
    - 组合框（Combobox）：用户可以从预定义的选项中选择一个或输入新的选项。
    - 单选按钮（Radio）：用户从一组单选按钮中选择一个。
    - 复选框（Checkbox）：用户可以从一组复选框中选择多个。

## React as vs asChild

- as
  - 替代组件
  - 优势 👍
    - 更支持更复杂的结构
  - 劣势 👎
    - 定义 props 类型相对麻烦，特别是有 forwardRef 的时候
    - forwardRef 不能使用 arrow function 定义 - 无法指定泛型, 只能强制 cast
- asChild
  - 使用子组件
  - 优势 👍
    - 更简单
    - 更好的类型支持 - 类型处理更简单，不需要考虑实际组件的 props
  - 劣势 👎
    - 多一层结构
    - 无法支持复杂的结构
    - 需要 merge props
  - 参考
    - @radix-ui/react-slot - https://www.radix-ui.com/primitives/docs/utilities/slot
      - Slot, Slottable

```tsx
export type AsProps<E extends React.ElementType> = Omit<React.ComponentProps<E>, 'as'> & {
  as?: E;
};

export type WithAsProps<E extends React.ElementType, P extends {} = {}> = P & AsProps<E>;

//
export type LayoutProps<E extends React.ElementType> = WithAsProps<E>;
const Layout = ({ as, children }) => {
  const As = as || 'div';
  // 这种时候想要用 asChild 需要将 header 提取为独立组件，使用类似 Layout.Root, Layout.Header 方式来封装更细粒度组件
  return (
    <As>
      <header>...</header>
      {children}
    </As>
  );
};
```
