# Storybook

## Tips

* [nextjs/examples/with-storybook](https://github.com/zeit/next.js/tree/canary/examples/with-storybook)
* [#9311](https://github.com/storybookjs/storybook/issues/9311) - Storybook 6.0 Release
* 插件 - [addons](https://github.com/storybookjs/storybook/tree/next/addons)
  * actions - 纪录事件
  * links - 内部跳转
  * storysource - 查看源码
  * viewport - 不同设备视图
  * toolbars - 工具栏、上下文参数
* 问题
  * bundle 过大 - [#6391](https://github.com/storybookjs/storybook/issues/6391#issuecomment-530262331)
    * webpack 拆分

```bash
# 初始化
npx sb init

#
yarn add --dev @storybook/{react,addons}
yarn add --dev @storybook/addon-{actions,links,knob}

# 6.0
yarn add --dev @storybook/{react,addons}@next
yarn add --dev @storybook/addon-{actions,links}@next
```
