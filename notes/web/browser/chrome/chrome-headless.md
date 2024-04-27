---
title: Headless
---

# Chrome Headless

- DevToolsActivePort
  - 第一行为端口
  - 第二行为 路径 `/devtools/browser/UUID`

```bash
chrome --headless --remote-debugging-port=9222 --disable-gpu --no-sandbox

# /devtools/inspector.html?ws=127.0.0.1:9222/devtools/page/6BD1FB9A428F479750451F5E652F544F
curl http://localhost:9222/json
```

```
--enable-blink-features=SomeNewFeature,SomeOtherNewFeature
--disable-blink-features=SomeOldFeature
```

# FAQ

## playwright vs puppeteer

- https://blog.logrocket.com/playwright-vs-puppeteer/

## New Headless

- Chrome 112+
- 支持
  - --dump-dom
  - --screenshot --window-size=412,892
  - --print-to-pdf --no-pdf-header-footer
  - --timeout=5000
  - --virtual-time-budget
    - 虚拟时间 - setTimeout/setInterval
    - 以尽可能快的速度执行任意网页代码，同时使网页相信时间实际上是过去的时间。
- https://developer.chrome.com/docs/chromium/new-headless
- 实时视图目前仅实现触摸事件
  - https://bugs.chromium.org/p/chromium/issues/detail?id=1410433

## Debugging connection was closed. Reason: WebSocket disconnected
