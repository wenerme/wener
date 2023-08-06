---
title: prettier
---

# prettier

- [prettier/prettier](https://github.com/prettier/prettier) 是什么?
  - opinionated code formatter
  - Web/Node 开发的 gofmt - JS/TS/Flow/JSX, CSS/SCSS/LESS, Vue, Angular
  - 支持 Markdown, GraphQL, YAML, JSON
- 参考
  - [plugins](https://prettier.io/docs/en/plugins.html)
    - php, pug, ruby, xml
    - 社区: go-template, java, kotlin, properties, svelte, toml, sh
  - [benjie/prettier-plugin-pg](https://github.com/benjie/prettier-plugin-pg)
    PostgreSQL
- 配置
  - .prettierrc.json
  - .prettierignore

:::caution

- YAML 无法调整 array 缩进
  - [redhat-developer/vscode-yaml#172](https://github.com/redhat-developer/vscode-yaml/issues/172)
  - [brodybits/prettierx](https://github.com/brodybits/prettierx)
- sort-imports 错误处理 `use client`/`use server` 指令 [prettier-plugin-sort-imports#185](https://github.com/trivago/prettier-plugin-sort-imports/issues/185)
  - 可以考虑用 ESLint sorting

:::

```bash
# 直接格式化
npx prettier --write src/**/*.{ts,tsx,css,html}
# 格式检查
npx prettier --check src/**/*.{ts,tsx,css,html}

# 项目依赖
npm add -D prettier

# 当前配置文件
prettier --find-config-path src/types.d.ts

prettier --write src --cache --cache-strategy metadata
```

**prettier.config.js**

```js
// https://prettier.io/docs/en/options.html
module.exports = {
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'all',
};
```

```json title="package.json"
{
  "prettier": {
    "bracketSameLine": false,
    "importOrder": ["^[^.]", "^[.][.]", "^[.][/]"],
    "importOrderSeparation": false,
    "trailingComma": "all",
    "printWidth": 120,
    "singleQuote": true,
    "overrides": [
      {
        "files": ["*.html", "*.css"],
        "options": {
          "singleQuote": false
        }
      }
    ]
  },
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
```

```bash title="配合 lint-staged"
npm install --save-dev husky lint-staged
npx husky install
npm set-script prepare "husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```

## 排序 import

- [trivago/prettier-plugin-sort-imports](https://github.com/trivago/prettier-plugin-sort-imports)

```bash
npm add -D @trivago/prettier-plugin-sort-imports
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

## plugins

- prettier-plugin-sql
- prettier-plugin-sh
- prettier-plugin-pkg
  - package.json

---

- [rx-ts/prettier](https://github.com/rx-ts/prettier)
  - sql,sh,pkg
- https://prettier.io/docs/en/plugins.html

## ignore
- prettier-ignore

```jsx
<div>
  {/* prettier-ignore */}
  <span     ugly  format=''   />
</div>
```

```html
<!-- prettier-ignore -->
```

## SyntaxError: This experimental syntax requires enabling one of the following parser plugin(s): "decorators", "decorators-legacy".

```
importOrderParserPlugins: ['typescript', 'decorators-legacy'],
```
