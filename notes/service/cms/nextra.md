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

```bash
pnpm add next react react-dom
pnpm add nextra nextra-theme-{docs,blog}

pnpm run next dev
```

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

## Notes

- 内容目录 ./content, ./src/content
- 默认后缀 js, jsx, ts, tsx, md mdx
- env
  - NEXTRA_LOCALES
  - NEXTRA_DEFAULT_LOCALE
- 通过插件 resolve 的虚拟 module
  - private-next-root-dir
  - private-next-content-dir
- 核心逻辑 loader - webpack loader
  - findMetaAndPageFilePaths
    - 内容目录 `**/_meta.{js,jsx,ts,tsx}`, `**/*.{md,mdx}`
    - appDir 目录
      - 会额外扫描 `**/page.{js,jsx,jsx,tsx,md,mdx}`, `_meta.global.{js,jsx,ts,tsx}`
      - 会排除 `_` 开头目录
  - `const { pageMap, mdxPages } = convertToPageMap({filePaths})`
  - `_meta.global.`
  - `convertPageMapToJs({ pageMap, mdxPages, globalMetaPath })`
- 构建的 pageMap 会通过 `placeholder.js` 访问
  - `{pageMap: PageMapItem[]}`

```ts
type TPageItem = { name: string; route: string; __pagePath: string };
type TMetaItem = { __metaPath: string };

interface TFolder<T = TItem> {
  name: string;
  route: string;
  children: T[];
}

export type TItem = TPageItem | TMetaItem | TFolder;

export type PageMapItem = Folder | MdxFile | MetaJsonFile;
export interface Folder<FileType = PageMapItem> {
  name: string;
  route: string;
  children: FileType[];
}
export type MdxFile<FrontMatterType = FrontMatter> = {
  name: string;
  route: string;
  frontMatter?: FrontMatterType;
};
export type MetaJsonFile = {
  data: {
    [fileName: string]: Meta;
  };
};
```

## Nextra v4

- NextJS 15 app route
- React 19
