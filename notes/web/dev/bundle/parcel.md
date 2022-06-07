---
title: Parcel
---

# Parcel

- Parcel v2 - 2021/10/13

## Get Started

```bash
yarn init -y
cat << HTML > index.html
<html>
<body>
  <script src="./src/index.ts"></script>
</body>
</html>
HTML
mkdir -p src
cat << TS > src/index.ts
export {};
console.log('hello world');
TS

yarn add parcel-bundler --dev

# dev
yarn parcel index.html
```

## Parcel v2 vs Vite

- vite
  - unbundled dev server
  - 基于 Rollup 和 esbuild
  - 支持 SSR
- Parcel v2
  - Parcel & CSS compiler 使用 Rust

---

- https://github.com/vitejs/vite/discussions/5290
