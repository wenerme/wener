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
- Chip
  - 类似 badge，但是可以操作
  - 快捷的显示关联关系
- The Atom Syndication Format [rfc4287](https://datatracker.ietf.org/doc/html/rfc4287)
  - type - text, html, xhtml
  - person
    - atom:name
    - atom:url
    - atom:email

# FAQ

## Pick vs Select

- Pick - 挑选
  - 更加随意 - 选择的内容不一定固定
  - 例如: 选择配色、选择图标、选择日期
- Select - 选择
  - 更加正式 - 选项固定
  - 通常用于 dropdown, combobox, radio, checkbox

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
