---
tags:
  - References
---

# Tailwind CSS Reference

## Spacing

| screen | min width | container | rem   |
| ------ | --------- | --------- | ----- |
|        |           | 100%      |
| sm     | 640px     | 640px     | 40rem |
| md     | 768px     | 768px     | 48rem |
| lg     | 1024px    | 1024px    | 64rem |
| xl     | 1280px    | 1280px    | 80rem |
| 2xl    | 1536px    | 1536px    | 96rem |

- container - 实际为定义 max-w
- `max-{PREFIX}` 可以限定固定范围
  - `md:max-md:underline` - 限定在 md 范围内

| spacing |      size |    px |
| ------- | --------: | ----: |
| 0       |       0px |   0px |
| px      |       1px |   1px |
| 0.5     |  0.125rem |   2px |
| 1       |   0.25rem |   4px |
| 4       |      1rem |  16px |
| `<n>`   | n×0.25rem | n×4px |

- 0-4 - 0.5 递增
- 4-12 - 1 递增
- 12,14,16
- 20-96 - 4 递增
- spacing 用于 padding, margin, width, height, maxHeight, gap, inset, space, translate
- [Default spacing scale](https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale)

| rounded       |   rem |  px |
| ------------- | ----: | --: |
| xrounded-none |     0 |   0 |
| rounded-sm    | 0.125 |   2 |
| rounded       |  0.25 |   4 |
| rounded-md    | 0.375 |   6 |
| rounded-lg    |   0.5 |   8 |
| rounded-xl    |  0.75 |  12 |
| rounded-2xl   |     1 |  16 |
| rounded-3xl   |   1.5 |  24 |
| rounded-full  |  9999 |     |

## Width

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

## Font

| text      |       rem |     px |   diff |
| --------- | --------: | -----: | -----: |
| text-xs   |  0.75 rem |  12 px |  -2 px |
| text-sm   | 0.875 rem |  14 px |  -2 px |
| text-base |     1 rem |  16 px |      0 |
| text-lg   | 1.125 rem |  18 px |  +2 px |
| text-xl   |  1.25 rem |  20 px |  +2 px |
| text-2xl  |   1.5 rem |  24 px |  +6 px |
| text-3xl  | 1.875 rem |  30 px |  +6 px |
| text-4xl  |  2.25 rem |  36 px |  +6 px |
| text-5xl  |     3 rem |  48 px | +12 px |
| text-6xl  |  3.75 rem |  60 px | +12 px |
| text-7xl  |   4.5 rem |  72 px | +12 px |
| text-8xl  |     6 rem |  96 px | +24 px |
| text-9xl  |     8 rem | 128 px | +32 px |

| font            | weight |
| --------------- | ------ |
| font-thin       | 100    |
| font-extralight | 200    |
| font-light      | 300    |
| font-normal     | 400    |
| font-medium     | 500    |
| font-semibold   | 600    |
| font-bold       | 700    |
| font-extrabold  | 800    |
| font-black      | 900    |

## Container Query

| Name   | CSS                                          | diff  | w    |
| ------ | -------------------------------------------- | ----- | ---- |
| `@xs`  | `@container (min-width: 20rem /* 320px */)`  |       | w-80 |
| `@sm`  | `@container (min-width: 24rem /* 384px */)`  | +4rem | w-96 |
| `@md`  | `@container (min-width: 28rem /* 448px */)`  | +4rem |      |
| `@lg`  | `@container (min-width: 32rem /* 512px */)`  | +4rem |      |
| `@xl`  | `@container (min-width: 36rem /* 576px */)`  | +4rem |      |
| `@2xl` | `@container (min-width: 42rem /* 672px */)`  | +6rem |      |
| `@3xl` | `@container (min-width: 48rem /* 768px */)`  | +6rem |      |
| `@4xl` | `@container (min-width: 56rem /* 896px */)`  | +8rem |      |
| `@5xl` | `@container (min-width: 64rem /* 1024px */)` | +8rem |      |
| `@6xl` | `@container (min-width: 72rem /* 1152px */)` | +8rem |      |
| `@7xl` | `@container (min-width: 80rem /* 1280px */)` | +8rem |      |

