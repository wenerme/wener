---
title: Tailwind CSS
---

# Tailwind CSS

- 是什么？
  - CSS 样式工具集 - 通过 class 名字来组合样式
  - 将样式原子化
  - 高度定制化 - 颜色、大小、breackpoint、extend 等等
  - prune 可缩减大小 - 默认 未压缩 3.8 MB,Minified 3 MB, Gzip 300 KB, Brotli 75 KB
- 问题
  - [storybookjs/storybook#12668](https://github.com/storybookjs/storybook/issues/12668) - PostCSS 8 兼容问题
- 参考
  - [saadeghi/daisyui](https://github.com/saadeghi/daisyui)
    Tailwind Components
  - [windicss/windicss](https://github.com/windicss/windicss)
    - 类似 Tailwind+JIT

```bash
# 基础依赖
npm add tailwindcss postcss autoprefixer
# 兼容 storybook - PostCSS 7
npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9

# 初始化配置
# postcss.config.js tailwind.config.js
npx tailwindcss init -p

# 包含默认配置
# https://unpkg.com/browse/tailwindcss@2.0.1/stubs/defaultConfig.stub.js
npx tailwindcss init --full

# 自行构建
tailwind build ./src/styles/tailwind.css -o ./public/tailwind.css
```

```js
// 预构建好的 css
import 'tailwindcss/dist/tailwind.css';
// 基于 PostCSS 的 css
import 'tailwindcss/tailwind.css';
```

## tailwind.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## tailwind.config.js
* [配置](https://tailwindcss.com/docs/configuration)
* 默认配置 [stubs/defaultConfig.stub.js](https://unpkg.com/browse/tailwindcss/stubs/defaultConfig.stub.js)
  * 84 颜色
  * 5 breakpoint

```js
module.exports = {
  // 裁剪的基础用法
  purge: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
  ],
  purge: {
    enabled: false, // 是否裁剪不必要的定义
    preserveHtmlElements: true, // 是否保留 HTML 元素基础样式
    layers: ['components', 'utilities'], // 裁剪层
    mode: 'all', // 是否裁剪所有未用到的定义 - 不建议
    content: ['./src/**/*.html'],
    // PurgeCSS 直接传入参数
    options: {
      safelist: ['bg-red-500', 'px-4'],
    },
  },
  // 禁用插件可减少大小
  corePlugins: {
    float: false
  }，
  // 或者指定需要的插件
  corePlugins: [
    'margin',
    'padding',
  ]
};
```
