---
tags:
  - FAQ
---

# Taro FAQ

:::caution

- CoverView 不支持 base64
  - 尽量直接写路径 - 不能 import 为 base64

:::

```ts
enum AppEnvType {
  // 微信小程序
  WEAPP = 'WEAPP',
  // 百度小程序
  SWAN = 'SWAN',
  // 支付宝小程序
  ALIPAY = 'ALIPAY',
  // 抖音小程序
  TT = 'TT',
  // QQ小程序
  QQ = 'QQ',
  // 京东小程序
  JD = 'JD',
  // H5
  WEB = 'WEB',
  // React Native
  RN = 'RN',
  // 快应用
  QUICKAPP = 'QUICKAPP',
  HARMONY = 'HARMONY',
  HARMONYHYBRID = 'HARMONYHYBRID',
}
```

- Runtime
  - https://github.com/NervJS/taro/blob/main/packages/taro-runtime/src/bom/window.ts
- https://juejin.cn/post/7186536634573226045

## Invalid option from onResolve() callback in plugin "scanImports": "importer"

- Taro 3.6.7+ 解决
- https://github.com/NervJS/taro/issues/13767

## taro immer

```json
{
  "pnpm": {
    "patchedDependencies": {
      "immer@10.0.2": "patches/immer@10.0.2.patch"
    }
  }
}
```

```diff
diff --git a/package.json b/package.json
index 636a5d3b2d692851b3eda9bd18d6c4c22f8362c6..54999c2456b6114a946228785cb3a33b187fc4ac 100644
--- a/package.json
+++ b/package.json
@@ -7,12 +7,12 @@
   "exports": {
     ".": {
       "types": "./dist/immer.d.ts",
-      "import": "./dist/immer.mjs",
+      "import": "./dist/immer.legacy-esm.js",
       "require": "./dist/cjs/index.js"
     }
   },
-  "jsnext:main": "dist/immer.mjs",
-  "react-native": "dist/immer.mjs",
+  "jsnext:main": "dist/immer.legacy-esm.js",
+  "react-native": "dist/immer.legacy-esm.js",
   "source": "src/immer.ts",
   "types": "./dist/immer.d.ts",
   "sideEffects": false,
```

## Field 'browser' doesn't contain a valid alias configuration

注意引入的内容，可能是少了依赖

## 分包

```json
{
  "pages": ["pages/index"],
  "subpackages": [
    {
      "root": "pkgs/a",
      "pages": ["pages/rabbit", "pages/squirrel"]
    },
    {
      "root": "pkgs/b",
      "pages": ["pages/index", "pages/pineapple"],
      "independent": true
    }
  ]
}
```

- 所有分包 < 20M
- 单个分包/主包 < 2M
  - 开发模式可能导致超过 2M
- 主包
  - 包含默认启动页面/TabBar
- 分包
  - 可以设置 name 然后预加载
  - 小程序启动时，默认会下载主包并启动主包内页面，当用户进入分包内某个页面时，客户端会把对应分包下载下来，下载完成后再进行展示。
- https://docs.taro.zone/docs/app-config#subpackages
  - https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages.html
- independent
  - 独立分包
  - 可以独立于主包和其他分包运行。从独立分包中页面进入小程序时，不需要下载主包。当用户进入普通分包或主包内页面时，主包才会被下载。
  - https://docs.taro.zone/docs/independent-subpackage/
