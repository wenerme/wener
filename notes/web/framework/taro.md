---
title: taro
---

# taro

- [NervJS/taro](https://github.com/NervJS/taro)
  - MIT, TS, JS
  - React/Vue/Nerv -> 微信/京东/百度/支付宝/字节跳动/QQ/飞书 小程序 或 H5/RN
  - 实现参考 react-reconciler
    - 实现了类似的逻辑接口
  - 插件系统 [webpack/tapable](https://github.com/webpack/tapable)
  - CSS in JS linaria
  - 支持预渲染 - 类似 SSR
- 参考
  - [NervJS/taro-ui](https://github.com/NervJS/taro-ui) - React
  - [jdf2e/NutUI](https://github.com/jdf2e/nutui) - 京东风格, Vue3
  - [NervJS/awesome-taro](https://github.com/NervJS/awesome-taro)


```bash
npm install -g @tarojs/cli
# npm install -g mirror-config-china

# npx -y @tarojs/cli init my-app
taro init my-app

cd my-app

# 微信小程序
# ==========
# 下载 https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
# 选择根目录下 dist
# 关闭 ES6 转 ES5
# 关闭上传代码时样式自动补全
# 关闭代码压缩上传
pnpm dev:weapp
```

## tailwindcss

- https://github.com/windedge/taro-tailwind
- https://github.com/pcdotfan/taro-plugin-tailwind
  - https://github.com/pcdotfan/taro-plugin-tailwind/blob/main/config/mini.config.js
- https://learnku.com/articles/60035
