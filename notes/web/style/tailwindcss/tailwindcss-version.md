---
tags:
  - Version
---

# TailwindCSS Version

## TailwindCSS v4

- 会用新的特性
  - @layer, @property, color-mix() , anchor positioning,
  - container queries
    - 不再需要插件
  - @starting-style
    - `starting:`
  - `not-*` - `not-hover:`, `not-supports-hanging-punctation:`
- 新增
  - inset-shaddow, inset-ring
  - field-sizing
  - color-schema
  - font-stretch
  - inert
  - `nth-*`
  - `in-*` - 类似 `group-*`, 但不需要 group 类
  - `**` - 所有子元素
    - 之前的 `*` 是 `> *`
- 移除
  - ~~text-opacity-\*~~ -> `text-{color}/*`
  - ~~flex-grow-\*~~ -> `grow-*`
  - ~~decoration-slice~~ -> `box-decoration-slice`
- tailwind.config.js 可以不再需要，直接通过 css 配置
- 默认不依赖 postcss
- 拆分包 `@tailwindcss/postcss`, `@tailwindcss/cli`
- 新增 `@tailwindcss/vite`
- 没有默认的 border 颜色 - 之前为 `gray-200`, 如果有主题需要注意重置颜色，现在不需要了，默认为 `currentColor`
- ring 默认宽度 `3px` -> `1px`

:::caution

- ~~tailwind.config.js~~ 直接使用 CSS 配置
- `@apply` 需要 `@reference`

:::

```css
@import 'tailwindcss';

@theme {
  /* 增加 font-display  */
  --font-family-display: 'Satoshi', 'sans-serif';

  /* 增加 3xl: 前缀 */
  --breakpoint-3xl: 1920px;

  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-neon-lime: oklch(91.5% 0.258 129);
  --color-neon-cyan: oklch(91.3% 0.139 195.8);

  /* reset */
  --color-*: initial;
}
```

扩展的方式

```css
@import 'tailwindcss/preflight' layer(base);
@import 'tailwindcss/utilities' layer(utilities);
```

**vite plugin**

```ts title="vite.config.ts"
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**postcss**

```js title="postcss.config.js"
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

---

- caniuse popover https://caniuse.com/mdn-api_htmlelement_popover
- https://tailwindcss.com/blog/tailwindcss-v4
- daisyUI 5
  - 会基于 TailwindCSS v4
  - https://daisyui.com/blog/daisyui-5-upcoming-changes/

## TailwindCSS v3.2

- 支持拆分配置导入

```css
@config "./tailwind.admin.config.js"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- @supports - `supports-[backdrop-filter]:bg-black/25`
- `aria-*`
- `data-*` - `data-[size=large]:p-8`
- breakpoints 支持最大限制 - `max-*:`
- 限定分组 - `group-*`,`peer-*`

```html
<div class="group is-published">
  <div class="hidden group-[.is-published]:block">Published</div>
</div>
```

- 插件 matchVariant 动态匹配
- 嵌套分组
  - `group/NAME`
- Container queries
  - [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries)
  - `@SIZE` - min-width
  - `@[200px]` - 可以任意
  - 限定名字 - `@container/main`, `@lg/main`

```html
<div class="@container">
  <div class="block @lg:flex">
    <!-- ... -->
  </div>
</div>
```

## TailwindCSS v3.1

- 新增任意选择符
  - `[&:nth-child(3)]:py-0`
  - `[@supports(backdrop-filter:blur(0))]:bg-white/50`
  - `[&>*]:p-4`
- Typescript 配置类型
- tailwindcss 命令行支持 import `-i`
- theme 函数支持透明度 `background-color: theme(colors.gray.100 / 50%);`
- 配置支持更方便的透明度
  - 之前 `{primary: withOpacityValue('--color-primary')}`
  - 现在 `{primary: 'rgb(var(--color-primary) / <alpha-value>)'}`
- 新增 table 的 border-separate + border-spacing
- 新增 enabled:, optional: 伪类前缀
- 新增 contrast-more:, contrast-less:
- dialog backdrop:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## TailwindCSS v3

- 默认 jit
- Just-in-Time CDN build
- 默认包含扩张颜色
- aspect-ratio, accent-color, scroll-snap, scroll-behavior, text-indent
- column break-before/inside/after
- touch-action
- will-change
- border-x, border-y
- file: - 文件上传按钮
- open: - `<details>`, `<dialog>`
- overflow-clip -> text-clip
- overflow-ellipsis -> text-ellipsis
- flex-basis
- fit-content for min/max-width/height
- min/max-content for min/max-height
- `cursor-*`
- 添加 `grow-*`, `shrink-*` 废弃 `flex-grow-*` and `flex-shrink-*`
- text-decoration-color
- addVariant API
- print variant
- 颜色 `fill-*`, `stroke-*`

```html
<!-- 自定义配置 -->
<script src="https://cdn-tailwindcss.vercel.app/"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          tomato: 'tomato',
        },
      },
    },
  };
</script>
<style type="text/tailwindcss">
  body {
    @apply bg-pink-500;
  }
</style>
<!-- 插件 -->
<script src="https://cdn-tailwindcss.vercel.app/?plugins=forms,typography,aspect-ratio,line-clamp"></script>
```

---

- https://tailwindcss.com/docs/upgrade-guide
- overflow-clip overflow-ellipsis -> text-clip text-ellipsis
- flex-grow-0 flex-shrink -> grow-0 shrink

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
/* 移除 */
/* @tailwind screens; */
@tailwind variants;
```

```js
module.exports = {
  // mode: 'jit', // 默认
  // purge -> content
  // purge: ['./src/**/*.tsx'],
  content: ['./src/**/*.tsx'],
  // darkMode: false,// 移除 - 默认包含
  theme: {
    extend: {},
  },
  // variants: { },  // 移除 - 默认包含
  plugins: [],
};
```
