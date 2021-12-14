---
title: turborepo
---

# turborepo

- [vercel/turborepo](https://github.com/vercel/turborepo)
  - 类似 nx，但支持多 package；类似 bazel
  - 适用于 monorepo 构建
  - 支持缓存、依赖
- node_modules/.cache/turbo

```bash
npx -y create-turbo@latest
cd my-turborepo/
npm run dev
npm run build
```

**starter**

- /apps/
  - web/
  - docs/
- /packages/
  - ui/
  - config/ - eslint
  - tsconfig/
