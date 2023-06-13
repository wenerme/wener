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
# https://unpkg.com/browse/tailwindcss@2.0.1/stubs/defaultConfig.stub.js
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

### Awesome

- [ben-rogerson/twin.macro](https://github.com/ben-rogerson/twin.macro)
  - babel marco 预生成
- [tw-in-js/twind](https://github.com/tw-in-js/twind)
  - 不依赖 tailwindcss, 使用 tw 实时生成
  - +35kB/14kB
- [rogden/tailwind-config-viewer](https://github.com/rogden/tailwind-config-viewer)
  - Tailwind 配置预览
- [htmlstreamofficial/preline](https://github.com/htmlstreamofficial/preline)
  - 基于 tw 的组件 - 依赖 JS
  - 使用全局监听，通过 data-attr 控制
- https://flowbite.com
  - https://flowbite.com/tools/tailwind-cheat-sheet/
- [defaultConfig.stub.js](https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js#L7)
- [shuffle.dev](https://shuffle.dev) - 模板生成
- https://github.com/sw-yx/spark-joy/blob/master/README.md#tailwind-component-libraries
- https://javisperez.github.io/tailwindcolorshades
  - 颜色生成
- [tailwindlabs/prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
  - prettier 名字排序
- [windicss/windicss](https://github.com/windicss/windicss)
  - 类似 Tailwind+JIT
  - 不依赖 PostCSS - 用于不想依赖 PostCSS 的场景
  - 维护者后面可能会转向 unocss
- https://www.hyperui.dev/
- 渐变
  - https://hypercolor.dev/
    - 生成器
- Loaders
  - https://play.tailwindcss.com/OPAsySKNCd

**Components**

- [saadeghi/daisyui](https://github.com/saadeghi/daisyui)
  Tailwind Components
- [markmead/hyperui](https://github.com/markmead/hyperui)
  - for marketing, ecommerce and application UI
- [konstaui/konsta](https://github.com/konstaui/konsta)
  - iOS & Android 样式
  - React,Vue,Sevlte 组件
- [themesberg/flowbite](https://github.com/themesberg/flowbite)
  - 组件样式参考
- [TailGrids/tailwind-ui-components](https://github.com/TailGrids/tailwind-ui-components)
- https://tailwindcomponents.com/
- [cruip/tailwind-landing-page-template](https://github.com/cruip/tailwind-landing-page-template)
  - 首页模板
- [mertJF/tailblocks](https://github.com/mertJF/tailblocks)
  - Ready-to-use Tailwind CSS blocks.

**Projects**

- [vivek9patel/vivek9patel.github.io](https://github.com/vivek9patel/vivek9patel.github.io)
  - portfolio website of theme Ubuntu 20.04
- [juliomrqz/statusfy](https://github.com/juliomrqz/statusfy)
  - Status Page
    **Dashboard**
- [cruip/tailwind-dashboard-template](https://github.com/cruip/tailwind-dashboard-template)
- https://demos.creative-tim.com/notus-react
- [themesberg/tailwind-dashboard-windster](https://github.com/themesberg/tailwind-dashboard-windster)

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

## Cheatsheet

| screen | min width | container |
| ------ | --------- | --------- |
|        |           | 100%      |
| sm     | 640px     | 640px     |
| md     | 768px     | 768px     |
| lg     | 1024px    | 1024px    |
| xl     | 1280px    | 1280px    |
| 2xl    | 1536px    | 1536px    |

| spacing |      size |    px |
| ------- | --------: | ----: |
| 0       |       0px |   0px |
| px      |       1px |   1px |
| 0.5     |  0.125rem |   2px |
| 1       |   0.25rem |   4px |
| `<n>`   | n×0.25rem | n×4px |
| 4       |      1rem |  16px |

- spacing 用于 padding, margin, width, height, maxHeight, gap, inset, space, translate
- [Default spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale)

| text | rem       | px     |
| ---- | --------- | ------ |
| xs   | 0.75 rem  | 12 px  |
| sm   | 0.875 rem | 14 px  |
| base | 1 rem     | 16 px  |
| lg   | 1.125 rem | 18 px  |
| xl   | 1.25 rem  | 20 px  |
| 2xl  | 1.5 rem   | 24 px  |
| 3xl  | 1.875 rem | 30 px  |
| 4xl  | 2.25 rem  | 36 px  |
| 5xl  | 3 rem     | 48 px  |
| 6xl  | 3.75 rem  | 60 px  |
| 7xl  | 4.5 rem   | 72 px  |
| 8xl  | 6 rem     | 96 px  |
| 9xl  | 8 rem     | 128 px |

| font       | weight |
| ---------- | ------ |
| thin       | 100    |
| extralight | 200    |
| light      | 300    |
| normal     | 400    |
| medium     | 500    |
| semibold   | 600    |
| bold       | 700    |
| extrabold  | 800    |
| black      | 900    |

| max-width        | rem   | px     | note          |
| ---------------- | ----- | ------ | ------------- |
| max-w-xs         | 20rem | 320px  | screen 的一半 |
| max-w-sm         | 24rem | 384px  |
| max-w-md         | 28rem | 448px  |
| max-w-lg         | 32rem | 512px  |
| max-w-xl         | 36rem | 576px  |
| max-w-2xl        | 42rem | 672px  |
| max-w-prose      | 65ch  |
| max-w-screen-sm  |       | 640px  |
| max-w-screen-md  |       | 768px  |
| max-w-screen-lg  |       | 1024px |
| max-w-screen-xl  |       | 1280px |
| max-w-screen-2xl |       | 1536px |

## tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## tailwind.config.js

- [配置](https://tailwindcss.com/docs/configuration)
- 默认配置 [stubs/defaultConfig.stub.js](https://unpkg.com/browse/tailwindcss/stubs/defaultConfig.stub.js)
  - 84 颜色
  - 5 breakpoint
- https://tailwindcss.com/docs/configuration#core-plugins

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
<div className="flex flex-col">
  <header></header>

  <div className="flex-1 min-h-0 relative">
    <div className="absolute inset-0">content</div>
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

# FAQ

## As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.

```
warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.
warn - Update your configuration file to silence this warning.
```

```js
const colors = require('tailwindcss/colors')
// 忽略弃用的颜色
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
```

- https://github.com/tailwindlabs/tailwindcss/issues/4690#issuecomment-1046087220
