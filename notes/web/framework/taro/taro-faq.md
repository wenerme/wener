---
tags:
  - FAQ
---

# Taro FAQ

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
