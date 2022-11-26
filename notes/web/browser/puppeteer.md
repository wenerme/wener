---
title: Puppeteer
---

# Puppeteer

- ~/.cache/puppeteer/chrome
- PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
  - 避免下载
- PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser
- 参考
  - [berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra)

:::caution

- Alpine 下有问题 [#7746](https://github.com/puppeteer/puppeteer/issues/7746)

:::

```bash
npm add puppeteer

# linux 依赖
apk add nss nspr at-spi2-atk cups-libs libxcomposite mesa-gbm libxkbcommon pango cairo alsa-lib
# at-spi2-core

# Linux 环境使用
export DISPLAY=:1

node
.editor
```

```js
var puppeteer = await import('puppeteer');
var browser = await puppeteer.launch();
var page = await browser.newPage();
```

- Browser
  - 事件
    - disconnected
    - targetchanged - URL 变化
    - targetcreated - 例如 window.open, browser.newPage
    - targetdestroyed
  - BrowserContext
    - 事件: targetchanged, targetcreated, targetdestroyed
    - 可以创建 incognito 上下文
    - Target - page, background_page, service_worker, shared_worker, other, browser, webview
    - Page - 正常网页
      - Frame
      - mainFrame - 当前主窗口

```bash
# macOS 手动启动
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --no-first-run --no-default-browser-check --user-data-dir=$(mktemp -d -t 'chrome-remote_data_dir')

# Windows
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222
```

- http://127.0.0.1:9222/json/version
- 默认使用 --remote-debugging-port=0
  - 随机 port
- https://github.com/puppeteer/puppeteer/blob/v14.4.1/docs/api.md

```js
// 获取当前的 ws url
browser.wsEndpoint()
```

## adblock

```bash
npm add puppeteer-extra puppeteer-extra-plugin-adblocker
```

```js
const puppeteer = require('puppeteer-extra');

// Add adblocker plugin, which will transparently block ads in all pages you
// create using puppeteer.
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require('puppeteer');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(
  AdblockerPlugin({
    // Optionally enable Cooperative Mode for several request interceptors
    interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
  }),
);
```
- https://github.com/ghostery/adblocker
  - https://raw.githubusercontent.com/cliqz-oss/adblocker/master/packages/adblocker/assets/easylist/easylistgermany.txt

## 添加扩展

- --disable-extensions-except=/path/to/extension
- --load-extension=/path/to/extension

# FAQ

## Docker user

```bash
addgroup -S pptruser
adduser -S -g pptruser pptruser
mkdir -p /home/pptruser/Downloads /app
chown -R pptruser:pptruser /home/pptruser
chown -R pptruser:pptruser /app
```

## AlpineLinux musl

默认下载的不支持

```bash
Error relocating /chrome-linux/chrome: __mbrlen: symbol not found
Error relocating /chrome-linux/chrome: __close: symbol not found
Error relocating /chrome-linux/chrome: initstate_r: symbol not found
Error relocating /chrome-linux/chrome: random_r: symbol not found
```

- https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine

```bash
apk add chromium chromium-lang
# chromium-chromedriver
```

```js
var browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium-browser',
  headless: false,
  args: ['--no-sandbox', '--disable-gpu'],
});
```

- root 必须要 `--no-sandbox`
