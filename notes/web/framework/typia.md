---
title: typia
---

# typia
- [samchon/typia](https://github.com/samchon/typia)
  - 基于 interface 生成
    - 生成 validator - 比 class-validator 更快
    - 生成 JSON 序列化方法
    - 生成 JSON Schema
  - 非标准环境可以手动生成 - `pnpm typia generate`
  - 例如: swc, esbuild, babel
  - vite 可以使用 plugin
  - AOT 依赖 [ts-patch](./ts-patch.md)
