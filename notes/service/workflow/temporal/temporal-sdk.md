---
title: temporal-sdk
---

# temporal-sdk

- https://github.com/temporalio/sdk-typescript/blob/main/packages/worker/src/workflow/bundler.ts
  - swc-loader

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

## ReferenceError: __TEMPORAL__ is not defined
