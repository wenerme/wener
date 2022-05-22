---
title: Storybook
---

# Storybook

- [nextjs/examples/with-storybook](https://github.com/zeit/next.js/tree/canary/examples/with-storybook)
- 插件 - [addons](https://github.com/storybookjs/storybook/tree/next/addons)
  - actions - 纪录事件
  - links - 内部跳转
  - storysource - 查看源码
  - viewport - 不同设备视图
  - toolbars - 工具栏、上下文参数
- 问题
  - bundle 过大 - [#6391](https://github.com/storybookjs/storybook/issues/6391#issuecomment-530262331)
    - webpack 拆分
  - npm 7+react 17 兼容问题 [#14065](https://github.com/storybookjs/storybook/issues/14065)

```bash
# 初始化
npx sb init

# 手动安装
yarn add --dev @storybook/{react,addons}
yarn add --dev @storybook/addon-{actions,links,knob}
```
