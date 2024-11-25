---
title: Development
tags:
  - Development
  - SDK
---

# Temporal Development

- https://github.com/temporalio/sdk-typescript/blob/main/packages/worker/src/workflow/bundler.ts
  - swc-loader
- 参考
  - https://api-docs.temporal.io/

## Can't extract inlined source map from the provided Workflow Bundle

- 默认 sourcemap 为相对路径，可能找不到

```bash
esbuild --sourcemap=inline
```

## ReferenceError: module is not defined

- workflow 使用 v8 isolate 运行

```bash
esbuild --banner:js="module = typeof module === 'undefined'? {exports:{}}:module"
```

## ReferenceError: **TEMPORAL** is not defined
