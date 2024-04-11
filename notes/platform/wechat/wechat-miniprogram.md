---
title: 微信小程序
---

# 微信小程序

:::caution 运行时区别

- wxss/css
  - 不支持 `*`
  - 名字不能包含 `:`,`#`,`/`,`[`,`]`
  - 不支持有些场景的 `~`
  - 不支持 rem
- DOM 环境无
  - fetch/Header/Request/Response
  - File/Blob/ReadableStream
  - FormData
  - AbortController/AbortSignal
  - URLSearchParams
- 不支持 svg 标签
  - 支持 canvas
  - https://github.com/dntzhang/cax
    - 通过 canvas 渲染 svg
  - 可以通过 Image.src 使用 svg
    - https://juejin.cn/post/6936529740433997861
    - 可以 dataurl
- 有 TextEncoder/TextDecoder/ArrayBuffer
- JS 语法
  - 不支持 `??`, `?.`
  - 不支持 `eval`, `new Function`
  - 内置 core-js

:::

- https://mp.weixin.qq.com/ 登录后台
- https://mp.weixin.qq.com/cgi-bin/wx

## API

- 手机号快速验证 [getPhoneNumber](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getPhoneNumber.html)
  - 平台不做二次实际校验
- 手机号实时验证 [getRealtimePhoneNumber](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/getRealtimePhoneNumber.html)
  - 💲 付费使用
  - 平台进行实际校验
- wx.getSetting()
  - 获取权限信息
  - `scope.userInfo`,`scope.address`,`scope.invoice`,`scope.invoiceTitle`
- wx.getUserInfo
  - 一次性授权
  - 返回**匿名**信息
  - 需要 scope.userInfo
- wx.getUserProfile
  - 每次授权
  - 2021年4月

## 分析

```js
console.assert(globalThis === window);
const global = {
  __wcc_version__: 'v0.5vv_20200413_syb_scopedata',
  __wcc_version_info__: {
    customComponents: true,
    fixZeroRpx: true,
    propValueDeepCopy: false,
  },
};
```

- 内部编译器

  - wcc
    - wxml -> js
  - wcsc
    - wxss -> js

- https://zhaomenghuan.js.org/blog/wechat-miniprogram-principle-analysis.html

## wx

```ts
// Taro
wx['webpackJsonp'];
console.assert(wxModuleVersion === 2);
WXWebAssembly;

__wxAppCode__;
__wxAppData;
__wxAppCurrentFile__;
__wxConfig;
__wxRoute;
wx.env;

__wxAppCode__[__wxRoute + '.json'];
__wxAppCode__[__wxRoute + '.wxml'];
```

## Library

- NodeJS
  - [wx-server-sdk](https://www.npmjs.com/package/wx-server-sdk)
    - https://cdn.jsdelivr.net/npm/wx-server-sdk/

## JS 语法

- [wechat-miniprogram/miniprogram-compat](https://github.com/wechat-miniprogram/miniprogram-compat)
  - https://wechat-miniprogram.github.io/miniprogram-compat/
- https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html
- https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/js-support.html

# FAQ

## CORS

- request 请求可以直接修改 Origin

**图片资源**

```
cross-origin-resource-policy: cross-origin
```

## 请求会包含应用信息

```
referer: https://servicewechat.com/WXID/devtools/page-frame.html
```

## 用户信息

```js
const { appid, fakeId, nickName, openid, userName } = window.__INITIAL_STATE__.userInfo;
copy(JSON.stringify({ appid, fakeId, nickName, openid, userName }, null, 2));
```

## SyntaxError: Unexpected token ？

- `??` 的问题

## SyntaxError: Unexpected token ."use strict";

- `?.` 的问题

## miniprogram-ci 10009 undefined

> 不要把 miniprogram-ci 安装在现有项目里，太多依赖了

```bash
PROJECT_DIR=$PWD
WXA_APP_ID=
mkdir -p /tmp/wxa-ci
cd /tmp/wxa-ci
pnpm init
pnpm add -D miniprogram-ci

pnpm miniprogram-ci upload --appid $WXA_APP_ID --pp $PROJECT_DIR/dist/weapp/ --pkp $PROJECT_DIR/private.key -r 1 -v --uv 1.0.0

# by script
pnpm add -D tsx typescript
cp $PROJECT_DIR/scripts/wxa-deploy.ts .
env PROJECT_DIR=$PROJECT_DIR pnpm tsx ./wxa-deploy.ts
```

隐藏了实际的 error，调整内部 js 输出错误发现是

```
require() of ES Module ansi-styles from chalk not supported
```

- chalk 5 is ESM
- chalk 4 is CJS

## render webview vs skyline

- https://developers.weixin.qq.com/miniprogram/dev/framework/runtime/skyline/custom-route.html
