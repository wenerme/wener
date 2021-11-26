---
title: 响应式断点
---

# 响应式断点

- breakpoints

```json title="react grid - my prefer"
{
  "breakpoints": { "lg": 1200, "md": 996, "sm": 768, "xs": 480, "xxs": 0 },
  "columns": { "lg": 24, "md": 12, "sm": 6, "xs": 4, "xxs": 2 }
}
```

## tailwindcss

- https://tailwindcss.com/docs/breakpoints

```js title="tailwind.config.js"
module.exports = {
  theme: {
    screens: {
      // default
      // ==========
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      // can do
      // ==========
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      laptop: '1024px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
};
```

## bootstrap

- xs, sm, md, lg, xl
- https://getbootstrap.com/docs/4.1/layout/overview/#responsive-breakpoints

```scss title="min"
// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap

// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
```

```scss title="max"
// Extra small devices (portrait phones, less than 576px)
@media (max-width: 575.98px) {
}

// Small devices (landscape phones, less than 768px)
@media (max-width: 767.98px) {
}

// Medium devices (tablets, less than 992px)
@media (max-width: 991.98px) {
}

// Large devices (desktops, less than 1200px)
@media (max-width: 1199.98px) {
}
// Extra large devices (large desktops)
// No media query since the extra-large breakpoint has no upper bound on its width
```
