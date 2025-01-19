---
title: uniapp
---

# uniapp

:::tip

- 建议只用于写 小程序 - 其他情况避免使用
- 目前跨平台 小程序 这个场景只有 uniapp 和 taro 比较好

:::

- [dcloudio/uni-app](https://github.com/dcloudio/uni-app)
  - Apache-2.0, Vue
- uts - uni type script
  - 新的 uts 语法
  - https://zh.uniapp.dcloud.io/tutorial/syntax-uts.html
  - 如非必要不值得投入时间学习
  - 可选择 RN

## Awesome

- rpx、upx、easycom
- Webstorm 插件 https://plugins.jetbrains.com/plugin/21470-uniapp-tool

## 条件编译

```ts
// #ifdef H5
// #ifndef H5 || MP-WEIXIN
// #endif
```

- %PLATFORM%
- https://zh.uniapp.dcloud.io/tutorial/platform.html


## pages.json

- 导航栏高度为 44px (不含状态栏)
- tabBar 高度为 50px (不含安全区)。
- https://zh.uniapp.dcloud.io/collocation/pages.html

## manifest.json

# FAQ

- `/sockjs-node/info`
  - 错误可以忽略
