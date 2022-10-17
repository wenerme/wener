---
title: daisy
---

# daisy

- [saadeghi/daisyui](https://github.com/saadeghi/daisyui)
  - MIT, CSS
  - 基于 TailwindCSS 的一套 UI
- 主题
  - {primary,secondary,accent,neutral}-{,focus,content}
  - base-{100,200,300,content}
  - {info,success,warning,error}-{,content}
- [src/colors/themes.js](https://github.com/saadeghi/daisyui/blob/master/src/colors/themes.js)
  - 调整颜色
  - 部分调整 圆角+动画
- 参考
  - [daisyui/react-daisyui](https://github.com/daisyui/react-daisyui)

:::tip

- 注意为 border 设置颜色 - 不然不同主题下颜色不匹配

:::

**指定样式**

```html
<html data-theme="cupcake"></html>
```

- 也可以在任意元素上直接使用

| var              | for                                |
| ---------------- | ---------------------------------- |
| --{p,s,a,n}      | primary,secondary, accent, neutral |
| --{p,s,a,n}f     | -focus                             |
| --b{1,2,3,c}     | base-100,200,300,content           |
| --{in,su,wa,er}  | info, success, warning, error      |
| --{in,su,wa,er}c | -content - 默认 --nc               |

- 颜色 HSL
- focus 会 fallback 为非 focus 颜色
- --animation-btn: .25s; // btn 动画时间 - 0 无动画
- --animation-input: .2s; // input 动画时间 - 0 无动画
- --btn-text-case: uppercase;
- --btn-focus-scale: 0.95; - 1 为不缩放
- --border-btn: 1px;
- --tab-border: 1px;
- --tab-radius: 0.5rem;
- --rounded-box: 1rem;
- --rounded-btn: .5rem;
- --rounded-badge: 1.9rem;
