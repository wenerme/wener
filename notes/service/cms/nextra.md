---
title: nextra
---

# nextra

:::tip

- 支持 SSG, SSR, ISR

:::

- [shuding/nextra](https://github.com/shuding/nextra)
  - Next.js Static Site Generator
  - remark
  - 高亮 [shikijs](https://github.com/shikijs/shiki)
  - markdown 由 [nextra/loader](https://github.com/shuding/nextra/blob/core/packages/nextra/src/loader.ts) 处理
- https://nextra.site/showcase
- templates
  - https://github.com/shuding/nextra-docs-template
- 参考
  - [nextapps-de/flexsearch](https://github.com/nextapps-de/flexsearch)
  - https://nextra.site/about#credits

:::notes

- 不支持 app layout [#2023](https://github.com/shuding/nextra/issues/2023)
  - 但 app 和 pages 可以共存
- 暂不支持 turbopack [#1054](https://github.com/shuding/nextra/issues/1054)
- Nextra 3 [#1421](https://github.com/shuding/nextra/issues/1421)
  - ESM only

:::

- /
  - theme.config.{jsx,tsx}
  - pages/
    - index.{md,mdx}
    - \_meta.json
      - title 映射
      - 顺序

## markdown
**GFM**

```
## 标题 [#title]
```

- 高亮语言
  - VSCode TextMate Grammar
  - https://github.com/shikijs/shiki/blob/main/docs/languages.md


## docs

**theme.config.jsx**

```jsx
// https://nextra.site/docs/docs-theme/theme-configuration
export default {
  logo: <span>My Nextra Documentation</span>,
  project: {
    link: 'https://github.com/wenerme/wener',
  },
};
```

**\_meta.json**

```json
{
  "index": {
    "title": "Home",
    "type": "page",
    "theme": {
      "layout": "raw",
      "typesetting": "article",
      "breadcrumb": false,
      "footer": true,
      "sidebar": false,
      "toc": true,
      "pagination": false
    }
  },
  "contact": {
    "display": "hidden"
  },
  "about": "About Us",
  "github_link": {
    "title": "Wener Github",
    "href": "https://github.com/wenerme",
    "newWindow": true
  },
  "company": {
    "title": "Company",
    "type": "menu",
    "items": {
      "about": {
        "title": "About",
        "href": "/about"
      },
      "contact": {
        "title": "Contact Us",
        "href": "mailto:hi@example.com"
      }
    }
  },
  "*": {
    "type": "page"
  },
  "---": {
    "type": "separator"
  }
}
```

- typesetting - default, article
- layout - raw, full