- xs,sm,md,lg,xl - 4rem/step - 64px/step
- xl -> 7xl - 8rem/step - 128px/step

## Modifier

| Modifier          | CSS                                            |
| ----------------- | ---------------------------------------------- |
| hover             | `&:hover`                                      |
| focus             | `&:focus`                                      |
| focus-within      | &:focus-within                                 |
| focus-visible     | &:focus-visible                                |
| active            | &:active                                       |
| visited           | &:visited                                      |
| target            | &:target                                       |
| `*`               | `& > *`                                        |
| has               | &:has                                          |
| first             | &:first-child                                  |
| last              | &:last-child                                   |
| only              | &:only-child                                   |
| odd               | &:nth-child(odd)                               |
| even              | &:nth-child(even)                              |
| first-of-type     | &:first-of-type                                |
| last-of-type      | &:last-of-type                                 |
| only-of-type      | &:only-of-type                                 |
| empty             | &:empty                                        |
| disabled          | &:disabled                                     |
| enabled           | &:enabled                                      |
| checked           | &:checked                                      |
| indeterminate     | &:indeterminate                                |
| default           | &:default                                      |
| required          | &:required                                     |
| valid             | &:valid                                        |
| invalid           | &:invalid                                      |
| in-range          | &:in-range                                     |
| out-of-range      | &:out-of-range                                 |
| placeholder-shown | &:placeholder-shown                            |
| autofill          | &:autofill                                     |
| read-only         | &:read-only                                    |
| before            | &::before                                      |
| after             | &::after                                       |
| first-letter      | &::first-letter                                |
| first-line        | &::first-line                                  |
| marker            | &::marker                                      |
| selection         | &::selection                                   |
| file              | &::file-selector-button                        |
| backdrop          | &::backdrop                                    |
| placeholder       | &::placeholder                                 |
| sm                | @media (min-width: 640px)                      |
| md                | @media (min-width: 768px)                      |
| lg                | @media (min-width: 1024px)                     |
| xl                | @media (min-width: 1280px)                     |
| 2xl               | @media (min-width: 1536px)                     |
| `min-[…]`         | `@media (min-width: …)`                        |
| max-sm            | @media not all and (min-width: 640px)          |
| max-md            | @media not all and (min-width: 768px)          |
| max-lg            | @media not all and (min-width: 1024px)         |
| max-xl            | @media not all and (min-width: 1280px)         |
| max-2xl           | @media not all and (min-width: 1536px)         |
| `max-[…]`         | `@media (max-width: …)`                        |
| dark              | @media (prefers-color-scheme: dark)            |
| portrait          | @media (orientation: portrait)                 |
| landscape         | @media (orientation: landscape)                |
| motion-safe       | @media (prefers-reduced-motion: no-preference) |
| motion-reduce     | @media (prefers-reduced-motion: reduce)        |
| contrast-more     | @media (prefers-contrast: more)                |
| contrast-less     | @media (prefers-contrast: less)                |
| print             | @media print                                   |
| `supports-[…]`    | `@supports (…)`                                |
| aria-checked      | `&[aria-checked=“true”] `                      |
| aria-disabled     | `&[aria-disabled=“true”]`                      |
| aria-expanded     | `&[aria-expanded=“true”]`                      |
| aria-hidden       | `&[aria-hidden=“true”]`                        |
| aria-pressed      | `&[aria-pressed=“true”]`                       |
| aria-readonly     | `&[aria-readonly=“true”]`                      |
| aria-required     | `&[aria-required=“true”]`                      |
| aria-selected     | `&[aria-selected=“true”]`                      |
| `aria-[…]`        | `&[aria-…]`                                    |
| `data-[…]`        | `&[data-…]`                                    |
| rtl               | `[dir=“rtl”] &`                                |
| ltr               | `[dir=“ltr”] &`                                |
| open              | `&[open]`                                      |
