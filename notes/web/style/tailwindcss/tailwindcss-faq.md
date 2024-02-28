---
tags:
- FAQ
---

# TailwindCSS FAQ

## As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.

```
warn - As of Tailwind CSS v2.2, `lightBlue` has been renamed to `sky`.
warn - Update your configuration file to silence this warning.
```

```js
const colors = require('tailwindcss/colors');
// 忽略弃用的颜色
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
```

- https://github.com/tailwindlabs/tailwindcss/issues/4690#issuecomment-1046087220

## prettier-plugin-tailwindcss

- custom > component > utility
- utility
  - sort by override
  - modifiers last
- h -> w
- x -> y
- https://github.com/tailwindlabs/prettier-plugin-tailwindcss

## rem -> px

- rem to px [#1232](https://github.com/tailwindlabs/tailwindcss/issues/1232)
