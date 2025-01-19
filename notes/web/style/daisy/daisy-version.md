---
tags:
  - Version
---

# DaisyUI Version

- https://daisyui.com/docs/changelog/

## DaisyUI v5

- 基于 [TailwindCSS v4](../tailwindcss/tailwindcss-version.md#tailwindcss-v4)
- 新增组件 List, Status, Fieldset, Label, Filter, Calendar, Validator, Dock
  - BottomNav -> Dock
  - Calendar 需要依赖实现，目前支持
    - `cally` web component
    - `pika-single` Pikaday
    - `react-day-picker` React DayPicker component
- CSS 变量名调整为完整的名字，值使用 color
  - `--b1` -> `--color-base-100`
  - `100% 0 0` -> `oklch(100% 0 0)`
- 新增 size `xl`
- 新增 `*-soft`, `*-dash` modifer
- 新增 `--depth`, `--noise` 控制可交互内容视觉效果
- 统一 btn size 计算 - 统一递增 2×4/0.5rem
  - xs `6 × 4 = 24px`
  - sm `8 × 4 = 32px`
  - md `12 × 4 = 48px` -> `10 × 4 = 40px`
  - lg `16 × 4 = 64px` -> `12 × 4 = 48px`
  - xl N/A -> `14 × 4 = 56px`
  - 之前几乎从来不用 `btn-md`, `btn-lg`, 统一后 md 和 lg 变得更有意义
- 统一 checkbox size 计算 - 统一递增 1×4/0.25rem
  - xd 4
  - sm 5
  - md 6
  - md `8 × 4 = 32px` -> `7 × 4 = 28px`
- 新增变量用于自定义
  - `--size-field` base size of fields like input, button, tab, etc.
  - `--size-selector` base size of selectors like checkbox, radio, toggle, badge, etc.
  - `--border` border size of components like button, input, tab, etc.
- 利用新的特性
  - `@layer`, `@property`, `color-mix()`, `@starting-style` , anchor positioning, container queries
- 参考
  - https://v5.daisyui.com/docs/v5-beta/
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
