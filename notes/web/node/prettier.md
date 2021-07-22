---
title: prettier
---

# prettier

- [prettier/prettier](https://github.com/prettier/prettier)
  - opinionated code formatter
  - Web/Node 开发的 gofmt

**prettier.config.js**

```js
// https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
};
```

## 排序 import

- [trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)

```bash
npm add @trivago/prettier-plugin-sort-imports
```

```js
module.exports = {
  printWidth: 80,
  tabWidth: 4,
  trailingComma: 'all',
  singleQuote: true,
  jsxBracketSameLine: true,
  semi: true,
  // @trivago/prettier-plugin-sort-imports
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^[./]'],
  importOrderSeparation: true,
};
```
