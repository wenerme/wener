---
tags:
  - Version
---

# DaisyUI Version

- https://daisyui.com/docs/changelog/

## DaisyUI v5

- 基于 [TailwindCSS v4](../tailwindcss/tailwindcss-version.md#tailwindcss-v4)
- 利用新的特性
  - `@layer`, `@property`, `color-mix()`, `@starting-style` , anchor positioning, container queries
- 参考
  - https://daisyui.com/blog/daisyui-5-upcoming-changes/

## DaisyUI v4

- 颜色类型调整 hsl -> oklch
  - `hsl(var(--p))` -> `oklch(var(--p))`
  - Chrome/Edge 111+, Safari 15.4+, Firefox 113+
- 颜色调整
  - 移除 `*-focus` - 之前只用于 button
    - `bg-[color-mix(in_oklab,oklch(var(--p)),black)]`
  - darker 使用 `color-mix`
- 默认支持 rlt
  - `<html dir=rlt>`
  - https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values
- 组件调整
  - tab 的 item 不需要重复 `tab`
  - tabs 使用 flex -> grid
  - button
    - 不默认大写
- 新组件
  - timeline
  - skeleton
  - diff
  - theme-controller
- 新主题
  - Dim
  - Nord
  - Sunset
