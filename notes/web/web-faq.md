---
title: Web FAQ
tags:
  - FAQ
---

# Web FAQ

## 图片懒加载

```html
<img loading="lazy" src="https://" />
```

## URL 安全字符 / URL Safe characters

- unreserved / 未保留字符 / 安全字符
  - `[0-9a-zA-Z-._~]`
- 保留
  - ampersand ("&")
  - dollar ("$")
  - plus sign ("+")
  - comma (",")
  - forward slash ("/")
  - colon (":")
  - semi-colon (";")
  - equals ("=")
  - question mark ("?")
  - 'At' symbol ("@")
  - pound ("#").
- 一般认为不安全
  - space (" ")
  - less than and greater than (`<>`)
  - open and close brackets (`[]`)
  - open and close braces (`{}`)
  - pipe (`|`)
  - backslash (`\`)
  - caret (`^`)
  - percent (`%`)
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
  - 5MB
- localStorage
  - origin 纬度 - 持久化
  - 修改可跨 tab 传递
  - 可监听变化

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
