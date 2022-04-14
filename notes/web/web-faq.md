---
title: Web FAQ
tags:
  - FAQ
---

# Web FAQ

## trailing slash

- [slorber/trailing-slash-guide](https://github.com/slorber/trailing-slash-guide)

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

## URL 安全字符 / URL Safe characters

- unreserved / 未保留字符 / 安全字符
  - `[0-9a-zA-Z-._~]`

**保留字符**

| name          | char |
| ------------- | ---- |
| ampersand     | `&`  |
| dollar        | `$`  |
| plus sign     | `+`  |
| comma         | `,`  |
| forward slash | `/`  |
| colon         | `:`  |
| semi-colon    | `;`  |
| equals        | `=`  |
| question mark | `?`  |
| 'At' symbol   | `@`  |
| pound         | `#`  |

**不安全字符**

| name                       | char |
| -------------------------- | ---- |
| space                      | ` `  |
| less than and greater than | `<>` |
| open and close brackets    | `[]` |
| open and close braces      | `{}` |
| pipe                       | `\|` |
| backslash                  | `\`  |
| caret                      | `^`  |
| percent                    | `%`  |

- 参考
  - [rfc3986#section-2](https://datatracker.ietf.org/doc/html/rfc3986#section-2)

## HTTP Headers

```
sec-ch-ua: " Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"
sec-ch-ua-mobile: ?0
Sec-Fetch-Dest: empty
Sec-Fetch-Mode: cors
Sec-Fetch-Site: same-site
```

### cache

- MDN [Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching
- https://support.cloudflare.com/hc/en-us/articles/115003206852-Understanding-Origin-Cache-Control
- max-age=0 vs no-cache
  - https://stackoverflow.com/a/1383359/1870054

**请求**

```
Cache-Control: max-age=<seconds>
Cache-Control: max-stale[=<seconds>]
Cache-Control: min-fresh=<seconds>
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: only-if-cached
```

**响应**

```
Cache-Control: must-revalidate
Cache-Control: no-cache
Cache-Control: no-store
Cache-Control: no-transform
Cache-Control: public
Cache-Control: private
Cache-Control: proxy-revalidate
Cache-Control: max-age=<seconds>
Cache-Control: s-maxage=<seconds>

Cache-Control: immutable
Cache-Control: stale-while-revalidate=<seconds>
Cache-Control: stale-if-error=<seconds>
```

- private - 面向单用户 - Authorization
- public - 多用户共享缓存
- post-check
- pre-check
- immutable
  - max-age 内避免尝试校验缓存

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
