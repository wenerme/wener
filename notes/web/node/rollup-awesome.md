---
title: Rollup Awesome
tags:
- Awesome
---

# Rollup Awesome

- [rollup/awesome](https://github.com/rollup/awesome)

## 插件/plugins

- [rollup/plugins](https://github.com/rollup/plugins)
- [btd/rollup-plugin-visualizer](https://github.com/btd/rollup-plugin-visualizer)
  可视化 bundle 大小分析
- rollup-plugin-peer-deps-external
  - 将 peerDependencies 处理为 external

## @rollup/plugin-replace

```js
import replace from '@rollup/plugin-replace';

replace({
  'process.env.NODE_ENV': JSON.stringify('production'),
  __BUILD_DATE__: () => JSON.stringify(new Date()),
  __BUILD_VERSION__: 15,
});
```
