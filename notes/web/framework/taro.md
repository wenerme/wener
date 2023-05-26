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
  - [NervJS/taro-plugin-inject](https://github.com/NervJS/taro-plugin-inject)

:::caution

- 不支持 data-attr [#11530](https://github.com/NervJS/taro/issues/11530)
- 不会转译外部依赖
  - 例如 `??`, `?.`

:::

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

NODE_ENV=production pnpm dev:weapp
```

```ts
Taro.ENV_TYPE;
const { app, route, page } = Taro.Current;
```

| type   | for            |
| ------ | -------------- |
| ALIPAY | 支付宝小程序   |
| JD     | 京东小程序     |
| QQ     | QQ 小程序      |
| SWAN   | 百度小程序     |
| TT     | 字节跳动小程序 |
| WEAPP  | 微信小程序     |
| RN     | React Native   |
| WEB    | Web            |

## tailwindcss

- https://github.com/windedge/taro-tailwind
- https://github.com/pcdotfan/taro-plugin-tailwind
  - https://github.com/pcdotfan/taro-plugin-tailwind/blob/main/config/mini.config.js
- https://learnku.com/articles/60035

## 多端

| app            | 平台自己            | taro                |
| -------------- | ------------------- | ------------------- |
| 微信小程序     | [project.config.json](https://developers.weixin.qq.com/miniprogram/dev/devtools/projectconfig.html) | project.config.json |
| 百度小程序     | project.swan.json   | project.swan.json   |
| 字节跳动小程序 | project.config.json | project.tt.json     |
| QQ 小程序      | project.config.json | project.qq.json     |
| 支付宝小程序   | mini.project.json   | project.alipay.json |
| 京东小程序     |                     |
| 飞书小程序     | project.config.json | project.lark.json   |

## FAQ

##  Invalid option from onResolve() callback in plugin "scanImports": "importer"

- Taro 3.6.7+ 解决
- https://github.com/NervJS/taro/issues/13767
