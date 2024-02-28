---
tags:
  - Version
---

# TailwindCSS Version

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
