---
title: BlueprinrJS
tags:
  - Design System
---

# BlueprinrJS

- [palantir/blueprint](https://github.com/palantir/blueprint)
- [Blueprint v4.0 & v5.0 semantic swap](https://github.com/palantir/blueprint/wiki/Blueprint-v4.0-&-v5.0-semantic-swap)
- 每个 PR 构建成功都会有个 Demo 页面
  - https://github.com/palantir/blueprint/pull/5667#issuecomment-1273593824
  - Demo 页能很好的预览所有组件样式
  - https://output.circle-artifacts.com/output/job/d898ab7d-232d-4915-8d3b-5e0476f6dcbe/artifacts/0/packages/demo-app/dist/index.html

:::warning

- bundle icons you actually use [#2193](https://github.com/palantir/blueprint/issues/2193)
  - icon 不支持 tree shake
- Removing findDOMNode [#3979](https://github.com/palantir/blueprint/issues/3979)

:::

## Blueprint 5.0

- `bp4-` -> `bp5-`
- 移除 React.findDOMNode
- 移除 decorator
  - @HotkeysTarget -> `<HotkeysTarget>` / useHotkeys
  - @ContextMenuTarget -> `<ContextMenuTarget>`
- Popper.js 2.0

## Blueprint 4.0

- `bp3-` -> `bp4-`
- React 16.8+
- iconfont -> svg
  - svg -> iconfont 使用 [tancredi/fantasticon](https://github.com/tancredi/fantasticon)
- 颜色对比度调整 WCAG 2.0 [1.4.3 Minimum Contrast](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html)
