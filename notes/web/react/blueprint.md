---
title: BlueprinrJS
---

# BlueprinrJS

- [palantir/blueprint](https://github.com/palantir/blueprint)
- [Blueprint v4.0 & v5.0 semantic swap](https://github.com/palantir/blueprint/wiki/Blueprint-v4.0-&-v5.0-semantic-swap)

:::not

- bundle icons you actually use [#2193](https://github.com/palantir/blueprint/issues/2193)
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
