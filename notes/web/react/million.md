---
title: million
---

# million

- [aidenybai/million](https://github.com/aidenybai/million)
  - MIT
  - <4kb
  - The Virtual DOM Replacement for React
- https://million.dev/blog/virtual-dom
  - Diff the data, not the DOM.
  - 适用场景
    - 大量静态内容但，少部分动态内容
    - "Stable" UI trees - 不做结构性变化
    - 细粒度场景优化

:::tip

- 功能和 [react compiler](./react-compiler.md) 有一定重复
  - https://twitter.com/aidenybai/status/1794192039808315427
  - https://million.dev/blog/lint-rc
    - million lint PGO - Profile Guided Optimization
    - 支持外部状态库优化


:::

```bash
npx million@latest # 自动 init
```

**vite**

```ts
import million from 'million/compiler';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [million.vite({ auto: true }), react()],
});
```

**nextjs**

```ts
import million from 'million/compiler';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
};

export default million.next(nextConfig, millionConfig);
```

## Rules

- https://million.dev/docs/manual-mode/block
- Block needs to be defined as a variable declaration.
- Deterministic returns

```ts
// Block 能被定义为变量

console.log(block(() => <div />)) // ❌ Wrong
export default block(() => <div />) // ❌ Wrong

// 👇👇👇

const Block = block(() => <div />) // ✅ Correct
```
