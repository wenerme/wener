---
title: styled-jsx
---

# styled-jsx

- [vercel/styled-jsx](https://github.com/vercel/styled-jsx)

:::caution

- 默认不支持传递样式到 children [#573](https://github.com/vercel/styled-jsx/issues/573)
  - `.ment-item > a` 如果 a 是在一个组件里，无法影响到
  - 使用 `.menu-item > :global(a)`
  - 或者传递 css.resolve 返回的 className 到子组件

:::

```tsx
import css from 'styled-jsx/css';

// 全局样式 - 不使用 className 限定
const body = css.global`
  body {
    margin: 0;
  }
`;

// babel-plugin-macros 可作为 babel macros
const { className, styles } = css.resolve`
  a {
    color: green;
  }
`;
export default () => (
  <div>
    <style jsx>{`
      /* 通过不修饰 a 影响子组件 */
      div > :global(a) {
        // 通过 styled-jsx-plugin-postcss 使用 postcss - 使用 tailwind
        @apply text-red;
      }
    `}</style>

    {/* 通过传递 className 影响子组件 */}
    <Link className={className}>About</Link>
    {styles}

    {/* 渲染 global */}
    <style jsx global>
      {body}
    </style>
  </div>
);
```

## tailwind

- 启用后不会使用 SWC 编译 - 推荐使用 css module

```json title=".babelrc"
{
  "presets": [
    [
      "next/babel",
      {
        "styled-jsx": {
          "plugins": ["styled-jsx-plugin-postcss"]
        }
      }
    ]
  ]
}
```
