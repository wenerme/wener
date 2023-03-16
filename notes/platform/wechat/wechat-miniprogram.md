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
- 无
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
- 语法
  - 不支持 `??`

:::

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

- https://mp.weixin.qq.com/ 登录后台
- https://mp.weixin.qq.com/cgi-bin/wx

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

# FAQ

## 用户信息

```js
const { appid, fakeId, nickName, openid, userName } = window.__INITIAL_STATE__.userInfo;
copy(JSON.stringify({ appid, fakeId, nickName, openid, userName }, null, 2));
```

## SyntaxError: Unexpected token ？
- `??` 的问题
## SyntaxError: Unexpected token ."use strict";
- `?.` 的问题
