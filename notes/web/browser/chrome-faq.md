---
title: Chrome FAQ
---

# Chrome FAQ

## 离线安装下载

- https://www.google.com/intl/en/chrome/?standalone=1

## 证书错误继续访问

1. 页面内输入 - `thisisunsafe`
2. 控制台执行 - `sendCommand(SecurityInterstitialCommandId.CMD_PROCEED)`

## 取消所有 service worker 注册

- chrome://serviceworker-internals

```js
$$('.unregister').forEach((b) => b.click());
```
