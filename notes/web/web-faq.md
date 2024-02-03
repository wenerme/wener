---
title: Web FAQ
tags:
  - FAQ
---

# Web FAQ

## Headers

- X-Response-Time
  - 单位 ms
- X-Powered-By
- X-AspNet-Version
- X-Frame-Options
- Server-Timing
- X-API-Key

## global

- globalThis
  - ECMAScript 2020
  - Chrome 71
  - NodeJS 12
  - Safari 12.1
- global - Node.js
- self - Web Worker
- window - Browser
- this - iife 环境

## trailing slash

- [slorber/trailing-slash-guide](https://github.com/slorber/trailing-slash-guide)

## Content SecurityPolicy

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';" />
```

- `default-src 'self'; script-src 'none'; sandbox;`
- Mitigating cross-site scripting
- Mitigating packet sniffing attacks
- XSS
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
- https://content-security-policy.com/
- Content-Security-Policy
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

## web worker vs serviceWorker vs worklet

- Worklets
  - 浏览器处理 pipeline hook
  - 利用浏览器底层机制 - styling, layout, audio
  - [CSS Animation Worklet API](https://drafts.css-houdini.org/css-animation-worklet/)
  - [Layout Worklet](https://drafts.css-houdini.org/css-layout-api-1/#layout-worklet)
- Service workers
  - 浏览器 网络的代理
  - 拦截请求，重定向到缓存，实现离线访问能力
- Web workers
  - 多线程
  - 通用

```js
// web worker
const myWorker = new Worker('worker.js');
myWorker.postMessage('Hello!');
myWorker.onmessage = function (e) {
  console.log(e.data);
};

// serviceWorker
navigator.serviceWorker.register('/service-worker.js');

// worklet
CSS.paintWorklet.addModule('myWorklet.js');
```

|              | Web Workers  | Service Workers  |
| ------------ | ------------ | ---------------- |
| Instances    | Many per tab | One for all tabs |
| Lifespan     | Same as tab  | Independent      |
| Intended use | Parallelism  | Offline support  |

- https://html5workertest.com/

## 图片懒加载

```html
<img loading="lazy" src="https://" />
```

## HTTP Headers

```
sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
sec-ch-ua-mobile: ?0
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
```

### websocket

```
Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
Sec-WebSocket-Key: R9DINzhe/9zYRFOjZEd41A==
Sec-WebSocket-Protocol: sip
Sec-WebSocket-Version: 13
Upgrade: websocket
```

## 获取当前脚本对象

- document.currentScript

```html
<script data-option="value" src="lib.js"></script>
```

```js title="lib.js"
console.log(document.currentScript.dataset.option);
```

## sessionStorage vs localStorage

- sessionStorage
  - tab/window 纬度 - 关闭则清理
  - 新 tab/window 会 copy 内容
  - 修改互相不影响
  - 限制 5 MB
- localStorage
  - origin 纬度 - 持久化
  - 修改可跨 tab 传递
  - 可监听变化
  - 10 MB per origin

```js
// 监听 localStorage
window.addEventListener('storage', (e) => console.log(e));
```

## origin

- 浏览器安全隔离的一个纬度
- schema+host - 不包含路径
- https://developer.mozilla.org/en-US/docs/Glossary/Origin

```js
location.origin;
```

## window 事件

- https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers

## websocket auth

1. cookie - 最简单
2. 协议内授权
3. otp 方式

---

- https://devcenter.heroku.com/articles/websocket-security

## cross-origin vs. same-site

## Possible side-effect in debug-evaluate

- 可能是 console.log 时传入的值包含了太多东西，其中部分在 eval 时触发了一些额外的事情
- Chrome 的检测机制
- 目前 Promise reject 会出现，即便无 side-effect
- https://bugs.chromium.org/p/chromium/issues/detail?id=1246911

```
[Violation] Added non-passive event listener to a scroll-blocking 'touchstart' event. Consider marking event handler as 'passive' to make the page more responsive. See https://www.chromestatus.com/feature/5745543795965952
```

- useOnClickOutside 处理 touchstart 时触发，需要传入 passive 参数

## Failed to execute 'postMessage' on 'DOMWindow': The target origin provided does not match the recipient window's origin

1. 确保 iframe 完全加载
1. sandbox=allow-same-origin
1. 尝试 `frame.postMessage("hello world!", '*')`

## slug

- 一个简短而明确的标签
- 表达核心含义
- 美化 URL - 产生更友好的路径
- 通常是唯一的 - 辅助标识数据
- 可能是自动转化的，也可能是手动指定
