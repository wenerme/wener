---
title: Design Manifest
---

# Manifest

- 一种系统结构设计模式
  - 集中管理配置
  - 清晰的结构和文档
  - 模块化和解耦
  - 自动化和工具支持
- 依赖注入/DI 的依赖关系也可以认为是一种 Manifest
- Manifest 作为数据清单和中心化配置
  - 例如 docker compose, package.json, pom.xml
  - 例如 importmap, nextjs standalone
  - 参考
    - Vite 可以生成 `.vite/manifest.json`
      - `path` -> `assets`, `meta`
      - https://vitejs.dev/guide/backend-integration
- 参考
  - Web Extension
  - [Chrome Extension Manifest](https://developer.chrome.com/docs/extensions/reference/manifest)
  - VSC Extension [Manifest](https://code.visualstudio.com/api/references/extension-manifest)
  - [Distribute custom packages for Mac](https://support.apple.com/en-hk/guide/deployment/dep873c25ac4/web)
  - Java [manifest](https://docs.oracle.com/javase/tutorial/deployment/jar/manifestindex.html)
