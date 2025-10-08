---
title: PostCSS
---

# PostCSS

- https://github.com/postcss/postcss-cli

```bash
pnpm add postcss autoprefixer

pnpx postcss-cli -o dist/globals.css ./src/app/globals.cs
```

# FAQ

## Unknown error from PostCSS plugin. Your current PostCSS version is 8.4.24, but autoprefixer uses 7.0.39. Perhaps this is the source of the error below.

```bash
# 有多个版本
grep -E '/(postcss|autoprefixer)@' pnpm-lock.yaml

# tailwindcss v2
pnpm add tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
# https://github.com/tailwindlabs/tailwindcss/discussions/7180 v3 要求 8+
```

1. 降级 postcss
3. 调整用到的依赖
4. 强制覆盖版本

```json title="package.json"
{
  "pnpm": {
    "overrides": {
      "postcss": "^8",
      "autoprefixer": "^10"
    }
  }
}
```
