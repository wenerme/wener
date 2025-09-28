---
title: fumadocs
---

# fumadocs

- [fuma-nama/fumadocs](https://github.com/fuma-nama/fumadocs)
  - MIT, TS
  - 支持 NextJS, Vite, React Router, Tanstack Router
  - 提供 OpenAPI

```bash
# Generate src/.source from source.config.ts
npx fumadocs-mdx source.config.ts src/.source
```

# Notes

- Source -> File -> Page
  - Virtual files -> Virtual Storage -> Transformers -> Result
  - format = meta/page
- fumadocs-mdx
  - 支持 next 和 vite
  - source.config.ts
    - 定义 collections
      - DocCollection | MetaCollection | DocsCollection
    - 定义 MDX options
  - Loader fumadocs-mdx/loader-mdx
  - docs = meta + doc
- @content-collections/mdx
  - https://github.com/sdorra/content-collections

```ts
interface RuntimeFile {
  info: FileInfo;
  data: Record<string, unknown>;
}
interface AsyncRuntimeFile {
  info: FileInfo;
  data: Record<string, unknown>;
  content: {
    matter: string;
    body: string;
  };
  lastModified?: Date;
}
```

# FAQ

### [Remark Image] Failed obtain image size for svg
