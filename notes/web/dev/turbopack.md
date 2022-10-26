---
title: turbopack
---

# turbopack


:::caution

alpha 阶段，还有 **太多太多** 的问题，不建议使用。

:::

```bash
next dev --turbo
# 目前 tw 需要额外处理
tailwindcss -i styles/globals.css -o styles/dist.css
```

- 在 app/layout.tsx import styles/dist.css

```js title="next.config.js"
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
};

module.exports = nextConfig;
```

## tailwindcss

```css title="src/styles/global.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```bash
pnpm tailwindcss -i src/styles/globals.css -o src/styles/dist.css --watch
```

```json
{
  "scripts": {
    "dev": "concurrently \"next dev --turbo\" \"tailwindcss -i src/styles/globals.css -o src/styles/dist.css --watch\"",
    "build": "tailwindcss -i src/styles/globals.css -o src/styles/dist.css --watch && next build"
  }
}
```
