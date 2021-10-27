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
