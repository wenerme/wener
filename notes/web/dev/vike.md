---
title: vite
---

# vite

- [vikejs/vike](https://github.com/vikejs/vike)
  - MIT, TS
  - vite-plugin-ssr -> vike

:::caution

- Project is Not Ready
  - 暂时建议还是使用 Next.js

:::

```bash
npm add vike vike-react

# 关闭 .gitignore
VIKE_CRAWL="{git:false}" npm run dev
```

- 目录
  - `index/`
  - `pages/`
  - `src/pages/`
  - `(GROUP)/`
  - `renderer/`
    - 非框架场景 - vike-{react,vue,solid}
  - `public/`
- +Page.tsx
- +Layout.tsx
- +guard.ts
- +config.ts
- 会考虑 .gitignore
  - `VIKE_CRAWL="{git:false}"`
