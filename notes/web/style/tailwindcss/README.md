---
title: Tailwind CSS
---

# Tailwind CSS

- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) 是什么？
  - CSS 样式工具集 - 通过 class 名字来组合样式
  - 将样式原子化
  - 高度定制化 - 颜色、大小、breackpoint、extend 等等
  - prune 可缩减大小 - 默认 未压缩 3.8 MB,Minified 3 MB, Gzip 300 KB, Brotli 75 KB
- 问题
  - [storybookjs/storybook#12668](https://github.com/storybookjs/storybook/issues/12668) - PostCSS 8 兼容问题
- 参考
  - [lib-vite-tailwindcss](https://miyauchi.dev/posts/lib-vite-tailwindcss/) 构建库

:::tip

- 嵌套 group - v3.2+
  - `group/NAME`
- 支持 Container Query - v3.2+
  - `@container`, `@lg:p-8`
  - [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries)
- 支持任意选择 - v3.1+
  - `[&>*]:text-red`
  - `[&_thead_th:first-child]:text-red`
  - `[&:[data-open]]:underline`
- 支持任意值 - v3.0+
  - `w-[30px]`
  - `w-[calc(100%-30px)]`
- tailwindcss v3 要求 postcss 8+

:::

:::info

- ~~Container queries [#1563](https://github.com/tailwindlabs/tailwindcss/issues/1563)~~
  - [dgknca/tailwindcss-container-query](https://github.com/dgknca/tailwindcss-container-query)
- ~~不支持嵌套 group [#1192](https://github.com/tailwindlabs/tailwindcss/issues/1192)~~
- rem to px [#1232](https://github.com/tailwindlabs/tailwindcss/issues/1232)

:::

```bash
# 基础依赖
npm add tailwindcss postcss autoprefixer
# 兼容 storybook 5 - PostCSS 7
# npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

# 初始化配置
# postcss.config.js tailwind.config.js
npx tailwindcss init -p

# 包含默认配置
# https://unpkg.com/browse/tailwindcss@3.4.1/stubs/config.full.js
npx tailwindcss init --full

# 自行构建
npx tailwind build ./src/styles/tailwind.css -o ./public/tailwind.css
# 持续构建
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

```js
// 预构建好的 css
import 'tailwindcss/dist/tailwind.css';
// 基于 PostCSS 的 css
import 'tailwindcss/tailwind.css';
```

## plugins

- @tailwindcss/typography
  - prose
  - not-prose
  - 用于 CMS 文章内容
  - [styles.js](https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js)
- [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)
  - input, select, textare
  - https://tailwindcss-forms.vercel.app/
- [@tailwindcss/line-clamp](https://github.com/tailwindlabs/tailwindcss-line-clamp)
  - line-clamp-{lines}
  - 截取文字到多少行
- @tailwindcss/aspect-ratio
  - v3 已经包含 aspect-ratio 工具
  - aspect-w-16, aspect-h-9

## plugin

- layers
  - base
    - typography
    - font-face
  - utilities
  - components

```ts
const plugin = require('tailwindcss/plugin');
const MyPlugin = plugin(
  function ({
    addUtilities,
    addComponents,
    matchUtilities,
    matchComponents,
    addBase,
    addVariant,
    matchVariant,
    theme,
    corePlugins,
    // escaping strings
    e,
    // looking up Tailwind configuration
    config,
    variants,
    postcss,
  }) {
    // 静态
    addUtilities({
      '.content-auto': {
        'content-visibility': 'auto',
      },
    });
    // 动态
    // tab-1 tab-[123]
    matchUtilities(
      {
        tab: (value) => ({
          tabSize: value,
        }),
      },
      { values: theme('tabSize') },
    );
    // base 层
    addBase({
      h1: { fontSize: theme('fontSize.2xl') },
      h2: { fontSize: theme('fontSize.xl') },
      h3: { fontSize: theme('fontSize.lg') },
    });
    // 组件层
    addComponents({
      '.card': {
        backgroundColor: '#fff',
        borderRadius: '.25rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        '&:hover': {
          boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
        },
        '@media (min-width: 500px)': {
          borderRadius: '.5rem',
        },
      },
    });

    // 修饰
    addVariant('optional', '&:optional');
    addVariant('hocus', ['&:hover', '&:focus']);
    addVariant('supports-grid', '@supports (display: grid)');
    addVariant('group-optional', ':merge(.group):optional &');
    addVariant('peer-optional', ':merge(.peer):optional ~ &');
  },
  // 插件配置
  function (options) {
    // 可以接受配置
    return {
      theme: {
        tabSize: {
          1: '1',
          2: '2',
          4: '4',
          8: '8',
        },
      },
    };
  },
);

module.exports = {
  plugins: [MyPlugin],
};
```

## container query

- 支持 Container Query - v3.2+
- `@container`, `@lg:p-8`
  - 自定义 `@[17.5rem]:underline`
- `@container/main`, `@lg/main:underline` - 命名容器
- `@container-normal` 元素不作为 container
- [@tailwindcss/container-queries](https://github.com/tailwindlabs/tailwindcss-container-queries)
- Chrome v106+, Safari 16.0+ 2022-09


```js
module.exports = {
  theme: {
    extend: {
      containers: {
        '2xs': '16rem',
      },
    },
  },
};
```

## tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## tailwind.config.js

- [配置](https://tailwindcss.com/docs/configuration)
- 默认配置 [config.full.js](https://unpkg.com/browse/tailwindcss@3.4.1/stubs/config.full.js)
  - 84 颜色
  - 5 breakpoint
- https://tailwindcss.com/docs/configuration#core-plugins
- Theme
  - https://tailwindcss.com/docs/theme
  - https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/config.full.js

```js
module.exports = {
  // 裁剪的基础用法
  purge: ['./src/**/*.html', './src/**/*.vue', './src/**/*.jsx'],
  purge: {
    enabled: false, // 是否裁剪不必要的定义
    preserveHtmlElements: true, // 是否保留 HTML 元素基础样式
    layers: ['components', 'utilities'], // 裁剪层
    mode: 'all', // 是否裁剪所有未用到的定义 - 不建议
    content: ['./src/**/*.html'],
    // PurgeCSS 直接传入参数
    options: {
      safelist: [
        'bg-red-500',
        'px-4',
        {
          pattern: /bg-(red|green|blue)-(100|200|300)/,
          variants: ['lg', 'hover', 'focus', 'lg:hover'],
        },
      ],
    },
  },
  // 禁用插件可减少大小
  corePlugins: {
    float: false,
  },
  // 或者指定需要的插件
  corePlugins: ['margin', 'padding'],
};
```

## Patterns

- 避免内容溢出
- 实现虚拟滚动窗口

```jsx
<div className='flex flex-col'>
  <header></header>

  <div className='flex-1 min-h-0 relative'>
    <div className='absolute inset-0'>content</div>
  </div>

  <footer></footer>
</div>
```

## JIT

- 颜色组合 - `bg-<color>/<opacity>`
- 任意值 - `w-[20px]`
- 临近节点选择 - `peer` `peer-checked:bg-blue-500`
- 简化使用 - transform, filter, backdrop-filter 直接使用
- 设置 content - `before:content-['hello']`

```html
<div data-content="hello world" class="before:content-[attr(data-content)] before:block"></div>
```

**important**

- `!` 前缀

```html
<p class="font-bold !font-medium sm:hover:!tw-font-bold">
  This will be medium even though bold comes later in the CSS.
</p>
```

## styled-jsx

```bash
npm add styled-jsx-plugin-postcss
```

```json
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

- styled-jsx 使用 @apply [#1234](https://github.com/tailwindlabs/tailwindcss/issues/1234)

## 命名分组/嵌套分组

- group-2, group-2-hover

```js
const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    groups: ['2', '3'],
  },
  plugins: [
    plugin(({ addVariant, theme }) => {
      const groups = theme('groups') || [];

      groups.forEach((group) => {
        addVariant(`group-${group}-hover`, () => {
          return `:merge(.group-${group}):hover &`;
        });
      });
    }),
  ],
};
```

## snippets

```css
.absolute-center {
  @apply absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2;
}
```

## nesting

- WebStrom: Language&Framework > Style Sheets > Dialects

```js title="postcss.config.js"
module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 选择直接子元素

```html
<ul class="children:p-4">
  <li>A</li>
</ul>
```

```js
module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('children', '& > *');
    },
  ],
};
```

---

- https://github.com/tailwindlabs/tailwindcss/pull/8299
- https://play.tailwindcss.com/h7eDGStsE9?file=config
